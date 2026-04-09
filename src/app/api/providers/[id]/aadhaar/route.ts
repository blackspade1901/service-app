import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { decrypt } from '@/lib/encryption/crypto';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userData?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get provider data
    const { data: provider, error } = await supabase
      .from('providers')
      .select('aadhaar')
      .eq('id', params.id)
      .single();

    if (error || !provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    // Decrypt aadhaar
    const decryptedAadhaar = decrypt(provider.aadhaar, process.env.ENCRYPTION_KEY!);

    return NextResponse.json({ aadhaar: decryptedAadhaar });
  } catch (error) {
    console.error('Error decrypting aadhaar:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}