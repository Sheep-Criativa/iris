'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { verifySession } from '@/modules/admin/lib/auth'

export interface CategoryFormState {
  error?: string
}

export async function createCategory(
  _prevState: CategoryFormState | undefined,
  formData: FormData
): Promise<CategoryFormState> {
  await verifySession()

  const name = String(formData.get('name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim() || null

  if (!name || !slug) {
    return { error: 'Preencha nome e slug.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('categories').insert({ name, slug, description })

  if (error) {
    if (error.code === '23505') {
      return { error: 'Já existe uma categoria com esse slug.' }
    }
    return { error: `Falha ao criar categoria: ${error.message}` }
  }

  revalidatePath('/blog')
  revalidatePath('/admin/categorias')
  return {}
}

export async function updateCategory(
  id: string,
  _prevState: CategoryFormState | undefined,
  formData: FormData
): Promise<CategoryFormState> {
  await verifySession()

  const name = String(formData.get('name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim() || null

  if (!name || !slug) {
    return { error: 'Preencha nome e slug.' }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .update({ name, slug, description })
    .eq('id', id)

  if (error) {
    if (error.code === '23505') {
      return { error: 'Já existe uma categoria com esse slug.' }
    }
    return { error: `Falha ao atualizar categoria: ${error.message}` }
  }

  revalidatePath('/blog')
  revalidatePath('/admin/categorias')
  return {}
}

export async function deleteCategory(id: string) {
  await verifySession()

  const supabase = await createClient()
  const { error } = await supabase.from('categories').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete category: ${error.message}`)
  }

  revalidatePath('/blog')
  revalidatePath('/admin/categorias')
}
