'use client'

import { useEffect, useRef } from 'react'
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
  X,
  Sparkles,
  ExternalLink,
  Globe,
} from 'lucide-react'
import { logout } from '@/modules/admin/actions/auth.actions'
import { useAdminSidebar } from './admin-sidebar-context'

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

interface AdminSidebarProps {
  userName?: string
  userEmail?: string
}

export function AdminSidebar({
  userName = 'Iris',
  userEmail = 'irisamanda2016123@gmail.com',
}: AdminSidebarProps) {
  const pathname = usePathname()
  const { isOpen, close } = useAdminSidebar()
  const prevPathname = useRef(pathname)

  // Fechar gaveta mobile APENAS quando o pathname realmente mudar
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      close()
    }
  }, [pathname, close])

  // Fechar ao pressionar ESC
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  // Navegação primária reutilizável
  const renderNavLinks = () => (
    <nav className="flex flex-col gap-1.5 overflow-y-auto flex-1 py-1">
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
            onClick={close}
            className={`group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs border border-emerald-100/60'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon
              className={`h-4 w-4 transition-colors shrink-0 ${
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
  )

  // Seção inferior com ações rápidas e logout
  const renderFooterActions = () => (
    <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
      <Link
        href="/admin#calendario"
        onClick={close}
        className="group flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
      >
        <Calendar className="h-4 w-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
        <span>Calendário</span>
      </Link>

      <a
        href="mailto:suporte@ecosistema-iris.com?subject=Ajuda%20Admin"
        className="group flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
      >
        <HelpCircle className="h-4 w-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
        <span>Ajuda</span>
      </a>

      <form action={logout} className="mt-1">
        <button
          type="submit"
          className="group flex w-full items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
        >
          <LogOut className="h-4 w-4 text-rose-400 group-hover:text-rose-600 shrink-0" />
          <span>Sair da conta</span>
        </button>
      </form>
    </div>
  )

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Visible >= 1024px) */}
      <aside className="sticky top-24 z-20 hidden lg:flex h-[calc(100vh-7rem)] w-60 xl:w-64 shrink-0 flex-col justify-between rounded-3xl border border-slate-100 bg-white p-3.5 shadow-sm">
        {renderNavLinks()}
        {renderFooterActions()}
      </aside>

      {/* 2. MOBILE & TABLET SLIDE-OVER DRAWER (Visible < 1024px) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col justify-between bg-white p-5 shadow-2xl border-r border-slate-100 animate-in slide-in-from-left duration-250 ease-out">
            <div className="flex flex-col flex-1 min-h-0">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-900 shadow-xs">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 leading-tight block">
                      Painel Iris
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Menu Administrativo
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* User Profile Card inside Menu (as requested: perfil entra no menu no celular/tablet) */}
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-emerald-50/50 p-3 border border-emerald-100/70">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-xs">
                  IR
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {userName}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                      Admin
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 truncate block mt-0.5">
                    {userEmail}
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              {renderNavLinks()}

              {/* Public Views (Blog & Portfolio) inside Drawer for Mobile/Tablet */}
              <div className="flex flex-col gap-1 border-t border-slate-100 py-3">
                <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Visualização Pública
                </span>
                <Link
                  href="/blog"
                  target="_blank"
                  onClick={close}
                  className="flex items-center justify-between rounded-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    <span>Ver Blog</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </Link>

                <Link
                  href="/portfolio"
                  target="_blank"
                  onClick={close}
                  className="flex items-center justify-between rounded-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                    <span>Ver Portfólio</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            {renderFooterActions()}
          </div>
        </div>
      )}
    </>
  )
}

