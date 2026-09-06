import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { LoginForm } from '@/modules/admin/components/login-form'

export const metadata: Metadata = {
  title: 'Login — Painel de Gestão Iris',
  description: 'Acesso restrito ao painel de controle e mentoria da plataforma Iris.',
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-12 font-sans">
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Brand Rounded Yellow Badge */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-white shadow-md shadow-amber-200/50">
          <Sparkles className="h-7 w-7" />
        </div>

        {/* Card Container */}
        <div className="mt-6 w-full rounded-3xl border border-slate-100 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Painel de Gestão
            </h1>
            <p className="mt-1.5 text-xs text-slate-500">
              Entre com suas credenciais de mentoria e administração da plataforma Iris
            </p>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Voltar para o blog público</span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 Ecossistema Iris • Psicologia & Mentoria
        </p>
      </div>
    </main>
  )
}
