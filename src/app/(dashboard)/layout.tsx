import { ReactNode } from 'react'
import { DashboardShell } from '@/components/shared/DashboardShell'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
