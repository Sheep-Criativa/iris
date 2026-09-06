'use client'

import { useActionState } from 'react'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import { login, type LoginState } from '@/modules/admin/actions/auth.actions'

const initialState: LoginState = {}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Mail className="h-3.5 w-3.5 text-slate-400" />
          <span>E-mail</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="seu-email@ecosistema-iris.com"
          required
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Lock className="h-3.5 w-3.5 text-slate-400" />
          <span>Senha</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
        />
      </div>

      {state?.error && (
        <p className="rounded-xl bg-rose-50 p-2.5 text-xs font-medium text-rose-700 border border-rose-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95"
      >
        <span>{pending ? 'Acessando…' : 'Entrar no Painel'}</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}
