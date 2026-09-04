'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
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
      className="flex flex-wrap items-end gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="file" className="text-sm font-medium text-gray-700">
          Arquivo
        </label>
        <input id="file" name="file" type="file" accept="image/*" required className="text-sm" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="altText" className="text-sm font-medium text-gray-700">
          Texto alternativo (opcional)
        </label>
        <input
          id="altText"
          name="altText"
          type="text"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {uploading ? 'Enviando…' : 'Enviar imagem'}
      </button>
      {error && <p className="w-full text-sm text-red-600">{error}</p>}
    </form>
  )
}
