import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function isValidSupabaseConfig(url?: string, key?: string) {
  if (!url || !key) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase env vars are missing or invalid. Skipping updateSession proxy handling.')
    }
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // ROLE-BASED ACCESS CONTROL (RBAC)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: profile } = await supabase.from('users').select('role').eq('id', user?.id).single()
    if (profile?.role !== 'admin') return NextResponse.redirect(new URL('/', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/provider-dashboard')) {
    const { data: profile } = await supabase.from('users').select('role').eq('id', user?.id).single()
    if (profile?.role !== 'provider') return NextResponse.redirect(new URL('/', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/customer-dashboard')) {
    const { data: profile } = await supabase.from('users').select('role').eq('id', user?.id).single()
    if (profile?.role !== 'customer') return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}