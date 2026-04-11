/**
 * Multi-step booking flow for a single provider (service, time, confirm, done).
 * Separate from /bookings, which lists the customer’s past appointments.
 */
import { BookingFlowClient } from '@/components/booking/BookingFlowClient'

export default function BookingFlowPage() {
  return <BookingFlowClient />
}
