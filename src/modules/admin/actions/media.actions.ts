'use server'

import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { verifySession } from '@/modules/admin/lib/auth'
import type { MediaAsset } from '@/modules/admin/types/admin.types'

export async function uploadMedia(
  formData: FormData
): Promise<{ media?: MediaAsset; error?: string }> {
  await verifySession()

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Nenhum arquivo selecionado.' }
  }

  const altText = String(formData.get('altText') ?? '').trim() || null
  const supabase = await createClient()
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-')
  const storagePath = `media/${randomUUID()}-${sanitizedName}`

  const { error: uploadError } = await supabase.storage
    .from('blog-media')
    .upload(storagePath, file)

  if (uploadError) {
    return { error: `Falha no upload: ${uploadError.message}` }
  }

  const { data: record, error: insertError } = await supabase
    .from('media_assets')
    .insert({ storage_path: storagePath, alt_text: altText })
    .select('id, storage_path, alt_text, uploaded_at')
    .single()

  if (insertError || !record) {
    return { error: `Falha ao registrar mídia: ${insertError?.message}` }
  }

  const { data: urlData } = supabase.storage.from('blog-media').getPublicUrl(record.storage_path)

  revalidatePath('/admin/midia')

  return {
    media: {
      id: record.id,
      storagePath: record.storage_path,
      altText: record.alt_text,
      uploadedAt: record.uploaded_at,
      publicUrl: urlData.publicUrl,
      usedByPostCount: 0,
    },
  }
}

export async function updateMediaAltText(id: string, altText: string) {
  await verifySession()

  const supabase = await createClient()
  const { error } = await supabase
    .from('media_assets')
    .update({ alt_text: altText.trim() || null })
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to update media alt text: ${error.message}`)
  }

  revalidatePath('/admin/midia')
}

export async function deleteMedia(id: string) {
  await verifySession()

  const supabase = await createClient()

  const { data: existing, error: fetchError } = await supabase
    .from('media_assets')
    .select('storage_path')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    throw new Error('Mídia não encontrada.')
  }

  const { error: deleteError } = await supabase.from('media_assets').delete().eq('id', id)

  if (deleteError) {
    throw new Error(`Failed to delete media record: ${deleteError.message}`)
  }

  const { error: storageError } = await supabase.storage
    .from('blog-media')
    .remove([existing.storage_path])

  if (storageError) {
    throw new Error(`Failed to delete file from storage: ${storageError.message}`)
  }

  revalidatePath('/admin/midia')
}
