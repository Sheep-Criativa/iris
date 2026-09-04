'use client'

import { ConfirmDeleteDialog } from './confirm-delete-dialog'
import { deletePost } from '@/modules/admin/actions/posts.actions'

export function DeletePostButton({
  postId,
  postTitle,
}: {
  postId: string
  postTitle: string
}) {
  return (
    <ConfirmDeleteDialog
      triggerLabel="Excluir"
      title="Excluir post"
      description={`Tem certeza que quer excluir "${postTitle}"? Essa ação não pode ser desfeita.`}
      onConfirm={() => deletePost(postId)}
    />
  )
}
