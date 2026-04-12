/**
 * FILE: src/app/api/auth/register/route.ts
 *
 * Registers a new user (customer or provider).
 *
 * Flow:
 *   1. Validate input.
 *   2. Call supabase.auth.signUp() — passes role in user_metadata.
 *   3. The DB trigger (handle_new_user) reads metadata.role and inserts
 *      into public.users automatically. No manual insert needed.
 *   4. If userType=provider: also create a skeleton provider_profile row
 *      so /provider/register has something to update.
 *   5. Return the session so the client can call setSession().
 *
 * IMPORTANT: The trigger must be updated to read raw_user_meta_data->>'role'.
 * Run this SQL in Supabase Dashboard → SQL Editor:
 *
 *   CREATE OR REPLACE FUNCTION public.handle_new_user()
 *   RETURNS trigger AS $$
 *   BEGIN
 *     INSERT INTO public.users (id, email, role)
 *     VALUES (
 *       NEW.id,
 *       NEW.email,
 *       COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
 *     );
 *     RETURN NEW;
 *   END;
 *   $$ LANGUAGE plpgsql SECURITY DEFINER;
 */
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { encrypt } from '@/lib/encryption/crypto'

interface RegisterBody {
  email: string
  password: string
  full_name: string
  phone?: string
  userType: 'customer' | 'provider'
}

export async function POST(req: Request) {
  try {
    const body: RegisterBody = await req.json()
    const { email, password, full_name, phone, userType } = body

    // --- Input validation ---------------------------------------------------
    if (!email || !password || !full_name || !userType) {
      return NextResponse.json(
        { error: 'email, password, full_name, and userType are required.' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 }
      )
    }

    if (!['customer', 'provider'].includes(userType)) {
      return NextResponse.json(
        { error: 'userType must be "customer" or "provider".' },
        { status: 400 }
      )
    }

    // --- Sign up with Supabase Auth -----------------------------------------
    // Pass role in user_metadata so the DB trigger can read it.
    const supabase = await createClient()
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: userType,
          full_name,
        },
      },
    })

    if (signUpError) {
      // Common: "User already registered"
      return NextResponse.json({ error: signUpError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Signup succeeded but no user was returned. Check email confirmation settings.' },
        { status: 500 }
      )
    }

    const userId = authData.user.id

    // --- Post-signup: create profile rows ------------------------------------
    // Use the admin client to bypass RLS for the initial profile creation.
    const admin = createAdminClient()

    if (userType === 'customer') {
      // Encrypt phone if provided.
      const phoneEncrypted = phone ? encrypt(phone) : null

      const { error: profileError } = await admin
        .from('customer_profiles')
        .insert({
          user_id: userId,
          full_name,
          phone_encrypted: phoneEncrypted,
        })

      if (profileError) {
        // Non-fatal: user is created, profile failed. Log and continue.
        console.error('[register] customer_profiles insert failed:', profileError.message)
      }
    }

    if (userType === 'provider') {
      // Fetch the first active city for the pilot.
      // Multi-city: pass city_id in the register body instead.
      const { data: city } = await admin
        .from('cities')
        .select('id')
        .eq('is_active', true)
        .limit(1)
        .single()

      if (!city) {
        // Cities table is empty — admin must seed it first.
        console.error('[register] No active city found. Seed the cities table first.')
        // Don't block signup — provider profile will be created in /provider/register
      } else {
        // Encrypt phone if provided.
        const phoneEncrypted = phone ? encrypt(phone) : null

        const { error: profileError } = await admin
          .from('provider_profiles')
          .insert({
            user_id: userId,
            city_id: city.id,
            full_name,
            phone_encrypted: phoneEncrypted,
            // provider_type is required NOT NULL but we don't have it yet.
            // Set a temporary value — /provider/register will update it.
            provider_type: 'individual',
            kyc_status: 'pending',
            payment_status: 'unpaid',
            is_live: false,
            is_active: true,
            is_deleted: false,
          })

        if (profileError) {
          console.error('[register] provider_profiles insert failed:', profileError.message)
        }
      }
    }

    // Return success. If email confirmation is disabled in Supabase settings,
    // authData.session will be non-null and the user is immediately logged in.
    // If confirmation is required, session will be null and user must verify email.
    return NextResponse.json(
      {
        success: true,
        userId,
        sessionAvailable: !!authData.session,
        message: authData.session
          ? 'Account created and session started.'
          : 'Account created. Please verify your email before signing in.',
      },
      { status: 201 }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error'
    console.error('[register] Unhandled error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}