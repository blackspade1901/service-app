'use client'

import {
  MapPin, Star, DollarSign, Filter, Wrench, Zap, Droplet,
  Hammer, Car, Home as HomeIcon, Paintbrush, Wind, X, Check, Sparkles, Users
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedSection } from '../AnimatedSection';

const mockProviders = [
  { id: 1, name: 'John Smith', service: 'Plumber', rating: 4.8, reviews: 124, price: 50, distance: '0.5 mi', available: true, lat: 40.7580, lng: -73.9855 },
  { id: 2, name: 'Sarah Johnson', service: 'Electrician', rating: 4.9, reviews: 98, price: 60, distance: '0.8 mi', available: true, lat: 40.7614, lng: -73.9776 },
  { id: 3, name: 'Mike Williams', service: 'Cleaner', rating: 4.7, reviews: 156, price: 40, distance: '1.2 mi', available: false, lat: 40.7489, lng: -73.9680 },
  { id: 4, name: 'Emily Davis', service: 'Carpenter', rating: 4.9, reviews: 87, price: 55, distance: '1.5 mi', available: true, lat: 40.7589, lng: -73.9851 },
  { id: 5, name: 'James Brown', service: 'Painter', rating: 4.6, reviews: 203, price: 45, distance: '2.1 mi', available: true, lat: 40.7478, lng: -73.9878 },
];

