import type { PostSummary } from '@/modules/blog/types/blog.types'
import { PostCard } from './post-card'
import { SunburstIcon } from '@/modules/portfolio/components/aconchego-icons'

export function PostList({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) {
    return (
      <div className="my-12 rounded-3xl border border-dashed border-[#E0CEB7] bg-[#FAF4ED]/60 px-6 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF4ED] text-[#C35A38] shadow-xs mb-3">
          <SunburstIcon size={24} />
        </div>
        <p className="font-display text-xl font-bold text-[#291F1A]">
          Nenhum artigo encontrado nesta categoria
        </p>
        <p className="mt-2 text-sm text-[#6B5B52] max-w-md mx-auto">
          Explore outras categorias ou volte para visualizar todos os artigos do diário.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-10 xl:gap-12 items-start">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
