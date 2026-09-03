import {
  RetroAsteriskIcon,
  SunburstIcon,
  SparkleStarIcon,
  VinylMusicIcon,
  CoffeeCupIcon,
  PlantLeavesIcon,
  DigitalArtIcon,
  CuteCatIcon,
  ArchMotif,
} from './aconchego-icons'
import type {
  HobbyItem,
  LanguageItem,
  SkillSoftware,
} from '@/modules/portfolio/types/portfolio.types'

interface StudiesSectionProps {
  softwares: SkillSoftware[]
  codingSkills: string[]
  specialties: string[]
  languages: LanguageItem[]
  hobbies: HobbyItem[]
}

const HOBBY_ICONS = {
  vinyl: VinylMusicIcon,
  coffee: CoffeeCupIcon,
  plant: PlantLeavesIcon,
  digitalArt: DigitalArtIcon,
  cat: CuteCatIcon,
}

export function StudiesSection({
  softwares,
  codingSkills,
  specialties,
  languages,
  hobbies,
}: StudiesSectionProps) {
  return (
    <section
      id="habilidades"
      className="relative overflow-hidden bg-[#FAF4ED] py-24 sm:py-32 border-t border-[#E0CEB7]"
    >
      {/* Decorative Arch & Stars */}
      <div className="pointer-events-none absolute -bottom-10 -left-10 opacity-30">
        <ArchMotif width={180} height={220} strokeColor="#7A8456" />
      </div>
      <div className="pointer-events-none absolute top-10 right-8 text-[#C35A38]">
        <RetroAsteriskIcon size={36} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header (Imagem 01 - "Individual Competencies") */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#C35A38] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FAF4ED]">
              Competências
            </span>
            <p className="font-handwriting text-3xl sm:text-4xl text-[#C35A38]">
              Prática Clínica & Instrumentos
            </p>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#291F1A]">
            Instrumentos, escuta ativa e o que sustenta a prática.
          </h2>
          <p className="text-base sm:text-lg text-[#6B5B52]">
            O equilíbrio entre o rigor ético-científico da Psicologia e o acolhimento afetivo indispensável à formação clínica de quem está começando.
          </p>
        </div>

        {/* Top Grid: Software Skills + Coding Skills + Specialties (Imagem 02) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Software Skills (Square Badges - D5, C1, CF, etc.) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#F3E6D3] p-6 sm:p-8 border border-[#E0CEB7] shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-[#E0CEB7]">
              <SunburstIcon size={20} className="text-[#C35A38]" />
              <h3 className="font-display text-xl font-bold text-[#291F1A]">
                Recursos & Instrumentos
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3">
              {softwares.map((sw) => (
                <div
                  key={sw.name}
                  className="group flex flex-col items-center justify-center rounded-2xl bg-[#291F1A] p-3 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                  title={sw.name}
                >
                  <span
                    className="font-display text-lg font-black text-[#FAF4ED] transition-colors group-hover:text-[#F5D98C]"
                  >
                    {sw.shortName}
                  </span>
                  <span className="mt-1 text-[9px] font-semibold text-[#E0CEB7] truncate max-w-full">
                    {sw.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Specialties Pill Badges (Imagem 02) */}
            <div className="mt-8 pt-6 border-t border-[#E0CEB7]">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#6B5B52]">
                Focos da Mentoria
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {specialties.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full bg-[#291F1A] px-3 py-1 text-xs font-medium text-[#FAF4ED] shadow-sm transition-transform hover:scale-105"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Coding & Hard Skills -> Fundamentos Clínicos */}
          <div className="lg:col-span-4 rounded-3xl bg-[#F3E6D3] p-6 sm:p-8 border border-[#E0CEB7] shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-[#E0CEB7]">
              <SparkleStarIcon size={20} className="text-[#7A8456]" />
              <h3 className="font-display text-xl font-bold text-[#291F1A]">
                Fundamentos Clínicos
              </h3>
            </div>

            <ul className="mt-6 space-y-3.5 text-sm">
              {codingSkills.map((skill) => (
                <li key={skill} className="flex items-start gap-3 text-[#291F1A]">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#7A8456] text-[10px] text-[#FAF4ED] font-bold">
                    ✓
                  </span>
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-[#7A8456] p-4 text-[#FAF4ED]">
              <p className="font-display text-sm font-bold">Compromisso Ético & Didático</p>
              <p className="mt-1 text-xs text-[#FAF4ED]/80 leading-relaxed">
                Atuação estritamente embasada nas resoluções vigentes do CFP, ética inegociável e respeito à singularidade e abordagem de cada graduando.
              </p>
            </div>
          </div>

          {/* Languages & Working Style */}
          <div className="lg:col-span-4 rounded-3xl bg-[#F3E6D3] p-6 sm:p-8 border border-[#E0CEB7] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-[#E0CEB7]">
                <RetroAsteriskIcon size={20} className="text-[#C35A38]" />
                <h3 className="font-display text-xl font-bold text-[#291F1A]">
                  Comunicação & Pesquisa
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {languages.map((lang) => (
                  <div
                    key={lang.language}
                    className="flex items-center justify-between rounded-2xl bg-[#FAF4ED] p-3.5 border border-[#E0CEB7]"
                  >
                    <span className="font-display text-base font-bold text-[#291F1A]">
                      {lang.language}
                    </span>
                    <span className="rounded-full bg-[#E8A76F]/30 px-3 py-0.5 text-xs font-bold text-[#C35A38]">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#E8A76F]/20 p-4 border border-[#E8A76F]/40">
              <p className="text-xs leading-relaxed text-[#291F1A]">
                <span className="font-bold">Escuta Didática:</span> Tradução da literatura científica densa em orientações aplicadas e seguras para seus relatórios e atendimentos de estágio.
              </p>
            </div>
          </div>
        </div>

        {/* Hobbies & Interests Grid (Imagem 02 - Han Nguyen) */}
        <div className="mt-16 rounded-3xl bg-[#291F1A] p-8 sm:p-12 text-[#FAF4ED] shadow-xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#FAF4ED]/15 pb-6">
            <div>
              <p className="font-handwriting text-2xl sm:text-3xl text-[#F5D98C]">
                Fora da clínica
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FAF4ED]">
                Pausas & Inspirações
              </h3>
            </div>
            <span className="rounded-full bg-[#FAF4ED]/10 px-4 py-1 text-xs font-semibold text-[#F5D98C]">
              O autocuidado de quem cuida
            </span>
          </div>


          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {hobbies.map((hobby) => {
              const Icon = HOBBY_ICONS[hobby.icon]
              return (
                <div
                  key={hobby.id}
                  className="group flex flex-col items-center rounded-2xl bg-[#FAF4ED]/5 p-5 text-center transition-all hover:bg-[#FAF4ED]/15 hover:-translate-y-1 border border-[#FAF4ED]/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5D98C] text-[#291F1A] shadow-md transition-transform group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <h4 className="mt-3 font-display text-sm font-bold text-[#FAF4ED]">
                    {hobby.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-[#FAF4ED]/70 leading-tight">
                    {hobby.subtitle}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
