export interface Category {
  id: string
  slug: string
  name: string
  description: string | null
}

export interface Tag {
  id: string
  slug: string
  name: string
}

export interface PostSummary {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImageUrl: string | null
  isFeatured: boolean
  publishedAt: string | null
  category: Category | null
  tags: Tag[]
}

export interface PostDetail extends PostSummary {
  content: string
  seoTitle: string | null
  seoDescription: string | null
}

export interface BlogSettings {
  blogTitle: string
  blogDescription: string | null
  defaultSeoImageUrl: string | null
}
