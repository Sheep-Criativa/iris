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
      <h1 className="text-2xl font-semibold text-gray-900">Novo post</h1>
      <PostForm action={createPost} categories={categories} tags={tags} media={media} />
    </div>
  )
}
