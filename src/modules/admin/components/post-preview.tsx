'use client'

import { useState } from 'react'
import {
  Eye,
  Smartphone,
  Monitor,
  Sparkles,
  FileText,
  Layers,
  X,
  ImageIcon,
} from 'lucide-react'
import { CategoryBadge } from '@/modules/blog/components/category-badge'
import { TagBadge } from '@/modules/blog/components/tag-badge'
import { PostBody } from '@/modules/blog/components/post-body'
import { PostCard } from '@/modules/blog/components/post-card'
import type { Category, Tag, PostSummary } from '@/modules/blog/types/blog.types'

interface PostPreviewProps {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImageUrl: string | null
  category: Category | null
  tags: Tag[]
  isFeatured: boolean
  isPublished: boolean
  updatedAt?: string
  onClose?: () => void
  isModal?: boolean
}

export function PostPreview({
  title,
  slug,
  excerpt,
  content,
  coverImageUrl,
  category,
  tags,
  isFeatured,
  isPublished,
  updatedAt,
  onClose,
  isModal = false,
}: PostPreviewProps) {
  const [activeTab, setActiveTab] = useState<'article' | 'card'>('article')
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')

  const displayTitle = title.trim() || 'Título do seu artigo aparecerá aqui...'
  const displayExcerpt =
    excerpt.trim() ||
    'O resumo e chamada do seu post aparecerão aqui para atrair a leitura dos estudantes...'
  const displayDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })

  // Simulated PostSummary object for the PostCard preview
  const postSummary: PostSummary = {
    id: 'preview-post',
    title: displayTitle,
    slug: slug.trim() || 'como-conduzir-a-primeira-sessao',
    excerpt: displayExcerpt,
    coverImageUrl: coverImageUrl || null,
    isFeatured,
    publishedAt: isPublished ? (updatedAt ?? new Date().toISOString()) : null,
    category,
    tags,
  }

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl ${
        isModal ? 'h-[90vh] max-w-5xl w-full mx-auto' : 'w-full'
      }`}
    >
      {/* Preview Navigation Bar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/90 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Eye className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              Pré-visualização do Blog
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.2 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                Ao Vivo
              </span>
            </span>
            <span className="text-[10px] text-slate-400">
              Veja exatamente como o artigo será visualizado pelos estudantes
            </span>
          </div>
        </div>

        {/* Center: Tabs & Device Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher: Article vs Card */}
          <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('article')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                activeTab === 'article'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Página do Artigo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                activeTab === 'card'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Card no Feed</span>
            </button>
          </div>

          {/* Device Switcher (Desktop vs Mobile) */}
          <div className="hidden sm:flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              title="Visualização Computador"
              className={`rounded-full p-1.5 transition-all ${
                device === 'desktop'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              title="Visualização Celular"
              className={`rounded-full p-1.5 transition-all ${
                device === 'mobile'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Close Button if in Modal */}
        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            title="Fechar pré-visualização"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Preview Content Area */}
      <div className="flex-1 overflow-y-auto bg-slate-100/60 p-4 sm:p-6 flex items-start justify-center">
        {/* Device Frame Simulation */}
        <div
          className={`transition-all duration-300 w-full ${
            device === 'mobile'
              ? 'max-w-[390px] rounded-[36px] border-[10px] border-slate-800 shadow-2xl overflow-hidden'
              : 'max-w-4xl rounded-2xl shadow-sm'
          }`}
        >
          {/* Simulated Browser Bar for realism */}
          <div className="flex items-center justify-between border-b border-[#E0CEB7]/60 bg-[#E8DAC7] px-4 py-2 text-[11px] text-[#6B5B52]">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#C35A38]/50" />
              <span className="h-2 w-2 rounded-full bg-[#E8A76F]" />
              <span className="h-2 w-2 rounded-full bg-[#10B981]/50" />
            </div>
            <span className="truncate max-w-[200px] font-mono text-[10px] text-[#6B5B52]">
              ecosistema-iris.com/blog/{slug.trim() || 'artigo'}
            </span>
            <span className="text-[10px] font-semibold text-[#C35A38]">
              {isPublished ? '● Público' : '○ Rascunho'}
            </span>
          </div>

          {/* TAB 1: FULL ARTICLE VIEW (/blog/[slug]) */}
          {activeTab === 'article' ? (
            <div className="bg-[#F3E6D3] text-[#291F1A] p-4 sm:p-8 min-h-[500px]">
              {/* Simulated Blog Header */}
              <div className="mb-6 flex items-center justify-between border-b border-[#E0CEB7] pb-3 text-xs">
                <span className="font-display font-bold text-[#291F1A] text-sm">
                  Iris Amanda
                </span>
                <span className="text-[11px] text-[#6B5B52]">← Voltar ao Blog</span>
              </div>

              {/* Main Article Container */}
              <article className="mx-auto max-w-2xl">
                <header className="mb-6 flex flex-col gap-3">
                  {/* Category & Tag Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {category ? (
                      <CategoryBadge category={category} />
                    ) : (
                      <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs text-slate-500 italic">
                        Sem categoria
                      </span>
                    )}

                    {isFeatured && (
                      <span className="rounded-full bg-[#F5D98C] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#291F1A] flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Destaque
                      </span>
                    )}

                    {tags.map((tag) => (
                      <TagBadge key={tag.id} tag={tag} />
                    ))}
                  </div>

                  {/* Title */}
                  <h1
                    className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-[#291F1A] ${
                      !title.trim() ? 'opacity-40 italic' : ''
                    }`}
                  >
                    {displayTitle}
                  </h1>

                  {/* Date & Author */}
                  <div className="flex items-center gap-3 text-xs text-[#6B5B52]">
                    <time dateTime={new Date().toISOString()}>{displayDate}</time>
                    <span>•</span>
                    <span>Por Iris Amanda</span>
                  </div>

                  {/* Excerpt / Lead Paragraph */}
                  {excerpt.trim() && (
                    <p className="text-sm sm:text-base leading-relaxed text-[#6B5B52] font-medium border-l-2 border-[#C35A38] pl-3 py-1">
                      {excerpt}
                    </p>
                  )}

                  {/* Cover Image */}
                  {coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={coverImageUrl}
                      alt={title || 'Capa do artigo'}
                      className="mt-3 aspect-[16/9] w-full rounded-2xl object-cover shadow-sm border border-[#E0CEB7]"
                    />
                  ) : (
                    <div className="mt-3 flex aspect-[16/9] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E0CEB7] bg-[#FCF7F0] p-6 text-center text-xs text-[#6B5B52]">
                      <ImageIcon className="h-8 w-8 text-[#C35A38]/50" />
                      <span className="mt-2 font-semibold">Nenhuma imagem de capa selecionada</span>
                      <span className="text-[11px] text-[#8C7A70]">
                        Selecione uma foto da biblioteca para exibir uma capa com destaque
                      </span>
                    </div>
                  )}
                </header>

                {/* Article Body */}
                <div className="mt-6 border-t border-[#E0CEB7]/60 pt-6">
                  {content.trim() ? (
                    <PostBody html={content} />
                  ) : (
                    <div className="py-12 text-center text-sm text-[#8C7A70] italic">
                      O conteúdo completo que você redigir no editor aparecerá formatado aqui com títulos, parágrafos e citações...
                    </div>
                  )}
                </div>

                {/* Simulated Article Footer */}
                <footer className="mt-12 border-t border-[#E0CEB7] pt-8">
                  <div className="flex items-center gap-3.5 rounded-2xl bg-[#FCF7F0] p-4 border border-[#E0CEB7]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C35A38] text-sm font-bold text-white shadow-xs">
                      IR
                    </div>
                    <div>
                      <p className="font-display font-bold text-[#291F1A] text-sm">
                        Iris Amanda
                      </p>
                      <p className="text-xs text-[#6B5B52]">
                        Psicóloga Clínica & Mentora • Acolhimento e prática para estudantes de Psicologia.
                      </p>
                    </div>
                  </div>
                </footer>
              </article>
            </div>
          ) : (
            /* TAB 2: FEED CARD VIEW (/blog) */
            <div className="bg-[#F3E6D3] p-6 sm:p-10 flex flex-col items-center justify-center min-h-[500px]">
              <div className="mb-4 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCF7F0] px-3 py-1 text-xs font-semibold text-[#6B5B52] border border-[#E0CEB7]">
                  Visualização no Grid do Blog Público (/blog)
                </span>
              </div>

              {/* Feed Card Simulation */}
              <div className="w-full max-w-md">
                <PostCard post={postSummary} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
