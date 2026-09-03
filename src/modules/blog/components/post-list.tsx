import type { PostSummary } from '@/modules/blog/types/blog.types'
import { PostCard } from './post-card'

export function PostList({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#E0CEB7] bg-[#FAF4ED] px-6 py-16 text-center">
        <p className="font-display text-lg font-semibold text-[#291F1A]">
          Nenhum post por aqui ainda
        </p>
        <p className="mt-2 text-sm text-[#6B5B52]">
          Volte em breve para novos conteúdos.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
