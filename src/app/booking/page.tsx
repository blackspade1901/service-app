import { BookingFlowScreen } from '@/components/screens/BookingFlowScreen';
import { Layout } from '@/components/Layout';

export default function BookingPage() {
  return (
    <Layout showMobileNav={false} showFooter={false}>
      <BookingFlowScreen />
    </Layout>
  );
}