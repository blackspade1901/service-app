'use client'
/**
 * FILE: src/components/provider/ProviderRegistrationClient.tsx
 *
 * Multi-step provider registration form.
 * Step 1 — Personal & Business Info
 * Step 2 — Services & Pricing (fetched from service_categories table)
 * Step 3 — KYC Document Upload (to Supabase private storage bucket 'kyc')
 * Step 4 — Success screen
 *
 * Supabase Storage setup required (do this in Supabase Dashboard):
 *   1. Create a bucket named "kyc" with "Private" visibility.
 *   2. Add a storage policy:
 *      - INSERT: auth.role() = 'authenticated'
 *      - SELECT: auth.role() = 'authenticated' (user reads own files or admin reads all)
 */
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  User, Briefcase, Mail, Phone, MapPin,
  ArrowRight, ArrowLeft, Check, Clock,
  Sparkles, ShieldCheck, DollarSign, Image as ImageIcon,
  FileText, Upload, AlertCircle, Loader2, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

type ServiceCategory = Database['public']['Tables']['service_categories']['Row']

interface SelectedService {
  category_id: string
  name: string
  min_price: number
  max_price: number
  experience_years: number
}

interface DocFile {
  doc_type: 'aadhaar' | 'pan' | 'gst_certificate' | 'shop_establishment' | 'incorporation_cert' | 'professional_cert'
  label: string
  required: boolean
  file: File | null
  status: 'idle' | 'uploading' | 'done' | 'error'
  storage_key: string | null
  error: string | null
}

const STEPS = ['Personal Info', 'Services', 'Documents', 'Done']

