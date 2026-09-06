import { getCategoriesWithPostCount } from '@/modules/admin/data/categories.admin.data'
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/modules/admin/actions/categories.actions'
import { CategoryDialog } from '@/modules/admin/components/category-dialog'
import { ConfirmDeleteDialog } from '@/modules/admin/components/confirm-delete-dialog'
import { FolderTree, Layers } from 'lucide-react'

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithPostCount()
  const totalPostsInCategories = categories.reduce((acc, c) => acc + c.postCount, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Categorias
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Grandes áreas temáticas para organizar os artigos e orientações do blog
          </p>
        </div>

        <CategoryDialog
          action={createCategory}
          triggerLabel="+ Nova Categoria"
          triggerClassName="inline-flex items-center gap-2 self-start rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
          dialogTitle="Nova Categoria"
        />
      </div>

      {/* Metric Pills */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400">Total de Categorias</span>
          <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
        </div>
        <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-purple-600">Artigos Vinculados</span>
          <p className="text-2xl font-bold text-purple-700">{totalPostsInCategories}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-600">Média por Categoria</span>
          <p className="text-2xl font-bold text-emerald-700">
            {categories.length > 0 ? (totalPostsInCategories / categories.length).toFixed(1) : '0'}
          </p>
        </div>
      </div>

      {/* Main Table in Rounded-3xl Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        {categories.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <FolderTree className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-800">
              Nenhuma categoria cadastrada
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Crie categorias como &quot;Prática Clínica&quot;, &quot;Estágios &amp; TCC&quot; ou &quot;Ética Profissional&quot;.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-semibold text-slate-500">
                  <th className="py-3.5 px-6">Nome</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Descrição</th>
                  <th className="py-3.5 px-4">Posts</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                          <Layers className="h-3.5 w-3.5" />
                        </span>
                        <span>{category.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-mono text-slate-400">
                      {category.slug}
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-500 max-w-xs truncate">
                      {category.description ?? '—'}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                        {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <CategoryDialog
                          action={updateCategory.bind(null, category.id)}
                          triggerLabel="Editar"
                          triggerClassName="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                          dialogTitle="Editar Categoria"
                          initialCategory={category}
                        />
                        <ConfirmDeleteDialog
                          triggerLabel="Excluir"
                          title="Excluir Categoria"
                          description={`"${category.name}" está vinculada a ${category.postCount} post(s). Os posts não serão apagados. Deseja prosseguir?`}
                          onConfirm={deleteCategory.bind(null, category.id)}
                        />
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
