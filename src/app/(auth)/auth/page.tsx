import { AuthScreen } from '@/components/screens/AuthScreen';
import { Layout } from '@/components/Layout';

export default function AuthPage() {
  return (
    <Layout showMobileNav={false}>
      <AuthScreen />
    </Layout>
  );
}