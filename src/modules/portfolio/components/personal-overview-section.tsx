import Image from 'next/image'
import {
  SunburstIcon,
  WarmHeartIcon,
  SparkleStarIcon,
  RetroAsteriskIcon,
} from './aconchego-icons'
import type { OverviewContent } from '@/modules/portfolio/types/portfolio.types'

interface PersonalOverviewSectionProps {
  overview: OverviewContent
}

const PILLAR_ICONS = {
  sun: SunburstIcon,
  heart: WarmHeartIcon,
  star: SparkleStarIcon,
  arch: RetroAsteriskIcon,
}

export function PersonalOverviewSection({ overview }: PersonalOverviewSectionProps) {
  return (
    <section
      id="visao"
      className="relative overflow-hidden bg-[#C35A38] text-[#FAF4ED] py-16 sm:py-24 lg:py-32 scroll-mt-20"
    >
      {/* Giant Soft Number "02" in the background (Imagem 01 - Daniel Gallego) */}
      <div
        className="pointer-events-none select-none absolute right-2 -bottom-6 sm:right-16 sm:-bottom-20 z-0 font-display text-[8rem] xs:text-[11rem] sm:text-[16rem] lg:text-[24rem] font-black leading-none text-[#A84728]/40 sm:text-[#A84728]/50"
        aria-hidden="true"
      >
        {overview.sectionNumber}
      </div>

      {/* Background Floating Decorative Asterisks */}
      <div className="pointer-events-none absolute top-8 sm:top-12 left-4 sm:left-10 text-[#FAF4ED]/25">
        <RetroAsteriskIcon size={36} className="sm:h-11 sm:w-11" />
      </div>
      <div className="pointer-events-none absolute bottom-12 sm:bottom-20 left-1/4 sm:left-1/3 text-[#F5D98C]/35">
        <SparkleStarIcon size={24} className="sm:h-7 sm:w-7" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header: Handwritten title + Main Heading */}
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="rounded-full bg-[#FAF4ED]/20 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FAF4ED]">
              Seção {overview.sectionNumber}
            </span>
            <p className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-[#F5D98C]">
              {overview.scriptTitle}
            </p>
          </div>

          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF4ED] leading-tight">
            {overview.heading}
          </h2>
        </div>

        {/* Two-Column Grid: Visual Workspace Flatlay + Story & Pillars */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column: Flatlay Photo + Floating Contact Card */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-[#E8A76F]/40 transform -rotate-2 transition-transform group-hover:rotate-0" />
              
              <div className="relative overflow-hidden rounded-2xl border-4 border-[#FAF4ED] bg-[#FAF4ED] shadow-2xl">
                <Image
                  src={overview.workspaceImageUrl}
                  alt="Mesa de estudos, livros e supervisão clínica de Iris"
                  width={540}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Caption chip */}
                <div className="absolute bottom-3 left-3 rounded-full bg-[#291F1A]/85 backdrop-blur px-3 py-1 text-[10px] sm:text-[11px] font-medium text-[#FAF4ED]">
                  Espaço de Estudo & Supervisão
                </div>
              </div>
            </div>

            {/* Floating Contact Card (From Image 02 - Han Nguyen) */}
            <div className="rounded-2xl border-2 border-[#FAF4ED]/20 bg-[#7A8456] p-5 sm:p-6 text-[#FAF4ED] shadow-xl backdrop-blur max-w-md mx-auto lg:max-w-none">
              <div className="flex items-center justify-between border-b border-[#FAF4ED]/20 pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <SunburstIcon size={20} className="text-[#F5D98C] shrink-0" />
                  <span className="font-display text-base sm:text-lg font-bold">Canal de Mentoria</span>
                </div>
                <span className="rounded-full bg-[#F5D98C] px-2.5 py-0.5 text-[10px] font-bold text-[#291F1A] shrink-0">
                  {overview.contact.status}
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#FAF4ED]/90">
                  <span className="font-bold text-[#F5D98C] shrink-0">Local:</span>
                  <span className="min-w-0">{overview.contact.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#FAF4ED]/90 min-w-0">
                  <span className="font-bold text-[#F5D98C] shrink-0">E-mail:</span>
                  <a
                    href={`mailto:${overview.contact.email}`}
                    className="underline hover:text-[#F5D98C] transition-colors min-w-0 break-all"
                  >
                    {overview.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#FAF4ED]/90">
                  <span className="font-bold text-[#F5D98C] shrink-0">WhatsApp:</span>
                  <span>{overview.contact.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy + 4 Aconchego Brand Pillars */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Story Paragraphs */}
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-lg leading-relaxed text-[#FAF4ED]/90 font-normal">
              {overview.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2 sm:pt-4">
              {overview.pillars.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.iconName]
                return (
                  <div
                    key={pillar.title}
                    className="group rounded-2xl border border-[#FAF4ED]/20 bg-[#FAF4ED]/10 p-4 sm:p-5 backdrop-blur-sm transition-all hover:bg-[#FAF4ED]/20 hover:border-[#FAF4ED]/40 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5D98C] text-[#291F1A] shadow-sm transition-transform group-hover:scale-110">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-base font-bold text-[#FAF4ED]">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 sm:mt-3 text-xs leading-relaxed text-[#FAF4ED]/80">
                      {pillar.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
