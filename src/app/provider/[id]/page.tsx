import { ProviderProfileClient } from '@/components/provider/ProviderProfileClient'

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await params
  return <ProviderProfileClient />
}
