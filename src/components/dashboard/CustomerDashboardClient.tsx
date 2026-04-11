'use client'

import {
  Calendar, Clock, Star, MapPin, User, Heart,
  MessageSquare, Settings, ChevronRight, TrendingUp, Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const mockBookings = [
  { id: 1, provider: 'John Smith', service: 'Plumber', date: '2026-02-08', time: '10:00 AM', status: 'confirmed', price: 120 },
  { id: 2, provider: 'Sarah Johnson', service: 'Electrician', date: '2026-02-10', time: '2:00 PM', status: 'pending', price: 180 },
];

const mockHistory = [
  { id: 1, provider: 'Mike Williams', service: 'Cleaner', date: '2026-01-28', rating: 5, price: 80 },
  { id: 2, provider: 'Emily Davis', service: 'Carpenter', date: '2026-01-20', rating: 4, price: 250 },
  { id: 3, provider: 'James Brown', service: 'Painter', date: '2026-01-15', rating: 5, price: 350 },
];

const mockFavorites = [
  { id: 1, name: 'John Smith', service: 'Plumber', rating: 4.8, reviews: 124 },
  { id: 2, name: 'Sarah Johnson', service: 'Electrician', rating: 4.9, reviews: 98 },
  { id: 3, name: 'Emily Davis', service: 'Carpenter', rating: 4.9, reviews: 87 },
];

export function CustomerDashboardClient() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <AnimatedSection animation="slideUp" className="mb-6 md:mb-8">
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-2xl shadow-purple-500/30 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2"
                >
                  <Sparkles className="w-8 h-8" />
                  Welcome back, Sarah!
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-purple-100 text-sm md:text-base"
                >
                  Manage your bookings and discover trusted local services
                </motion.p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="hidden md:flex w-20 h-20 bg-white/20 rounded-full items-center justify-center backdrop-blur-xl border-2 border-white/30"
              >
                <User className="w-10 h-10" />
              </motion.div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 relative z-10">
              {[
                { label: 'Active Bookings', value: '2', delay: 0 },
                { label: 'Completed', value: '12', delay: 0.1 },
                { label: 'Favorites', value: '5', delay: 0.2 },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.delay }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 md:p-4 border border-white/30 hover:bg-white/30 transition-all cursor-pointer"
                >
                  <p className="text-purple-100 text-xs md:text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Bookings */}
            <AnimatedSection animation="slideUp" delay={0.2}>
              <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-purple-200 p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    Active Bookings
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-purple-600 font-semibold hover:text-pink-600 transition-colors"
                  >
                    View All
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {mockBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="border-2 border-purple-200 rounded-2xl p-4 md:p-5 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4 gap-3">
                        <div className="flex gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex-shrink-0 shadow-lg shadow-purple-500/30"
                          />
                          <div>
                            <h3 className="font-bold text-slate-900 text-base md:text-lg">{booking.provider}</h3>
                            <p className="text-sm text-slate-600">{booking.service}</p>
                          </div>
                        </div>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                          className={`
                            px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap
                            ${booking.status === 'confirmed'
                              ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-300'
                              : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-2 border-yellow-300'
                            }
                          `}
                        >
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </motion.span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-4 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{booking.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ${booking.price}
                        </span>
                        <div className="flex gap-2 flex-1 md:flex-none">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 rounded-xl font-semibold hover:from-slate-200 hover:to-slate-300 transition-all shadow-md"
                          >
                            Reschedule
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                          >
                            Contact
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Booking History */}
            <AnimatedSection animation="slideUp" delay={0.3}>
              <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-purple-200 p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                    <Clock className="w-6 h-6 text-purple-600" />
                    Booking History
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-purple-600 font-semibold hover:text-pink-600 transition-colors"
                  >
                    View All
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {mockHistory.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="flex items-center justify-between p-4 border-2 border-purple-200 rounded-2xl hover:bg-purple-50/50 hover:border-purple-400 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900">{booking.provider}</h4>
                          <p className="text-sm text-slate-600">{booking.service} • {booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < booking.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-slate-900">${booking.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Providers */}
            <AnimatedSection animation="slideLeft" delay={0.2}>
              <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-purple-200 p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                    Favorite Providers
                  </h2>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                  </motion.div>
                </div>

                <div className="space-y-3">
                  {mockFavorites.map((provider, index) => (
                    <motion.div
                      key={provider.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 4 }}
                      className="flex items-center gap-3 p-3 border-2 border-purple-200 rounded-2xl hover:bg-purple-50/50 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex-shrink-0 shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">{provider.name}</h4>
                        <p className="text-xs text-slate-600">{provider.service}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-slate-700">{provider.rating}</span>
                          <span className="text-xs text-slate-500">({provider.reviews})</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-400" />
                    </motion.div>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Quick Actions */}
            <AnimatedSection animation="slideLeft" delay={0.3}>
              <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-purple-200 p-5 md:p-6">
                <h2 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  {[
                    { icon: MapPin, label: 'Find Services', color: 'from-purple-100 to-pink-100', textColor: 'text-purple-700' },
                    { icon: MessageSquare, label: 'Messages', color: 'from-cyan-100 to-blue-100', textColor: 'text-cyan-700' },
                    { icon: Settings, label: 'Settings', color: 'from-slate-100 to-slate-200', textColor: 'text-slate-700' },
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full flex items-center gap-3 p-3.5 bg-gradient-to-r ${action.color} ${action.textColor} rounded-2xl hover:shadow-lg transition-all font-semibold`}
                    >
                      <action.icon className="w-5 h-5" />
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection animation="slideLeft" delay={0.4}>
              <motion.section
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-purple-100 via-pink-100 to-cyan-100 rounded-3xl border-2 border-purple-300 p-5 md:p-6 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Your Activity</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Total Spent', value: '$1,240' },
                    { label: 'Avg. Rating Given', value: '4.7 ⭐' },
                    { label: 'Reviews Written', value: '8' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex justify-between p-3 bg-white/60 backdrop-blur-xl rounded-xl hover:bg-white/80 transition-all cursor-pointer"
                    >
                      <span className="text-slate-700 font-medium">{stat.label}</span>
                      <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
