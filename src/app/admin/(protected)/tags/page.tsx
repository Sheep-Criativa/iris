import { getTagsWithPostCount } from '@/modules/admin/data/tags.admin.data'
import { createTag, updateTag, deleteTag } from '@/modules/admin/actions/tags.actions'
import { TagDialog } from '@/modules/admin/components/tag-dialog'
import { ConfirmDeleteDialog } from '@/modules/admin/components/confirm-delete-dialog'

export default async function AdminTagsPage() {
  const tags = await getTagsWithPostCount()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tags</h1>
        <TagDialog action={createTag} triggerLabel="Nova tag" dialogTitle="Nova tag" />
      </div>
      {tags.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma tag ainda.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="py-2 pr-4 font-medium">Nome</th>
              <th className="py-2 pr-4 font-medium">Slug</th>
              <th className="py-2 pr-4 font-medium">Posts</th>
              <th className="py-2 pr-4 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="border-b border-gray-100">
                <td className="py-2 pr-4 font-medium text-gray-900">{tag.name}</td>
                <td className="py-2 pr-4 text-gray-600">{tag.slug}</td>
                <td className="py-2 pr-4 text-gray-600">{tag.postCount}</td>
                <td className="py-2 pr-4">
                  <div className="flex items-center gap-3">
                    <TagDialog
                      action={updateTag.bind(null, tag.id)}
                      triggerLabel="Editar"
                      dialogTitle="Editar tag"
                      initialTag={tag}
                    />
                    <ConfirmDeleteDialog
                      triggerLabel="Excluir"
                      title="Excluir tag"
                      description={`"${tag.name}" está em ${tag.postCount} post(s). Excluir a tag remove essa marcação dos posts. Continuar?`}
                      onConfirm={() => deleteTag(tag.id)}
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
