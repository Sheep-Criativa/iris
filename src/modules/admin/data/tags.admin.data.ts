import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { TagWithCount } from '@/modules/admin/types/admin.types'

export async function getTagsWithPostCount(): Promise<TagWithCount[]> {
  const supabase = await createClient()

  const [tagsResult, postTagsResult] = await Promise.all([
    supabase.from('tags').select('id, slug, name').order('name'),
    supabase.from('post_tags').select('tag_id'),
  ])

  if (tagsResult.error) {
    throw new Error(`Failed to load tags: ${tagsResult.error.message}`)
  }
  if (postTagsResult.error) {
    throw new Error(`Failed to load tag counts: ${postTagsResult.error.message}`)
  }

  const counts = new Map<string, number>()
  for (const row of postTagsResult.data ?? []) {
    counts.set(row.tag_id, (counts.get(row.tag_id) ?? 0) + 1)
  }

  return (tagsResult.data ?? []).map((tag) => ({
    ...tag,
    postCount: counts.get(tag.id) ?? 0,
  }))
}
