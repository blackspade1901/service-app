/**
 * Booking history for the signed-in customer (past appointments list).
 * For scheduling a new job with a specific provider, use /booking/[providerId].
 */
import { BookingHistoryClient } from '@/components/booking/BookingHistoryClient'

export default function BookingsHistoryPage() {
  return <BookingHistoryClient />
}
