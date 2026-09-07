'use client'

import { useState, useEffect } from 'react'
import { SunburstIcon, SparkleStarIcon } from './aconchego-icons'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#visao', label: 'Perspectiva' },
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#habilidades', label: 'Competências' },
  { href: '#contato', label: 'Contatos' },
] as const

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('sobre')
  const [isScrolled, setIsScrolled] = useState(false)

  // Atualizar seção ativa e estilo ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = NAV_LINKS.map((link) => link.href.replace('#', ''))
      const scrollPosition = window.scrollY + 140

      // Se estiver próximo ao final da página, ativa a última seção (contato)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection(sections[sections.length - 1])
        return
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'border-[#E0CEB7] bg-[#F3E6D3]/90 backdrop-blur-md shadow-md'
            : 'border-[#E0CEB7]/80 bg-[#F3E6D3]/95 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 md:gap-3 lg:gap-4 px-4 sm:px-6 py-3 sm:py-3.5">
          {/* Brand / Logo */}
          <a
            href="#sobre"
            onClick={handleLinkClick}
            className="group flex shrink-0 items-center gap-2 sm:gap-2.5 font-display text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-[#291F1A] transition-colors hover:text-[#C35A38]"
          >
            <SunburstIcon
              size={24}
              className="text-[#C35A38] transition-transform duration-500 group-hover:rotate-45 shrink-0"
            />
            <span className="tracking-tight whitespace-nowrap">Iris Amanda</span>
          </a>

          {/* Desktop & Tablet Links (>= 768px) com Scrollspy ativo */}
          <ul className="hidden md:flex items-center gap-2 md:gap-2.5 lg:gap-6 xl:gap-8 text-xs lg:text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <li key={link.href} className="shrink-0">
                  <a
                    href={link.href}
                    className={`relative px-1.5 py-1 whitespace-nowrap transition-all duration-200 after:absolute after:bottom-0 after:left-1.5 after:right-1.5 after:h-[2px] after:bg-[#C35A38] after:transition-all after:duration-300 ${
                      isActive
                        ? 'text-[#C35A38] font-bold after:opacity-100'
                        : 'text-[#6B5B52] hover:text-[#291F1A] after:opacity-0 hover:after:opacity-100'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right Actions: Desktop CTA + Mobile Toggle */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* CTA Pill (Visível em sm e desktop) */}
            <a
              href="/blog"
              onClick={handleLinkClick}
              className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-full bg-[#C35A38] px-3.5 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#FAF4ED] shadow-sm transition-all hover:bg-[#A84728] hover:shadow-md active:scale-95"
            >
              Acessar Blog
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
            className="fixed inset-0 top-[65px] sm:top-[73px] z-40 bg-[#291F1A]/40 backdrop-blur-sm md:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="border-b border-[#E0CEB7] bg-[#F3E6D3] px-6 pt-4 pb-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E0CEB7]/80 text-xs font-semibold uppercase tracking-widest text-[#6B5B52]">
                <span>Menu de Navegação</span>
                <span className="text-[#C35A38]">Iris Amanda</span>
              </div>

              <ul className="mt-4 space-y-1">
                {NAV_LINKS.map((link) => {
                  const sectionId = link.href.replace('#', '')
                  const isActive = activeSection === sectionId

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all ${
                          isActive
                            ? 'bg-[#FAF4ED] text-[#C35A38] shadow-xs'
                            : 'text-[#291F1A] hover:bg-[#FAF4ED] hover:text-[#C35A38]'
                        }`}
                      >
                        <span>{link.label}</span>
                        <SparkleStarIcon
                          size={14}
                          className={`text-[#C35A38] transition-opacity ${
                            isActive ? 'opacity-100' : 'opacity-40'
                          }`}
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-6 pt-4 border-t border-[#E0CEB7]/80 flex flex-col gap-2.5">
                <a
                  href="#contato"
                  onClick={handleLinkClick}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C35A38] px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[#FAF4ED] shadow-md transition-all hover:bg-[#A84728] active:scale-98"
                >
                  <span>Entrar em Contato</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href="/blog"
                  onClick={handleLinkClick}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#C35A38] bg-transparent px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#C35A38] transition-all hover:bg-[#C35A38] hover:text-[#FAF4ED] active:scale-98"
                >
                  <span>Acessar Blog</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Espaçador para compensar a navbar com posição fixa */}
      <div className="h-[65px] sm:h-[73px]" aria-hidden="true" />
    </>
  )
}

