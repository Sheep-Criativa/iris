'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SunburstIcon } from '@/modules/portfolio/components/aconchego-icons'

interface BlogNavProps {
  blogTitle?: string
}

export function BlogNav({ blogTitle = 'The Journal - Iris' }: BlogNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? 'border-[#E0CEB7] bg-[#F3E6D3]/90 backdrop-blur-md shadow-sm'
          : 'border-[#E0CEB7]/80 bg-[#F3E6D3]/95 backdrop-blur-sm'
        }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4">
        {/* Brand / Logo do Blog */}
        <Link
          href="/blog"
          className="group flex items-center gap-2 sm:gap-2.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#291F1A] transition-colors hover:text-[#C35A38]"
        >
          <SunburstIcon
            size={24}
            className="text-[#C35A38] transition-transform duration-500 group-hover:rotate-45 shrink-0"
          />
          <span className="tracking-tight whitespace-nowrap">{blogTitle}</span>
        </Link>

        {/* Link para voltar ao portfólio */}
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6B5B52] transition-colors hover:text-[#C35A38]"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          >
            &larr;
          </span>
          <span>Voltar ao Portfólio</span>
        </Link>
      </nav>
    </header>
  )
}

