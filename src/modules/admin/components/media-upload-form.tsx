'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { UploadCloud, Image as ImageIcon } from 'lucide-react'
import { uploadMedia } from '@/modules/admin/actions/media.actions'

export function MediaUploadForm() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setUploading(true)
    setError(null)
    const form = event.currentTarget
    const formData = new FormData(form)
    const result = await uploadMedia(formData)
    setUploading(false)
    if (result.error) {
      setError(result.error)
      return
    }
    form.reset()
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 p-6 shadow-2xs transition-colors hover:border-emerald-300 sm:flex-row sm:items-end"
    >
      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="file" className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <UploadCloud className="h-4 w-4 text-emerald-600" />
          <span>Selecionar Arquivo de Imagem</span>
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          required
          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-800 hover:file:bg-emerald-200"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="altText" className="text-xs font-bold text-slate-700">
          Texto alternativo / Acessibilidade (opcional)
        </label>
        <input
          id="altText"
          name="altText"
          type="text"
          placeholder="Ex: Livros de psicologia sobre a mesa..."
          className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-emerald-500 focus:outline-hidden"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95"
      >
        <ImageIcon className="h-3.5 w-3.5" />
        <span>{uploading ? 'Enviando…' : 'Fazer Upload'}</span>
      </button>

      {error && (
        <p className="w-full rounded-xl bg-rose-50 p-2.5 text-xs font-medium text-rose-700 border border-rose-200">
          {error}
        </p>
      )}
    </form>
  )
}
