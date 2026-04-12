'use client'

import {
  Star, MapPin, Phone, Mail, Calendar, DollarSign,
  Users, Clock, Shield, Award, MessageSquare, ChevronLeft,
  CheckCircle2, Info, Sparkles, Zap
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProviderData {
  id: string
  full_name: string
  bio: string | null
  avg_rating: number | null
  strike_count: number
  avg_response_hours: number | null
  kyc_status: string
  payment_status: string
  is_live: boolean
  cloudinary_photo_url: string | null
  address: string | null
  created_at: string
}

interface ServiceData {
  id: string
  category_name: string
  min_price: number
  max_price: number
  experience_years: number | null
}

interface ReviewData {
  id: string
  customer_name: string
  star_punctuality: number
  star_quality: number
  star_pricing: number
  star_behaviour: number
  review_text: string | null
  created_at: string
}

interface PortfolioPhoto {
  id: string
  cloudinary_url: string
  display_order: number
}

interface ProviderProfileClientProps {
  provider: ProviderData
  services: ServiceData[]
  reviews: ReviewData[]
  portfolio: PortfolioPhoto[]
}

const workingHours = [
  { day: 'Monday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Thursday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Friday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 3:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

export function ProviderProfileClient({ 
  provider, 
  services: initialServices, 
  reviews: initialReviews,
  portfolio 
}: ProviderProfileClientProps) {
  const router = useRouter()
  
  const services = initialServices.length > 0 ? initialServices : [
    { name: 'Emergency Repairs', price: 80, id: 's1' },
    { name: 'Installation', price: 60, id: 's2' },
    { name: 'Maintenance', price: 50, id: 's3' },
    { name: 'Inspection', price: 45, id: 's4' },
  ].map(s => ({ ...s, category_name: s.name, min_price: s.price, max_price: s.price + 20, experience_years: null, id: s.id }))
  
  const reviews = initialReviews.length > 0 ? initialReviews : [
    { id: '1', author: 'Alice Johnson', rating: 5, date: '2026-01-28', text: 'Excellent service! Very professional and completed the job ahead of schedule. Highly recommend!' },
    { id: '2', author: 'Bob Smith', rating: 5, date: '2026-01-22', text: 'Great work and fair pricing. Will definitely use again for future plumbing needs.' },
    { id: '3', author: 'Carol White', rating: 4, date: '2026-01-15', text: 'Good service overall. Arrived on time and fixed the issue quickly.' },
  ]

  const workPhotos = portfolio.length > 0 ? portfolio : [
    { id: '1', alt: 'Work sample 1' },
    { id: '2', alt: 'Work sample 2' },
    { id: '3', alt: 'Work sample 3' },
    { id: '4', alt: 'Work sample 4' },
    { id: '5', alt: 'Work sample 5' },
    { id: '6', alt: 'Work sample 6' },
  ]

  const avgRating = provider.avg_rating ? provider.avg_rating.toFixed(1) : 'New'
  const reviewCount = initialReviews.length
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section: Pink to Purple Gradient */}
      <div className="relative bg-gradient-to-br from-[#2e1065] via-[#701a75] to-[#be185d] text-white overflow-hidden">
        {/* Animated Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
        
        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-fuchsia-200 hover:text-white transition-colors mb-10 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-[0.2em]">Explore Professionals</span>
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-center md:items-end text-center md:text-left">
{/* Profile Avatar with Neon Ring */}
            <div className="relative group">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-[2.5rem] bg-slate-900 border-4 border-white/20 overflow-hidden shadow-[0_0_50px_-12px_rgba(232,121,249,0.5)] transition-all group-hover:rotate-3 group-hover:scale-105">
                  {provider.cloudinary_photo_url ? (
                    <img 
                      src={provider.cloudinary_photo_url} 
                      alt={provider.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-fuchsia-600 to-indigo-600 flex items-center justify-center">
                       <Users className="w-16 h-16 text-white/50" />
                    </div>
                  )}
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-2xl p-3 border-4 border-[#4c0519] shadow-xl">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
            </div>

            {/* Provider Details */}
            <div className="flex-1 space-y-5">
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-3">
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-100 to-pink-200">
                    {provider.full_name}
                  </h1>
                  <span className="px-4 py-1.5 bg-white text-fuchsia-700 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-lg">
                    {provider.is_live ? 'Live' : 'Pending'}
                  </span>
                </div>
                <p className="text-xl md:text-2xl text-fuchsia-100/80 font-semibold tracking-tight">
                  {provider.bio || services[0]?.category_name || 'Service Provider'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 py-2">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
                  <Star className="w-5 h-5 fill-fuchsia-400 text-fuchsia-400" />
                  <span className="font-black text-xl">{avgRating}</span>
                  <span className="text-fuchsia-200/60 text-sm font-bold">/ {reviewCount} reviews</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 font-medium">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span className="text-sm tracking-wide">
                    {provider.address || 'Location TBD'}
                    {provider.strike_count > 0 && ` • ${provider.strike_count} strike(s)`}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                <Link href={`/booking/${provider.id}`} className="flex items-center gap-3 px-10 py-4 bg-white text-fuchsia-900 hover:bg-fuchsia-50 rounded-2xl font-black transition-all shadow-xl hover:shadow-fuchsia-500/20 active:scale-95">
                  <Phone className="w-5 h-5 fill-fuchsia-900" />
                  Book Now
                </Link>
                <button className="flex items-center gap-3 px-10 py-4 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-white rounded-2xl font-black transition-all backdrop-blur-xl border-2 border-white/20">
                  <MessageSquare className="w-5 h-5" />
                  Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {/* Bio Card */}
            <section className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-fuchsia-500" />
                The Expertise
              </h2>
              <p className="text-slate-600 leading-relaxed text-xl relative z-10 font-medium">
                {provider.bio || `Professional service provider with expertise in ${services.map(s => s.category_name).join(', ')}.`}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                <StatCard icon={<Shield className="text-fuchsia-600" />} label="Security" value={provider.kyc_status === 'approved' ? 'Vetted' : 'Pending'} bg="bg-fuchsia-50" />
                <StatCard icon={<Award className="text-purple-600" />} label="Status" value={provider.payment_status === 'paid' ? 'Pro Plus' : 'Basic'} bg="bg-purple-50" />
                <StatCard icon={<Users className="text-pink-600" />} label="Support" value={provider.avg_response_hours ? `${provider.avg_response_hours}h` : '24/7 Team'} bg="bg-pink-50" />
                <StatCard icon={<Clock className="text-indigo-600" />} label="Strikes" value={String(provider.strike_count)} bg="bg-indigo-50" />
              </div>
            </section>

            {/* Gallery */}
            <section>
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recent Wins</h2>
                <button className="text-fuchsia-600 font-black text-sm uppercase tracking-widest hover:text-fuchsia-700">Explore Portfolio</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {workPhotos.map((photo: any) => (
                  <div key={photo.id} className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                    {photo.cloudinary_url ? (
                      <img 
                        src={photo.cloudinary_url} 
                        alt="Portfolio" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6 text-center">
                         <span className="text-white text-xs font-black uppercase tracking-[0.2em] scale-90 group-hover:scale-100 transition-transform">Project Focus</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black tracking-tight">Wall of Love</h2>
                <div className="bg-fuchsia-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Verified Only
                </div>
              </div>

              <div className="space-y-8">
                {reviews.map((review: any) => {
                  const avgStars = review.customer_name ? 
                    ((review.star_punctuality + review.star_quality + review.star_pricing + review.star_behaviour) / 4) : 
                    review.rating || 5
                  return (
                    <div key={review.id} className="group border-l-2 border-fuchsia-500/30 pl-8 py-2 hover:border-fuchsia-500 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-fuchsia-500/20">
                          {(review.customer_name || review.author || 'C').charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-lg">{review.customer_name || review.author || 'Customer'}</p>
                          <div className="flex items-center gap-1.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.round(avgStars) ? 'fill-fuchsia-400 text-fuchsia-400' : 'text-slate-700'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-400 text-lg italic leading-relaxed font-medium group-hover:text-slate-200 transition-colors">"{review.review_text || review.text || 'Great service!'}"</p>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          {/* Right Widget */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(192,38,211,0.15)] border border-fuchsia-100 p-10 sticky top-8">
              <div className="bg-fuchsia-50 w-fit p-3 rounded-2xl mb-6">
                <Zap className="w-6 h-6 text-fuchsia-600 fill-fuchsia-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Fast Book</h3>
              
              <div className="space-y-4 mb-10">
                {services.map((service: any) => (
                  <Link key={service.id} href={`/booking/${provider.id}`} className="relative flex items-center justify-between p-5 border-2 border-slate-50 rounded-[1.5rem] hover:border-fuchsia-200 cursor-pointer transition-all group">
                    <div className="flex items-center gap-4">
                      <span className="font-black text-slate-800 tracking-tight group-hover:text-fuchsia-700">{service.category_name || service.name}</span>
                    </div>
                    <span className="text-fuchsia-600 font-black text-lg">₹{service.min_price || service.price}</span>
                  </Link>
                ))}
              </div>

              <Link href={`/booking/${provider.id}`} className="block text-center w-full py-5 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white rounded-[1.5rem] font_black text-xl shadow-[0_15px_30px_-10px_rgba(192,38,211,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(192,38,211,0.6)] hover:-translate-y-1 transition-all active:translate-y-0">
                Claim Appointment
              </Link>

              <div className="mt-10 space-y-4">
                 <div className="flex items-center gap-4 text-slate-500 font-bold text-sm hover:text-fuchsia-600 cursor-pointer transition-colors">
                   <div className="p-3 bg-slate-50 rounded-xl"><Phone className="w-4 h-4" /></div>
                   <span>Secure Line: +1-555-SMTH</span>
                 </div>
                 <div className="flex items-center gap-4 text-slate-500 font-bold text-sm hover:text-fuchsia-600 cursor-pointer transition-colors">
                   <div className="p-3 bg-slate-50 rounded-xl"><Mail className="w-4 h-4" /></div>
                   <span>Verified: smith.pro@hq.com</span>
                 </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gradient-to-br from-fuchsia-900 to-indigo-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
                <Clock className="w-40 h-40" />
              </div>
              <h3 className="font-black text-2xl mb-8 tracking-tight">Availability</h3>
              <div className="space-y-4 relative z-10">
                {workingHours.map((schedule) => (
                  <div key={schedule.day} className="flex justify-between text-xs items-center group">
                    <span className="text-fuchsia-200/50 font-black uppercase tracking-widest group-hover:text-fuchsia-200 transition-colors">{schedule.day}</span>
                    <span className={`font-black tracking-tight ${schedule.hours === 'Closed' ? 'text-pink-400' : 'text-white'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode, label: string, value: string, bg: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-5 ${bg} rounded-3xl border border-white text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1`}>
      <div className="mb-3 p-3 bg-white rounded-2xl shadow-sm">{icon}</div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="font-black text-slate-900 text-sm">{value}</p>
    </div>
  );
}