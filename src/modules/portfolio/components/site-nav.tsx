const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#carreira', label: 'Carreira' },
  { href: '#estudos', label: 'Estudos' },
  { href: '#redes', label: 'Redes' },
] as const

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 overflow-x-auto px-6 py-4">
        <span className="shrink-0 text-sm font-semibold tracking-tight">Íris</span>
        <ul className="flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
