'use client'

/**
 * Past bookings for the signed-in customer (list + detail cards).
 * Paired with the live dashboard at /customer; this route is history-only.
 */
import { Clock, Star, ChevronRight, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

const mockHistory = [
  { id: 1, provider: 'Mike Williams', service: 'Cleaner', date: '2026-01-28', rating: 5, price: 80 },
  { id: 2, provider: 'Emily Davis', service: 'Carpenter', date: '2026-01-20', rating: 4, price: 250 },
  { id: 3, provider: 'James Brown', service: 'Painter', date: '2026-01-15', rating: 5, price: 350 },
  { id: 4, provider: 'John Smith', service: 'Plumber', date: '2026-01-05', rating: 5, price: 140 },
  { id: 5, provider: 'Sarah Johnson', service: 'Electrician', date: '2025-12-18', rating: 4, price: 220 },
]

export function BookingHistoryClient() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp" className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-purple-600" />
                Booking history
              </h1>
              <p className="text-slate-600 mt-2">
                Completed and past appointments. For upcoming jobs, open your{' '}
                <Link href="/customer" className="text-purple-600 font-semibold hover:underline">
                  customer dashboard
                </Link>
                .
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.15}>
          <section className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-purple-200 p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-6 h-6 text-purple-600" />
                Past bookings
              </h2>
            </div>

            <div className="space-y-3">
              {mockHistory.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="flex items-center justify-between p-4 border-2 border-purple-200 rounded-2xl hover:bg-purple-50/50 hover:border-purple-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{booking.provider}</h4>
                      <p className="text-sm text-slate-600 truncate">
                        {booking.service} • {booking.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
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
                    <ChevronRight className="w-5 h-5 text-purple-400 hidden sm:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  )
}
