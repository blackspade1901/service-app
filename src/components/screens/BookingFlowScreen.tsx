import { Calendar, Clock, MapPin, DollarSign, Check, ChevronLeft, ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const steps = ['Select Service', 'Date & Time', 'Confirm Details', 'Confirmation'];

export function BookingFlowScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entry animation whenever the step changes
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const nextStep = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Progress Bar with Sliding Gradient */}
        <div className="mb-12 px-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-slate-100 -z-10 rounded-full">
              <div 
                className="height-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 transition-all duration-1000 ease-in-out rounded-full"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center group">
                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-xl
                  ${currentStep > index ? 'bg-indigo-600 rotate-[360deg]' : currentStep === index ? 'bg-fuchsia-600 scale-125 shadow-fuchsia-200' : 'bg-white border-2 border-slate-100 text-slate-300'}
                `}>
                  {currentStep > index ? <Check className="w-6 h-6 text-white" /> : <span className="font-black">{index + 1}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Animated Container */}
        <div className={`
          bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-50 p-8 md:p-12
          transition-all duration-700 ease-out transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          
          {/* Content Switcher */}
          <div className="min-h-[400px]">
            {currentStep === 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Protocol Selection</h3>
                {['Emergency Repair', 'Full Installation', 'System Check'].map((service, i) => (
                  <div 
                    key={service}
                    style={{ transitionDelay: `${i * 100}ms` }}
                    className={`p-6 border-2 rounded-[2rem] cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95
                      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                      border-slate-50 hover:border-fuchsia-400 bg-slate-50/30
                    `}
                  >
                    <div className="flex justify-between items-center font-black">
                      <span>{service}</span>
                      <span className="text-fuchsia-600 text-xl">$80+</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-black uppercase tracking-tight">Time Synchronization</h3>
                <input 
                  type="date" 
                  className="w-full p-5 bg-slate-900 text-white rounded-3xl font-black focus:ring-4 ring-fuchsia-500/20 outline-none transition-all" 
                />
                <div className="grid grid-cols-3 gap-3">
                  {['09:00', '12:00', '15:00'].map((t) => (
                    <button key={t} className="py-4 bg-white border-2 border-slate-100 rounded-2xl font-black hover:border-fuchsia-500 hover:text-fuchsia-600 transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center py-10">
                <div className="w-24 h-24 bg-fuchsia-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 animate-bounce shadow-2xl shadow-fuchsia-300">
                  <Check className="w-12 h-12 text-white stroke-[4px]" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter">DATA SYNCED</h2>
                <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Provider Dispatched</p>
              </div>
            )}
          </div>

          {/* Nav Buttons */}
          {currentStep < 3 && (
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-50">
              <button 
                onClick={prevStep} 
                className={`font-black uppercase text-xs tracking-widest transition-all ${currentStep === 0 ? 'opacity-0' : 'text-slate-300 hover:text-fuchsia-600'}`}
              >
                Back
              </button>
              <button 
                onClick={nextStep}
                className="px-10 py-5 bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-fuchsia-200 hover:-translate-y-1 active:scale-95 transition-all"
              >
                {currentStep === 2 ? 'Initiate' : 'Next Phase'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}