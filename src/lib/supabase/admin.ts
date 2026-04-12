/**
 * FILE: src/lib/supabase/admin.ts
 *
 * Supabase SERVICE ROLE client.
 * - Bypasses Row Level Security.
 * - ONLY import this in server-side code (API routes, server actions).
 * - NEVER import in client components or expose to the browser.
 * - Use for: role updates after signup, admin operations, webhook handlers.
 */
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars. ' +
      'Add them to .env.local — never commit them to the repo.'
    )
  }

  return createClient<Database>(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}