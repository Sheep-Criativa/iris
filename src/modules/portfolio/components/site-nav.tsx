import { SunburstIcon } from './aconchego-icons'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#visao', label: 'Pespectiva' },
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#habilidades', label: 'Competências' },
  { href: '#contato', label: 'Mentoria & Contato' },
] as const

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E0CEB7] bg-[#F3E6D3]/90 backdrop-blur-md transition-all">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* Brand / Logo */}
        <a
          href="#sobre"
          className="group flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-[#291F1A] transition-colors hover:text-[#C35A38]"
        >
          <SunburstIcon
            size={28}
            className="text-[#C35A38] transition-transform duration-500 group-hover:rotate-45"
          />
          <span className="tracking-tight">Iris Amanda</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
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

        {/* CTA Button (Warm Pill - Img 02 & Img 03) */}
        <a
          href="#contato"
          className="inline-flex items-center justify-center rounded-full bg-[#C35A38] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF4ED] shadow-sm transition-all hover:bg-[#A84728] hover:shadow-md active:scale-95"
        >
          Agendar Mentoria
        </a>
      </nav>
    </header>
  )
}

