import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogNav } from '@/modules/blog/components/blog-nav'
import { CategoryBadge } from '@/modules/blog/components/category-badge'
import { TagBadge } from '@/modules/blog/components/tag-badge'
import { PostBody } from '@/modules/blog/components/post-body'
import { getBlogSettings, getPostBySlug } from '@/modules/blog/data/posts.data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post não encontrado' }
  }

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getBlogSettings(),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#F3E6D3] text-[#291F1A]">
      <BlogNav blogTitle={settings.blogTitle} />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <article>
          <header className="mb-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {post.category && <CategoryBadge category={post.category} />}
              {post.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            {post.publishedAt && (
              <time dateTime={post.publishedAt} className="text-sm text-[#6B5B52]">
                {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            )}
            {post.coverImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="mt-2 aspect-[16/9] w-full rounded-2xl object-cover"
              />
            )}
          </header>
          <PostBody html={post.content} />
        </article>
      </main>
    </div>
  )
}
