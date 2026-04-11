'use client'

import { 
  Power, Calendar, Clock, Check, X, DollarSign, 
  TrendingUp, Users, Star, Settings, Bell, MessageSquare
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

const mockRequests = [
  { id: 1, customer: 'Alice Johnson', service: 'Emergency Repair', date: '2026-02-08', time: '10:00 AM', price: 120, distance: '0.8 mi' },
  { id: 2, customer: 'Bob Smith', service: 'Installation', date: '2026-02-09', time: '2:00 PM', price: 180, distance: '1.2 mi' },
  { id: 3, customer: 'Carol White', service: 'Maintenance', date: '2026-02-10', time: '9:00 AM', price: 90, distance: '2.1 mi' },
];

const todaySchedule = [
  { id: 1, customer: 'David Brown', service: 'Inspection', time: '11:00 AM - 12:00 PM', address: '123 Main St', status: 'in-progress' },
  { id: 2, customer: 'Emma Wilson', service: 'Repair', time: '2:00 PM - 4:00 PM', address: '456 Oak Ave', status: 'upcoming' },
  { id: 3, customer: 'Frank Miller', service: 'Consultation', time: '5:00 PM - 6:00 PM', address: '789 Pine Rd', status: 'upcoming' },
];

export function ProviderDashboardClient() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 py-6">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        
        {/* Header - Animated Entry */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-card/50 backdrop-blur-md rounded-2xl shadow-xl border border-border p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Provider Dashboard
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Star className="w-4 h-4 text-secondary fill-secondary" />
                John's Plumbing Services
              </p>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-2xl border border-border">
              <div className="text-right pl-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Status</p>
                <p className={`text-sm font-bold ${isAvailable ? 'text-primary' : 'text-muted-foreground'}`}>
                  {isAvailable ? 'ACTIVE' : 'OFFLINE'}
                </p>
              </div>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className={`
                  relative w-14 h-7 rounded-full transition-all duration-300 ease-in-out
                  ${isAvailable ? 'bg-primary shadow-[0_0_15px_rgba(124,58,237,0.5)]' : 'bg-switch-background'}
                `}
              >
                <div className={`
                  absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 flex items-center justify-center shadow-sm
                  ${isAvailable ? 'translate-x-7' : 'translate-x-0'}
                `}>
                  <Power className={`w-3 h-3 ${isAvailable ? 'text-primary' : 'text-slate-400'}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Today's Jobs", val: "3", icon: Calendar, color: "from-purple-500/10 to-purple-500/20", text: "text-primary" },
              { label: "Earnings", val: "$390", icon: DollarSign, color: "from-pink-500/10 to-pink-500/20", text: "text-secondary" },
              { label: "Requests", val: "3", icon: Bell, color: "from-cyan-500/10 to-cyan-500/20", text: "text-accent" },
              { label: "Rating", val: "4.8", icon: Star, color: "from-amber-500/10 to-amber-500/20", text: "text-amber-500" }
            ].map((stat, i) => (
              <div key={i} className={`bg-gradient-to-br ${stat.color} border border-white/10 rounded-xl p-4 hover:scale-105 transition-transform cursor-default`}>
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`w-4 h-4 ${stat.text}`} />
                  <p className="text-xs font-bold uppercase text-muted-foreground">{stat.label}</p>
                </div>
                <p className={`text-2xl font-black ${stat.text}`}>{stat.val}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Booking Requests */}
            <motion.section
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0 }}
              className="bg-card/50 backdrop-blur-md rounded-2xl shadow-lg border border-border p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MessageSquare className="text-primary w-5 h-5" /> 
                  Requests
                </h2>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold border border-secondary/20 animate-pulse">
                  {mockRequests.length} NEW
                </span>
              </div>

              <div className="space-y-4">
                {mockRequests.map((request, idx) => (
                  <div
                    key={request.id}
                    className="group relative overflow-hidden bg-muted/30 border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary p-[2px]">
                           <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center font-bold text-primary">
                             {request.customer[0]}
                           </div>
                        </div>
                        <div>
                          <h3 className="font-bold">{request.customer}</h3>
                          <p className="text-xs text-muted-foreground">{request.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-primary">${request.price}</p>
                        <p className="text-[10px] text-accent font-bold tracking-tighter">📍 {request.distance} AWAY</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-bold hover:bg-destructive/10 hover:text-destructive transition-colors border border-transparent hover:border-destructive/20">
                        DECLINE
                      </button>
                      <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                        ACCEPT JOB
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Today's Schedule */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
              className="bg-card/50 backdrop-blur-md rounded-2xl shadow-lg border border-border p-6"
            >
              <h2 className="text-xl font-bold mb-6">Active Schedule</h2>
              <div className="space-y-4">
                {todaySchedule.map((job) => (
                  <div key={job.id} className="relative pl-6 border-l-2 border-dashed border-primary/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-card border-2 border-primary" />
                    <div className={`rounded-xl p-4 transition-all ${job.status === 'in-progress' ? 'bg-primary/5 border border-primary/20 shadow-inner' : 'bg-muted/20 border border-transparent'}`}>
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-xs font-black uppercase text-primary/60">{job.time}</span>
                         {job.status === 'in-progress' && (
                           <span className="flex items-center gap-1 text-[10px] font-bold text-primary animate-pulse">
                             <span className="w-1.5 h-1.5 rounded-full bg-primary" /> LIVE
                           </span>
                         )}
                       </div>
                       <h3 className="font-bold text-foreground">{job.customer} — {job.service}</h3>
                       <p className="text-xs text-muted-foreground mb-3">{job.address}</p>
                       {job.status === 'in-progress' && (
                         <button className="w-full py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all active:scale-95">
                           FINISH & INVOICE
                         </button>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings Card */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-secondary rounded-2xl p-6 text-white shadow-xl shadow-primary/20">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 opacity-80" />
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">WEEKLY VIEW</span>
                </div>
                <p className="text-sm opacity-80 font-medium">Earnings</p>
                <p className="text-4xl font-black mb-6">$1,850</p>
                
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="opacity-70">Jobs Done</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="opacity-70">Efficiency</span>
                    <span className="font-bold text-accent">98%</span>
                  </div>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </section>

            {/* Profile Progress */}
            <section className="bg-card/50 backdrop-blur-md rounded-2xl shadow-lg border border-border p-6">
              <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-muted-foreground">Profile Status</h3>
              <div className="space-y-4">
                <div className="relative h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out" 
                    style={{ width: '85%' }} 
                  />
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs font-bold text-primary">85% Complete</span>
                   <button className="text-[10px] font-black text-secondary hover:underline">FINISH NOW</button>
                </div>
              </div>
            </section>

            {/* Quick Actions List */}
            <section className="bg-card/50 backdrop-blur-md rounded-2xl shadow-lg border border-border p-4">
               <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Settings, label: "Rates" },
                    { icon: Calendar, label: "Schedule" },
                    { icon: MessageSquare, label: "Chat" },
                    { icon: Users, label: "Reviews" }
                  ].map((item, i) => (
                    <button key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-muted/40 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all group">
                      <item.icon className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
                    </button>
                  ))}
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}