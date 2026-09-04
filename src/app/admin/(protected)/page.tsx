import Link from 'next/link'
import { getAllPostsForAdmin } from '@/modules/admin/data/posts.admin.data'

export default async function AdminDashboardPage() {
  const posts = await getAllPostsForAdmin()
  const publishedCount = posts.filter((post) => post.status === 'published').length
  const draftCount = posts.filter((post) => post.status === 'draft').length

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="flex gap-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-500">Publicados</p>
          <p className="text-3xl font-semibold text-gray-900">{publishedCount}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-500">Rascunhos</p>
          <p className="text-3xl font-semibold text-gray-900">{draftCount}</p>
        </div>
      </div>
      <Link
        href="/admin/posts/novo"
        className="w-fit rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Novo post
      </Link>
    </div>
  )
}
