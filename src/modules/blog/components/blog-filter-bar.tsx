'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Category } from '@/modules/blog/types/blog.types'

interface BlogFilterBarProps {
  categories: Category[]
  activeCategorySlug?: string
}

export function BlogFilterBar({
  categories,
  activeCategorySlug,
}: BlogFilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSearch = searchParams.get('busca') ?? ''
  const [searchValue, setSearchValue] = useState(currentSearch)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchValue.trim()) {
      params.set('busca', searchValue.trim())
    } else {
      params.delete('busca')
    }
    params.delete('pagina')
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <section
      id="categorias"
      className="my-8 sm:my-10 border-y border-[#E0CEB7] py-3.5 sm:py-4 scroll-mt-24"
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Categories List (Inspired by Showit Template) */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-[13px]">
          <span className="font-display font-bold uppercase tracking-wider text-[#291F1A]">
            Categorias:
          </span>

          {/* All / Blog Home */}
          <Link
            href="/blog"
            className={`transition-colors uppercase tracking-wider ${
              !activeCategorySlug
                ? 'font-bold text-[#C35A38] underline underline-offset-4 decoration-2'
                : 'text-[#6B5B52] hover:text-[#291F1A]'
            }`}
          >
            Todos os Posts
          </Link>

          {/* Dynamic Categories */}
          {categories.map((category) => {
            const isActive = activeCategorySlug === category.slug

            return (
              <Link
                key={category.id}
                href={`/blog?categoria=${category.slug}`}
                className={`transition-colors uppercase tracking-wider whitespace-nowrap ${
                  isActive
                    ? 'font-bold text-[#C35A38] underline underline-offset-4 decoration-2'
                    : 'text-[#6B5B52] hover:text-[#291F1A]'
                }`}
              >
                {category.name}
              </Link>
            )
          })}
        </div>

        {/* Search Input on the Right (Showit "SEARCH THE JOURNAL" box) */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative min-w-[220px] sm:min-w-[260px] self-end lg:self-auto w-full lg:w-auto"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar no diário..."
              className="w-full rounded-full border border-[#E0CEB7] bg-[#FAF4ED] py-1.5 pl-3 pr-3 text-xs text-[#291F1A] placeholder-[#6B5B52]/70 transition-all focus:border-[#C35A38] focus:bg-[#FAF4ED] focus:outline-none"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => {
                  setSearchValue('')
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete('busca')
                  router.push(`/blog?${params.toString()}`)
                }}
                className="absolute right-2.5 text-xs text-[#6B5B52] hover:text-[#291F1A]"
                aria-label="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
