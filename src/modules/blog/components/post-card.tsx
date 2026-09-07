import Link from 'next/link'
import type { PostSummary } from '@/modules/blog/types/blog.types'
import { SparkleStarIcon, SunburstIcon } from '@/modules/portfolio/components/aconchego-icons'

export function PostCard({ post }: { post: PostSummary }) {
  const categoryName = post.category?.name ?? 'Reflexões'

  return (
    <article className="group flex flex-col transition-all duration-300">
      {/* Editorial Vertical / Portrait Cover Image (Showit 3-Column Template) */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#E0CEB7] bg-[#FCF7F0] shadow-2xs transition-all duration-500 group-hover:shadow-lg group-hover:border-[#C35A38]/50"
      >
        {post.coverImageUrl ? (
          <div className="relative h-full w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ) : (
          /* Editorial Graphic Placeholder for posts without cover */
          <div className="relative flex h-full w-full flex-col justify-between p-3 sm:p-5 lg:p-7 bg-gradient-to-br from-[#FAF4ED] via-[#F5D98C]/20 to-[#E8A76F]/30 overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#FAF4ED] px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-[#C35A38] border border-[#E0CEB7] truncate max-w-[80%]">
                {categoryName}
              </span>
              <SunburstIcon size={16} className="text-[#C35A38] animate-spin-slow opacity-60 shrink-0 sm:scale-125" />
            </div>

            <div className="my-auto py-1 sm:py-3">
              <p className="font-handwriting text-xs sm:text-xl lg:text-2xl text-[#C35A38] -rotate-2 line-clamp-1">
                Caderno de Psicologia
              </p>
              <h3 className="mt-0.5 sm:mt-2 font-display text-xs sm:text-lg lg:text-2xl font-bold leading-tight sm:leading-tight text-[#291F1A] line-clamp-3">
                {post.title}
              </h3>
            </div>

            <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-[#6B5B52]">
              <span className="truncate">Iris Amanda</span>
              <SparkleStarIcon size={12} className="text-[#E8A76F] shrink-0 sm:scale-125" />
            </div>
          </div>
        )}

        {/* Featured Badge Overlay */}
        {post.isFeatured && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full bg-[#291F1A]/85 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[#FAF4ED] shadow-sm">
            Destaque
          </span>
        )}
      </Link>

      {/* Editorial Content Below Image (Showit Template Style) */}
      <div className="flex flex-col pt-2.5 sm:pt-4 space-y-1 sm:space-y-2">
        {/* Category Tag (Uppercase Tracking-widest) */}
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#C35A38]">
          {categoryName}
        </span>

        {/* Post Title in Editorial Serif */}
        <h2 className="font-display text-xs sm:text-base lg:text-xl font-bold tracking-tight text-[#291F1A] leading-snug transition-colors group-hover:text-[#C35A38]">
          <Link href={`/blog/${post.slug}`} className="line-clamp-2">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-[11px] sm:text-xs lg:text-sm text-[#6B5B52] leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal">
            {post.excerpt}
          </p>
        )}

        {/* Footer Meta: Published date + read link */}
        <div className="pt-1 sm:pt-2 flex items-center justify-between text-[10px] sm:text-xs text-[#6B5B52]/80">
          {post.publishedAt ? (
            <time dateTime={post.publishedAt} className="text-[9px] sm:text-[11px] uppercase tracking-wider">
              {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
              })}
            </time>
          ) : (
            <span className="text-[9px] sm:text-[11px] uppercase tracking-wider">Recente</span>
          )}

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-bold text-[#C35A38] hover:underline"
          >
            <span>Ler</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
