'use client'

import { Check, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

const steps = ['Select Service', 'Date & Time', 'Confirm Details', 'Confirmation']

export function BookingFlowClient({ providerId }: { providerId: string }) {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // System & UI State
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Database State
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [providerName, setProviderName] = useState<string>('')
  const [services, setServices] = useState<any[]>([])

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  
  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

  // Handle UI Transition animations
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [currentStep])

  // Fetch Real Data from Supabase
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')

      const { data: cust } = await supabase.from('customer_profiles').select('id').eq('user_id', user.id).single()
      if (cust) setCustomerId(cust.id)

      const [provRes, servRes] = await Promise.all([
        supabase.from('provider_profiles').select('full_name').eq('id', providerId).single(),
        supabase.from('provider_services').select('id, min_price, service_categories(name)').eq('provider_id', providerId)
      ])

      if (provRes.data) setProviderName(provRes.data.full_name)
      if (servRes.data) setServices(servRes.data)
      setLoading(false)
    }
    loadData()
  }, [providerId, supabase, router])

  // Submit to Database
  const submitBooking = async () => {
    setSubmitting(true)
    setError(null)

    // Calculate exactly 24 hours for expiry as per your DB schema
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    const [hours, minutes] = selectedTime.split(':')
    const slotEnd = `${String(Number(hours) + 1).padStart(2, '0')}:${minutes}:00`
    const slotStart = `${selectedTime}:00`

    const { error: dbError } = await supabase.from('bookings').insert({
      customer_id: customerId,
      provider_id: providerId,
      service_id: selectedServiceId,
      booking_date: selectedDate,
      slot_start: slotStart,
      slot_end: slotEnd,
      status: 'pending',
      expires_at: expiresAt
    })

    setSubmitting(false)

    if (dbError) {
      if (dbError.code === '23505') setError("You already have a pending booking with this provider.")
      else setError(dbError.message)
    } else {
      setCurrentStep(3) // Move to final success step
    }
  }

  const handleNext = () => {
    if (currentStep === 2) {
      submitBooking()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1)

  const selectedServiceName = services.find(s => s.id === selectedServiceId)?.service_categories?.name

  if (loading) return <div className="min-h-screen bg-[#fafafa] flex items-center justify-center font-black text-slate-300 tracking-widest">INITIALIZING PROTOCOLS...</div>

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-4">
        
        {providerName && (
          <p className="text-center text-sm text-slate-500 mb-4 font-medium uppercase tracking-widest">
            Booking with <span className="text-fuchsia-600 font-black">{providerName}</span>
          </p>
        )}

        {/* Progress Bar (Your original UI) */}
        <div className="mb-12 px-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-slate-100 -z-10 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 transition-all duration-1000 ease-in-out rounded-full"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-xl ${currentStep > index ? 'bg-indigo-600 rotate-[360deg]' : currentStep === index ? 'bg-fuchsia-600 scale-125 shadow-fuchsia-200' : 'bg-white border-2 border-slate-100 text-slate-300'}`}>
                  {currentStep > index ? <Check className="w-6 h-6 text-white" /> : <span className="font-black">{index + 1}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className={`bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-50 p-8 md:p-12 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="min-h-[400px]">
            
            {error && (
              <div className="mb-8 bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl font-bold flex items-center gap-3">
                <AlertCircle className="w-5 h-5" /> {error}
              </div>
            )}

            {/* STEP 1: DYNAMIC SERVICES */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Service Selection</h3>
                {services.length === 0 ? (
                  <p className="text-slate-500">This provider has no listed services.</p>
                ) : (
                  services.map((svc, i) => (
                    <div
                      key={svc.id}
                      onClick={() => setSelectedServiceId(svc.id)}
                      style={{ transitionDelay: `${i * 100}ms` }}
                      className={`p-6 border-2 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} ${selectedServiceId === svc.id ? 'border-fuchsia-500 bg-fuchsia-50/50 shadow-lg shadow-fuchsia-100' : 'border-slate-50 hover:border-fuchsia-200 bg-slate-50/30'}`}
                    >
                      <div className="flex justify-between items-center font-black">
                        <span>{svc.service_categories?.name}</span>
                        <span className="text-fuchsia-600 text-xl">₹{svc.min_price}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* STEP 2: DYNAMIC TIME & DATE */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black uppercase tracking-tight">Time Synchronization</h3>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-5 bg-slate-900 text-white rounded-3xl font-black focus:ring-4 ring-fuchsia-500/20 outline-none transition-all cursor-pointer"
                />
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-4 border-2 rounded-2xl font-black transition-all ${selectedTime === t ? 'bg-fuchsia-600 border-fuchsia-600 text-white shadow-lg shadow-fuchsia-200' : 'bg-white border-slate-100 hover:border-fuchsia-500 hover:text-fuchsia-600'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRM DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight">Confirm Details</h3>
                <p className="text-slate-600 font-medium">Review your selection before dispatching the request to the provider.</p>
                <ul className="space-y-4 text-slate-800 font-semibold border-2 border-slate-100 rounded-[2rem] p-8 bg-slate-50/40">
                  <li className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-400 uppercase tracking-widest text-xs">Service</span> 
                    <span>{selectedServiceName}</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-400 uppercase tracking-widest text-xs">Date</span> 
                    <span>{selectedDate || 'Not selected'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400 uppercase tracking-widest text-xs">Time Window</span> 
                    <span>{selectedTime || 'Not selected'}</span>
                  </li>
                </ul>
              </div>
            )}

            {/* STEP 4: SUCCESS */}
            {currentStep === 3 && (
              <div className="text-center py-10">
                <div className="w-24 h-24 bg-fuchsia-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 animate-bounce shadow-2xl shadow-fuchsia-300">
                  <Check className="w-12 h-12 text-white stroke-[4px]" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter">REQUEST SENT</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Waiting for provider approval</p>
                <button 
                  onClick={() => router.push('/bookings')}
                  className="mt-12 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-800 transition-colors"
                >
                  View My Bookings
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 3 && (
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-50">
              <button
                type="button"
                onClick={prevStep}
                className={`font-black uppercase text-xs tracking-widest transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-300 hover:text-fuchsia-600'}`}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={(currentStep === 0 && !selectedServiceId) || (currentStep === 1 && (!selectedDate || !selectedTime)) || submitting}
                className="px-10 py-5 bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-fuchsia-200 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {submitting ? 'SYNCING...' : currentStep === 2 ? 'Initiate' : 'Next Phase'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}