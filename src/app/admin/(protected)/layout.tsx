import type { ReactNode } from 'react'
import { AdminSidebar } from '@/modules/admin/components/admin-sidebar'
import { verifySession } from '@/modules/admin/lib/auth'

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode
}) {
  await verifySession()

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
