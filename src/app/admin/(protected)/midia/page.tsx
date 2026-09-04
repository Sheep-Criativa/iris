import { getAllMedia } from '@/modules/admin/data/media.admin.data'
import { MediaUploadForm } from '@/modules/admin/components/media-upload-form'
import { MediaItem } from '@/modules/admin/components/media-item'

export default async function AdminMediaPage() {
  const media = await getAllMedia()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Mídia</h1>
      <MediaUploadForm />
      {media.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma imagem enviada ainda.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <MediaItem key={item.id} media={item} />
          ))}
        </div>
      )}
    </div>
  )
}
