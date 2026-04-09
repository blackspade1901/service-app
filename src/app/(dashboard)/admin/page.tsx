import { AdminPanelScreen } from '@/components/screens/AdminPanelScreen';
import { Layout } from '@/components/Layout';

export default function AdminPage() {
  return (
    <Layout showMobileNav={false} showFooter={false}>
      <AdminPanelScreen />
    </Layout>
  );
}