'use client'

import { useActionState, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { slugify } from '@/modules/admin/lib/slugify'
import type { TagFormState } from '@/modules/admin/actions/tags.actions'
import type { TagWithCount } from '@/modules/admin/types/admin.types'

interface TagDialogProps {
  action: (
    prevState: TagFormState | undefined,
    formData: FormData
  ) => Promise<TagFormState>
  triggerLabel: string
  dialogTitle: string
  initialTag?: TagWithCount
}

export function TagDialog({ action, triggerLabel, dialogTitle, initialTag }: TagDialogProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(action, undefined)
  const [name, setName] = useState(initialTag?.name ?? '')
  const [slug, setSlug] = useState(initialTag?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initialTag))

  useEffect(() => {
    if (state && !state.error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false)
      if (!initialTag) {
        setName('')
        setSlug('')
        setSlugTouched(false)
      }
    }
  }, [state, initialTag])

  function handleNameChange(value: string) {
    setName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-sm font-medium text-gray-700 hover:underline">
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(event) => handleNameChange(event.target.value)}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="slug" className="text-sm font-medium text-gray-700">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true)
                setSlug(event.target.value)
              }}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
          <DialogFooter>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {pending ? 'Salvando…' : 'Salvar'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
