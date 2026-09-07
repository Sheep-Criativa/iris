'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface BannerSlide {
  id: string
  image: string
  alt?: string
}

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    id: 'slide-1',
    image: '/images/banners/banner-clinica.jpg',
    alt: 'Psicologia Clínica e Infantil — Acolhimento e Desenvolvimento',
  },
  {
    id: 'slide-2',
    image: '/images/banners/banner-estudos.jpg',
    alt: 'Estudos e Vida Acadêmica de Psicologia na UNAMA',
  },
  {
    id: 'slide-3',
    image: '/images/banners/banner-rh.jpg',
    alt: 'Recursos Humanos, Recrutamento e Conexão Humana',
  },
]

interface BlogBannerSliderProps {
  slides?: BannerSlide[]
}

export function BlogBannerSlider({ slides = DEFAULT_SLIDES }: BlogBannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Autoplay a cada 5 segundos
  useEffect(() => {
    if (isPaused || slides.length <= 1) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [handleNext, isPaused, slides.length])

  // Suporte a swipe no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (diff > 50) {
      handleNext()
    } else if (diff < -50) {
      handlePrev()
    }
    setTouchStart(null)
  }

  return (
    <section
      id="destaques"
      className="relative mb-10 sm:mb-14 w-full h-[380px] xs:h-[440px] sm:h-[500px] md:h-[560px] lg:h-[620px] overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border border-[#E0CEB7] bg-[#FAF4ED] shadow-xl group scroll-mt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrossel de Banners do Blog"
    >
      {/* Slides (Apenas a Imagem, sem textos conforme solicitado) */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isCurrent = index === currentIndex

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt || `Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-center transition-transform duration-1000 scale-100 group-hover:scale-[1.02]"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          )
        })}
      </div>

      {/* Seta de Navegação Esquerda */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Banner anterior"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all active:scale-95 opacity-80 hover:opacity-100"
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6 transition-transform hover:-translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Seta de Navegação Direita (Inspirada no modelo Untitled UI) */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Próximo banner"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/35 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all active:scale-95 opacity-80 hover:opacity-100"
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6 transition-transform hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores de Slides (Bolinhas/Pills) */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-2 border border-white/20 shadow-md">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para banner ${index + 1}`}
            className={`h-2 transition-all rounded-full ${
              index === currentIndex
                ? 'w-7 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
