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
import type { CategoryFormState } from '@/modules/admin/actions/categories.actions'
import type { CategoryWithCount } from '@/modules/admin/types/admin.types'

interface CategoryDialogProps {
  action: (
    prevState: CategoryFormState | undefined,
    formData: FormData
  ) => Promise<CategoryFormState>
  triggerLabel: string
  triggerClassName?: string
  dialogTitle: string
  initialCategory?: CategoryWithCount
}

export function CategoryDialog({
  action,
  triggerLabel,
  triggerClassName,
  dialogTitle,
  initialCategory,
}: CategoryDialogProps) {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(action, undefined)
  const [name, setName] = useState(initialCategory?.name ?? '')
  const [slug, setSlug] = useState(initialCategory?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initialCategory))

  useEffect(() => {
    if (state && !state.error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false)
      if (!initialCategory) {
        setName('')
        setSlug('')
        setSlugTouched(false)
      }
    }
  }, [state, initialCategory])

  function handleNameChange(value: string) {
    setName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={
          triggerClassName ??
          'text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors'
        }
      >
        {triggerLabel}
      </DialogTrigger>
      <DialogContent className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-900">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-bold text-slate-700">
              Nome da Categoria
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="Ex: Prática Clínica"
              required
              className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="slug" className="text-xs font-bold text-slate-700">
              Slug (Identificador de URL)
            </label>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true)
                setSlug(event.target.value)
              }}
              placeholder="pratica-clinica"
              required
              className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-xs font-bold text-slate-700">
              Descrição (opcional)
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={initialCategory?.description ?? ''}
              placeholder="Breve descrição dos temas abordados..."
              rows={2}
              className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
            />
          </div>
          {state?.error && (
            <p className="rounded-xl bg-rose-50 p-2.5 text-xs font-medium text-rose-700 border border-rose-200">
              {state.error}
            </p>
          )}
          <DialogFooter className="mt-2 flex gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              {pending ? 'Salvando…' : 'Salvar'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

