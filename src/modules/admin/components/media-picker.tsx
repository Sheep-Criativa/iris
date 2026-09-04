'use client'

import { useState, type ChangeEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { uploadMedia } from '@/modules/admin/actions/media.actions'
import type { MediaAsset } from '@/modules/admin/types/admin.types'

interface MediaPickerProps {
  media: MediaAsset[]
  value: string
  onChange: (url: string) => void
}

export function MediaPicker({ media, value, onChange }: MediaPickerProps) {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSelect(url: string) {
    onChange(url)
    setOpen(false)
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', file)
    const result = await uploadMedia(formData)
    setUploading(false)
    if (result.error) {
      setError(result.error)
      return
    }
    if (result.media) {
      handleSelect(result.media.publicUrl)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Imagem selecionada"
          className="h-32 w-full max-w-xs rounded-md object-cover"
        />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-fit rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          {value ? 'Trocar imagem' : 'Selecionar imagem'}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar imagem</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="media-picker-upload" className="text-sm font-medium text-gray-700">
                Enviar nova imagem
              </label>
              <input
                id="media-picker-upload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="mt-1 text-sm"
              />
              {uploading && <p className="text-sm text-gray-500">Enviando…</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
            {media.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Ou escolha uma existente</p>
                <div className="grid max-h-80 grid-cols-3 gap-2 overflow-y-auto">
                  {media.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.publicUrl)}
                      className="overflow-hidden rounded-md border border-gray-200 hover:border-gray-900"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.publicUrl}
                        alt={item.altText ?? ''}
                        className="h-20 w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
