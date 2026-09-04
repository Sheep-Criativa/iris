'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ConfirmDeleteDialog } from './confirm-delete-dialog'
import { updateMediaAltText, deleteMedia } from '@/modules/admin/actions/media.actions'
import type { MediaAsset } from '@/modules/admin/types/admin.types'

export function MediaItem({ media }: { media: MediaAsset }) {
  const router = useRouter()
  const [altText, setAltText] = useState(media.altText ?? '')
  const [saving, setSaving] = useState(false)

  async function handleAltTextBlur() {
    if (altText === (media.altText ?? '')) return
    setSaving(true)
    await updateMediaAltText(media.id, altText)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.publicUrl}
        alt={media.altText ?? ''}
        className="h-32 w-full rounded-md object-cover"
      />
      <input
        type="text"
        value={altText}
        onChange={(event) => setAltText(event.target.value)}
        onBlur={handleAltTextBlur}
        placeholder="Texto alternativo"
        className="rounded-md border border-gray-300 px-2 py-1 text-xs"
      />
      {saving && <p className="text-xs text-gray-500">Salvando…</p>}
      <ConfirmDeleteDialog
        triggerLabel="Excluir"
        title="Excluir imagem"
        description={
          media.usedByPostCount > 0
            ? `Esta imagem está sendo usada como capa em ${media.usedByPostCount} post(s). Excluir vai deixar essa referência quebrada. Continuar?`
            : 'Esta imagem não está em uso. Tem certeza que quer excluir?'
        }
        onConfirm={() => deleteMedia(media.id)}
      />
    </div>
  )
}
