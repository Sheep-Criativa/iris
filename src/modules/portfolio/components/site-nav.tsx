'use client'

import { useState, useEffect } from 'react'
import { SunburstIcon, SparkleStarIcon } from './aconchego-icons'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#visao', label: 'Perspectiva' },
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#habilidades', label: 'Competências' },
  { href: '#contato', label: 'Mentoria & Contato' },
] as const

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Fechar menu ao redimensionar para tela grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Prevenir rolagem de fundo quando menu mobile estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#E0CEB7] bg-[#F3E6D3]/95 backdrop-blur-md transition-all">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4">
        {/* Brand / Logo */}
        <a
          href="#sobre"
          onClick={handleLinkClick}
          className="group flex items-center gap-2 sm:gap-2.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#291F1A] transition-colors hover:text-[#C35A38]"
        >
          <SunburstIcon
            size={26}
            className="text-[#C35A38] transition-transform duration-500 group-hover:rotate-45 shrink-0"
          />
          <span className="tracking-tight whitespace-nowrap">Iris Amanda</span>
        </a>

        {/* Desktop Links (>= 768px) */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 text-[#6B5B52] transition-colors hover:text-[#291F1A] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C35A38] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions: Desktop CTA + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CTA Pill (Visível em sm e desktop) */}
          <a
            href="#contato"
            onClick={handleLinkClick}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#C35A38] px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF4ED] shadow-sm transition-all hover:bg-[#A84728] hover:shadow-md active:scale-95"
          >
            Agendar Mentoria
          </a>

          {/* Mobile Hamburger / Close Button (< 768px) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isOpen}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-[#E0CEB7] bg-[#FAF4ED] text-[#291F1A] transition-all hover:border-[#C35A38] hover:text-[#C35A38] active:scale-95"
          >
            <div className="relative h-4 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-current transition-all duration-300 ${
                  isOpen ? 'top-2 rotate-45' : 'top-0.5'
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-0.5 w-4 bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-current transition-all duration-300 ${
                  isOpen ? 'top-2 -rotate-45' : 'top-3.5'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop & Drawer Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[61px] sm:top-[69px] z-40 bg-[#291F1A]/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="border-b border-[#E0CEB7] bg-[#F3E6D3] px-6 pt-4 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E0CEB7]/80 text-xs font-semibold uppercase tracking-widest text-[#6B5B52]">
              <span>Menu de Navegação</span>
              <span className="text-[#C35A38]">Íris Amanda</span>
            </div>

            <ul className="mt-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-[#291F1A] transition-all hover:bg-[#FAF4ED] hover:text-[#C35A38] active:bg-[#FAF4ED]"
                  >
                    <span>{link.label}</span>
                    <SparkleStarIcon size={14} className="text-[#C35A38] opacity-60" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-[#E0CEB7]/80">
              <a
                href="#contato"
                onClick={handleLinkClick}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C35A38] px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[#FAF4ED] shadow-md transition-all hover:bg-[#A84728] active:scale-98"
              >
                <span>Agendar Mentoria</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

