import { ProviderProfileClient } from '@/components/provider/ProviderProfileClient'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

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

interface PageProps {
  params: Promise<{ id: string }>
}

async function getProviderData(providerId: string) {
  console.log("🟢 1. getProviderData started for ID:", providerId) // ADD THIS
  
  const supabase = await createClient()
  console.log("🟢 2. Supabase client created!") // ADD THIS
// ... rest of the code
  
  const { data: provider, error } = await supabase
    .from('provider_profiles')
    .select('*')
    .eq('id', providerId)
    .eq('is_deleted', false)
    .single()

  if (error || !provider) {
    return null
  }

  const { data: services } = await supabase
    .from('provider_services')
    .select(`
      id,
      min_price,
      max_price,
      experience_years,
      service_categories(name)
    `)
    .eq('provider_id', providerId)

  // FIX: Cast 's' as 'any' to bypass the 'never' TS error
  const serviceData: ServiceData[] = (services || []).map((s: any) => ({
    id: s.id,
    category_name: s.service_categories?.name || 'Service',
    min_price: s.min_price,
    max_price: s.max_price,
    experience_years: s.experience_years,
  }))

  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      id,
      star_punctuality,
      star_quality,
      star_pricing,
      star_behaviour,
      review_text,
      created_at,
      customer_profiles(full_name)
    `)
    .eq('provider_id', providerId)
    .order('created_at', { ascending: false })
    .limit(5)

  // FIX: Cast 'r' as 'any' to bypass the 'never' TS error
  const reviewData: ReviewData[] = (reviews || []).map((r: any) => ({
    id: r.id,
    customer_name: r.customer_profiles?.full_name || 'Customer',
    star_punctuality: r.star_punctuality,
    star_quality: r.star_quality,
    star_pricing: r.star_pricing,
    star_behaviour: r.star_behaviour,
    review_text: r.review_text,
    created_at: r.created_at,
  }))

  const { data: portfolio } = await supabase
    .from('portfolio_photos')
    .select('id, cloudinary_url, display_order')
    .eq('provider_id', providerId)
    .order('display_order')
    .limit(10)

  return {
    provider: provider as ProviderData,
    services: serviceData,
    reviews: reviewData,
    portfolio: portfolio || [],
  }
}

export default async function ProviderProfilePage({ params }: PageProps) {
  const { id } = await params
  console.log("🟢 0. Page hit with ID:", id) // ADD THIS
  
  const data = await getProviderData(id)
// ... rest of the code
  
  if (!data || !data.provider) {
    notFound()
  }

  return <ProviderProfileClient 
    provider={data.provider} 
    services={data.services} 
    reviews={data.reviews}
    portfolio={data.portfolio}
  />
}