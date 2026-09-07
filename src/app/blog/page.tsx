import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogNav } from '@/modules/blog/components/blog-nav'
import { BlogBannerSlider } from '@/modules/blog/components/blog-banner-slider'
import { BlogFilterBar } from '@/modules/blog/components/blog-filter-bar'
import { PostList } from '@/modules/blog/components/post-list'
import { SunburstIcon, WarmHeartIcon } from '@/modules/portfolio/components/aconchego-icons'
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
    title: `${settings.blogTitle} — Diário & Caderno de Psicologia | Iris Amanda`,
    description:
      settings.blogDescription ??
      'Reflexões sobre a prática clínica, vivências acadêmicas na UNAMA, Recursos Humanos e o desenvolvimento humano.',
  }
}

function buildPageHref(
  page: number,
  categorySlug?: string,
  tagSlug?: string,
  search?: string
) {
  const qs = new URLSearchParams()
  if (categorySlug) qs.set('categoria', categorySlug)
  if (tagSlug) qs.set('tag', tagSlug)
  if (search) qs.set('busca', search)
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
  const searchQuery =
    typeof params.busca === 'string' ? params.busca.trim().toLowerCase() : undefined
  const parsedPage =
    typeof params.pagina === 'string' ? Number(params.pagina) : NaN
  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage >= 1 ? Math.floor(parsedPage) : 1

  const isFirstUnfilteredPage =
    requestedPage === 1 && !categorySlug && !tagSlug && !searchQuery

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

  // Se houver busca por texto, filtra os posts retornados
  const displayPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.excerpt.toLowerCase().includes(searchQuery) ||
          (p.category?.name && p.category.name.toLowerCase().includes(searchQuery))
      )
    : posts

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  return (
    <div className="min-h-screen bg-[#F3E6D3] text-[#291F1A] flex flex-col justify-between">
      <div>
        <BlogNav blogTitle="The Journal - Iris" />

        <main className="mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-24">
          {/* Banner Slider / Carousel in Top Area (Requested by User: Large Format, Pure Image) */}
          {isFirstUnfilteredPage && <BlogBannerSlider />}

          {/* Categories & Search Bar (Showit Filter Strip) */}
          <BlogFilterBar
            categories={categories}
            activeCategorySlug={categorySlug}
          />

          {/* Search or Filter Feedback */}
          {searchQuery && (
            <div className="mb-8 flex items-center justify-between rounded-2xl bg-[#FAF4ED] p-4 border border-[#E0CEB7]">
              <p className="text-sm text-[#291F1A]">
                Exibindo resultados para a busca:{' '}
                <span className="font-bold text-[#C35A38]">"{searchQuery}"</span>
              </p>
              <Link
                href="/blog"
                className="text-xs font-bold text-[#C35A38] uppercase tracking-wider hover:underline"
              >
                Limpar busca &times;
              </Link>
            </div>
          )}

          {/* Editorial 3-Column Posts Grid */}
          <section id="artigos" className="scroll-mt-24">
            <PostList posts={displayPosts} />

            {/* Editorial Pagination (Showit Style: < OLDER POSTS | NEWER POSTS >) */}
            {totalPages > 1 && (
              <nav
                className="mt-14 sm:mt-20 border-t border-[#E0CEB7]/80 pt-8 flex items-center justify-center gap-6 text-xs sm:text-sm font-semibold uppercase tracking-widest"
                aria-label="Paginação do diário"
              >
                {page > 1 ? (
                  <Link
                    href={buildPageHref(page - 1, categorySlug, tagSlug, searchQuery)}
                    className="text-[#6B5B52] hover:text-[#C35A38] transition-colors"
                  >
                    &larr; Posts Anteriores
                  </Link>
                ) : (
                  <span className="text-[#6B5B52]/40 pointer-events-none">
                    &larr; Posts Anteriores
                  </span>
                )}

                <span className="text-[#291F1A] border-x border-[#E0CEB7] px-4 sm:px-6">
                  Página {page} de {totalPages}
                </span>

                {page < totalPages ? (
                  <Link
                    href={buildPageHref(page + 1, categorySlug, tagSlug, searchQuery)}
                    className="text-[#6B5B52] hover:text-[#C35A38] transition-colors"
                  >
                    Próximos Posts &rarr;
                  </Link>
                ) : (
                  <span className="text-[#6B5B52]/40 pointer-events-none">
                    Próximos Posts &rarr;
                  </span>
                )}
              </nav>
            )}
          </section>
        </main>
      </div>

      {/* Editorial Grounded Footer */}
      <footer className="border-t border-[#E0CEB7] bg-[#FAF4ED] py-6 sm:py-8 text-xs text-[#6B5B52]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <SunburstIcon size={18} className="text-[#C35A38] shrink-0" />
            <span className="font-display text-sm sm:text-base font-bold text-[#291F1A]">
              Iris Amanda
            </span>
            <span>— The Journal • Caderno de Psicologia</span>
            <WarmHeartIcon size={14} className="text-[#C35A38] shrink-0" />
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <span>© 2026 Ecossistema Iris. Todos os direitos reservados.</span>
            <Link
              href="/portfolio"
              className="font-bold text-[#C35A38] hover:underline"
            >
              Voltar ao Portfólio &uarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
