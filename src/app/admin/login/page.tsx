import type { Metadata } from 'next'
import { LoginForm } from '@/modules/admin/components/login-form'

export const metadata: Metadata = {
  title: 'Login — Admin',
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-xl font-semibold text-gray-900">Acessar o admin</h1>
        <LoginForm />
      </div>
    </main>
  )
}
