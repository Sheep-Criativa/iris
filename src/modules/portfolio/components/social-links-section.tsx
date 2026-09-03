import {
  SunburstIcon,
  WarmHeartIcon,
  RetroAsteriskIcon,
  ArchMotif,
} from './aconchego-icons'
import type { SocialLink } from '@/modules/portfolio/types/portfolio.types'

interface SocialLinksSectionProps {
  links: SocialLink[]
}

export function SocialLinksSection({ links }: SocialLinksSectionProps) {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[#F3E6D3] py-16 sm:py-24 lg:py-32 border-t border-[#E0CEB7] scroll-mt-20"
    >
      {/* Decorative Arch */}
      <div className="pointer-events-none absolute -top-12 -right-8 opacity-40">
        <ArchMotif width={180} height={220} strokeColor="#C35A38" />
      </div>
      <div className="pointer-events-none absolute bottom-12 left-10 text-[#C35A38]/40">
        <RetroAsteriskIcon size={40} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Craft Tag Container inspired by Aconchego Tag (Imagem 03) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#C35A38] p-5 xs:p-8 sm:p-14 lg:p-20 text-[#FAF4ED] shadow-2xl">
          {/* Eyelet / String hole decoration at top center */}
          <div className="absolute top-3.5 sm:top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-[#FAF4ED] bg-[#FAF4ED]/20 shadow-inner" />
          </div>

          <div className="mx-auto max-w-3xl text-center space-y-4 sm:space-y-6 pt-3 sm:pt-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#FAF4ED]/20 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#FAF4ED]">
              <SunburstIcon size={16} className="text-[#F5D98C] shrink-0" />
              <span>Sua Jornada na Psicologia, Acolhida com Afeto</span>
            </div>

            <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF4ED] leading-tight">
              Pronto(a) para dar os próximos passos na sua formação com confiança?
            </h2>

            <p className="text-sm sm:text-base lg:text-xl leading-relaxed text-[#FAF4ED]/90 max-w-xl mx-auto font-normal">
              Seja para tirar dúvidas sobre seus primeiros estágios, discutir casos clínicos ou organizar sua transição para a atuação profissional, estou aqui para caminhar com você.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col xs:flex-row justify-center items-stretch xs:items-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/5511987654321"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF4ED] px-6 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold text-[#C35A38] shadow-lg transition-all hover:bg-[#F5D98C] hover:text-[#291F1A] hover:scale-105 active:scale-95"
              >
                <span>Agendar Mentoria no WhatsApp</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="mailto:contato@irispsicologia.com.br"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FAF4ED] bg-transparent px-6 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold text-[#FAF4ED] transition-all hover:bg-[#FAF4ED]/20 hover:scale-105 active:scale-95"
              >
                <span>Tirar Dúvidas por E-mail</span>
              </a>
            </div>
          </div>

          {/* Social Channels Craft Cards Grid (Imagem 03 - Tags) */}
          <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[#FAF4ED]/20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col items-center justify-center rounded-2xl bg-[#FAF4ED] p-3 sm:p-4 text-center text-[#291F1A] shadow-md transition-all hover:-translate-y-1 hover:bg-[#F5D98C] hover:shadow-xl active:scale-95"
              >
                <span className="font-display text-sm sm:text-base font-bold transition-colors group-hover:text-[#C35A38]">
                  {link.label}
                </span>
                {link.sublabel && (
                  <span className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-medium text-[#6B5B52] truncate max-w-full">
                    {link.sublabel}
                  </span>
                )}
                <span className="mt-1.5 sm:mt-2 inline-flex items-center text-[9px] sm:text-[10px] font-bold text-[#C35A38] uppercase tracking-wider group-hover:underline">
                  Acessar &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Signature & Aconchego Brand Seal */}
        <footer className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left text-xs text-[#6B5B52]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <SunburstIcon size={20} className="text-[#C35A38] shrink-0" />
            <span className="font-display text-base font-bold text-[#291F1A]">
              Íris
            </span>
            <span>— Psicologia & Mentoria com Aconchego</span>
            <WarmHeartIcon size={14} className="text-[#C35A38] shrink-0" />
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6">
            <span>© 2026 Ecossistema Íris. Todos os direitos reservados.</span>
            <a
              href="#sobre"
              className="font-bold text-[#C35A38] hover:underline"
            >
              Voltar ao topo &uarr;
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
