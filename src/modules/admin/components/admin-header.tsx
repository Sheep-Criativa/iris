import Link from 'next/link'
import { Info, ExternalLink, Sparkles, ChevronDown } from 'lucide-react'

interface AdminHeaderProps {
  userName?: string
  userEmail?: string
}

export function AdminHeader({
  userName = 'Iris',
  userEmail = 'iris@deconta.app',
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 mb-6 flex flex-col gap-4 border-b border-slate-100 bg-white/90 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 backdrop-blur-md md:flex-row md:items-center md:justify-between">
      {/* Left: Brand Icon & Greeting */}
      <div className="flex items-center gap-3.5">
        {/* Brand Rounded Yellow/Amber Icon Badge (Image 1 & 2 reference) */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-900 shadow-sm shadow-amber-200/50">
          <Sparkles className="h-6 w-6 text-white" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            Olá, {userName}!
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Bem-vinda ao seu painel de controle e gestão da plataforma!
          </p>
        </div>
      </div>

      {/* Right: Quick Links, Info and User Profile Pill */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Quick public links */}
        <div className="hidden sm:flex items-center gap-2">
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

        {/* Info Icon Button (Reference circular button) */}
        <button
          type="button"
          aria-label="Informações da plataforma"
          title="Gestão de Conteúdo e Plataforma Iris"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-xs transition-colors hover:border-slate-300 hover:text-slate-600"
        >
          <Info className="h-4 w-4" />
        </button>

        {/* User Pill (Reference from Image 1 & 2: Pedro Henrique -> Iris) */}
        <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-xs transition-colors hover:border-slate-300">
          {/* Initials Pill Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
            IR
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-800 leading-tight">
              {userName}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight">
              {userEmail}
            </span>
          </div>

          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  )
}
