'use client'

import { useActionState, useState } from 'react'
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
    <form action={formAction} className="flex max-w-xl flex-col gap-6">
      <input type="hidden" name="defaultSeoImageUrl" value={defaultSeoImageUrl} />

      <div className="flex flex-col gap-1">
        <label htmlFor="blogTitle" className="text-sm font-medium text-gray-700">
          Título do blog
        </label>
        <input
          id="blogTitle"
          name="blogTitle"
          defaultValue={initialSettings.blogTitle}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="blogDescription" className="text-sm font-medium text-gray-700">
          Descrição do blog
        </label>
        <textarea
          id="blogDescription"
          name="blogDescription"
          defaultValue={initialSettings.blogDescription ?? ''}
          rows={3}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Imagem de SEO padrão</span>
        <MediaPicker media={media} value={defaultSeoImageUrl} onChange={setDefaultSeoImageUrl} />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {pending ? 'Salvando…' : 'Salvar'}
      </button>
    </form>
  )
}
