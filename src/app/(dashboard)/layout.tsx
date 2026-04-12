import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardShell } from '@/components/shared/DashboardShell'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  // Guard: user exists in Auth but has no users table row yet
  if (!profile?.role) {
    redirect('/login')
  }

  const role = profile.role as 'customer' | 'provider' | 'admin'

  return <DashboardShell role={role}>{children}</DashboardShell>
}