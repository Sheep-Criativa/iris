'use server'

import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { verifySession } from '@/modules/admin/lib/auth'

export interface PostFormState {
  error?: string
}

export async function uploadCoverImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  await verifySession()

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Nenhum arquivo selecionado.' }
  }

  const supabase = await createClient()
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-')
  const path = `covers/${randomUUID()}-${sanitizedName}`

  const { error: uploadError } = await supabase.storage
    .from('blog-media')
    .upload(path, file)

  if (uploadError) {
    return { error: `Falha no upload: ${uploadError.message}` }
  }

  const { data } = supabase.storage.from('blog-media').getPublicUrl(path)

  return { url: data.publicUrl }
}

async function syncPostTags(
  supabase: Awaited<ReturnType<typeof createClient>>,
  postId: string,
  tagIds: string[]
) {
  const { error: deleteError } = await supabase
    .from('post_tags')
    .delete()
    .eq('post_id', postId)

  if (deleteError) {
    throw new Error(`Failed to clear post tags: ${deleteError.message}`)
  }

  if (tagIds.length === 0) {
    return
  }

  const { error: insertError } = await supabase
    .from('post_tags')
    .insert(tagIds.map((tagId) => ({ post_id: postId, tag_id: tagId })))

  if (insertError) {
    throw new Error(`Failed to set post tags: ${insertError.message}`)
  }
}

function readPostFormData(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()
  const categoryId = String(formData.get('categoryId') ?? '') || null
  const coverImageUrl = String(formData.get('coverImageUrl') ?? '') || null
  const status = formData.get('status') === 'published' ? 'published' : 'draft'
  const isFeatured = formData.get('isFeatured') === 'on'
  const seoTitle = String(formData.get('seoTitle') ?? '') || null
  const seoDescription = String(formData.get('seoDescription') ?? '') || null
  const tagIds = formData.getAll('tagIds').map(String)

  return {
    title,
    slug,
    excerpt,
    content,
    categoryId,
    coverImageUrl,
    status: status as 'draft' | 'published',
    isFeatured,
    seoTitle,
    seoDescription,
    tagIds,
  }
}

async function isSlugAvailable(
  supabase: Awaited<ReturnType<typeof createClient>>,
  slug: string,
  excludePostId?: string
) {
  let query = supabase.from('posts').select('id').eq('slug', slug)

  if (excludePostId) {
    query = query.neq('id', excludePostId)
  }

  const { data, error } = await query.maybeSingle()

  if (error) {
    throw new Error(`Failed to check slug uniqueness: ${error.message}`)
  }

  return !data
}

export async function createPost(
  _prevState: PostFormState | undefined,
  formData: FormData
): Promise<PostFormState> {
  await verifySession()

  const fields = readPostFormData(formData)

  if (!fields.title || !fields.slug || !fields.excerpt || !fields.content) {
    return { error: 'Preencha título, slug, resumo e conteúdo.' }
  }

  const supabase = await createClient()

  if (!(await isSlugAvailable(supabase, fields.slug))) {
    return { error: 'Já existe um post com esse slug.' }
  }

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt,
      content: fields.content,
      category_id: fields.categoryId,
      cover_image_url: fields.coverImageUrl,
      status: fields.status,
      is_featured: fields.isFeatured,
      seo_title: fields.seoTitle,
      seo_description: fields.seoDescription,
      published_at: fields.status === 'published' ? new Date().toISOString() : null,
    })
    .select('id, slug')
    .single()

  if (error || !post) {
    return { error: `Falha ao criar post: ${error?.message}` }
  }

  await syncPostTags(supabase, post.id, fields.tagIds)

  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  redirect('/admin/posts')
}

export async function updatePost(
  id: string,
  _prevState: PostFormState | undefined,
  formData: FormData
): Promise<PostFormState> {
  await verifySession()

  const fields = readPostFormData(formData)

  if (!fields.title || !fields.slug || !fields.excerpt || !fields.content) {
    return { error: 'Preencha título, slug, resumo e conteúdo.' }
  }

  const supabase = await createClient()

  if (!(await isSlugAvailable(supabase, fields.slug, id))) {
    return { error: 'Já existe um post com esse slug.' }
  }

  const { data: existing, error: fetchError } = await supabase
    .from('posts')
    .select('slug, published_at')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return { error: 'Post não encontrado.' }
  }

  const publishedAt =
    fields.status === 'published'
      ? (existing.published_at ?? new Date().toISOString())
      : existing.published_at

  const { error } = await supabase
    .from('posts')
    .update({
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt,
      content: fields.content,
      category_id: fields.categoryId,
      cover_image_url: fields.coverImageUrl,
      status: fields.status,
      is_featured: fields.isFeatured,
      seo_title: fields.seoTitle,
      seo_description: fields.seoDescription,
      published_at: publishedAt,
    })
    .eq('id', id)

  if (error) {
    return { error: `Falha ao atualizar post: ${error.message}` }
  }

  await syncPostTags(supabase, id, fields.tagIds)

  revalidatePath('/blog')
  revalidatePath(`/blog/${fields.slug}`)
  if (existing.slug !== fields.slug) {
    revalidatePath(`/blog/${existing.slug}`)
  }
  redirect('/admin/posts')
}

export async function deletePost(id: string) {
  await verifySession()

  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('posts')
    .select('slug')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete post: ${error.message}`)
  }

  revalidatePath('/blog')
  if (existing?.slug) {
    revalidatePath(`/blog/${existing.slug}`)
  }
  revalidatePath('/admin/posts')
}