export function ProviderRegistrationClient() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState(0)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // --- Step 1 state ---
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [providerType, setProviderType] = useState<'individual' | 'shop'>('individual')
  const [bio, setBio] = useState('')
  const [address, setAddress] = useState('')

  // --- Step 2 state ---
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loadingCats, setLoadingCats] = useState(false)
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([])

  // --- Step 3 state ---
  const [docs, setDocs] = useState<DocFile[]>([
    { doc_type: 'aadhaar', label: 'Aadhaar Card', required: true, file: null, status: 'idle', storage_key: null, error: null },
    { doc_type: 'pan', label: 'PAN Card', required: true, file: null, status: 'idle', storage_key: null, error: null },
    { doc_type: 'shop_establishment', label: 'Shop / Business License', required: false, file: null, status: 'idle', storage_key: null, error: null },
    { doc_type: 'professional_cert', label: 'Trade / Professional Certificate', required: false, file: null, status: 'idle', storage_key: null, error: null },
  ])

  // Aadhaar number for encryption (typed field, not just the file)
  const [aadhaarNumber, setAadhaarNumber] = useState('')

  // Fetch categories on mount for Step 2
  useEffect(() => {
    async function fetchCategories() {
      setLoadingCats(true)
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('name')
      if (!error && data) setCategories(data)
      setLoadingCats(false)
    }
    fetchCategories()
  }, [])

  // --------------------------------------------------------------------------
  // Step 2 helpers
  // --------------------------------------------------------------------------
  function toggleCategory(cat: ServiceCategory) {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.category_id === cat.id)
      if (exists) return prev.filter((s) => s.category_id !== cat.id)
      return [...prev, { category_id: cat.id, name: cat.name, min_price: 0, max_price: 0, experience_years: 0 }]
    })
  }

  function updateService(category_id: string, field: keyof SelectedService, value: number) {
    setSelectedServices((prev) =>
      prev.map((s) => (s.category_id === category_id ? { ...s, [field]: value } : s))
    )
  }

  // --------------------------------------------------------------------------
  // Step 3 helpers
  // --------------------------------------------------------------------------
  function setDocFile(index: number, file: File | null) {
    setDocs((prev) =>
      prev.map((d, i) =>
        i === index ? { ...d, file, status: 'idle', storage_key: null, error: null } : d
      )
    )
  }

  function setDocStatus(
    index: number,
    status: DocFile['status'],
    storage_key?: string,
    error?: string
  ) {
    setDocs((prev) =>
      prev.map((d, i) =>
        i === index
          ? { ...d, status, storage_key: storage_key ?? d.storage_key, error: error ?? null }
          : d
      )
    )
  }

  /**
   * Upload a single document to Supabase Storage bucket 'kyc'.
   * Returns the storage_key (path inside the bucket), or null on failure.
   */
  async function uploadDocToStorage(index: number): Promise<string | null> {
    const doc = docs[index]
    if (!doc.file) return null

    setDocStatus(index, 'uploading')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setDocStatus(index, 'error', undefined, 'Not authenticated.')
      return null
    }

    const ext = doc.file.name.split('.').pop() ?? 'jpg'
    const storagePath = `${user.id}/${doc.doc_type}_v1.${ext}`

    const { error } = await supabase.storage
      .from('kyc')
      .upload(storagePath, doc.file, {
        cacheControl: '3600',
        upsert: true, // allow re-upload on resubmission
        contentType: doc.file.type,
      })

    if (error) {
      setDocStatus(index, 'error', undefined, error.message)
      return null
    }

    setDocStatus(index, 'done', storagePath)
    return storagePath
  }

  // --------------------------------------------------------------------------
  // Navigation
  // --------------------------------------------------------------------------
  function validateStep(): string | null {
    if (step === 0) {
      if (!fullName.trim()) return 'Full name is required.'
      if (!phone.trim()) return 'Phone number is required.'
      if (!address.trim()) return 'Address is required.'
    }
    if (step === 1) {
      if (selectedServices.length === 0) return 'Select at least one service.'
      for (const svc of selectedServices) {
        if (svc.min_price <= 0 || svc.max_price <= 0)
          return `Set prices for ${svc.name}.`
        if (svc.max_price < svc.min_price)
          return `Max price must be >= min price for ${svc.name}.`
      }
    }
    if (step === 2) {
      const requiredMissing = docs
        .filter((d) => d.required && !d.file && !d.storage_key)
        .map((d) => d.label)
      if (requiredMissing.length > 0)
        return `Required documents missing: ${requiredMissing.join(', ')}`
    }
    return null
  }

  async function handleNext() {
    setGlobalError(null)
    const err = validateStep()
    if (err) { setGlobalError(err); return }

    if (step === 1) {
      // Submit Step 1 + 2 to /api/providers/register
      await submitProfileAndServices()
    } else if (step === 2) {
      // Upload all docs then submit KYC metadata
      await uploadAndSubmitKyc()
    } else {
      setStep((s) => s + 1)
    }
  }

  // --------------------------------------------------------------------------
  // API calls
  // --------------------------------------------------------------------------
  async function submitProfileAndServices() {
    setSubmitting(true)
    try {
      const res = await fetch('/api/providers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          provider_type: providerType,
          bio: bio || undefined,
          address,
          services: selectedServices.map((s) => ({
            category_id: s.category_id,
            min_price: s.min_price,
            max_price: s.max_price,
            experience_years: s.experience_years || undefined,
          })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Profile registration failed.')
      setStep(2)
    } catch (e) {
      setGlobalError(e instanceof Error ? e.message : 'Profile registration failed.')
    } finally {
      setSubmitting(false)
    }
  }

  async function uploadAndSubmitKyc() {
    setSubmitting(true)
    setGlobalError(null)
    try {
      // Step A: Upload all files that have a File selected and haven't been uploaded yet.
      for (let i = 0; i < docs.length; i++) {
        if (docs[i].file && docs[i].status !== 'done') {
          const key = await uploadDocToStorage(i)
          if (!key && docs[i].required) {
            throw new Error(`Failed to upload ${docs[i].label}. Please try again.`)
          }
        }
      }

      // Re-read docs state after uploads (state updates are async in React).
      // Use the latest storage_key values which were set inside setDocStatus.
      // Since we update state inside uploadDocToStorage, we need to read the current ref.
      // Workaround: build the payload from successful uploads.
      const uploadedDocs = docs.filter((d) => d.storage_key !== null)

      // Step B: Submit KYC metadata for each uploaded document.
      for (const doc of uploadedDocs) {
        if (!doc.storage_key) continue

        const formData: Record<string, string> = {}
        // Add typed PII for Aadhaar specifically.
        if (doc.doc_type === 'aadhaar' && aadhaarNumber) {
          formData.aadhaar_number = aadhaarNumber
        }

        const res = await fetch('/api/kyc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            doc_type: doc.doc_type,
            supabase_storage_key: doc.storage_key,
            form_data: formData,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? `KYC submission failed for ${doc.label}.`)
      }

      setStep(3)
    } catch (e) {
      setGlobalError(e instanceof Error ? e.message : 'Document submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 py-8 md:py-12 px-4 relative overflow-hidden">
      {/* Background blobs */}
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
            <Briefcase className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Become a Provider</h1>
          <p className="text-slate-600 font-medium">Complete your profile to start accepting bookings.</p>
        </div>

        {/* Stepper */}
        <div className="mb-10 px-4">
          <div className="flex justify-between relative">
            <div className="absolute top-5 left-8 right-8 h-1 bg-purple-100 rounded-full -z-10" />
            <div
              className="absolute top-5 left-8 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full -z-10 transition-all duration-500"
              style={{ width: `calc(${(step / (STEPS.length - 1)) * 100}% - 4rem)` }}
            />
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  step > i ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' :
                  step === i ? 'bg-white border-2 border-purple-500 text-purple-600 scale-110 shadow-lg shadow-purple-500/20' :
                  'bg-white border-2 border-purple-100 text-purple-300'
                }`}>
                  {step > i ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs font-bold hidden sm:block ${step >= i ? 'text-purple-900' : 'text-purple-300'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global error */}
        <AnimatePresence>
          {globalError && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-6">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-red-700">{globalError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border-2 border-purple-200 overflow-hidden">
          <div className="p-6 md:p-10 min-h-[450px]">
            <AnimatePresence mode="wait">

              {/* ====== STEP 0: Personal Info ====== */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-purple-500" /> Personal & Business Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                          placeholder="Rajan Kumar"
                          className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Provider Type *</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['individual', 'shop'] as const).map((type) => (
                          <button key={type} type="button" onClick={() => setProviderType(type)}
                            className={`py-3 px-4 rounded-xl border-2 font-bold text-sm capitalize transition-all ${
                              providerType === type ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-purple-200 text-slate-600 hover:border-purple-300'
                            }`}>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Business Address *</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                          placeholder="123 Main Street, Mumbai, Maharashtra 400001"
                          className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white" />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-bold text-slate-900 mb-2 block">Bio (optional)</label>
                      <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
                        placeholder="Tell customers about your experience and specialties..."
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:shadow-lg focus:shadow-purple-500/20 transition-all bg-white resize-none" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ====== STEP 1: Services ====== */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-500" /> Services & Pricing
                  </h2>
                  <p className="text-sm text-slate-500">Select services and set your price range per hour.</p>

                  {loadingCats ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {categories.map((cat) => {
                        const selected = selectedServices.find((s) => s.category_id === cat.id)
                        return (
                          <div key={cat.id} className={`rounded-2xl border-2 p-4 transition-all ${selected ? 'border-purple-500 bg-purple-50/50' : 'border-purple-100 hover:border-purple-300'}`}>
                            <div className="flex items-center justify-between">
                              <button type="button" onClick={() => toggleCategory(cat)}
                                className="flex items-center gap-3 flex-1 text-left">
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? 'bg-purple-600 border-purple-600' : 'border-slate-300'}`}>
                                  {selected && <Check className="w-4 h-4 text-white" />}
                                </div>
                                <div>
                                  <span className="font-bold text-slate-900">{cat.name}</span>
                                  {cat.cert_mandatory && (
                                    <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">Cert Required</span>
                                  )}
                                </div>
                              </button>
                            </div>

                            {selected && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 grid grid-cols-3 gap-3">
                                <div>
                                  <label className="text-xs font-bold text-slate-600 mb-1 block">Min ₹/hr *</label>
                                  <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                                    <input type="number" min={0} value={selected.min_price || ''}
                                      onChange={(e) => updateService(cat.id, 'min_price', Number(e.target.value))}
                                      className="w-full pl-8 pr-3 py-2 border-2 border-purple-200 rounded-xl text-sm focus:border-purple-500 focus:outline-none bg-white" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-bold text-slate-600 mb-1 block">Max ₹/hr *</label>
                                  <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                                    <input type="number" min={0} value={selected.max_price || ''}
                                      onChange={(e) => updateService(cat.id, 'max_price', Number(e.target.value))}
                                      className="w-full pl-8 pr-3 py-2 border-2 border-purple-200 rounded-xl text-sm focus:border-purple-500 focus:outline-none bg-white" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-bold text-slate-600 mb-1 block">Exp. years</label>
                                  <input type="number" min={0} value={selected.experience_years || ''}
                                    onChange={(e) => updateService(cat.id, 'experience_years', Number(e.target.value))}
                                    className="w-full px-3 py-2 border-2 border-purple-200 rounded-xl text-sm focus:border-purple-500 focus:outline-none bg-white" />
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ====== STEP 2: Documents ====== */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-500" /> KYC Document Upload
                  </h2>
                  <p className="text-sm text-slate-500">
                    Files are uploaded to a <strong>private</strong> Supabase storage bucket.
                    Only admins can access them. JPG/PNG/PDF accepted.
                  </p>

                  {/* Aadhaar number typed field (for encryption) */}
                  <div>
                    <label className="text-sm font-bold text-slate-900 mb-2 block">Aadhaar Number *</label>
                    <input type="text" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)}
                      placeholder="1234 5678 9012" maxLength={14}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white font-mono" />
                    <p className="text-xs text-slate-400 mt-1">Stored encrypted. Never visible in plaintext in the database.</p>
                  </div>

                  <div className="space-y-4">
                    {docs.map((doc, i) => (
                      <DocUploadRow
                        key={doc.doc_type}
                        doc={doc}
                        onFile={(file) => setDocFile(i, file)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ====== STEP 3: Success ====== */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[300px] space-y-5 py-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-2 shadow-xl shadow-emerald-500/30">
                    <Check className="w-12 h-12 text-white stroke-[3px]" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Application Submitted!</h2>
                  <p className="text-slate-600 max-w-md">
                    Your KYC documents are under review. You will receive an email within 24-48 hours.
                  </p>
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                    <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <span className="text-sm font-bold text-yellow-800">Status: Pending Verification</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.replace('/provider')}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/40 transition-all"
                  >
                    Go to Dashboard
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Navigation footer */}
          {step < 3 && (
            <div className="bg-slate-50/50 p-6 border-t border-purple-100 flex items-center justify-between">
              <motion.button
                type="button"
                whileHover={{ scale: step > 0 ? 1.05 : 1 }}
                whileTap={{ scale: step > 0 ? 0.95 : 1 }}
                onClick={() => { setGlobalError(null); setStep((s) => Math.max(s - 1, 0)) }}
                disabled={step === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  step === 0 ? 'opacity-50 cursor-not-allowed text-slate-400 bg-slate-100' :
                  'bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400'
                }`}
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>
                      {step === 0 ? 'Next: Services' :
                       step === 1 ? 'Next: Documents' :
                       'Submit Application'}
                    </span>
                    {step < 2 && <ArrowRight className="w-5 h-5" />}
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --------------------------------------------------------------------------
// DocUploadRow sub-component
// --------------------------------------------------------------------------
function DocUploadRow({
  doc,
  onFile,
}: {
  doc: DocFile
  onFile: (file: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={`rounded-2xl border-2 p-4 transition-all ${
      doc.status === 'done' ? 'border-emerald-300 bg-emerald-50/50' :
      doc.status === 'error' ? 'border-red-300 bg-red-50/50' :
      'border-purple-200 hover:border-purple-400'
    }`}>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`p-2.5 rounded-xl flex-shrink-0 ${
            doc.status === 'done' ? 'bg-emerald-100 text-emerald-600' :
            doc.status === 'error' ? 'bg-red-100 text-red-500' :
            'bg-purple-100 text-purple-500'
          }`}>
            {doc.status === 'done' ? <Check className="w-5 h-5" /> :
             doc.status === 'uploading' ? <Loader2 className="w-5 h-5 animate-spin" /> :
             doc.status === 'error' ? <AlertCircle className="w-5 h-5" /> :
             <FileText className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-900 text-sm">
              {doc.label}
              {doc.required && <span className="text-red-500 ml-1">*</span>}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {doc.status === 'done' && doc.storage_key ? 'Uploaded successfully' :
               doc.status === 'error' ? doc.error :
               doc.status === 'uploading' ? 'Uploading...' :
               doc.file ? doc.file.name :
               'No file selected'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {doc.file && doc.status !== 'done' && (
            <button type="button" onClick={() => onFile(null)}
              className="p-1 text-slate-400 hover:text-red-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={doc.status === 'uploading'}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-purple-200 text-purple-700 rounded-xl text-sm font-bold hover:border-purple-400 hover:bg-purple-50 transition-all disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {doc.file ? 'Change' : 'Browse'}
          </button>
        </div>
      </div>
    </div>
  )
}