const serviceCategories = [
  { icon: Droplet, name: 'Plumber', color: 'from-cyan-500 to-blue-500', bgColor: 'bg-gradient-to-br from-cyan-100 to-blue-100', textColor: 'text-cyan-700' },
  { icon: Zap, name: 'Electrician', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100', textColor: 'text-yellow-700' },
  { icon: HomeIcon, name: 'Cleaner', color: 'from-green-500 to-emerald-500', bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100', textColor: 'text-green-700' },
  { icon: Hammer, name: 'Carpenter', color: 'from-orange-500 to-red-500', bgColor: 'bg-gradient-to-br from-orange-100 to-red-100', textColor: 'text-orange-700' },
  { icon: Paintbrush, name: 'Painter', color: 'from-purple-500 to-pink-500', bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100', textColor: 'text-purple-700' },
  { icon: Wind, name: 'HVAC', color: 'from-cyan-500 to-sky-500', bgColor: 'bg-gradient-to-br from-cyan-100 to-sky-100', textColor: 'text-cyan-700' },
  { icon: Car, name: 'Mechanic', color: 'from-red-500 to-rose-500', bgColor: 'bg-gradient-to-br from-red-100 to-rose-100', textColor: 'text-red-700' },
  { icon: Wrench, name: 'Handyman', color: 'from-indigo-500 to-purple-500', bgColor: 'bg-gradient-to-br from-indigo-100 to-purple-100', textColor: 'text-indigo-700' },
];

export function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row relative overflow-hidden">
      {/* Left Sidebar - Filters */}
      <div className={`
        ${showFilters ? 'flex' : 'hidden'} md:flex
        fixed md:relative z-40 inset-0 md:inset-auto
        w-full md:w-80 lg:w-[22rem] bg-white/95 md:bg-white backdrop-blur-xl md:border-r border-purple-200
        flex-col overflow-hidden shadow-2xl md:shadow-none
      `}>
        {/* Mobile Overlay Close */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden absolute inset-0 bg-black/40 -z-10"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Filters Container */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col h-full bg-white md:bg-transparent relative z-10 w-full"
        >
          {/* Filter Header */}
          <div className="p-4 md:p-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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

            {/* Service Categories */}
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
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg shadow-purple-500/20'
                        : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50/50'
                      }
                    `}
                  >
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${service.color}`}>
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${service.textColor}`}>{service.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Distance Slider */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 space-y-3"
            >
              <label className="text-sm font-semibold text-slate-700">Distance Radius</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="10"
                  defaultValue="5"
                  className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <span className="text-sm text-purple-700 font-semibold w-16">5 miles</span>
              </div>
            </motion.div>

            {/* Rating Filter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 space-y-3"
            >
              <label className="text-sm font-semibold text-slate-700">Minimum Rating</label>
              <div className="flex gap-2">
                {[4, 4.5, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl border-2 border-purple-200 hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all hover:shadow-lg"
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-slate-700">{rating}+</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 space-y-3"
            >
              <label className="text-sm font-semibold text-slate-700">Availability</label>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-500 text-emerald-700 font-medium shadow-md shadow-emerald-500/20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-500"
                  />
                  <span className="text-sm">Available Now</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl border-2 border-purple-200 text-slate-600 hover:border-purple-400 hover:bg-purple-50 transition-all"
                >
                  <span className="text-sm font-medium">All</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Price Range */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 space-y-3"
            >
              <label className="text-sm font-semibold text-slate-700">Price Range</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border-2 border-purple-200 rounded-xl text-sm focus:border-purple-500 focus:outline-none transition-colors focus:shadow-lg focus:shadow-purple-500/20"
                />
                <span className="text-purple-400 font-medium">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border-2 border-purple-200 rounded-xl text-sm focus:border-purple-500 focus:outline-none transition-colors focus:shadow-lg focus:shadow-purple-500/20"
                />
              </div>
            </motion.div>

            {/* Apply Filters Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-6 pt-6 border-t-2 border-purple-200 flex gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-3 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 rounded-xl font-bold hover:from-slate-200 hover:to-slate-300 transition-all shadow-md"
              >
                Reset
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Check className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Apply Filters</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Center - Map Area */}
      <div className="h-[40vh] md:h-auto md:flex-1 relative bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 overflow-hidden border-b md:border-b-0 border-purple-200">
        {/* Mock Map with Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgb(168 85 247 / 0.2) 1px, transparent 1px),
                               linear-gradient(to bottom, rgb(236 72 153 / 0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Map Center Label */}
        <AnimatedSection delay={0.3} animation="scale" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-3" />
          </motion.div>
          <p className="text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Interactive Map View</p>
          <p className="text-sm text-slate-600 mt-1">Provider locations shown as pins</p>
        </AnimatedSection>

        {/* Provider Pins */}
        {mockProviders.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.3, zIndex: 50 }}
            className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            style={{
              top: `${40 + index * 10}%`,
              left: `${35 + index * 12}%`,
            }}
          >
            <motion.div
              animate={{
                boxShadow: provider.available
                  ? ['0 0 0 0 rgba(16, 185, 129, 0.4)', '0 0 0 20px rgba(16, 185, 129, 0)']
                  : 'none',
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`
                w-12 h-12 rounded-full shadow-xl flex items-center justify-center
                transition-all
                ${provider.available
                  ? 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-500/50'
                  : 'bg-gradient-to-br from-slate-400 to-slate-500'}
              `}
            >
              <MapPin className="w-6 h-6 text-white" />
            </motion.div>

            {/* Hover Card */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              whileHover={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 transition-all pointer-events-none"
            >
              <div className="bg-white rounded-xl shadow-2xl p-3 whitespace-nowrap border-2 border-purple-200">
                <p className="font-bold text-sm text-slate-900">{provider.name}</p>
                <p className="text-xs text-slate-600">{provider.service}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-slate-700">{provider.rating}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Filter Toggle Button (Mobile) */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border-2 border-purple-300 hover:shadow-purple-500/30 transition-all z-20"
        >
          <Filter className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-700">Filters</span>
        </motion.button>

        {/* Legend */}
        <AnimatedSection
          delay={0.8}
          animation="slideLeft"
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border-2 border-purple-200"
        >
          <p className="text-xs font-bold text-purple-700 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Legend
          </p>
          <div className="space-y-2">
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50"
              />
              <span className="text-xs font-medium text-slate-700">Available</span>
            </motion.div>
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-xs font-medium text-slate-700">Busy</span>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>

      {/* Right Sidebar - Provider List */}
      <div className="flex-1 md:flex-none flex flex-col w-full md:w-80 lg:w-[26rem] h-auto md:h-full bg-gradient-to-br from-slate-50 to-purple-50/30 md:border-l border-purple-200 z-20 relative overflow-hidden">
        <div className="p-4 md:p-6 border-b border-purple-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            {mockProviders.length} Providers Nearby
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-4">
          {mockProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white border-2 border-purple-200 rounded-2xl p-4 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 flex-shrink-0 shadow-lg shadow-purple-500/30"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900">{provider.name}</h4>
                      <p className="text-sm text-slate-600">{provider.service}</p>
                    </div>
                    <motion.div
                      animate={{ scale: provider.available ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`
                        w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1
                        ${provider.available ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-slate-300'}
                      `}
                    />
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-slate-700">{provider.rating}</span>
                    <span className="text-sm text-slate-500">({provider.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-emerald-700">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-bold">${provider.price}/hr</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{provider.distance}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:from-slate-200 hover:to-slate-300 transition-all shadow-md"
                    >
                      View Profile
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
