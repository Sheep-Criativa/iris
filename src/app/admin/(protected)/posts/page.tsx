import Link from 'next/link'
import {
  Plus,
  FileCheck2,
  Sparkles,
  ExternalLink,
  Pencil,
} from 'lucide-react'
import { getAllPostsForAdmin } from '@/modules/admin/data/posts.admin.data'
import { DeletePostButton } from '@/modules/admin/components/delete-post-button'

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin()
  const publishedCount = posts.filter((p) => p.status === 'published').length
  const draftCount = posts.filter((p) => p.status === 'draft').length
  const featuredCount = posts.filter((p) => p.isFeatured).length

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Posts & Artigos
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Gerencie todas as publicações, rascunhos e destaques do blog
          </p>
        </div>

        <Link
          href="/admin/posts/novo"
          className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Post</span>
        </Link>
      </div>

      {/* Quick Pastel Filter / Metric Pills */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400">Total</span>
          <p className="text-2xl font-bold text-slate-900">{posts.length}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-600">Publicados</span>
          <p className="text-2xl font-bold text-emerald-700">{publishedCount}</p>
        </div>
        <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-rose-600">Rascunhos</span>
          <p className="text-2xl font-bold text-rose-700">{draftCount}</p>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-amber-600">Em Destaque</span>
          <p className="text-2xl font-bold text-amber-700">{featuredCount}</p>
        </div>
      </div>

      {/* Main Posts Table in Rounded-3xl Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <FileCheck2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-800">
              Nenhum post encontrado
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Comece agora criando seu primeiro artigo para os estudantes de Psicologia.
            </p>
            <Link
              href="/admin/posts/novo"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Criar Primeiro Post</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-semibold text-slate-500">
                  <th className="py-3.5 px-6">Título</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Categoria</th>
                  <th className="py-3.5 px-4">Destaque</th>
                  <th className="py-3.5 px-4">Atualizado em</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <Link
                        href={`/admin/posts/${post.id}/editar`}
                        className="hover:text-emerald-600 transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      <span className="text-[11px] font-normal text-slate-400">
                        /{post.slug}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          post.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            post.status === 'published' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      {post.categoryName ? (
                        <span className="inline-flex rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200">
                          {post.categoryName}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      {post.isFeatured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          Destaque
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500">
                      {new Date(post.updatedAt).toLocaleDateString('pt-BR')}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === 'published' && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                            title="Ver post público"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.id}/editar`}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                        >
                          <Pencil className="h-3 w-3" />
                          <span>Editar</span>
                        </Link>
                        <DeletePostButton postId={post.id} postTitle={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

