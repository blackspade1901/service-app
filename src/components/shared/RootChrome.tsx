'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { SiteHeader, MobileBottomNav } from '@/components/shared/SiteHeader'

function isDashboardPath(pathname: string | null) {
  if (!pathname) return false
  return (
    pathname.startsWith('/customer') ||
    pathname.startsWith('/admin') ||
    pathname === '/provider' ||
    pathname === '/provider/'
  )
}

export function RootChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const dashboard = isDashboardPath(pathname)
  const hideMobileNav =
    dashboard ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/provider/register')

  if (dashboard) {
    return <div className="flex flex-col flex-1 min-h-0">{children}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col max-w-[100vw] overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1 w-full">{children}</main>
      {!hideMobileNav && <MobileBottomNav />}
    </div>
  )
}
