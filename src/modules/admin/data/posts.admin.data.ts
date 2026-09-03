import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type {
  AdminPostListItem,
  PostEditable,
} from '@/modules/admin/types/admin.types'

type AdminPostListRow = {
  id: string
  slug: string
  title: string
  status: 'draft' | 'published'
  is_featured: boolean
  updated_at: string
  category: { name: string } | null
}

export async function getAllPostsForAdmin(): Promise<AdminPostListItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, slug, title, status, is_featured, updated_at, category:categories(name)'
    )
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to load posts for admin: ${error.message}`)
  }

  return ((data ?? []) as unknown as AdminPostListRow[]).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    categoryName: row.category?.name ?? null,
    isFeatured: row.is_featured,
    updatedAt: row.updated_at,
  }))
}

type PostEditableRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image_url: string | null
  status: 'draft' | 'published'
  category_id: string | null
  is_featured: boolean
  seo_title: string | null
  seo_description: string | null
  post_tags: { tag_id: string }[]
}

export async function getPostForEdit(id: string): Promise<PostEditable | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, slug, title, excerpt, content, cover_image_url, status, category_id, is_featured, seo_title, seo_description, post_tags(tag_id)'
    )
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to load post "${id}" for edit: ${error.message}`)
  }

  if (!data) {
    return null
  }

  const row = data as unknown as PostEditableRow

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImageUrl: row.cover_image_url,
    status: row.status,
    categoryId: row.category_id,
    tagIds: row.post_tags.map((postTag) => postTag.tag_id),
    isFeatured: row.is_featured,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
  }
}
