'use client'

import { MapPin, Search, User, Menu, Home, Heart, Calendar, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

export function SiteHeader() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/80 backdrop-blur-xl border-b border-purple-200/50 sticky top-0 z-40 shadow-lg shadow-purple-500/5"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <MapPin className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
              LocalServe
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl mx-8">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 flex-1 border-2 border-purple-200 hover:border-purple-400 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20 transition-all"
            >
              <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for services..."
                className="bg-transparent border-none outline-none flex-1 text-slate-900 placeholder:text-slate-500"
              />
            </motion.div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl px-4 py-2.5 hover:from-purple-200 hover:to-pink-200 transition-all border-2 border-purple-200 hover:border-purple-300 flex-shrink-0 hover:shadow-lg"
            >
              <MapPin className="w-5 h-5 text-purple-600" />
              <span className="text-slate-900 font-medium">New York, NY</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/favorites"
                className="hidden md:flex items-center gap-2 text-slate-600 hover:text-pink-600 transition-colors p-2 relative group"
              >
                <Heart className="w-6 h-6 group-hover:fill-pink-600 transition-all" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all font-medium relative overflow-hidden group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <User className="w-5 h-5 relative z-10" />
                <span className="hidden sm:inline relative z-10">Login</span>
              </Link>
            </motion.div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-purple-600" />
            </motion.button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border-2 border-purple-200 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20 transition-all">
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

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="md:hidden bg-white/80 backdrop-blur-xl border-t border-purple-200/50 sticky bottom-0 z-40 safe-area-bottom shadow-lg shadow-purple-500/10"
    >
      <div className="flex items-center justify-around px-2 py-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              pathname === '/'
                ? 'text-purple-600 bg-gradient-to-br from-purple-100 to-pink-100 shadow-md'
                : 'text-slate-500 hover:text-purple-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            href="/bookings"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              pathname === '/bookings'
                ? 'text-purple-600 bg-gradient-to-br from-purple-100 to-pink-100 shadow-md'
                : 'text-slate-500 hover:text-purple-600'
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-semibold">Bookings</span>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            href="/favorites"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              pathname === '/favorites'
                ? 'text-pink-600 bg-gradient-to-br from-purple-100 to-pink-100 shadow-md'
                : 'text-slate-500 hover:text-pink-600'
            }`}
          >
            <Heart className={`w-6 h-6 ${pathname === '/favorites' ? 'fill-pink-600' : ''}`} />
            <span className="text-xs font-semibold">Favorites</span>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            href="/customer"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              pathname === '/customer'
                ? 'text-purple-600 bg-gradient-to-br from-purple-100 to-pink-100 shadow-md'
                : 'text-slate-500 hover:text-purple-600'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs font-semibold">Account</span>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  )
}
