import { getAllMedia } from '@/modules/admin/data/media.admin.data'
import { MediaUploadForm } from '@/modules/admin/components/media-upload-form'
import { MediaItem } from '@/modules/admin/components/media-item'
import { Image as ImageIcon } from 'lucide-react'

export default async function AdminMediaPage() {
  const media = await getAllMedia()
  const usedMediaCount = media.filter((m) => m.usedByPostCount > 0).length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Biblioteca de Mídia
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Envie e gerencie imagens para capas de artigos e ilustrações do blog
        </p>
      </div>

      {/* Summary Pills */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400">Total de Arquivos</span>
          <p className="text-2xl font-bold text-slate-900">{media.length}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-600">Em Uso nos Posts</span>
          <p className="text-2xl font-bold text-emerald-700">{usedMediaCount}</p>
        </div>
        <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-sky-600">Disponíveis</span>
          <p className="text-2xl font-bold text-sky-700">{media.length - usedMediaCount}</p>
        </div>
      </div>

      {/* Upload Zone */}
      <MediaUploadForm />

      {/* Media Grid */}
      {media.length === 0 ? (
        <div className="rounded-3xl border border-slate-100 bg-white py-16 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
            <ImageIcon className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-800">
            Nenhuma imagem na biblioteca
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Envie sua primeira foto ou ilustração pelo formulário acima.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {media.map((item) => (
            <MediaItem key={item.id} media={item} />
          ))}
        </div>
      )}
    </div>
  )
}
