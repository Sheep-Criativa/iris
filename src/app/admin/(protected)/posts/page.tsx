import Link from 'next/link'
import { getAllPostsForAdmin } from '@/modules/admin/data/posts.admin.data'
import { DeletePostButton } from '@/modules/admin/components/delete-post-button'

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <Link
          href="/admin/posts/novo"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Novo post
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum post ainda.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="py-2 pr-4 font-medium">Título</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 pr-4 font-medium">Categoria</th>
              <th className="py-2 pr-4 font-medium">Destaque</th>
              <th className="py-2 pr-4 font-medium">Atualizado em</th>
              <th className="py-2 pr-4 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  <Link
                    href={`/admin/posts/${post.id}/editar`}
                    className="font-medium text-gray-900 hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="py-2 pr-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="py-2 pr-4 text-gray-600">{post.categoryName ?? '—'}</td>
                <td className="py-2 pr-4 text-gray-600">{post.isFeatured ? 'Sim' : '—'}</td>
                <td className="py-2 pr-4 text-gray-600">
                  {new Date(post.updatedAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-2 pr-4">
                  <DeletePostButton postId={post.id} postTitle={post.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
