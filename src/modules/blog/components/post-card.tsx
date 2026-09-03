import Link from 'next/link'
import type { PostSummary } from '@/modules/blog/types/blog.types'
import { CategoryBadge } from './category-badge'
import { TagBadge } from './tag-badge'

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#E0CEB7] bg-[#FCF7F0] shadow-sm transition-shadow hover:shadow-md">
      {post.coverImageUrl && (
        <Link
          href={`/blog/${post.slug}`}
          className="block aspect-[16/9] overflow-hidden"
        >
          {/* next/image fica para a Fase 3 (otimização de imagens) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.category && <CategoryBadge category={post.category} />}
          {post.isFeatured && (
            <span className="rounded-full bg-[#F5D98C] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#291F1A]">
              Destaque
            </span>
          )}
        </div>
        <h2 className="font-display text-xl font-bold tracking-tight text-[#291F1A]">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-[#C35A38]"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-[#6B5B52]">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
