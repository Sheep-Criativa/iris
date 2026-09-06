'use client'

import { useActionState, useState } from 'react'
import { Save, Settings as SettingsIcon, Image as ImageIcon } from 'lucide-react'
import { MediaPicker } from './media-picker'
import { updateBlogSettings, type SettingsFormState } from '@/modules/admin/actions/settings.actions'
import type { BlogSettings } from '@/modules/blog/types/blog.types'
import type { MediaAsset } from '@/modules/admin/types/admin.types'

interface SettingsFormProps {
  initialSettings: BlogSettings
  media: MediaAsset[]
}

export function SettingsForm({ initialSettings, media }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState<SettingsFormState | undefined, FormData>(
    updateBlogSettings,
    undefined
  )
  const [defaultSeoImageUrl, setDefaultSeoImageUrl] = useState(
    initialSettings.defaultSeoImageUrl ?? ''
  )

  return (
    <form action={formAction} className="flex max-w-4xl 2xl:max-w-5xl w-full flex-col gap-6">
      <input type="hidden" name="defaultSeoImageUrl" value={defaultSeoImageUrl} />

      {/* Card 1: Dados Gerais da Plataforma */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <SettingsIcon className="h-4 w-4 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900">
            Identidade & Informações do Blog
          </h2>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="blogTitle" className="text-xs font-bold text-slate-700">
            Nome / Título do Blog
          </label>
          <input
            id="blogTitle"
            name="blogTitle"
            defaultValue={initialSettings.blogTitle}
            placeholder="Ex: Blog Iris — Psicologia & Mentoria"
            required
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="blogDescription" className="text-xs font-bold text-slate-700">
            Descrição Geral (Apresentação e Bio Curta)
          </label>
          <textarea
            id="blogDescription"
            name="blogDescription"
            defaultValue={initialSettings.blogDescription ?? ''}
            placeholder="Orientações clínicas, estudos de caso e apoio prático para graduandos em Psicologia..."
            rows={3}
            className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Card 2: Imagem de Compartilhamento / SEO Padrão */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ImageIcon className="h-4 w-4 text-sky-600" />
          <h2 className="text-base font-bold text-slate-900">
            Imagem de Compartilhamento (Open Graph / SEO)
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Esta imagem será exibida quando o link do blog for compartilhado no WhatsApp, Instagram ou LinkedIn.
        </p>
        <MediaPicker media={media} value={defaultSeoImageUrl} onChange={setDefaultSeoImageUrl} />
      </div>

      {/* Feedback Messages */}
      {state?.error && (
        <p className="rounded-2xl bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
          {state.error}
        </p>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95"
        >
          <Save className="h-4 w-4" />
          <span>{pending ? 'Salvando Alterações…' : 'Salvar Configurações'}</span>
        </button>
      </div>
    </form>
  )
}
