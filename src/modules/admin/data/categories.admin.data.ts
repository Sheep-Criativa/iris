import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { CategoryWithCount } from '@/modules/admin/types/admin.types'

export async function getCategoriesWithPostCount(): Promise<CategoryWithCount[]> {
  const supabase = await createClient()

  const [categoriesResult, postsResult] = await Promise.all([
    supabase.from('categories').select('id, slug, name, description').order('name'),
    supabase.from('posts').select('category_id'),
  ])

  if (categoriesResult.error) {
    throw new Error(`Failed to load categories: ${categoriesResult.error.message}`)
  }
  if (postsResult.error) {
    throw new Error(`Failed to load post counts: ${postsResult.error.message}`)
  }

  const counts = new Map<string, number>()
  for (const row of postsResult.data ?? []) {
    if (row.category_id) {
      counts.set(row.category_id, (counts.get(row.category_id) ?? 0) + 1)
    }
  }

  return (categoriesResult.data ?? []).map((category) => ({
    ...category,
    postCount: counts.get(category.id) ?? 0,
  }))
}
