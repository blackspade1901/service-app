'use client'
import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AuthScreenClient({ variant }: { variant: 'login' | 'register' }) {
  const isLogin = variant === 'login';
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 flex items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 p-8 text-white text-center relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold relative z-10">
                {isLogin ? 'Welcome Back' : 'Join LocalServe'}
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-purple-100 relative z-10"
            >
              {isLogin
                ? 'Sign in to continue'
                : 'Create your account to get started'
              }
            </motion.p>
          </motion.div>

          {/* Toggle Login/Register */}
          <div className="p-6 md:p-8">
            <div className="flex gap-2 p-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mb-6">
              <Link
                href="/login"
                className={`
                  flex-1 py-3 rounded-xl font-semibold transition-all relative overflow-hidden text-center
                  ${isLogin
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                {isLogin && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl"
                  />
                )}
                <span className="relative z-10">Login</span>
              </Link>
              <Link
                href="/register"
                className={`
                  flex-1 py-3 rounded-xl font-semibold transition-all relative overflow-hidden text-center
                  ${!isLogin
                    ? 'bg-white text-purple-700 shadow-lg'
                    : 'text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                {!isLogin && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl"
                  />
                )}
                <span className="relative z-10">Register</span>
              </Link>
            </div>

            {/* User Type Selection (Register Only) */}
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <label className="text-sm font-bold text-slate-900 mb-3 block">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUserType('customer')}
                      className={`
                        flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all
                        ${userType === 'customer'
                          ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg shadow-purple-500/30'
                          : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                        }
                      `}
                    >
                      <User className={`w-8 h-8 ${userType === 'customer' ? 'text-purple-600' : 'text-slate-600'}`} />
                      <span className="font-bold text-slate-900">Customer</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUserType('provider')}
                      className={`
                        flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all
                        ${userType === 'provider'
                          ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg shadow-purple-500/30'
                          : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                        }
                      `}
                    >
                      <MapPin className={`w-8 h-8 ${userType === 'provider' ? 'text-purple-600' : 'text-slate-600'}`} />
                      <span className="font-bold text-slate-900">Provider</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-5"
            >
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="text-sm font-bold text-slate-900 mb-2 block">
                      Full Name
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-sm font-bold text-slate-900 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="text-sm font-bold text-slate-900 mb-2 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-sm font-bold text-slate-900 mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-slate-700 font-medium group-hover:text-purple-600 transition-colors">Remember me</span>
                  </label>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="#"
                    className="text-purple-600 hover:text-pink-600 font-semibold transition-colors"
                  >
                    Forgot password?
                  </motion.a>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group mt-6 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative z-10">{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>
            </motion.form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-purple-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-slate-600 font-semibold">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all hover:shadow-lg"
              >
                <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded" />
                <span className="font-bold text-slate-900">Google</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all hover:shadow-lg"
              >
                <div className="w-5 h-5 bg-gradient-to-br from-slate-900 to-slate-700 rounded" />
                <span className="font-bold text-slate-900">Apple</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Additional Info for Providers */}
        <AnimatePresence>
          {!isLogin && userType === 'provider' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300 backdrop-blur-xl"
            >
              <p className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Next Steps After Registration:
              </p>
              <ul className="space-y-2">
                {[
                  'Complete your business profile',
                  'Upload verification documents',
                  'Wait for admin approval (24-48 hours)',
                  'Start accepting bookings!'
                ].map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm text-purple-900"
                  >
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
