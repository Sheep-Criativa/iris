'use client'

import { useState, type ChangeEvent } from 'react'
import { useRouter, unstable_rethrow } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  UploadCloud,
  Image as ImageIcon,
  Check,
  Trash2,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { uploadMedia } from '@/modules/admin/actions/media.actions'
import type { MediaAsset } from '@/modules/admin/types/admin.types'

interface MediaPickerProps {
  media: MediaAsset[]
  value: string
  onChange: (url: string) => void
}

export function MediaPicker({ media, value, onChange }: MediaPickerProps) {
  const router = useRouter()
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
    try {
      const formData = new FormData()
      formData.append('file', file)
      const result = await uploadMedia(formData)
      if (result.error) {
        setError(result.error)
        return
      }
      if (result.media) {
        router.refresh()
        handleSelect(result.media.publicUrl)
      }
    } catch (err) {
      unstable_rethrow(err)
      setError('Falha no upload da imagem. Tente novamente.')
    } finally {
      setUploading(false)
      // Reset input value so same file can be uploaded again if needed
      event.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (next) setError(null)
        }}
      >
        {/* Preview & Trigger in Form */}
        {value ? (
          <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 max-w-sm shadow-xs transition-all hover:border-slate-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Imagem selecionada"
              className="h-40 w-full object-cover"
            />
            <div className="p-3 flex items-center justify-between gap-2 bg-white border-t border-slate-100">
              <DialogTrigger className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:border-emerald-500 hover:text-emerald-700 transition-all cursor-pointer">
                <ImageIcon className="h-3.5 w-3.5 text-emerald-600" />
                <span>Trocar imagem</span>
              </DialogTrigger>
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remover</span>
              </button>
            </div>
          </div>
        ) : (
          <DialogTrigger className="group flex w-full max-w-sm items-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 text-left transition-all hover:border-emerald-400 hover:bg-emerald-50/20 cursor-pointer">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-xs transition-transform group-hover:scale-105 group-hover:text-emerald-600">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                Selecionar Imagem
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Clique para enviar ou escolher da biblioteca
              </p>
            </div>
          </DialogTrigger>
        )}

        {/* Modal Dialog Content */}
        <DialogContent className="sm:max-w-xl md:max-w-2xl rounded-3xl p-6 bg-white border border-slate-100 shadow-2xl gap-5 max-h-[88vh] overflow-y-auto">
          <DialogHeader className="gap-1 text-left">
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ImageIcon className="h-4 w-4" />
              </span>
              <span>Selecionar Imagem</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Faça o upload de uma nova foto ou selecione uma imagem existente na sua biblioteca.
            </DialogDescription>
          </DialogHeader>

          {/* Area 1: Modern Styled Drag & Drop / Upload Area */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="media-picker-upload"
              className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-all cursor-pointer text-center ${
                uploading
                  ? 'border-emerald-300 bg-emerald-50/40 cursor-not-allowed opacity-75'
                  : 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-xs'
              }`}
            >
              <input
                id="media-picker-upload"
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={handleUpload}
                className="sr-only"
              />

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-xs transition-transform group-hover:scale-105">
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                ) : (
                  <UploadCloud className="h-6 w-6" />
                )}
              </div>

              <div className="mt-2.5">
                <p className="text-xs font-semibold text-slate-800">
                  {uploading ? 'Fazendo upload da imagem…' : 'Clique para selecionar ou arraste uma foto'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Formatos aceitos: PNG, JPG, WebP ou GIF (máx. 10MB)
                </p>
              </div>
            </label>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-2.5 text-xs font-medium text-rose-700 border border-rose-200 animate-in fade-in duration-150">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Area 2: Media Library */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Biblioteca de Imagens ({media.length})
              </span>
              {value && (
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  1 selecionada
                </span>
              )}
            </div>

            {media.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto p-1 rounded-2xl border border-slate-100 bg-slate-50/50">
                {media.map((item) => {
                  const isSelected = value === item.publicUrl

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.publicUrl)}
                      className={`group relative aspect-video overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 ring-2 ring-emerald-200 shadow-sm scale-[1.02]'
                          : 'border-slate-200 hover:border-emerald-400 hover:shadow-xs'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.publicUrl}
                        alt={item.altText ?? 'Imagem da galeria'}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-600/25 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                Nenhuma imagem na biblioteca ainda. Envie uma foto pelo campo acima para começar!
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
