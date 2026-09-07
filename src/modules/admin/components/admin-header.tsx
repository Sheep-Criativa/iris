'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, Sparkles, ChevronDown, LogOut, Menu } from 'lucide-react'
import { logout } from '@/modules/admin/actions/auth.actions'
import { useAdminSidebar } from './admin-sidebar-context'

interface AdminHeaderProps {
  userName?: string
  userEmail?: string
}

export function AdminHeader({
  userName = 'Iris',
  userEmail = 'iris@deconta.app',
}: AdminHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { toggle: toggleSidebar } = useAdminSidebar()

  // Fechar ao clicar fora ou pressionar ESC
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-30 mb-6 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/95 px-3 sm:px-6 lg:px-8 xl:px-10 backdrop-blur-md">
      {/* Left: Mobile/Tablet Hamburger Toggle + Brand Icon & Greeting */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        {/* Mobile/Tablet Menu Hamburger Button (Visible < 1024px) */}
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Abrir menu de navegação"
          className="flex lg:hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-2xs hover:border-emerald-400 hover:text-emerald-700 transition-all active:scale-95 cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Sparkles Badge */}
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-900 shadow-xs shadow-amber-200/50">
          <Sparkles className="h-5 w-5 text-white" />
        </div>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 truncate">
            Olá, {userName}!
          </h1>
          <p className="hidden sm:block text-[11px] lg:text-xs font-medium text-slate-500 truncate">
            Bem-vinda ao seu painel de controle e gestão!
          </p>
        </div>
      </div>

      {/* Right: Desktop only (lg:flex) — On mobile/tablet, profile and links live in the hamburger drawer */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Quick public links */}
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-xs transition-colors hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700"
          >
            <span>Ver Blog</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link
            href="/portfolio"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-xs transition-colors hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700"
          >
            <span>Ver Portfólio</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        {/* User Pill with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label="Menu do usuário"
            className={`flex items-center gap-2.5 rounded-full border bg-white px-3 py-1.5 shadow-xs transition-all cursor-pointer ${
              isOpen
                ? 'border-emerald-500 ring-2 ring-emerald-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Initials Pill Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 select-none shrink-0">
              IR
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                {userName}
              </span>
              <span className="text-[10px] text-slate-400 leading-tight max-w-[140px] truncate">
                {userEmail}
              </span>
            </div>

            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                isOpen ? 'rotate-180 text-emerald-600' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Header do dropdown com dados do usuário */}
              <div className="px-3 py-2.5 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900 leading-tight">
                  {userName}
                </p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {userEmail}
                </p>
                <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  Administradora
                </span>
              </div>

              {/* Ação de Logout */}
              <div className="pt-1.5">
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span>Sair da conta</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
