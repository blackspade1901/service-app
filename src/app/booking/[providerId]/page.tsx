/**
 * Multi-step booking flow for a single provider (service, time, confirm, done).
 * Separate from /bookings, which lists the customer’s past appointments.
 */
import { BookingFlowClient } from '@/components/booking/BookingFlowClient'

export default async function BookingFlowPage({ params }: { params: Promise<{ providerId: string }> }) {
  const { providerId } = await params
  
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <BookingFlowClient providerId={providerId} />
    </div>
  )
}