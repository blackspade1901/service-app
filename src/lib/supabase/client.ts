/**
 * FILE: src/lib/supabase/client.ts
 *
 * Browser-side Supabase client.
 * Import in Client Components ('use client').
 * Never use for sensitive operations — RLS applies.
 */
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}