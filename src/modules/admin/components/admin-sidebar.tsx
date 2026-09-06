'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tag,
  Image as ImageIcon,
  Settings,
  LogOut,
  HelpCircle,
  Calendar,
} from 'lucide-react'
import { logout } from '@/modules/admin/actions/auth.actions'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const PRIMARY_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Posts', href: '/admin/posts', icon: FileText },
  { label: 'Categorias', href: '/admin/categorias', icon: FolderTree },
  { label: 'Tags', href: '/admin/tags', icon: Tag },
  { label: 'Mídia', href: '/admin/midia', icon: ImageIcon },
  { label: 'Configurações', href: '/admin/configuracoes', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-24 z-20 flex h-[calc(100vh-7rem)] w-60 xl:w-64 shrink-0 flex-col justify-between rounded-3xl border border-slate-100 bg-white p-3.5 shadow-sm">
      {/* Navigation List */}
      <nav className="flex flex-col gap-1.5 overflow-y-auto">
        {PRIMARY_NAV.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs border border-emerald-100/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-colors ${
                  isActive
                    ? 'text-emerald-600'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section: Ajuda & Sair */}
      <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
        <Link
          href="/admin#calendario"
          className="group flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <Calendar className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
          <span>Calendário</span>
        </Link>

        <a
          href="mailto:suporte@ecosistema-iris.com?subject=Ajuda%20Admin"
          className="group flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <HelpCircle className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
          <span>Ajuda</span>
        </a>

        <form action={logout} className="mt-1">
          <button
            type="submit"
            className="group flex w-full items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut className="h-4 w-4 text-rose-400 group-hover:text-rose-600" />
            <span>Sair</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
