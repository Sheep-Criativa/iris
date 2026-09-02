import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Íris',
  description: 'Em construção.',
}

/**
 * Placeholder do Blog. O módulo real (listagem, posts, etc.) ainda não
 * foi implementado — ver src/modules/blog/README.md para o plano.
 */
export default function BlogPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-6 py-32 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Blog em construção</h1>
      <p className="text-muted-foreground">
        Estamos preparando esse espaço. Volte em breve.
      </p>
    </main>
  )
}
