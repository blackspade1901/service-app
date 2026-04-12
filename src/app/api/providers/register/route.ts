/**
 * FILE: src/app/api/providers/register/route.ts
 *
 * Completes a provider's profile after they have signed up.
 * Called from ProviderRegistrationClient after Step 1 & 2.
 *
 * What this does:
 *   1. Verifies the caller is authenticated as a provider.
 *   2. Updates provider_profiles with full details (provider_type, address, etc.)
 *   3. Inserts provider_services rows for each selected category.
 *
 * Note: KYC document upload is handled separately by /api/kyc.
 */
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { encrypt } from '@/lib/encryption/crypto'

interface ServiceInput {
  category_id: string
  min_price: number
  max_price: number
  experience_years?: number
}

interface ProviderRegisterBody {
  full_name: string
  phone: string
  provider_type: 'individual' | 'shop'
  bio?: string
  address: string
  // lat/lng for PostGIS — send as numbers, API constructs the geography
  latitude?: number
  longitude?: number
  services: ServiceInput[]
}

export async function POST(req: Request) {
  try {
    // --- Auth check ---------------------------------------------------------
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
    }

    // Confirm role is provider.
    const { data: userRow } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userRow?.role !== 'provider') {
      return NextResponse.json(
        { error: 'Only provider accounts can complete provider registration.' },
        { status: 403 }
      )
    }

    // --- Parse body ---------------------------------------------------------
    const body: ProviderRegisterBody = await req.json()
    const { full_name, phone, provider_type, bio, address, latitude, longitude, services } = body

    if (!full_name || !phone || !provider_type || !address || !services?.length) {
      return NextResponse.json(
        { error: 'full_name, phone, provider_type, address, and at least one service are required.' },
        { status: 400 }
      )
    }

    if (!['individual', 'shop'].includes(provider_type)) {
      return NextResponse.json(
        { error: 'provider_type must be "individual" or "shop".' },
        { status: 400 }
      )
    }

    // Validate price ranges.
    for (const svc of services) {
      if (!svc.category_id || svc.min_price === undefined || svc.max_price === undefined) {
        return NextResponse.json(
          { error: 'Each service must have category_id, min_price, and max_price.' },
          { status: 400 }
        )
      }
      if (svc.min_price < 0 || svc.max_price < svc.min_price) {
        return NextResponse.json(
          { error: `Invalid price range for category ${svc.category_id}.` },
          { status: 400 }
        )
      }
    }

    const admin = createAdminClient()

    // --- Find existing provider_profiles row --------------------------------
    const { data: existingProfile } = await admin
      .from('provider_profiles')
      .select('id, kyc_status')
      .eq('user_id', user.id)
      .single()

    if (!existingProfile) {
      return NextResponse.json(
        {
          error:
            'No provider_profiles row found for this user. ' +
            'This should have been created during signup. ' +
            'Check that the cities table has at least one active row and re-register.',
        },
        { status: 404 }
      )
    }

    // Prevent re-registration if already past pending state.
    if (existingProfile.kyc_status !== 'pending') {
      return NextResponse.json(
        { error: `Cannot re-register. Current KYC status: ${existingProfile.kyc_status}` },
        { status: 409 }
      )
    }

    const providerId = existingProfile.id
    const phoneEncrypted = encrypt(phone)

    // --- Build location value for PostGIS -----------------------------------
    // PostGIS GEOGRAPHY(POINT, 4326) expects: ST_SetSRID(ST_MakePoint(lng, lat), 4326)
    // Pass as a raw string that Postgres can cast: 'SRID=4326;POINT(lng lat)'
    const locationValue =
      latitude !== undefined && longitude !== undefined
        ? `SRID=4326;POINT(${longitude} ${latitude})`
        : null

    // --- Update provider_profiles -------------------------------------------
    const { error: updateError } = await admin
      .from('provider_profiles')
      .update({
        full_name,
        phone_encrypted: phoneEncrypted,
        provider_type,
        bio: bio ?? null,
        address,
        // location is a PostGIS geography — use raw SQL for the actual geo insert.
        // Supabase JS client doesn't natively support geography literals,
        // so we pass null here and update via RPC if coordinates are provided.
        updated_at: new Date().toISOString(),
      })
      .eq('id', providerId)

    if (updateError) {
      console.error('[providers/register] profile update failed:', updateError.message)
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    // Update location separately via RPC if coordinates were provided.
    if (locationValue) {
      await admin.rpc('update_provider_location', {
        p_provider_id: providerId,
        p_longitude: longitude,
        p_latitude: latitude,
      })
      // Note: create this Postgres function in Supabase:
      //
      // CREATE OR REPLACE FUNCTION update_provider_location(
      //   p_provider_id uuid, p_longitude float8, p_latitude float8
      // ) RETURNS void AS $$
      // BEGIN
      //   UPDATE provider_profiles
      //   SET location = ST_SetSRID(ST_MakePoint(p_longitude, p_latitude), 4326)
      //   WHERE id = p_provider_id;
      // END;
      // $$ LANGUAGE plpgsql SECURITY DEFINER;
    }

    // --- Insert provider_services -------------------------------------------
    // Delete existing ones first (idempotent re-registration support).
    await admin.from('provider_services').delete().eq('provider_id', providerId)

    const serviceRows = services.map((svc) => ({
      provider_id: providerId,
      category_id: svc.category_id,
      min_price: svc.min_price,
      max_price: svc.max_price,
      experience_years: svc.experience_years ?? null,
    }))

    const { error: servicesError } = await admin
      .from('provider_services')
      .insert(serviceRows)

    if (servicesError) {
      console.error('[providers/register] services insert failed:', servicesError.message)
      return NextResponse.json({ error: servicesError.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        provider_id: providerId,
        message:
          'Profile updated. Next step: upload your KYC documents via the documents tab.',
      },
      { status: 200 }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error'
    console.error('[providers/register] Unhandled error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}