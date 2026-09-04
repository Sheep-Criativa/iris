import { notFound } from 'next/navigation'
import { getCategories, getTags } from '@/modules/blog/data/posts.data'
import { getPostForEdit } from '@/modules/admin/data/posts.admin.data'
import { updatePost } from '@/modules/admin/actions/posts.actions'
import { PostForm } from '@/modules/admin/components/post-form'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [categories, tags, post] = await Promise.all([
    getCategories(),
    getTags(),
    getPostForEdit(id),
  ])

  if (!post) {
    notFound()
  }

  const action = updatePost.bind(null, id)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Editar post</h1>
      <PostForm action={action} categories={categories} tags={tags} initialPost={post} />
    </div>
  )
}
