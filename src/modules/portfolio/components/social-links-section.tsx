import {
  SunburstIcon,
  WarmHeartIcon,
  RetroAsteriskIcon,
  SparkleStarIcon,
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
      className="relative overflow-hidden bg-[#F3E6D3] py-24 sm:py-32 border-t border-[#E0CEB7]"
    >
      {/* Decorative Arch */}
      <div className="pointer-events-none absolute -top-12 -right-8 opacity-40">
        <ArchMotif width={180} height={220} strokeColor="#C35A38" />
      </div>
      <div className="pointer-events-none absolute bottom-12 left-10 text-[#C35A38]/40">
        <RetroAsteriskIcon size={40} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Craft Tag Container inspired by Aconchego Tag (Imagem 03) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#C35A38] p-8 sm:p-14 lg:p-20 text-[#FAF4ED] shadow-2xl">
          {/* Eyelet / String hole decoration at top center */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="h-4 w-4 rounded-full border-2 border-[#FAF4ED] bg-[#FAF4ED]/20 shadow-inner" />
          </div>

          <div className="mx-auto max-w-3xl text-center space-y-6 pt-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF4ED]/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FAF4ED]">
              <SunburstIcon size={16} className="text-[#F5D98C]" />
              <span>Sua Jornada na Psicologia, Acolhida com Afeto</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF4ED] leading-tight">
              Pronto(a) para dar os próximos passos na sua formação com confiança?
            </h2>

            <p className="text-base sm:text-xl leading-relaxed text-[#FAF4ED]/90 max-w-xl mx-auto font-normal">
              Seja para tirar dúvidas sobre seus primeiros estágios, discutir casos clínicos ou organizar sua transição para a atuação profissional, estou aqui para caminhar com você.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5511987654321"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-[#FAF4ED] px-8 py-4 text-sm font-bold text-[#C35A38] shadow-lg transition-all hover:bg-[#F5D98C] hover:text-[#291F1A] hover:scale-105 active:scale-95"
              >
                <span>Agendar Mentoria no WhatsApp</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="mailto:contato@irispsicologia.com.br"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#FAF4ED] bg-transparent px-8 py-4 text-sm font-bold text-[#FAF4ED] transition-all hover:bg-[#FAF4ED]/20 hover:scale-105 active:scale-95"
              >
                <span>Tirar Dúvidas por E-mail</span>
              </a>
            </div>
          </div>

          {/* Social Channels Craft Cards Grid (Imagem 03 - Tags) */}
          <div className="mt-14 pt-10 border-t border-[#FAF4ED]/20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col items-center justify-center rounded-2xl bg-[#FAF4ED] p-4 text-center text-[#291F1A] shadow-md transition-all hover:-translate-y-1 hover:bg-[#F5D98C] hover:shadow-xl"
              >
                <span className="font-display text-base font-bold transition-colors group-hover:text-[#C35A38]">
                  {link.label}
                </span>
                {link.sublabel && (
                  <span className="mt-1 text-[11px] font-medium text-[#6B5B52] truncate max-w-full">
                    {link.sublabel}
                  </span>
                )}
                <span className="mt-2 inline-flex items-center text-[10px] font-bold text-[#C35A38] uppercase tracking-wider group-hover:underline">
                  Acessar &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Signature & Aconchego Brand Seal */}
        <footer className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#6B5B52]">
          <div className="flex items-center gap-2">
            <SunburstIcon size={20} className="text-[#C35A38]" />
            <span className="font-display text-base font-bold text-[#291F1A]">
              Íris
            </span>
            <span>— Psicologia & Mentoria com Aconchego</span>
            <WarmHeartIcon size={14} className="text-[#C35A38]" />
          </div>


          <div className="flex items-center gap-6">
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
