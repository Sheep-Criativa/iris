import 'server-only'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function verifySession() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.id !== process.env.ADMIN_USER_ID) {
    redirect('/admin/login')
  }

  return user
}
