import Link from 'next/link'
import {
  FileCheck2,
  FileEdit,
  FolderTree,
  ImageIcon,
  Plus,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react'
import { getAllPostsForAdmin } from '@/modules/admin/data/posts.admin.data'
import { getCategoriesWithPostCount } from '@/modules/admin/data/categories.admin.data'
import { getTagsWithPostCount } from '@/modules/admin/data/tags.admin.data'
import { getAllMedia } from '@/modules/admin/data/media.admin.data'
import { EditorialCalendar } from '@/modules/admin/components/editorial-calendar'

export default async function AdminDashboardPage() {
  const [posts, categories, tags, media] = await Promise.all([
    getAllPostsForAdmin().catch(() => []),
    getCategoriesWithPostCount().catch(() => []),
    getTagsWithPostCount().catch(() => []),
    getAllMedia().catch(() => []),
  ])

  const publishedCount = posts.filter((post) => post.status === 'published').length
  const draftCount = posts.filter((post) => post.status === 'draft').length
  const featuredCount = posts.filter((post) => post.isFeatured).length

  // Pastel Category Colors for charts and pills
  const PASTEL_PALETTE = [
    { bg: 'bg-purple-100', text: 'text-purple-700', stroke: '#A855F7', fill: '#E9D5FF' },
    { bg: 'bg-amber-100', text: 'text-amber-700', stroke: '#F59E0B', fill: '#FDE68A' },
    { bg: 'bg-emerald-100', text: 'text-emerald-700', stroke: '#10B981', fill: '#A7F3D0' },
    { bg: 'bg-sky-100', text: 'text-sky-700', stroke: '#0EA5E9', fill: '#BAE6FD' },
    { bg: 'bg-rose-100', text: 'text-rose-700', stroke: '#F43F5E', fill: '#FECDD3' },
  ]

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* 1. Metric Cards Row in Pastel Accents (Compact & Responsive on Tablet/Mobile) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 2xl:gap-6">
        {/* Card 1: Posts Publicados (Mint Green) */}
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 2xl:p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Conteúdo Ativo
            </span>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FileCheck2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {publishedCount}
            </h3>
            <div className="mt-1.5 flex items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-700 border border-emerald-200">
                <TrendingUp className="h-3 w-3" />
                Publicados
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-400">No blog</span>
            </div>
          </div>
        </div>

        {/* Card 2: Rascunhos & Pendentes (Pastel Rose / Pink) */}
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 2xl:p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Em Produção
            </span>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <FileEdit className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {draftCount}
            </h3>
            <div className="mt-1.5 flex items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-rose-700 border border-rose-200">
                Rascunhos
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-400">Revisar</span>
            </div>
          </div>
        </div>

        {/* Card 3: Taxonomias / Categorias (Pastel Amber / Purple) */}
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 2xl:p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Estrutura & Temas
            </span>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FolderTree className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {categories.length}
            </h3>
            <div className="mt-1.5 flex items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-amber-700 border border-amber-200">
                Categorias
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-400">
                {tags.length} tags
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Biblioteca de Mídia (Pastel Sky Blue) */}
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-5 2xl:p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Arquivos & Capas
            </span>
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {media.length}
            </h3>
            <div className="mt-1.5 flex items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-sky-700 border border-sky-200">
                Mídias
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-400">No storage</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Recent Activity List + Categories Donut Chart (Action Hub) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 2xl:gap-8">
        {/* Left: Últimos Posts / Atividades Recentes (7 cols) */}
        <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-sm lg:col-span-7 2xl:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                  Últimas Publicações & Atividades
                </h3>
                <p className="text-xs text-slate-400">
                  Artigos mais recentes criados na plataforma
                </p>
              </div>
              <Link
                href="/admin/posts"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Ver todos &rarr;
              </Link>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {posts.length > 0 ? (
                posts.slice(0, 5).map((post, idx) => {
                  const color = PASTEL_PALETTE[idx % PASTEL_PALETTE.length]
                  return (
                    <div
                      key={post.id}
                      className="group flex items-center justify-between py-3 transition-colors hover:bg-slate-50/60 rounded-xl px-2 -mx-2 gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color.bg} ${color.text} shadow-2xs`}
                        >
                          <FileCheck2 className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <Link
                            href={`/admin/posts/${post.id}/editar`}
                            className="block truncate text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors"
                          >
                            {post.title}
                          </Link>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                            <span>{post.categoryName ?? 'Sem categoria'}</span>
                            <span>•</span>
                            <span>
                              {new Date(post.updatedAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            post.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </span>
                        <Link
                          href={`/admin/posts/${post.id}/editar`}
                          className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                          title="Editar post"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="py-10 text-center">
                  <p className="text-sm text-slate-500">Nenhum post cadastrado ainda.</p>
                  <Link
                    href="/admin/posts/novo"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Criar o primeiro post</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between text-xs text-slate-500">
            <span>Total: {posts.length} publicações registradas</span>
            <Link
              href="/admin/posts/novo"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-600 hover:text-emerald-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Escrever novo artigo</span>
            </Link>
          </div>
        </div>

        {/* Right: Distribuição por Categoria (Donut Chart - 5 cols) */}
        <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-sm lg:col-span-5 2xl:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                  Temas & Categorias
                </h3>
                <p className="text-xs text-slate-400">
                  Distribuição das publicações
                </p>
              </div>
              <Link
                href="/admin/categorias"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Gerenciar &rarr;
              </Link>
            </div>

            {/* Donut Chart Representation in SVG */}
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F1F5F9"
                    strokeWidth="14"
                  />
                  {/* Segment 1 (Purple - Clínica) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#A855F7"
                    strokeWidth="14"
                    strokeDasharray="75 163"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Segment 2 (Amber - Estágio) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="60 178"
                    strokeDashoffset="-80"
                    strokeLinecap="round"
                  />
                  {/* Segment 3 (Mint - Ética CFP) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="45 193"
                    strokeDashoffset="-145"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center Badge inside donut */}
                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-2xl font-black text-slate-900">
                    {posts.length || 8}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Artigos
                  </span>
                </div>
              </div>

              {/* Legend with Pastel Dots */}
              <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2">
                {categories.length > 0 ? (
                  categories.slice(0, 5).map((cat, idx) => {
                    const color = PASTEL_PALETTE[idx % PASTEL_PALETTE.length]
                    return (
                      <div key={cat.id} className="flex items-center gap-1.5 text-xs">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: color.stroke }}
                        />
                        <span className="font-medium text-slate-700">
                          {cat.name}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          ({cat.postCount})
                        </span>
                      </div>
                    )
                  })
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full bg-purple-500 shrink-0" />
                      <span className="font-medium text-slate-700">Prática Clínica</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="font-medium text-slate-700">Estágios & TCC</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-medium text-slate-700">Ética CFP</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-emerald-50/60 p-3.5 border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-800">
              Destaques na Home: {featuredCount} posts marcados
            </p>
            <p className="mt-0.5 text-[11px] text-emerald-600">
              Aparecem com ênfase visual nas páginas públicas.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Interactive Editorial Calendar */}
      <EditorialCalendar posts={posts} />
    </div>
  )
}

