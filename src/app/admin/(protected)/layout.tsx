import type { ReactNode } from 'react'
import { AdminHeader } from '@/modules/admin/components/admin-header'
import { AdminSidebar } from '@/modules/admin/components/admin-sidebar'
import { AdminHelpWidget } from '@/modules/admin/components/admin-help-widget'
import { AdminSidebarProvider } from '@/modules/admin/components/admin-sidebar-context'
import { verifySession } from '@/modules/admin/lib/auth'

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await verifySession()
  const email = user.email ?? 'irisamanda2016123@gmail.com'

  return (
    <AdminSidebarProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F8FAFC] text-slate-900 font-sans antialiased">
        {/* Top Welcome Header Bar */}
        <AdminHeader
          userName="Iris"
          userEmail={email}
        />

        {/* Main Body Shell with Responsive Sidebar & Content */}
        <div className="w-full flex gap-6 px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pb-16">
          {/* Responsive Sidebar (Desktop sticky & Mobile/Tablet drawer) */}
          <AdminSidebar userName="Iris" userEmail={email} />

          {/* Dynamic Page Content (Full width on mobile/tablet, side by side on desktop) */}
          <main className="w-full flex-1 min-w-0">{children}</main>
        </div>

        {/* Bottom Floating Support Bubble */}
        <AdminHelpWidget />
      </div>
    </AdminSidebarProvider>
  )
}
