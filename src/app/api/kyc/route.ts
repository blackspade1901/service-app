import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { encrypt } from '@/lib/encryption/crypto'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const body = await req.json()
    const { provider_id, aadhaar_number, phone_number } = body

    const encryptedAadhaar = encrypt(aadhaar_number)
    const encryptedPhone = encrypt(phone_number)

    const { error } = await supabase.from('kyc_documents').insert({
      provider_id,
      form_data_encrypted: encryptedAadhaar,
      phone_encrypted: encryptedPhone,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
