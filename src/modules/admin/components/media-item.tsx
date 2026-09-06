'use client'

import { useState } from 'react'
import { useRouter, unstable_rethrow } from 'next/navigation'
import { Copy, Check } from 'lucide-react'
import { ConfirmDeleteDialog } from './confirm-delete-dialog'
import { updateMediaAltText, deleteMedia } from '@/modules/admin/actions/media.actions'
import type { MediaAsset } from '@/modules/admin/types/admin.types'

export function MediaItem({ media }: { media: MediaAsset }) {
  const router = useRouter()
  const [altText, setAltText] = useState(media.altText ?? '')
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAltTextBlur() {
    if (altText === (media.altText ?? '')) return
    setSaving(true)
    setError(null)
    try {
      await updateMediaAltText(media.id, altText)
      router.refresh()
    } catch (err) {
      unstable_rethrow(err)
      setError('Não foi possível salvar o texto alternativo.')
    } finally {
      setSaving(false)
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(media.publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all hover:shadow-md">
      <div>
        <div className="relative overflow-hidden rounded-2xl bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.publicUrl}
            alt={media.altText ?? ''}
            className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Usage Pill Badge */}
          <div className="absolute top-2.5 right-2.5">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-md shadow-xs ${
                media.usedByPostCount > 0
                  ? 'bg-emerald-100/90 text-emerald-800'
                  : 'bg-white/80 text-slate-500'
              }`}
            >
              {media.usedByPostCount > 0 ? `${media.usedByPostCount} uso(s)` : 'Sem uso'}
            </span>
          </div>
        </div>

        {/* Alt text field */}
        <div className="mt-3">
          <input
            type="text"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            onBlur={handleAltTextBlur}
            placeholder="Texto alternativo (alt)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
          />
          {saving && <p className="mt-1 text-[10px] text-slate-400">Salvando...</p>}
          {error && <p className="mt-1 text-[10px] text-rose-600">{error}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <button
          type="button"
          onClick={copyUrl}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
          title="Copiar URL pública da imagem"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-600" />
              <span className="text-emerald-600">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copiar link</span>
            </>
          )}
        </button>

        <ConfirmDeleteDialog
          triggerLabel="Excluir"
          title="Excluir Imagem"
          description={
            media.usedByPostCount > 0
              ? `Esta imagem está sendo usada em ${media.usedByPostCount} post(s). A exclusão quebrará a capa desses posts. Continuar?`
              : 'Esta imagem não está em uso. Deseja realmente excluir?'
          }
          onConfirm={() => deleteMedia(media.id)}
        />
      </div>
    </div>
  )
}
