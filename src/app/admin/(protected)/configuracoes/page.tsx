import { getBlogSettings } from '@/modules/blog/data/posts.data'
import { getAllMedia } from '@/modules/admin/data/media.admin.data'
import { SettingsForm } from '@/modules/admin/components/settings-form'

export default async function AdminSettingsPage() {
  const [settings, media] = await Promise.all([getBlogSettings(), getAllMedia()])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Configurações do blog</h1>
      <SettingsForm initialSettings={settings} media={media} />
    </div>
  )
}
