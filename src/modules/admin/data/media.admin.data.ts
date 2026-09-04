import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { MediaAsset } from '@/modules/admin/types/admin.types'

export async function getAllMedia(): Promise<MediaAsset[]> {
  const supabase = await createClient()

  const [mediaResult, postsResult] = await Promise.all([
    supabase
      .from('media_assets')
      .select('id, storage_path, alt_text, uploaded_at')
      .order('uploaded_at', { ascending: false }),
    supabase.from('posts').select('cover_image_url').not('cover_image_url', 'is', null),
  ])

  if (mediaResult.error) {
    throw new Error(`Failed to load media: ${mediaResult.error.message}`)
  }
  if (postsResult.error) {
    throw new Error(`Failed to load cover image usage: ${postsResult.error.message}`)
  }

  const usageCounts = new Map<string, number>()
  for (const row of postsResult.data ?? []) {
    if (row.cover_image_url) {
      usageCounts.set(row.cover_image_url, (usageCounts.get(row.cover_image_url) ?? 0) + 1)
    }
  }

  return (mediaResult.data ?? []).map((row) => {
    const { data: urlData } = supabase.storage.from('blog-media').getPublicUrl(row.storage_path)
    return {
      id: row.id,
      storagePath: row.storage_path,
      altText: row.alt_text,
      uploadedAt: row.uploaded_at,
      publicUrl: urlData.publicUrl,
      usedByPostCount: usageCounts.get(urlData.publicUrl) ?? 0,
    }
  })
}
