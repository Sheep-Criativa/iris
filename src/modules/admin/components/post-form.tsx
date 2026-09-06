'use client'

import { useActionState, useState } from 'react'
import {
  Sparkles,
  FileText,
  Globe,
  Save,
  Eye,
  Edit3,
  Columns,
  Maximize2,
} from 'lucide-react'
import { RichTextEditor } from './rich-text-editor'
import { MediaPicker } from './media-picker'
import { PostPreview } from './post-preview'
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

export function PostForm({
  action,
  categories,
  tags,
  media,
  initialPost,
}: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined)

  // Reactive Post State for Live Blog Preview
  const [title, setTitle] = useState(initialPost?.title ?? '')
  const [slug, setSlug] = useState(initialPost?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost))
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? '')
  const [content, setContent] = useState(initialPost?.content ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(initialPost?.coverImageUrl ?? '')
  const [isPublished, setIsPublished] = useState(initialPost?.status === 'published')
  const [isFeatured, setIsFeatured] = useState(Boolean(initialPost?.isFeatured))
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialPost?.categoryId ?? '')
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(initialPost?.tagIds ?? [])

  // View Mode: 'edit' | 'preview' | 'split'
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('edit')
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  function handleTagToggle(tagId: string) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  const selectedCategory =
    categories.find((c) => c.id === selectedCategoryId) ?? null
  const selectedTags = tags.filter((t) => selectedTagIds.includes(t.id))

  // Preview component instance for reuse
  const previewElement = (
    <PostPreview
      title={title}
      slug={slug}
      excerpt={excerpt}
      content={content}
      coverImageUrl={coverImageUrl || null}
      category={selectedCategory}
      tags={selectedTags}
      isFeatured={isFeatured}
      isPublished={isPublished}
    />
  )

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="coverImageUrl" value={coverImageUrl} />

      {/* Mode Control Bar (Editor vs Live Blog Preview vs Split View) */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
        {/* Left: View Mode Segmented Controls */}
        <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/70 p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setViewMode('edit')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'edit'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'preview'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview no Blog</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`hidden xl:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'split'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Exibir editor e preview lado a lado"
          >
            <Columns className="h-3.5 w-3.5" />
            <span>Dividir Tela (Split)</span>
          </button>
        </div>

        {/* Right: Fullscreen Modal Button & Fast Save */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/60 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-2xs hover:bg-emerald-100 transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Preview Tela Cheia</span>
          </button>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{pending ? 'Salvando…' : isPublished ? 'Publicar' : 'Salvar'}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: FULL PREVIEW MODE */}
      {viewMode === 'preview' && (
        <div className="flex flex-col gap-6">
          {previewElement}

          {/* Quick Bar at bottom */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Voltar ao Editor</span>
            </button>

            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              <Save className="h-4 w-4" />
              <span>{pending ? 'Salvando…' : isPublished ? 'Publicar Artigo' : 'Salvar Rascunho'}</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: SPLIT VIEW MODE (Side by Side) */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 items-start">
          {/* Left Column: Editor (6 cols) */}
          <div className="flex flex-col gap-6 xl:col-span-6">
            {/* Informações Principais */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="h-4 w-4 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Conteúdo do Artigo</h2>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="title-split" className="text-xs font-bold text-slate-700">
                  Título do Artigo
                </label>
                <input
                  id="title-split"
                  name="title"
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="Ex: Como Conduzir a Primeira Sessão na Clínica-Escola"
                  required
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="slug-split" className="text-xs font-bold text-slate-700">
                  Slug (URL)
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-500 focus-within:bg-white focus-within:border-emerald-500 transition-all">
                  <span className="text-slate-400 select-none">/blog/</span>
                  <input
                    id="slug-split"
                    name="slug"
                    value={slug}
                    onChange={(event) => {
                      setSlugTouched(true)
                      setSlug(event.target.value)
                    }}
                    required
                    className="w-full bg-transparent font-mono text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="excerpt-split" className="text-xs font-bold text-slate-700">
                  Resumo / Chamada
                </label>
                <textarea
                  id="excerpt-split"
                  name="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Uma breve introdução sobre os desafios e manejos práticos..."
                  required
                  rows={2}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-bold text-slate-700">
                  Corpo do Artigo (Editor Visual)
                </span>
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>

            {/* Quick Settings in Split view */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Classificação & Capa
              </h3>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="categoryId-split" className="text-xs font-bold text-slate-700">
                  Categoria
                </label>
                <select
                  id="categoryId-split"
                  name="categoryId"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                >
                  <option value="">Sem categoria definida</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-700">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <label
                      key={tag.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/60 px-3 py-1 text-xs text-slate-700 cursor-pointer transition-colors hover:border-purple-300 has-checked:bg-purple-50 has-checked:text-purple-700 has-checked:border-purple-200 font-medium"
                    >
                      <input
                        type="checkbox"
                        name="tagIds"
                        value={tag.id}
                        checked={selectedTagIds.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                        className="h-3.5 w-3.5 rounded-sm accent-purple-600"
                      />
                      <span>#{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 block mb-2">Imagem de Capa</span>
                <MediaPicker media={media} value={coverImageUrl} onChange={setCoverImageUrl} />
              </div>
            </div>
          </div>

          {/* Right Column: Live Sticky Blog Preview (6 cols) */}
          <div className="xl:col-span-6 sticky top-24">
            {previewElement}
          </div>
        </div>
      )}

      {/* VIEW 3: STANDARD 2-COLUMN EDITOR VIEW */}
      {viewMode === 'edit' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* Left Column: Main Content & SEO (8 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Card 1: Informações Principais */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <h2 className="text-base font-bold text-slate-900">
                    Conteúdo do Artigo
                  </h2>
                </div>

                {/* Quick Live Preview Pill Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Ver Preview no Blog &rarr;</span>
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="title" className="text-xs font-bold text-slate-700">
                  Título do Artigo
                </label>
                <input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="Ex: Como Conduzir a Primeira Sessão na Clínica-Escola"
                  required
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="slug" className="text-xs font-bold text-slate-700">
                  Slug (URL Amigável)
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-500 focus-within:bg-white focus-within:border-emerald-500 transition-all">
                  <span className="text-slate-400 select-none">/blog/</span>
                  <input
                    id="slug"
                    name="slug"
                    value={slug}
                    onChange={(event) => {
                      setSlugTouched(true)
                      setSlug(event.target.value)
                    }}
                    placeholder="como-conduzir-a-primeira-sessao"
                    required
                    className="w-full bg-transparent font-mono text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="excerpt" className="text-xs font-bold text-slate-700">
                  Resumo / Chamada (Exibido nas listagens e cards)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Uma breve introdução sobre os desafios e manejos práticos nos primeiros atendimentos..."
                  required
                  rows={3}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-bold text-slate-700">
                  Corpo do Artigo (Editor Visual)
                </span>
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>

            {/* Card 2: SEO & Metadados */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Globe className="h-4 w-4 text-sky-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Otimização para Busca (SEO)
                </h2>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="seoTitle" className="text-xs font-bold text-slate-700">
                  Título de SEO (opcional)
                </label>
                <input
                  id="seoTitle"
                  name="seoTitle"
                  defaultValue={initialPost?.seoTitle ?? ''}
                  placeholder="Ex: Primeiros Atendimentos em Psicologia | Iris Mentoria"
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="seoDescription" className="text-xs font-bold text-slate-700">
                  Descrição de SEO (opcional)
                </label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  defaultValue={initialPost?.seoDescription ?? ''}
                  placeholder="Meta description de até 160 caracteres para o Google..."
                  rows={2}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Actions (4 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {/* Card 3: Publicação & Status */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Publicação & Visibilidade
              </h3>

              {/* Toggle Status (Publicado / Rascunho) */}
              <label className="flex items-center justify-between cursor-pointer rounded-2xl border border-slate-100 p-3.5 transition-colors hover:bg-slate-50">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Status do Post</span>
                  <span className="text-[11px] text-slate-400">
                    {isPublished ? 'Visível para o público' : 'Salvo como rascunho'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="status"
                  value="published"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                    isPublished
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {isPublished ? 'Publicado' : 'Rascunho'}
                </span>
              </label>

              {/* Toggle Destaque */}
              <label className="flex items-center justify-between cursor-pointer rounded-2xl border border-slate-100 p-3.5 transition-colors hover:bg-slate-50">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Destaque</span>
                  <span className="text-[11px] text-slate-400">
                    Exibir no topo do blog
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                    isFeatured
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Sparkles className="h-3 w-3" />
                  {isFeatured ? 'Destaque' : 'Normal'}
                </span>
              </label>

              {/* Preview Trigger Button inside Right Column */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/70 px-4 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <Eye className="h-4 w-4" />
                <span>Ver Preview no Blog</span>
              </button>

              {/* Error message */}
              {state?.error && (
                <p className="rounded-2xl bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
                  {state.error}
                </p>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95"
              >
                <Save className="h-4 w-4" />
                <span>{pending ? 'Salvando…' : isPublished ? 'Publicar Artigo' : 'Salvar Rascunho'}</span>
              </button>
            </div>

            {/* Card 4: Categorias & Tags */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Classificação
              </h3>

              {/* Select Categoria */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="categoryId" className="text-xs font-bold text-slate-700">
                  Categoria Principal
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden"
                >
                  <option value="">Sem categoria definida</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Checkbox Pills */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-700">Tags do Artigo</span>
                {tags.length === 0 ? (
                  <p className="text-[11px] text-slate-400">Nenhuma tag criada.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <label
                        key={tag.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/60 px-3 py-1 text-xs text-slate-700 cursor-pointer transition-colors hover:border-purple-300 has-checked:bg-purple-50 has-checked:text-purple-700 has-checked:border-purple-200 font-medium"
                      >
                        <input
                          type="checkbox"
                          name="tagIds"
                          value={tag.id}
                          checked={selectedTagIds.includes(tag.id)}
                          onChange={() => handleTagToggle(tag.id)}
                          className="h-3.5 w-3.5 rounded-sm accent-purple-600"
                        />
                        <span>#{tag.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Card 5: Imagem de Capa */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Imagem de Capa
              </h3>
              <MediaPicker media={media} value={coverImageUrl} onChange={setCoverImageUrl} />
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN PREVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl">
            <PostPreview
              title={title}
              slug={slug}
              excerpt={excerpt}
              content={content}
              coverImageUrl={coverImageUrl || null}
              category={selectedCategory}
              tags={selectedTags}
              isFeatured={isFeatured}
              isPublished={isPublished}
              isModal={true}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </form>
  )
}
