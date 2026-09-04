import type { Category, Tag } from '@/modules/blog/types/blog.types'

export interface AdminPostListItem {
  id: string
  slug: string
  title: string
  status: 'draft' | 'published'
  categoryName: string | null
  isFeatured: boolean
  updatedAt: string
}

export interface PostEditable {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImageUrl: string | null
  status: 'draft' | 'published'
  categoryId: string | null
  tagIds: string[]
  isFeatured: boolean
  seoTitle: string | null
  seoDescription: string | null
}

export interface CategoryWithCount extends Category {
  postCount: number
}

export interface TagWithCount extends Tag {
  postCount: number
}

export interface MediaAsset {
  id: string
  storagePath: string
  altText: string | null
  uploadedAt: string
  publicUrl: string
  usedByPostCount: number
}
