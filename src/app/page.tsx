import { HomeScreen } from '@/components/screens/HomeScreen';
import { Layout } from '@/components/Layout';

export default function HomePage() {
  return (
    <Layout showFooter={false}>
      <HomeScreen />
    </Layout>
  );
}
