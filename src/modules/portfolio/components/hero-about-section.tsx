import Image from 'next/image'
import {
  SunburstIcon,
  RetroAsteriskIcon,
  SparkleStarIcon,
  ArchMotif,
} from './aconchego-icons'
import type { AboutContent } from '@/modules/portfolio/types/portfolio.types'

interface HeroAboutSectionProps {
  about: AboutContent
}

export function HeroAboutSection({ about }: HeroAboutSectionProps) {
  return (
    <section id="sobre" className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28">
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

      <div className="mx-auto max-w-6xl px-6">
        {/* Top Meta Strip (Inspirado na Imagem 01 & 02) */}
        <div className="grid grid-cols-1 gap-6 border-b border-[#E0CEB7]/80 pb-8 sm:grid-cols-3 sm:items-center text-xs text-[#6B5B52]">
          {/* Col 1: Nome & Função */}
          <div>
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

          {/* Col 3: Handles & Redes Rápidas (Img 02 style) */}
          <div className="flex sm:justify-end items-center gap-4">
            {about.handles.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-1 font-semibold text-[#291F1A] transition-colors hover:text-[#C35A38]"
              >
                <span className="text-[10px] text-[#C35A38] font-bold">
                  {item.platform}:
                </span>
                <span className="underline decoration-[#E0CEB7] underline-offset-4 group-hover:decoration-[#C35A38]">
                  {item.handle}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Giant Layered Typography + Editorial Visual */}
        <div className="relative mt-8 md:mt-12">
          {/* Repeated Outlined "PORTFOLIO" Layer (Imagem 02) */}
          <div className="select-none pointer-events-none absolute -top-4 sm:-top-8 left-0 right-0 z-0 flex flex-col space-y-[-1.5rem] sm:space-y-[-3.5rem] lg:space-y-[-5rem]">
            <h1 className="font-display text-6xl sm:text-8xl lg:text-[11.5rem] font-black uppercase tracking-tight text-[#C35A38] leading-none">
              PORTFOLIO
            </h1>
            <span className="font-display text-6xl sm:text-8xl lg:text-[11.5rem] font-black uppercase tracking-tight text-stroke-terracotta leading-none opacity-40">
              PORTFOLIO
            </span>
            <span className="font-display text-6xl sm:text-8xl lg:text-[11.5rem] font-black uppercase tracking-tight text-stroke-apricot leading-none opacity-30">
              PORTFOLIO
            </span>
          </div>

          {/* Foreground Visual Composition (Portrait + Badges + Story) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-28 sm:pt-40 lg:pt-48">
            {/* Left Column: Story, Greeting & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF4ED] px-4 py-1.5 border border-[#E0CEB7] shadow-sm">
                <SunburstIcon size={18} className="text-[#C35A38] animate-spin-slow" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#291F1A]">
                  Psicologia com Aconchego
                </span>
              </div>

              <div className="space-y-3">
                <p className="font-handwriting text-3xl sm:text-4xl text-[#C35A38] -rotate-1">
                  Olá, eu sou a Iris!
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#291F1A] leading-tight">
                  Construindo meus objetivos com afeto, segurança e rigor ético.
                </h2>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-[#6B5B52] max-w-xl font-normal">
                {about.bioShort}
              </p>

              {/* Highlights badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {about.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF4ED] px-3.5 py-1.5 text-xs font-semibold text-[#291F1A] border border-[#E0CEB7]"
                  >
                    <SparkleStarIcon size={12} className="text-[#C35A38]" />
                    {badge}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 rounded-full bg-[#291F1A] px-6 py-3 text-sm font-semibold text-[#FAF4ED] transition-all hover:bg-[#C35A38] hover:shadow-md"
                >
                  <span>Conhecer a Mentoria</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href="#visao"
                  className="inline-flex items-center gap-2 rounded-full border border-[#C35A38] bg-transparent px-6 py-3 text-sm font-semibold text-[#C35A38] transition-all hover:bg-[#C35A38] hover:text-[#FAF4ED]"
                >
                  <span>Pespectiva!</span>
                </a>
              </div>
            </div>

            {/* Right Column: Editorial Cutout Portrait with Arch Frame */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Background Arch Card in Terracotta Tone (Imagem 02 style) */}
                <div className="absolute -inset-2 sm:-inset-4 rounded-t-[10rem] rounded-b-3xl bg-gradient-to-b from-[#C35A38] to-[#A84728] opacity-90 transform -rotate-1 shadow-xl" />

                {/* Second Arch Shadow in Mustard */}
                <div className="absolute -inset-1 rounded-t-[9.5rem] rounded-b-2xl bg-[#F5D98C] transform rotate-1 opacity-80" />

                {/* Portrait Container */}
                <div className="relative overflow-hidden rounded-t-[9rem] rounded-b-2xl border-4 border-[#FAF4ED] bg-[#FAF4ED] shadow-2xl">
                  <Image
                    src={about.portraitUrl}
                    alt="Retrato de Íris — Psicóloga e Mentora"
                    width={480}
                    height={640}
                    priority
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Overlay bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#291F1A]/80 via-[#291F1A]/30 to-transparent" />

                  {/* Portrait Caption Tag inside frame */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FAF4ED]">
                    <span className="font-semibold tracking-wide">
                      {about.location}
                    </span>
                  </div>
                </div>

                {/* Floating Pill Badge 1 (Birth/Status - Img 02) */}
                <div className="absolute -top-4 -left-4 sm:-left-6 rounded-full bg-[#F5D98C] px-4 py-2 text-xs font-bold text-[#291F1A] shadow-md border border-[#FAF4ED] flex items-center gap-1.5">
                  <SunburstIcon size={16} className="text-[#C35A38]" />
                  <span>Escuta & Embasamento</span>
                </div>

                {/* Floating Pill Badge 2 (Img 02) */}
                <div className="absolute -bottom-5 -right-4 sm:-right-6 rounded-full bg-[#7A8456] px-4 py-2 text-xs font-bold text-[#FAF4ED] shadow-md border border-[#FAF4ED] flex items-center gap-1.5">
                  <SparkleStarIcon size={14} className="text-[#F5D98C]" />
                  <span>Para todos os públicos!</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Floating "Scroll down" Bridge Badge (Imagem 02) */}
        <div className="mt-16 sm:mt-24 flex justify-center">
          <a
            href="#visao"
            className="group flex flex-col items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B5B52] transition-colors hover:text-[#C35A38]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5D98C] text-[#291F1A] shadow-md transition-all duration-300 group-hover:bg-[#C35A38] group-hover:text-[#FAF4ED] group-hover:scale-110">
              <span className="text-xl">&darr;</span>
            </div>
            <span className="font-semibold">Rolar para explorar</span>
          </a>
        </div>
      </div>
    </section>
  )
}
