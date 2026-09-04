import { getCategoriesWithPostCount } from '@/modules/admin/data/categories.admin.data'
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/modules/admin/actions/categories.actions'
import { CategoryDialog } from '@/modules/admin/components/category-dialog'
import { ConfirmDeleteDialog } from '@/modules/admin/components/confirm-delete-dialog'

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithPostCount()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Categorias</h1>
        <CategoryDialog
          action={createCategory}
          triggerLabel="Nova categoria"
          dialogTitle="Nova categoria"
        />
      </div>
      {categories.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma categoria ainda.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="py-2 pr-4 font-medium">Nome</th>
              <th className="py-2 pr-4 font-medium">Slug</th>
              <th className="py-2 pr-4 font-medium">Descrição</th>
              <th className="py-2 pr-4 font-medium">Posts</th>
              <th className="py-2 pr-4 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-100">
                <td className="py-2 pr-4 font-medium text-gray-900">{category.name}</td>
                <td className="py-2 pr-4 text-gray-600">{category.slug}</td>
                <td className="py-2 pr-4 text-gray-600">{category.description ?? '—'}</td>
                <td className="py-2 pr-4 text-gray-600">{category.postCount}</td>
                <td className="py-2 pr-4">
                  <div className="flex items-center gap-3">
                    <CategoryDialog
                      action={updateCategory.bind(null, category.id)}
                      triggerLabel="Editar"
                      dialogTitle="Editar categoria"
                      initialCategory={category}
                    />
                    <ConfirmDeleteDialog
                      triggerLabel="Excluir"
                      title="Excluir categoria"
                      description={`"${category.name}" está em ${category.postCount} post(s). Excluir a categoria não apaga os posts — eles ficam sem categoria. Continuar?`}
                      onConfirm={() => deleteCategory(category.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
