import { ProviderRegistrationScreen } from '@/components/screens/ProviderRegistrationScreen';
import { Layout } from '@/components/Layout';

export default function ProviderRegistrationPage() {
  return (
    <Layout showMobileNav={false} showFooter={false}>
      <ProviderRegistrationScreen />
    </Layout>
  );
}