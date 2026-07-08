import { cookies } from 'next/headers'
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/auth'
import AdminShell from '@/components/admin/AdminShell'

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  const session = token ? await verifyAdminSession(token) : null

  return <AdminShell email={session?.email ?? ''}>{children}</AdminShell>
}
