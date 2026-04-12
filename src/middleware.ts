/**
 * FILE: src/middleware.ts  (at the ROOT of src/ — not inside app/)
 *
 * Next.js Edge Middleware.
 * Runs on every request that matches the matcher pattern.
 * Responsibilities:
 *   1. Refresh the Supabase session cookie on every request.
 *   2. Redirect unauthenticated users away from protected routes.
 *   3. RBAC: redirect users who access a route above their role.
 */
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

// Routes that require authentication (any role).
const AUTH_REQUIRED = [
  '/customer',
  '/provider',
  '/admin',
  '/bookings',
  '/favorites',
  '/booking',
]

// Routes that require a specific role.
// Key = path prefix, Value = required role.
const ROLE_REQUIRED: Record<string, string> = {
  '/admin': 'admin',
  '/customer': 'customer',
  '/provider/register': 'provider',
}

// Provider dashboard is just /provider (not /provider/register or /provider/[id])
function isProviderDashboard(pathname: string) {
  return pathname === '/provider' || pathname === '/provider/'
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured (e.g. CI environment), skip auth checks.
  if (!isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[middleware] Supabase env vars missing — skipping auth checks.')
    }
    return supabaseResponse
  }

  // Create a Supabase client that can read/write cookies.
  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // Write cookies to the request (for downstream Server Components).
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        // Write cookies to the response (so the browser persists them).
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // ALWAYS use getUser() — never getSession().
  // getSession() reads from the cookie without server validation.
  // getUser() validates the JWT with the Supabase server.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // --- Step 1: Auth required check -------------------------------------------
  const requiresAuth = AUTH_REQUIRED.some((prefix) => pathname.startsWith(prefix))

  if (requiresAuth && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // --- Step 2: RBAC check (only for role-gated routes) -----------------------
  const roleGatedPrefix = Object.keys(ROLE_REQUIRED).find((prefix) =>
    pathname.startsWith(prefix)
  )
  const providerDash = isProviderDashboard(pathname)

  if (user && (roleGatedPrefix || providerDash)) {
    // Single DB call — not three separate ones.
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role

    // /admin → only admin
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // /customer → only customer
    if (pathname.startsWith('/customer') && role !== 'customer') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // /provider (dashboard only) → only provider
    if (providerDash && role !== 'provider') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // /provider/register → must be authenticated as provider to complete registration
    if (pathname.startsWith('/provider/register') && role !== 'provider') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // --- Step 3: Redirect authenticated users away from auth pages -------------
  if (user && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const dashboardPath =
      profile?.role === 'admin'
        ? '/admin'
        : profile?.role === 'provider'
          ? '/provider'
          : '/customer'

    return NextResponse.redirect(new URL(dashboardPath, request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}