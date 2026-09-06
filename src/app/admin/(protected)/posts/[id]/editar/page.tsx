import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getCategories, getTags } from '@/modules/blog/data/posts.data'
import { getPostForEdit } from '@/modules/admin/data/posts.admin.data'
import { getAllMedia } from '@/modules/admin/data/media.admin.data'
import { updatePost } from '@/modules/admin/actions/posts.actions'
import { PostForm } from '@/modules/admin/components/post-form'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [categories, tags, media, post] = await Promise.all([
    getCategories(),
    getTags(),
    getAllMedia(),
    getPostForEdit(id),
  ])

  if (!post) {
    notFound()
  }

  const action = updatePost.bind(null, id)

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
            Editar Artigo
          </h1>
          <p className="text-xs text-slate-500">
            Atualize o conteúdo, dados de publicação ou configurações de SEO
          </p>
        </div>
      </div>

      <PostForm action={action} categories={categories} tags={tags} media={media} initialPost={post} />
    </div>
  )
}
