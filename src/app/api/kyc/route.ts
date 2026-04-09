import { encrypt } from '@/lib/encryption/crypto';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient();
  const { provider_id, aadhaar_number, phone_number } = await req.json();

  // Encrypt sensitive PII
  const encryptedAadhaar = encrypt(aadhaar_number);
  const encryptedPhone = encrypt(phone_number);

  const { error } = await supabase
    .from('kyc_documents')
    .insert({
      provider_id,
      form_data_encrypted: encryptedAadhaar, // [Aadhaar Redacted] in logs
      phone_encrypted: encryptedPhone,
      // ...other fields
    });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}