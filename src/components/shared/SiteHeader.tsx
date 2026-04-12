'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { MapPin, Search, Heart, Home, Calendar, Settings, LogOut, User, ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'customer' | 'provider' | 'admin'

interface UserProfile {
  full_name: string | null
  photo_url: string | null
  role: Role | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string | null, email: string | null): string {
  if (name) {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  }
  return email?.[0]?.toUpperCase() ?? '?'
}

function dashboardPath(role: Role | null): string {
  if (role === 'admin') return '/dashboard/admin'
  if (role === 'provider') return '/dashboard/provider'
  return '/dashboard/customer'
}

// ─── UserNav ──────────────────────────────────────────────────────────────────

function UserNav({ user, profile }: { user: SupabaseUser; profile: UserProfile }) {
  const router = useRouter()
  const initials = getInitials(profile.full_name, user.email ?? null)
  const displayName = profile.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'Account'

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-purple-200 hover:border-purple-400 bg-white/80 transition-all focus:outline-none">
          {profile.photo_url ? (
            <img
              src={profile.photo_url}
              alt={displayName}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
          )}
          <span className="hidden sm:inline text-sm font-semibold text-slate-800">
            {displayName}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <p className="font-semibold text-slate-900 truncate">{profile.full_name ?? displayName}</p>
          <p className="text-xs text-slate-500 truncate">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={dashboardPath(profile.role)}>
            <Settings className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/bookings">
            <Calendar className="w-4 h-4 mr-2" />
            My Bookings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/favorites">
            <Heart className="w-4 h-4 mr-2" />
            Favourites
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── SiteHeader ───────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<UserProfile>({ full_name: null, photo_url: null, role: null })
  const supabase = createClient()

  useEffect(() => {
    // Initial session fetch
    supabase.auth.getUser().then(({ data: { user } }) => {
      setAuthUser(user)
      if (user) fetchProfile(user.id)
    })

    // Persist across browser restarts — listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      setAuthUser(user)
      if (user) fetchProfile(user.id)
      else setProfile({ full_name: null, photo_url: null, role: null })
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    // Fetch role first
    const { data: userRow } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    const role = userRow?.role as Role | null

    if (role === 'provider') {
      const { data: pp } = await supabase
        .from('provider_profiles')
        .select('full_name, cloudinary_photo_url')
        .eq('user_id', userId)
        .single()
      setProfile({
        full_name: pp?.full_name ?? null,
        photo_url: pp?.cloudinary_photo_url ?? null,
        role,
      })
    } else if (role === 'customer') {
      const { data: cp } = await supabase
        .from('customer_profiles')
        .select('full_name')
        .eq('user_id', userId)
        .single()
      setProfile({ full_name: cp?.full_name ?? null, photo_url: null, role })
    } else {
      setProfile({ full_name: null, photo_url: null, role })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/80 backdrop-blur-xl border-b border-purple-200/50 sticky top-0 z-40 shadow-lg shadow-purple-500/5"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <MapPin className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
              LocalServe
            </span>
          </Link>

          {/* Search bar — desktop */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl mx-8">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 flex-1 border-2 border-purple-200 hover:border-purple-400 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20 transition-all">
              <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for services..."
                className="bg-transparent border-none outline-none flex-1 text-slate-900 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {authUser ? (
              <>
                <Link
                  href="/favorites"
                  className="hidden md:flex items-center p-2 text-slate-600 hover:text-pink-600 transition-colors"
                >
                  <Heart className="w-6 h-6" />
                </Link>
                <UserNav user={authUser} profile={profile} />
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Search bar — mobile */}
        <div className="md:hidden pb-3">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border-2 border-purple-200 focus-within:border-purple-500 transition-all">
            <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search services..."
              className="bg-transparent border-none outline-none flex-1 text-slate-900 placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// ─── MobileBottomNav ──────────────────────────────────────────────────────────

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="md:hidden bg-white/80 backdrop-blur-xl border-t border-purple-200/50 sticky bottom-0 z-40 safe-area-bottom"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {[
          { href: '/', icon: Home, label: 'Home' },
          { href: '/bookings', icon: Calendar, label: 'Bookings' },
          { href: '/favorites', icon: Heart, label: 'Favorites' },
          { href: '/dashboard/customer', icon: Settings, label: 'Account' },
        ].map(({ href, icon: Icon, label }) => (
          <motion.div key={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                pathname === href
                  ? 'text-purple-600 bg-gradient-to-br from-purple-100 to-pink-100 shadow-md'
                  : 'text-slate-500 hover:text-purple-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-semibold">{label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  )
}