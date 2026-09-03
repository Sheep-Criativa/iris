'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deletePost } from '@/modules/admin/actions/posts.actions'

export function DeletePostButton({
  postId,
  postTitle,
}: {
  postId: string
  postTitle: string
}) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm() {
    setPending(true)
    setError(null)
    try {
      await deletePost(postId)
      setOpen(false)
    } catch {
      setError('Falha ao excluir o post. Tente novamente.')
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-sm font-medium text-red-600 hover:underline">
        Excluir
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir post</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Tem certeza que quer excluir &quot;{postTitle}&quot;? Essa ação não pode ser
          desfeita.
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <DialogFooter>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={pending}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {pending ? 'Excluindo…' : 'Excluir'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
