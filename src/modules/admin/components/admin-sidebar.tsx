import Link from 'next/link'
import { logout } from '@/modules/admin/actions/auth.actions'

export function AdminSidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col justify-between border-r border-gray-200 bg-gray-50 p-4">
      <nav className="flex flex-col gap-1">
        <Link
          href="/admin"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/posts"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Posts
        </Link>
        <Link
          href="/admin/categorias"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Categorias
        </Link>
        <Link
          href="/admin/tags"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Tags
        </Link>
        <Link
          href="/admin/midia"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Mídia
        </Link>
        <Link
          href="/admin/configuracoes"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Configurações
        </Link>
      </nav>
      <form action={logout}>
        <button
          type="submit"
          className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Sair
        </button>
      </form>
    </aside>
  )
}
