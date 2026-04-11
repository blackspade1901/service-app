'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MapPin, Shield, Sparkles } from 'lucide-react'
import { ReactNode } from 'react'
import { motion } from 'motion/react'

const links = [
  { href: '/customer', label: 'Customer', icon: LayoutDashboard },
  { href: '/provider', label: 'Provider', icon: MapPin },
  { href: '/admin', label: 'Admin', icon: Shield },
]

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-purple-200/60 bg-white/90 backdrop-blur-xl sticky top-0 h-screen shrink-0">
        <div className="p-6 border-b border-purple-100">
          <Link href="/" className="flex items-center gap-2 font-bold text-purple-800">
            <Sparkles className="w-6 h-6 text-pink-500" />
            Dashboard
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </motion.div>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-purple-100 text-xs text-slate-500">
          <Link href="/" className="text-purple-600 font-medium hover:underline">
            ← Back to app
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center gap-2 border-b border-purple-200/60 bg-white/90 px-4 py-3 sticky top-0 z-30">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="font-bold text-purple-900">Dashboard</span>
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
