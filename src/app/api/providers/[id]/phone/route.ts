import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { decrypt } from '@/lib/encryption/crypto';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get provider data
    const { data: provider, error } = await supabase
      .from('providers')
      .select('phone')
      .eq('id', id)
      .single();

    if (error || !provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    // Decrypt phone
    const decryptedPhone = decrypt(provider.phone);

    return NextResponse.json({ phone: decryptedPhone });
  } catch (error) {
    console.error('Error decrypting phone:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}