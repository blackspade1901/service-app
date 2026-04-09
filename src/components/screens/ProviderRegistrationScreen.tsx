import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Briefcase, Mail, Phone, MapPin, 
  ArrowRight, ArrowLeft, Upload, Check, 
  Sparkles, ShieldCheck, DollarSign, Image as ImageIcon,
  FileText
} from 'lucide-react';

const servicesList = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'HVAC', 'Cleaning'];

export function ProviderRegistrationScreen() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))] bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 py-8 md:py-12 px-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30"
          >
            <Briefcase className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">Become a Provider</h1>
          <p className="text-slate-600 font-medium text-lg">Join the platform and grow your business.</p>
        </div>

        {/* Stepper Progress */}
        <div className="mb-12 relative px-4 md:px-8">
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1.5 bg-purple-100 rounded-full -z-10" />
          <div 
            className="absolute left-10 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full -z-10 transition-all duration-500"
            style={{ width: `calc(${((Math.min(step, 3) - 1) / 2) * 100}% - 2.5rem)` }}
          />
          <div className="flex justify-between relative">
            {[
              { num: 1, label: 'Info' },
              { num: 2, label: 'Services' },
              { num: 3, label: 'Docs' }
            ].map((item) => (
              <div key={item.num} className="flex flex-col items-center gap-2">
                <div className={`
                  w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500
                  ${step > item.num ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 
                    step === item.num ? 'bg-white border-2 border-purple-500 text-purple-600 scale-110 shadow-lg shadow-purple-500/20' : 
                    'bg-white border-2 border-purple-100 text-purple-300'}
                `}>
                  {step > item.num ? <Check className="w-5 h-5" /> : item.num}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${step >= item.num ? 'text-purple-900' : 'text-purple-300'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border-2 border-purple-200 overflow-hidden relative"
        >
          <div className="p-6 md:p-10 min-h-[450px]">
            <AnimatePresence mode="wait">
              {/* STEP 1: Personal & Business Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Personal & Business Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Business Name</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input type="text" placeholder="Doe Services LLC" className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input type="email" placeholder="contact@example.com" className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input type="tel" placeholder="+1 (555) 000-0000" className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Business Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input type="text" placeholder="123 Main St, City, State" className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Services & Pricing */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    Services Offered
                  </h2>
                  <p className="text-sm text-slate-500 font-medium mb-6">Select the services you provide to customers.</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {servicesList.map(service => (
                      <motion.button
                        key={service}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleService(service)}
                        className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all text-left ${
                          selectedServices.includes(service)
                            ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-500 text-purple-700 shadow-md shadow-purple-500/20'
                            : 'bg-white border-purple-100 text-slate-600 hover:border-purple-300 hover:bg-purple-50/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{service}</span>
                          {selectedServices.includes(service) && <Check className="w-4 h-4 text-purple-600" />}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="pt-4">
                    <label className="text-sm font-bold text-slate-900 mb-2 block">Minimum Hourly Charge (Optional)</label>
                    <div className="relative max-w-xs">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                      <input type="number" placeholder="50.00" className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Documents */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-purple-500" />
                    Document Verification
                  </h2>
                  <p className="text-sm text-slate-500 font-medium mb-6">Upload required documents to verify your business.</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-purple-300 rounded-2xl p-6 bg-purple-50/50 hover:bg-purple-50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6 text-purple-500" />
                      </div>
                      <p className="font-bold text-slate-900 text-sm">Government ID *</p>
                      <p className="text-xs text-slate-500 mt-1">Click to browse or drag file</p>
                    </div>
                    <div className="border-2 border-dashed border-purple-300 rounded-2xl p-6 bg-purple-50/50 hover:bg-purple-50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-6 h-6 text-purple-500" />
                      </div>
                      <p className="font-bold text-slate-900 text-sm">Business License *</p>
                      <p className="text-xs text-slate-500 mt-1">Click to browse or drag file</p>
                    </div>
                    <div className="border-2 border-dashed border-purple-300 rounded-2xl p-6 bg-purple-50/50 hover:bg-purple-50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group md:col-span-2">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-6 h-6 text-purple-500" />
                      </div>
                      <p className="font-bold text-slate-900 text-sm">Work Portfolio Photos (Optional)</p>
                      <p className="text-xs text-slate-500 mt-1">Showcase your previous projects</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[300px] space-y-4"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/30">
                    <Check className="w-12 h-12 text-white stroke-[3px]" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Application Submitted!</h2>
                  <p className="text-slate-600 font-medium max-w-md mx-auto">
                    Thank you for applying. Our admin team will review your documents and you will receive an update within 24-48 hours.
                  </p>
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-center gap-3">
                    <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <span className="text-sm font-bold text-yellow-800 text-left">Status: Pending Verification</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form Navigation */}
          {step < 4 && (
            <div className="bg-slate-50/50 p-6 border-t border-purple-100 flex items-center justify-between">
              <motion.button
                whileHover={{ scale: step > 1 ? 1.05 : 1 }}
                whileTap={{ scale: step > 1 ? 0.95 : 1 }}
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  step === 1 
                    ? 'opacity-50 cursor-not-allowed text-slate-400 bg-slate-100' 
                    : 'bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                {step === 3 ? 'Submit Application' : 'Next Step'}
                {step < 3 && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
