'use client'

import { useActionState, useState } from 'react'
import { RichTextEditor } from './rich-text-editor'
import { MediaPicker } from './media-picker'
import { slugify } from '@/modules/admin/lib/slugify'
import type { PostFormState } from '@/modules/admin/actions/posts.actions'
import type { Category, Tag } from '@/modules/blog/types/blog.types'
import type { MediaAsset, PostEditable } from '@/modules/admin/types/admin.types'

interface PostFormProps {
  action: (
    prevState: PostFormState | undefined,
    formData: FormData
  ) => Promise<PostFormState>
  categories: Category[]
  tags: Tag[]
  media: MediaAsset[]
  initialPost?: PostEditable
}

export function PostForm({ action, categories, tags, media, initialPost }: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [title, setTitle] = useState(initialPost?.title ?? '')
  const [slug, setSlug] = useState(initialPost?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost))
  const [content, setContent] = useState(initialPost?.content ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(initialPost?.coverImageUrl ?? '')

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="coverImageUrl" value={coverImageUrl} />

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
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

      <div className="flex flex-col gap-1">
        <label htmlFor="excerpt" className="text-sm font-medium text-gray-700">
          Resumo
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={initialPost?.excerpt ?? ''}
          required
          rows={3}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Conteúdo</span>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="categoryId" className="text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={initialPost?.categoryId ?? ''}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-gray-700">Tags</legend>
        {tags.map((tag) => (
          <label key={tag.id} className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="tagIds"
              value={tag.id}
              defaultChecked={initialPost?.tagIds.includes(tag.id)}
            />
            {tag.name}
          </label>
        ))}
      </fieldset>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Imagem de capa</span>
        <MediaPicker media={media} value={coverImageUrl} onChange={setCoverImageUrl} />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="status"
          value="published"
          defaultChecked={initialPost?.status === 'published'}
        />
        Publicado (desmarcado = rascunho)
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name="isFeatured" defaultChecked={initialPost?.isFeatured} />
        Post em destaque
      </label>

      <div className="flex flex-col gap-1">
        <label htmlFor="seoTitle" className="text-sm font-medium text-gray-700">
          Título de SEO (opcional)
        </label>
        <input
          id="seoTitle"
          name="seoTitle"
          defaultValue={initialPost?.seoTitle ?? ''}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="seoDescription" className="text-sm font-medium text-gray-700">
          Descrição de SEO (opcional)
        </label>
        <textarea
          id="seoDescription"
          name="seoDescription"
          defaultValue={initialPost?.seoDescription ?? ''}
          rows={2}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {pending ? 'Salvando…' : 'Salvar'}
      </button>
    </form>
  )
}
