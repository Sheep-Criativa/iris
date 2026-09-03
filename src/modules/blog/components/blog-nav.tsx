import Link from 'next/link'

export function BlogNav({ blogTitle }: { blogTitle: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E0CEB7] bg-[#F3E6D3]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4">
        <Link
          href="/blog"
          className="font-display text-xl font-bold tracking-tight text-[#291F1A] transition-colors hover:text-[#C35A38] sm:text-2xl"
        >
          {blogTitle}
        </Link>
        <Link
          href="/portfolio"
          className="text-sm font-medium text-[#6B5B52] transition-colors hover:text-[#291F1A]"
        >
          ← Voltar ao portfólio
        </Link>
      </nav>
    </header>
  )
}
