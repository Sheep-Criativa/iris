import { getBlogSettings } from '@/modules/blog/data/posts.data'
import { getAllMedia } from '@/modules/admin/data/media.admin.data'
import { SettingsForm } from '@/modules/admin/components/settings-form'

export default async function AdminSettingsPage() {
  const [settings, media] = await Promise.all([getBlogSettings(), getAllMedia()])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Configurações da Plataforma
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Gerencie o título do blog, descrições globais e metadados de compartilhamento
        </p>
      </div>

      <SettingsForm initialSettings={settings} media={media} />
    </div>
  )
}
