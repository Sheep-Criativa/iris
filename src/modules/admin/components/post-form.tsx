'use client'

import { useActionState, useState } from 'react'
import { RichTextEditor } from './rich-text-editor'
import { slugify } from '@/modules/admin/lib/slugify'
import { uploadCoverImage, type PostFormState } from '@/modules/admin/actions/posts.actions'
import type { Category, Tag } from '@/modules/blog/types/blog.types'
import type { PostEditable } from '@/modules/admin/types/admin.types'

interface PostFormProps {
  action: (
    prevState: PostFormState | undefined,
    formData: FormData
  ) => Promise<PostFormState>
  categories: Category[]
  tags: Tag[]
  initialPost?: PostEditable
}

export function PostForm({ action, categories, tags, initialPost }: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [title, setTitle] = useState(initialPost?.title ?? '')
  const [slug, setSlug] = useState(initialPost?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost))
  const [content, setContent] = useState(initialPost?.content ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(initialPost?.coverImageUrl ?? '')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  async function handleCoverFileChange(file: File | null) {
    if (!file) return
    setUploading(true)
    setUploadError(null)
    const formData = new FormData()
    formData.append('file', file)
    const result = await uploadCoverImage(formData)
    setUploading(false)
    if (result.error) {
      setUploadError(result.error)
      return
    }
    if (result.url) {
      setCoverImageUrl(result.url)
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
        <label htmlFor="coverFile" className="text-sm font-medium text-gray-700">
          Imagem de capa
        </label>
        <input
          id="coverFile"
          type="file"
          accept="image/*"
          onChange={(event) => handleCoverFileChange(event.target.files?.[0] ?? null)}
          className="text-sm"
        />
        {uploading && <p className="text-sm text-gray-500">Enviando imagem…</p>}
        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
        {coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImageUrl}
            alt="Prévia da capa"
            className="mt-2 h-32 w-full max-w-xs rounded-md object-cover"
          />
        )}
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
        disabled={pending || uploading}
        className="w-fit rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {pending ? 'Salvando…' : 'Salvar'}
      </button>
    </form>
  )
}
