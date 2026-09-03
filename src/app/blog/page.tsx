import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogNav } from '@/modules/blog/components/blog-nav'
import { PostList } from '@/modules/blog/components/post-list'
import { PostCard } from '@/modules/blog/components/post-card'
import { CategoryBadge } from '@/modules/blog/components/category-badge'
import { TagBadge } from '@/modules/blog/components/tag-badge'
import {
  getBlogSettings,
  getCategories,
  getFeaturedPost,
  getPublishedPosts,
  getTags,
} from '@/modules/blog/data/posts.data'

const PAGE_SIZE = 9

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSettings()
  return {
    title: settings.blogTitle,
    description: settings.blogDescription ?? undefined,
  }
}

function buildPageHref(page: number, categorySlug?: string, tagSlug?: string) {
  const qs = new URLSearchParams()
  if (categorySlug) qs.set('categoria', categorySlug)
  if (tagSlug) qs.set('tag', tagSlug)
  qs.set('pagina', String(page))
  return `/blog?${qs.toString()}`
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const categorySlug =
    typeof params.categoria === 'string' ? params.categoria : undefined
  const tagSlug = typeof params.tag === 'string' ? params.tag : undefined
  const parsedPage =
    typeof params.pagina === 'string' ? Number(params.pagina) : NaN
  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage >= 1 ? Math.floor(parsedPage) : 1

  const isFirstUnfilteredPage =
    requestedPage === 1 && !categorySlug && !tagSlug

  const [settings, categories, tags, { posts, totalCount, page, pageSize }, fetchedFeaturedPost] =
    await Promise.all([
      getBlogSettings(),
      getCategories(),
      getTags(),
      getPublishedPosts({
        categorySlug,
        tagSlug,
        page: requestedPage,
        pageSize: PAGE_SIZE,
      }),
      isFirstUnfilteredPage ? getFeaturedPost() : Promise.resolve(null),
    ])

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const featuredPost =
    isFirstUnfilteredPage && fetchedFeaturedPost ? fetchedFeaturedPost : undefined
  const remainingPosts = featuredPost
    ? posts.filter((post) => post.id !== featuredPost.id)
    : posts

  return (
    <div className="min-h-screen bg-[#F3E6D3] text-[#291F1A]">
      <BlogNav blogTitle={settings.blogTitle} />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-10 flex flex-col gap-3">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {settings.blogTitle}
          </h1>
          {settings.blogDescription && (
            <p className="max-w-2xl text-[#6B5B52]">
              {settings.blogDescription}
            </p>
          )}
        </header>

        {(categories.length > 0 || tags.length > 0) && (
          <div className="mb-10 flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <Link key={category.id} href={`/blog?categoria=${category.slug}`}>
                <CategoryBadge category={category} />
              </Link>
            ))}
            {tags.map((tag) => (
              <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                <TagBadge tag={tag} />
              </Link>
            ))}
            {(categorySlug || tagSlug) && (
              <Link
                href="/blog"
                className="text-xs font-medium text-[#C35A38] underline underline-offset-2"
              >
                Limpar filtro
              </Link>
            )}
          </div>
        )}

        {featuredPost && (
          <section className="mb-12">
            <div className="grid grid-cols-1">
              <PostCard post={featuredPost} />
            </div>
          </section>
        )}

        {(!featuredPost || remainingPosts.length > 0) && (
          <PostList posts={remainingPosts} />
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-4 text-sm font-medium">
            {page > 1 && (
              <Link
                href={buildPageHref(page - 1, categorySlug, tagSlug)}
                className="rounded-full border border-[#E0CEB7] px-4 py-2 text-[#291F1A] transition-colors hover:border-[#C35A38] hover:text-[#C35A38]"
              >
                ← Anterior
              </Link>
            )}
            <span className="text-[#6B5B52]">
              Página {page} de {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={buildPageHref(page + 1, categorySlug, tagSlug)}
                className="rounded-full border border-[#E0CEB7] px-4 py-2 text-[#291F1A] transition-colors hover:border-[#C35A38] hover:text-[#C35A38]"
              >
                Próxima →
              </Link>
            )}
          </nav>
        )}
      </main>
    </div>
  )
}
