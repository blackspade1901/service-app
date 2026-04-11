import { createServerClient } from '@supabase/ssr'
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

function isProviderDashboard(pathname: string) {
  return pathname === '/provider' || pathname === '/provider/'
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Supabase env vars missing. Skipping middleware auth.')
    }
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const requiresLogin =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/customer') ||
    isProviderDashboard(pathname) ||
    pathname.startsWith('/bookings') ||
    pathname.startsWith('/favorites') ||
    pathname.startsWith('/booking/')

  if (requiresLogin && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (
    user &&
    (pathname.startsWith('/admin') ||
      pathname.startsWith('/customer') ||
      isProviderDashboard(pathname))
  ) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role

    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    if (pathname.startsWith('/customer') && role !== 'customer') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    if (isProviderDashboard(pathname) && role !== 'provider') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
