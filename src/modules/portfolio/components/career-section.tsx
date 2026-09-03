import { SparkleStarIcon, RetroAsteriskIcon } from './aconchego-icons'
import type {
  CareerItem,
  EducationItem,
} from '@/modules/portfolio/types/portfolio.types'

interface CareerSectionProps {
  education: EducationItem[]
  career: CareerItem[]
}

export function CareerSection({ education, career }: CareerSectionProps) {
  return (
    <section
      id="trajetoria"
      className="relative overflow-hidden bg-[#F3E6D3] py-24 sm:py-32"
    >
      {/* Giant Soft Number "03" in Apricot (Imagem 01 - Daniel Gallego) */}
      <div
        className="pointer-events-none select-none absolute left-4 -top-8 sm:left-12 sm:-top-16 z-0 font-display text-[15rem] sm:text-[22rem] font-black leading-none text-[#E8A76F]/25"
        aria-hidden="true"
      >
        03
      </div>

      {/* Repeated Outlined "TRAJETÓRIA" in the background (Imagem 02 - Han Nguyen) */}
      <div className="pointer-events-none select-none absolute right-0 top-1/4 z-0 hidden lg:block opacity-20 text-right pr-6">
        <span className="font-display text-8xl font-black uppercase text-stroke-terracotta-thick block leading-none">
          RESUME
        </span>
        <span className="font-display text-8xl font-black uppercase text-stroke-sage block leading-none mt-2">
          TRAJETÓRIA
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#FAF4ED] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#C35A38] border border-[#E0CEB7]">
              Seção 03
            </span>
            <p className="font-handwriting text-3xl sm:text-4xl text-[#C35A38]">
              Trajetória & Experiência
            </p>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#291F1A]">
            O caminho percorrido entre teoria, clínica e supervisão.
          </h2>
          <p className="text-base sm:text-lg text-[#6B5B52]">
            Uma síntese da minha base acadêmica e da prática clínica que fundamentam minhas mentorias com graduandos.
          </p>
        </div>

        {/* Two-Column Grid: Education Timeline (Left) + Experience Cards (Right) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Formação & Educação Timeline (Imagem 02) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2 border-b-2 border-[#C35A38] pb-3">
              <SparkleStarIcon size={20} className="text-[#C35A38]" />
              <h3 className="font-display text-2xl font-bold text-[#291F1A]">
                Formação Acadêmica
              </h3>
            </div>

            <div className="relative pl-6 space-y-10 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E0CEB7]">
              {education.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Diamond / Sparkle Star Marker on the line */}
                  <div className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#FAF4ED] text-[#C35A38] shadow-sm ring-2 ring-[#C35A38] transition-transform group-hover:scale-125">
                    <SparkleStarIcon size={12} />
                  </div>

                  {/* Year Tag */}
                  <span className="inline-block rounded-full bg-[#E8A76F]/25 px-2.5 py-0.5 text-xs font-bold text-[#C35A38]">
                    {item.period}
                  </span>

                  <h4 className="mt-2 font-display text-lg font-bold text-[#291F1A] leading-snug">
                    {item.degree}
                  </h4>

                  <p className="mt-0.5 text-xs font-semibold text-[#7A8456]">
                    {item.institution}
                  </p>

                  {item.description && (
                    <p className="mt-2 text-xs leading-relaxed text-[#6B5B52]">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Experiência Card (Warm Yellow/Mustard Container - Img 02) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#F5D98C] p-6 sm:p-10 text-[#291F1A] shadow-xl border-4 border-[#FAF4ED]">
              <div className="flex items-center justify-between border-b-2 border-[#291F1A]/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <RetroAsteriskIcon size={24} className="text-[#C35A38]" />
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#291F1A]">
                    Prática Clínica & Mentoria
                  </h3>
                </div>
                <span className="hidden sm:inline-block rounded-full bg-[#291F1A] px-3 py-1 text-[11px] font-bold text-[#FAF4ED] uppercase tracking-wider">
                  Experiência
                </span>
              </div>


              <div className="mt-8 space-y-8">
                {career.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`relative ${
                      idx !== career.length - 1 ? 'border-b border-[#291F1A]/15 pb-8' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="rounded-full bg-[#291F1A] px-2.5 py-0.5 text-xs font-bold text-[#F5D98C]">
                        {item.period}
                      </span>
                      <span className="text-xs font-semibold text-[#291F1A]/75">
                        {item.organization}
                      </span>
                    </div>

                    <h4 className="mt-2 font-display text-xl font-bold text-[#291F1A]">
                      {item.role}
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-[#291F1A]/85">
                      {item.description}
                    </p>

                    {/* Hashtag Skill Badges (Imagem 02) */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#291F1A] px-3 py-1 text-[11px] font-semibold text-[#FAF4ED] transition-transform hover:scale-105"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
