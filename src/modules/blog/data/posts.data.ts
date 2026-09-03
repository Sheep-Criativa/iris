import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type {
  BlogSettings,
  Category,
  PostDetail,
  PostSummary,
  Tag,
} from '@/modules/blog/types/blog.types'

type CategoryRow = {
  id: string
  slug: string
  name: string
  description: string | null
}

type TagRow = {
  id: string
  slug: string
  name: string
}

type PostSummaryRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  cover_image_url: string | null
  is_featured: boolean
  published_at: string | null
  category: CategoryRow | null
  post_tags: { tag: TagRow }[]
}

type PostDetailRow = PostSummaryRow & {
  content: string
  seo_title: string | null
  seo_description: string | null
}

// O tipo gerado pelo supabase-js para selects com embeds aninhados
// (category:categories(...), post_tags(tag:tags(...))) não reflete com
// precisão o formato real da resposta — por isso o cast explícito para
// os Row types acima, definidos a partir das colunas realmente pedidas.
const POST_SUMMARY_COLUMNS =
  'id, slug, title, excerpt, cover_image_url, is_featured, published_at, category:categories(id, slug, name, description), post_tags(tag:tags(id, slug, name))'

const POST_DETAIL_COLUMNS = `${POST_SUMMARY_COLUMNS}, content, seo_title, seo_description`

function mapPostSummary(row: PostSummaryRow): PostSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverImageUrl: row.cover_image_url,
    isFeatured: row.is_featured,
    publishedAt: row.published_at,
    category: row.category,
    tags: row.post_tags.map((postTag) => postTag.tag),
  }
}

function mapPostDetail(row: PostDetailRow): PostDetail {
  return {
    ...mapPostSummary(row),
    content: row.content,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
  }
}

export interface PostListParams {
  categorySlug?: string
  tagSlug?: string
  page?: number
  pageSize?: number
}

export interface PostListResult {
  posts: PostSummary[]
  totalCount: number
  page: number
  pageSize: number
}

export async function getPublishedPosts(
  params: PostListParams = {}
): Promise<PostListResult> {
  const supabase = await createClient()
  const page = params.page && params.page > 0 ? params.page : 1
  const pageSize = params.pageSize ?? 9

  let postIdFilter: string[] | null = null

  if (params.tagSlug) {
    const { data: tag, error: tagError } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', params.tagSlug)
      .maybeSingle()

    if (tagError) {
      throw new Error(`Failed to load tag "${params.tagSlug}": ${tagError.message}`)
    }

    if (!tag) {
      return { posts: [], totalCount: 0, page, pageSize }
    }

    const { data: postTags, error: postTagsError } = await supabase
      .from('post_tags')
      .select('post_id')
      .eq('tag_id', tag.id)

    if (postTagsError) {
      throw new Error(`Failed to load posts for tag "${params.tagSlug}": ${postTagsError.message}`)
    }

    postIdFilter = (postTags ?? []).map((row) => row.post_id)

    if (postIdFilter.length === 0) {
      return { posts: [], totalCount: 0, page, pageSize }
    }
  }

  let categoryId: string | null = null

  if (params.categorySlug) {
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', params.categorySlug)
      .maybeSingle()

    if (categoryError) {
      throw new Error(`Failed to load category "${params.categorySlug}": ${categoryError.message}`)
    }

    if (!category) {
      return { posts: [], totalCount: 0, page, pageSize }
    }

    categoryId = category.id
  }

  function buildFilteredQuery(countMode: 'exact' | 'head') {
    let q =
      countMode === 'head'
        ? supabase
            .from('posts')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'published')
        : supabase
            .from('posts')
            .select(POST_SUMMARY_COLUMNS, { count: 'exact' })
            .eq('status', 'published')
            .order('published_at', { ascending: false })

    if (categoryId) {
      q = q.eq('category_id', categoryId)
    }

    if (postIdFilter) {
      q = q.in('id', postIdFilter)
    }

    return q
  }

  const { data, error, count } = await buildFilteredQuery('exact').range(
    (page - 1) * pageSize,
    page * pageSize - 1
  )

  if (error) {
    // PostgREST retorna PGRST103 ("Requested range not satisfiable") quando
    // a página pedida está além da última linha existente para o filtro
    // aplicado. Isso não é um erro real — é só uma página vazia — então em
    // vez de derrubar a rota com 500, refazemos a mesma query filtrada (sem
    // .range()) só para contar as linhas e devolvemos uma lista vazia.
    if (error.code === 'PGRST103') {
      const { count: fallbackCount, error: countError } =
        await buildFilteredQuery('head')

      if (countError) {
        throw new Error(
          `Failed to load published posts: ${countError.message}`
        )
      }

      return {
        posts: [],
        totalCount: fallbackCount ?? 0,
        page,
        pageSize,
      }
    }

    throw new Error(`Failed to load published posts: ${error.message}`)
  }

  return {
    posts: (data ?? []).map((row) =>
      mapPostSummary(row as unknown as PostSummaryRow)
    ),
    totalCount: count ?? 0,
    page,
    pageSize,
  }
}

export async function getFeaturedPost(): Promise<PostSummary | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(POST_SUMMARY_COLUMNS)
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(1)

  if (error) {
    throw new Error(`Failed to load featured post: ${error.message}`)
  }

  const row = (data ?? [])[0]

  return row ? mapPostSummary(row as unknown as PostSummaryRow) : null
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(POST_DETAIL_COLUMNS)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to load post "${slug}": ${error.message}`)
  }

  return data ? mapPostDetail(data as unknown as PostDetailRow) : null
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, name, description')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(`Failed to load categories: ${error.message}`)
  }

  return data ?? []
}

export async function getTags(): Promise<Tag[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tags')
    .select('id, slug, name')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(`Failed to load tags: ${error.message}`)
  }

  return data ?? []
}

export async function getBlogSettings(): Promise<BlogSettings> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_settings')
    .select('blog_title, blog_description, default_seo_image_url')
    .eq('id', 1)
    .single()

  if (error) {
    throw new Error(`Failed to load blog settings: ${error.message}`)
  }

  return {
    blogTitle: data.blog_title,
    blogDescription: data.blog_description,
    defaultSeoImageUrl: data.default_seo_image_url,
  }
}
