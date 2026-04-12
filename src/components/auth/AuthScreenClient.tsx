'use client'
/**
 * FILE: src/components/auth/AuthScreenClient.tsx
 *
 * Login and Register screen.
 * - Login: calls supabase.auth.signInWithPassword(), then redirects by role.
 * - Register: POSTs to /api/auth/register, then signs in immediately.
 *
 * Both forms are fully wired — no cosmetic buttons.
 */
import { useState, useRef, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  User, Mail, Lock, Phone, MapPin, ArrowRight, Check, Sparkles, AlertCircle, Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { createClient } from '@/lib/supabase/client'

export function AuthScreenClient({ variant }: { variant: 'login' | 'register' }) {
  const isLogin = variant === 'login'
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') ?? null

  const [userType, setUserType] = useState<'customer' | 'provider'>('customer')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Refs for uncontrolled inputs (avoids re-renders on every keystroke).
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const fullNameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const supabase = createClient()

  // Redirect user to the correct dashboard based on their role.
  async function redirectByRole() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    // If a redirect was requested (e.g. from middleware), honour it.
    if (redirectTo) {
      router.replace(redirectTo)
      return
    }

    const dest =
      profile?.role === 'admin'
        ? '/admin'
        : profile?.role === 'provider'
          ? '/provider'
          : '/customer'

    router.replace(dest)
  }

  // --------------------------------------------------------------------------
  // Login handler
  // --------------------------------------------------------------------------
  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    const email = emailRef.current?.value?.trim() ?? ''
    const password = passwordRef.current?.value ?? ''

    if (!email || !password) {
      setErrorMsg('Email and password are required.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMsg(
        error.message === 'Invalid login credentials'
          ? 'Incorrect email or password.'
          : error.message
      )
      setLoading(false)
      return
    }

    await redirectByRole()
    // router.replace triggers navigation — loading spinner stays until unmount.
  }

  // --------------------------------------------------------------------------
  // Register handler
  // --------------------------------------------------------------------------
  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    const email = emailRef.current?.value?.trim() ?? ''
    const password = passwordRef.current?.value ?? ''
    const full_name = fullNameRef.current?.value?.trim() ?? ''
    const phone = phoneRef.current?.value?.trim() ?? ''

    if (!email || !password || !full_name) {
      setErrorMsg('Email, password, and full name are required.')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    // POST to /api/auth/register
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name, phone, userType }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErrorMsg(data.error ?? 'Registration failed. Please try again.')
      setLoading(false)
      return
    }

    if (!data.sessionAvailable) {
      // Email confirmation required — tell user to check their inbox.
      setSuccessMsg(
        'Account created! Please check your email and click the confirmation link, then sign in.'
      )
      setLoading(false)
      return
    }

    // Session is live — sign in immediately so middleware can read cookies.
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setSuccessMsg('Account created! Please sign in to continue.')
      setLoading(false)
      router.replace('/login')
      return
    }

    // Redirect based on role.
    if (userType === 'provider') {
      router.replace('/provider/register')
    } else {
      router.replace('/customer')
    }
  }

  const handleSubmit = isLogin ? handleLogin : handleRegister

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 flex items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 p-8 text-white text-center relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            />
            <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">
                {isLogin ? 'Welcome Back' : 'Join LocalServe'}
              </h1>
            </div>
            <p className="text-purple-100 relative z-10">
              {isLogin ? 'Sign in to continue' : 'Create your account to get started'}
            </p>
          </div>

          <div className="p-6 md:p-8">
            {/* Login / Register tab switcher */}
            <div className="flex gap-2 p-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mb-6">
              <Link
                href="/login"
                className={`flex-1 py-3 rounded-xl font-semibold transition-all text-center ${
                  isLogin ? 'bg-white text-purple-700 shadow-lg' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`flex-1 py-3 rounded-xl font-semibold transition-all text-center ${
                  !isLogin ? 'bg-white text-purple-700 shadow-lg' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register
              </Link>
            </div>

            {/* Error / Success banners */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-5"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-red-700">{errorMsg}</p>
                </motion.div>
              )}
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-3 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl mb-5"
                >
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-emerald-700">{successMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* User type selector — register only */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <label className="text-sm font-bold text-slate-900 mb-3 block">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['customer', 'provider'] as const).map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setUserType(type)}
                        className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                          userType === type
                            ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg shadow-purple-500/30'
                            : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                        }`}
                      >
                        {type === 'customer' ? (
                          <User className={`w-8 h-8 ${userType === type ? 'text-purple-600' : 'text-slate-600'}`} />
                        ) : (
                          <MapPin className={`w-8 h-8 ${userType === type ? 'text-purple-600' : 'text-slate-600'}`} />
                        )}
                        <span className="font-bold text-slate-900 capitalize">{type}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Full name — register only */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="text-sm font-bold text-slate-900 mb-2 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        ref={fullNameRef}
                        type="text"
                        placeholder="Rajan Kumar"
                        autoComplete="name"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <label className="text-sm font-bold text-slate-900 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white"
                  />
                </div>
              </div>

              {/* Phone — register only */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="text-sm font-bold text-slate-900 mb-2 block">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        ref={phoneRef}
                        type="tel"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password */}
              <div>
                <label className="text-sm font-bold text-slate-900 mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="••••••••"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                    minLength={8}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white"
                  />
                </div>
                {!isLogin && (
                  <p className="text-xs text-slate-500 mt-1 ml-1">Minimum 8 characters.</p>
                )}
              </div>

              {/* Forgot password — login only */}
              {isLogin && (
                <div className="flex items-center justify-end text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-purple-600 hover:text-pink-600 font-semibold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Provider info block — register only */}
            <AnimatePresence>
              {!isLogin && userType === 'provider' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300"
                >
                  <p className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    After registration you will:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Complete your business profile',
                      'Upload KYC documents',
                      'Wait for admin approval (24-48 hours)',
                      'Pay the one-time registration fee',
                      'Go live and start accepting bookings',
                    ].map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2 text-sm text-purple-900"
                      >
                        <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
