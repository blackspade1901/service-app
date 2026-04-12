'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  MapPin, Star, DollarSign, Filter, Wrench, Zap, Droplet,
  Hammer, Car, Home as HomeIcon, Paintbrush, Wind, X, Check, Sparkles, Users
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

// IMPORTANT: We dynamically import the map to prevent Next.js SSR crashes
// FIX: Pointing to the newly renamed LeafletMap file using standard Next.js syntax
const MapWithNoSSR = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-50">
      <MapPin className="w-12 h-12 text-purple-400 animate-bounce mb-4" />
      <p className="text-purple-600 font-medium">Loading map...</p>
    </div>
  )
});

export interface ProviderData {
  id: string
  full_name: string
  bio: string | null
  avg_rating: number | null
  strike_count: number
  is_live: boolean
  service_category: string | null
  min_price: number | null
  lat: number | null
  lng: number | null
}

interface HomePageClientProps {
  initialProviders?: ProviderData[]
}

const serviceCategories = [
  { icon: Droplet, name: 'Plumber', color: 'from-cyan-500 to-blue-500', bgColor: 'bg-linear-to-br from-cyan-100 to-blue-100', textColor: 'text-cyan-700' },
  { icon: Zap, name: 'Electrician', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-linear-to-br from-yellow-100 to-orange-100', textColor: 'text-yellow-700' },
  { icon: HomeIcon, name: 'Cleaner', color: 'from-green-500 to-emerald-500', bgColor: 'bg-linear-to-br from-green-100 to-emerald-100', textColor: 'text-green-700' },
  { icon: Hammer, name: 'Carpenter', color: 'from-orange-500 to-red-500', bgColor: 'bg-linear-to-br from-orange-100 to-red-100', textColor: 'text-orange-700' },
  { icon: Paintbrush, name: 'Painter', color: 'from-purple-500 to-pink-500', bgColor: 'bg-linear-to-br from-purple-100 to-pink-100', textColor: 'text-purple-700' },
  { icon: Wind, name: 'HVAC', color: 'from-cyan-500 to-sky-500', bgColor: 'bg-linear-to-br from-cyan-100 to-sky-100', textColor: 'text-cyan-700' },
  { icon: Car, name: 'Mechanic', color: 'from-red-500 to-rose-500', bgColor: 'bg-linear-to-br from-red-100 to-rose-100', textColor: 'text-red-700' },
  { icon: Wrench, name: 'Handyman', color: 'from-indigo-500 to-purple-500', bgColor: 'bg-linear-to-br from-indigo-100 to-purple-100', textColor: 'text-indigo-700' },
];

export function HomePageClient({ initialProviders = [] }: HomePageClientProps) {
  // Bypassing complex filters for now to ensure we see the data!
  const providers = initialProviders;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row relative overflow-hidden">

      {/* Left Sidebar - Filters (Unchanged) */}
      <div className={`
        ${showFilters ? 'flex' : 'hidden'} md:flex
        fixed md:relative z-40 inset-0 md:inset-auto
        w-full md:w-80 lg:w-88 bg-white/95 md:bg-white backdrop-blur-xl md:border-r border-purple-200
        flex-col overflow-hidden shadow-2xl md:shadow-none
      `}>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden absolute inset-0 bg-black/40 -z-10"
            onClick={() => setShowFilters(false)}
          />
        )}

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col h-full bg-white md:bg-transparent relative z-10 w-full"
        >
          <div className="p-4 md:p-6 bg-linear-to-br from-purple-50/50 to-pink-50/50 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg md:text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Filters
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFilters(false)}
                className="md:hidden p-2 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-purple-600" />
              </motion.button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Service Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {serviceCategories.map((service, index) => (
                  <motion.button
                    key={service.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(
                      selectedCategory === service.name ? null : service.name
                    )}
                    className={`
                      flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all
                      ${selectedCategory === service.name
                        ? 'border-purple-500 bg-linear-to-br from-purple-50 to-pink-50 shadow-lg shadow-purple-500/20'
                        : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50/50'
                      }
                    `}
                  >
                    <div className={`p-1.5 rounded-lg bg-linear-to-br ${service.color}`}>
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${service.textColor}`}>{service.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 space-y-3">
              <label className="text-sm font-semibold text-slate-700">Distance Radius</label>
              <div className="flex items-center gap-3">
                <input type="range" min="0" max="10" defaultValue="5" className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                <span className="text-sm text-purple-700 font-semibold w-16">5 miles</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 space-y-3">
              <label className="text-sm font-semibold text-slate-700">Minimum Rating</label>
              <div className="flex gap-2">
                {[4, 4.5, 5].map((rating) => (
                  <motion.button key={rating} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1 px-3 py-2 rounded-xl border-2 border-purple-200 hover:border-purple-500 hover:bg-linear-to-br hover:from-purple-50 hover:to-pink-50 transition-all hover:shadow-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">{rating}+</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-6 pt-6 border-t-2 border-purple-200 flex gap-3">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 px-4 py-3 bg-linear-to-br from-slate-100 to-slate-200 text-slate-700 rounded-xl font-bold hover:from-slate-200 hover:to-slate-300 transition-all shadow-md">
                Reset
              </motion.button>
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex-1 px-4 py-3 bg-linear-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 relative overflow-hidden group">
                <Check className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Apply Filters</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Center - REAL MAP AREA */}
      <div className="h-[40vh] md:h-auto md:flex-1 relative z-0">
        <MapWithNoSSR providers={providers} />

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border-2 border-purple-300 hover:shadow-purple-500/30 transition-all z-1000"
        >
          <Filter className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-700">Filters</span>
        </motion.button>
      </div>

      {/* Right Sidebar - Provider List (Unchanged) */}
      <div className="flex-1 md:flex-none flex flex-col w-full md:w-80 lg:w-104 h-auto md:h-full bg-linear-to-br from-slate-50 to-purple-50/30 md:border-l border-purple-200 z-20 relative overflow-hidden">
        <div className="p-4 md:p-6 border-b border-purple-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            {providers.length} Providers Nearby
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-4">
          {providers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-500 font-medium">No providers available in your area yet.</p>
              <p className="text-sm text-slate-400 mt-2">Check back soon!</p>
            </div>
          ) : (
            providers.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white border-2 border-purple-200 rounded-2xl p-4 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer"
              >
                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-400 via-pink-400 to-purple-500 shrink-0 shadow-lg shadow-purple-500/30 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white/50" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">{provider.full_name}</h4>
                        <p className="text-sm text-slate-600">{provider.service_category || 'Service Provider'}</p>
                      </div>
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${provider.is_live ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-slate-300'}`} />
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-slate-700">{provider.avg_rating?.toFixed(1) ?? 'N/A'}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-emerald-700">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm font-bold">₹{provider.min_price ?? '--'}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/provider/${provider.id}`}>
                        <button className="flex-1 px-3 py-2 bg-linear-to-br from-slate-100 to-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:from-slate-200 hover:to-slate-300 transition-all shadow-md">
                          View Profile
                        </button>
                      </Link>
                      <Link href={`/booking/${provider.id}`}>
                        <button className="flex-1 px-3 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}