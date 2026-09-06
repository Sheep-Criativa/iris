import Image from 'next/image'
import {
  SunburstIcon,
  RetroAsteriskIcon,
  SparkleStarIcon,
  ArchMotif,
  OfficialInstagramIcon,
  OfficialLinkedinIcon,
  OfficialMailIcon,
} from './aconchego-icons'
import type { AboutContent } from '@/modules/portfolio/types/portfolio.types'

interface HeroAboutSectionProps {
  about: AboutContent
}

const SOCIAL_ICONS_CONFIG = [
  {
    platform: 'instagram',
    label: 'Instagram',
    icon: OfficialInstagramIcon,
    defaultHref: 'https://instagram.com/',
  },
  {
    platform: 'email',
    label: 'E-mail',
    icon: OfficialMailIcon,
    defaultHref: 'mailto:contato@irispsicologia.com.br',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    icon: OfficialLinkedinIcon,
    defaultHref: 'https://linkedin.com/',
  },
]

export function HeroAboutSection({ about }: HeroAboutSectionProps) {
  return (
    <section id="sobre" className="relative overflow-hidden pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28 scroll-mt-20">
      {/* Background Decorative Arches & Stars */}
      <div className="pointer-events-none absolute -top-10 -right-12 opacity-40">
        <ArchMotif width={160} height={200} strokeColor="#E8A76F" />
      </div>
      <div className="pointer-events-none absolute top-40 left-6 text-[#C35A38] opacity-70">
        <RetroAsteriskIcon size={36} />
      </div>
      <div className="pointer-events-none absolute bottom-12 right-12 text-[#F5D98C]">
        <SparkleStarIcon size={32} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Meta Strip (Inspirado na Imagem 01 & 02) */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 border-b border-[#E0CEB7]/80 pb-6 sm:pb-8 sm:grid-cols-3 sm:items-center text-xs text-[#6B5B52]">
          {/* Col 1: Nome & Função */}
          <div className="text-center sm:text-left">
            <span className="font-display text-base font-bold text-[#291F1A]">
              {about.name}
            </span>
            <p className="mt-0.5 tracking-wide text-[#C35A38] font-medium">
              {about.role}
            </p>
          </div>

          {/* Col 2: Resumo / Headline */}
          <div className="text-center sm:text-left">
            <p className="leading-relaxed max-w-md mx-auto sm:mx-0 font-medium text-[#291F1A]/80">
              {about.headline}
            </p>
          </div>

          {/* Col 3: Ícones oficiais das Redes Sociais (Instagram, E-mail, LinkedIn) */}
          <div className="flex justify-center sm:justify-end items-center gap-2.5 sm:gap-3">
            {SOCIAL_ICONS_CONFIG.map((item) => {
              const Icon = item.icon
              const handleItem = about.handles.find(
                (h) => h.platform.toLowerCase() === item.platform.toLowerCase()
              )
              const href = handleItem?.href || item.defaultHref

              return (
                <a
                  key={item.platform}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
                  aria-label={item.label}
                  title={item.label}
                  className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#E0CEB7] bg-[#FAF4ED] text-[#291F1A] shadow-xs transition-all duration-300 hover:border-[#C35A38] hover:bg-[#C35A38] hover:text-[#FAF4ED] hover:scale-110 active:scale-95"
                >
                  <Icon size={18} className="transition-transform duration-300 group-hover:scale-105" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Giant Layered Typography + Editorial Visual */}
        <div className="relative mt-6 sm:mt-8 md:mt-12">
          {/* Repeated Outlined "PORTFOLIO" Layer (Imagem 02) */}
          <div className="select-none pointer-events-none absolute -top-2 sm:-top-8 left-0 right-0 z-0 flex flex-col space-y-[-0.6rem] xs:space-y-[-1.1rem] sm:space-y-[-3rem] lg:space-y-[-5rem]">
            <h1 className="font-display text-5xl xs:text-6xl sm:text-8xl lg:text-[11.5rem] font-black uppercase tracking-tight sm:tracking-tighter text-[#C35A38] leading-none text-center lg:text-left">
              PORTFOLIO
            </h1>
            <span className="font-display text-5xl xs:text-6xl sm:text-8xl lg:text-[11.5rem] font-black uppercase tracking-tight sm:tracking-tighter text-stroke-terracotta leading-none opacity-40 text-center lg:text-left">
              PORTFOLIO
            </span>
            <span className="font-display text-5xl xs:text-6xl sm:text-8xl lg:text-[11.5rem] font-black uppercase tracking-tight sm:tracking-tighter text-stroke-apricot leading-none opacity-30 text-center lg:text-left">
              PORTFOLIO
            </span>
          </div>

          {/* Foreground Visual Composition (Portrait + Badges + Story) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center pt-20 xs:pt-24 sm:pt-36 lg:pt-48">
            {/* Left Column: Story, Greeting & CTA */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF4ED] px-3.5 sm:px-4 py-1.5 border border-[#E0CEB7] shadow-sm">
                <SunburstIcon size={18} className="text-[#C35A38] animate-spin-slow shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#291F1A]">
                  Psicologia com Aconchego
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                <p className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-[#C35A38] -rotate-1">
                  Olá, eu sou a Iris!
                </p>
                <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#291F1A] leading-tight max-w-xl mx-auto lg:mx-0">
                  Construindo meus objetivos com afeto, segurança e rigor ético.
                </h2>
              </div>

              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#6B5B52] max-w-xl mx-auto lg:mx-0 font-normal">
                {about.bioShort}
              </p>

              {/* Highlights badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5 pt-1 sm:pt-2">
                {about.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF4ED] px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-[#291F1A] border border-[#E0CEB7]"
                  >
                    <SparkleStarIcon size={12} className="text-[#C35A38] shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3 sm:pt-4">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#291F1A] px-6 py-3 text-sm font-semibold text-[#FAF4ED] transition-all hover:bg-[#C35A38] hover:shadow-md active:scale-95"
                >
                  <span>Conhecer a Mentoria</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href="#visao"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C35A38] bg-transparent px-6 py-3 text-sm font-semibold text-[#C35A38] transition-all hover:bg-[#C35A38] hover:text-[#FAF4ED] active:scale-95"
                >
                  <span>Perspectiva</span>
                </a>
              </div>
            </div>

            {/* Right Column: Editorial Cutout Portrait with Arch Frame */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end px-2 sm:px-4">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Background Arch Card in Terracotta Tone (Imagem 02 style) */}
                <div className="absolute -inset-2 sm:-inset-4 rounded-t-[7rem] xs:rounded-t-[8.5rem] sm:rounded-t-[10rem] rounded-b-3xl bg-gradient-to-b from-[#C35A38] to-[#A84728] opacity-90 transform -rotate-1 shadow-xl" />

                {/* Second Arch Shadow in Mustard */}
                <div className="absolute -inset-1 rounded-t-[6.5rem] xs:rounded-t-[8rem] sm:rounded-t-[9.5rem] rounded-b-2xl bg-[#F5D98C] transform rotate-1 opacity-80" />

                {/* Portrait Container */}
                <div className="relative overflow-hidden rounded-t-[6.2rem] xs:rounded-t-[7.8rem] sm:rounded-t-[9rem] rounded-b-2xl border-4 border-[#FAF4ED] bg-[#FAF4ED] shadow-2xl">
                  <Image
                    src={about.portraitUrl}
                    alt="Retrato de Iris — Psicóloga e Mentora"
                    width={480}
                    height={640}
                    priority
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Overlay bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-[#291F1A]/80 via-[#291F1A]/30 to-transparent" />

                  {/* Portrait Caption Tag inside frame */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-xs text-[#FAF4ED]">
                    <span className="font-semibold tracking-wide text-[11px] sm:text-xs">
                      {about.location}
                    </span>
                  </div>
                </div>

                {/* Floating Pill Badge 1 (Birth/Status - Img 02) */}
                <div className="absolute -top-3 left-1 xs:-left-3 sm:-left-6 rounded-full bg-[#F5D98C] px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-[#291F1A] shadow-md border border-[#FAF4ED] flex items-center gap-1.5 z-20">
                  <SunburstIcon size={14} className="text-[#C35A38] shrink-0" />
                  <span className="whitespace-nowrap">Escuta & Embasamento</span>
                </div>

                {/* Floating Pill Badge 2 (Img 02) */}
                <div className="absolute -bottom-3 right-1 xs:-right-3 sm:-right-6 rounded-full bg-[#7A8456] px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-[#FAF4ED] shadow-md border border-[#FAF4ED] flex items-center gap-1.5 z-20">
                  <SparkleStarIcon size={14} className="text-[#F5D98C] shrink-0" />
                  <span className="whitespace-nowrap">Para todos os públicos!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating "Scroll down" Bridge Badge (Imagem 02) */}
        <div className="mt-12 sm:mt-20 lg:mt-24 flex justify-center">
          <a
            href="#visao"
            className="group flex flex-col items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B5B52] transition-colors hover:text-[#C35A38]"
          >
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#F5D98C] text-[#291F1A] shadow-md transition-all duration-300 group-hover:bg-[#C35A38] group-hover:text-[#FAF4ED] group-hover:scale-110 active:scale-95">
              <span className="text-lg sm:text-xl">&darr;</span>
            </div>
            <span className="font-semibold text-[11px] sm:text-xs">Rolar para explorar</span>
          </a>
        </div>
      </div>
    </section>
  )
}
