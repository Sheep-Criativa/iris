'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { verifySession } from '@/modules/admin/lib/auth'

export interface TagFormState {
  error?: string
}

export async function createTag(
  _prevState: TagFormState | undefined,
  formData: FormData
): Promise<TagFormState> {
  await verifySession()

  const name = String(formData.get('name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim()

  if (!name || !slug) {
    return { error: 'Preencha nome e slug.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('tags').insert({ name, slug })

  if (error) {
    return { error: `Falha ao criar tag: ${error.message}` }
  }

  revalidatePath('/blog')
  revalidatePath('/admin/tags')
  return {}
}

export async function updateTag(
  id: string,
  _prevState: TagFormState | undefined,
  formData: FormData
): Promise<TagFormState> {
  await verifySession()

  const name = String(formData.get('name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim()

  if (!name || !slug) {
    return { error: 'Preencha nome e slug.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('tags').update({ name, slug }).eq('id', id)

  if (error) {
    return { error: `Falha ao atualizar tag: ${error.message}` }
  }

  revalidatePath('/blog')
  revalidatePath('/admin/tags')
  return {}
}

export async function deleteTag(id: string) {
  await verifySession()

  const supabase = await createClient()
  const { error } = await supabase.from('tags').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete tag: ${error.message}`)
  }

  revalidatePath('/blog')
  revalidatePath('/admin/tags')
}
