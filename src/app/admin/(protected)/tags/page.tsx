import { getTagsWithPostCount } from '@/modules/admin/data/tags.admin.data'
import { createTag, updateTag, deleteTag } from '@/modules/admin/actions/tags.actions'
import { TagDialog } from '@/modules/admin/components/tag-dialog'
import { ConfirmDeleteDialog } from '@/modules/admin/components/confirm-delete-dialog'
import { Tag as TagIcon } from 'lucide-react'

export default async function AdminTagsPage() {
  const tags = await getTagsWithPostCount()

  const PASTEL_TAG_COLORS = [
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-sky-50 text-sky-700 border-sky-200',
    'bg-rose-50 text-rose-700 border-rose-200',
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Tags
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Palavras-chave e rótulos específicos para indexar e conectar artigos
          </p>
        </div>

        <TagDialog
          action={createTag}
          triggerLabel="+ Nova Tag"
          triggerClassName="inline-flex items-center gap-2 self-start rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
          dialogTitle="Nova Tag"
        />
      </div>

      {/* Visual Pastel Tag Cloud Card */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Nuvem de Tags Ativas ({tags.length})
        </h2>
        {tags.length === 0 ? (
          <p className="mt-3 text-xs text-slate-500">Nenhuma tag cadastrada ainda.</p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2.5">
            {tags.map((tag, idx) => {
              const colorClass = PASTEL_TAG_COLORS[idx % PASTEL_TAG_COLORS.length]
              return (
                <span
                  key={tag.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold border ${colorClass} transition-transform hover:scale-105`}
                >
                  <span>#{tag.name}</span>
                  <span className="rounded-full bg-white/70 px-1.5 py-0.2 text-[10px] font-bold">
                    {tag.postCount}
                  </span>
                </span>
              )
            })}
          </div>
        )}
      </div>

      {/* Main Table in Rounded-3xl Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        {tags.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <TagIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-800">
              Nenhuma tag cadastrada
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Crie tags como #SupervisãoClínica, #ManejoDeCrise ou #PrimeirosCasos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-semibold text-slate-500">
                  <th className="py-3.5 px-6">Nome</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Posts Vinculados</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tags.map((tag) => (
                  <tr
                    key={tag.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                          <TagIcon className="h-3.5 w-3.5" />
                        </span>
                        <span>#{tag.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-mono text-slate-400">
                      {tag.slug}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700 border border-purple-200">
                        {tag.postCount} {tag.postCount === 1 ? 'post' : 'posts'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <TagDialog
                          action={updateTag.bind(null, tag.id)}
                          triggerLabel="Editar"
                          triggerClassName="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                          dialogTitle="Editar Tag"
                          initialTag={tag}
                        />
                        <ConfirmDeleteDialog
                          triggerLabel="Excluir"
                          title="Excluir Tag"
                          description={`"${tag.name}" está em ${tag.postCount} post(s). A exclusão removerá essa marcação dos artigos. Deseja prosseguir?`}
                          onConfirm={deleteTag.bind(null, tag.id)}
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
