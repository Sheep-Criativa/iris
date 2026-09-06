import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCategories, getTags } from '@/modules/blog/data/posts.data'
import { getAllMedia } from '@/modules/admin/data/media.admin.data'
import { createPost } from '@/modules/admin/actions/posts.actions'
import { PostForm } from '@/modules/admin/components/post-form'

export default async function NewPostPage() {
  const [categories, tags, media] = await Promise.all([
    getCategories(),
    getTags(),
    getAllMedia(),
  ])

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/posts"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          title="Voltar para a lista de posts"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Novo Artigo
          </h1>
          <p className="text-xs text-slate-500">
            Crie um novo post com orientações e reflexões para seus alunos e mentorandos
          </p>
        </div>
      </div>

      <PostForm action={createPost} categories={categories} tags={tags} media={media} />
    </div>
  )
}
