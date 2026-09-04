'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { verifySession } from '@/modules/admin/lib/auth'

export interface SettingsFormState {
  error?: string
}

export async function updateBlogSettings(
  _prevState: SettingsFormState | undefined,
  formData: FormData
): Promise<SettingsFormState> {
  await verifySession()

  const blogTitle = String(formData.get('blogTitle') ?? '').trim()
  const blogDescription = String(formData.get('blogDescription') ?? '').trim() || null
  const defaultSeoImageUrl = String(formData.get('defaultSeoImageUrl') ?? '') || null

  if (!blogTitle) {
    return { error: 'Preencha o título do blog.' }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('blog_settings')
    .update({
      blog_title: blogTitle,
      blog_description: blogDescription,
      default_seo_image_url: defaultSeoImageUrl,
    })
    .eq('id', 1)

  if (error) {
    return { error: `Falha ao salvar configurações: ${error.message}` }
  }

  revalidatePath('/blog')
  revalidatePath('/admin/configuracoes')
  return {}
}
