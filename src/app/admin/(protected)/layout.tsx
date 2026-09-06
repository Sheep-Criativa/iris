import type { ReactNode } from 'react'
import { AdminHeader } from '@/modules/admin/components/admin-header'
import { AdminSidebar } from '@/modules/admin/components/admin-sidebar'
import { AdminHelpWidget } from '@/modules/admin/components/admin-help-widget'
import { verifySession } from '@/modules/admin/lib/auth'

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await verifySession()

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* Top Welcome Header Bar (Image 1 & 2 reference) */}
      <AdminHeader
        userName="Iris"
        userEmail={user.email ?? 'iris@ecosistema.com'}
      />

      {/* Main Body Shell with Floating Pill Sidebar */}
      <div className="w-full flex gap-6 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pb-16">
        {/* Floating Sidebar */}
        <AdminSidebar />

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Bottom Floating Support Bubble */}
      <AdminHelpWidget />
    </div>
  )
}
