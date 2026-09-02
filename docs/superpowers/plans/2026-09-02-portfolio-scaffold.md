# Scaffold do Frontend — Portfólio (Ecossistema Íris) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold do repositório frontend do ecossistema Íris: Next.js + Tailwind + shadcn/ui + Supabase SSR client configurados, página única de Portfólio totalmente construída (Sobre, Carreira, Estudos, Redes Sociais), e base placeholder tipada para o Blog.

**Architecture:** App Router com `src/`. `src/app/portfolio` e `src/app/blog` como rotas irmãs explícitas; `src/app/page.tsx` redireciona para `/portfolio`. Conteúdo do portfólio vive em `src/modules/portfolio` (componentes, dados estáticos tipados, types) e é composto em `src/app/portfolio/page.tsx`. Supabase (`src/lib/supabase`) é infraestrutura pronta, sem uso ativo. Blog é só tipos + placeholder de rota.

**Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui, lucide-react, `@supabase/ssr` + `@supabase/supabase-js`, pnpm.

**Spec:** `docs/superpowers/specs/2026-09-02-portfolio-scaffold-design.md`

## Global Constraints

- Conteúdo do Portfólio (Sobre, Carreira, Estudos) é dado estático tipado em TypeScript — não vem do Supabase.
- Supabase SSR client é infraestrutura pronta (clients + middleware de refresh de sessão) — nenhuma escrita/leitura ativa em banco nesta entrega, nenhuma rota protegida.
- Gerenciador de pacotes: pnpm.
- `/blog` e `/portfolio` são pastas irmãs explícitas em `src/app/`; `src/app/page.tsx` faz `redirect('/portfolio')`.
- Sem suíte de testes automatizados nesta entrega — verificação via `pnpm build` (typecheck + lint + build) e smoke test manual do servidor.
- Fora de escopo: implementação real do Blog, autenticação, formulários gravando no Supabase, CI/deploy.

---

## Task 1: Bootstrap do projeto Next.js

**Files:**
- Create: todo o scaffold gerado por `create-next-app` na raiz de `portifolio/` (package.json, tsconfig.json, next.config.ts, eslint config, src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, etc.)

**Interfaces:**
- Consumes: nada (diretório `portifolio/` vazio, já com `git init` feito)
- Produces: projeto Next.js funcional com TypeScript, Tailwind, ESLint, App Router, `src/` e alias `@/*`, instalável e buildável via pnpm. Todas as tasks seguintes assumem essa base.

- [ ] **Step 1: Rodar o scaffold oficial**

Execute na raiz de `portifolio/` (onde já existe `.git` e `docs/`):

```bash
pnpm dlx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm \
  --yes
```

Se o comando abrir algum prompt interativo mesmo com `--yes` (varia por versão do CLI), aceite os valores padrão sugeridos entre parênteses.

- [ ] **Step 2: Verificar a estrutura gerada**

```bash
ls src/app
cat package.json
```

Expected: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` existem; `package.json` tem `"next"`, `"react"`, `"typescript"`, `"tailwindcss"` como dependências.

- [ ] **Step 3: Rodar o build de verificação**

```bash
pnpm build
```

Expected: sai com código 0, sem erros de TypeScript ou ESLint.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: bootstrap Next.js (App Router, TS, Tailwind, pnpm)"
```

---

## Task 2: shadcn/ui + lucide-react

**Files:**
- Create: `components.json`, `src/lib/utils.ts`, `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/components/ui/separator.tsx`, `src/components/ui/badge.tsx`
- Modify: `src/app/globals.css` (variáveis de tema, feito pelo `shadcn init`), `package.json` (novas dependências)

**Interfaces:**
- Consumes: scaffold da Task 1 (precisa de `tsconfig.json` com alias `@/*` e Tailwind já configurado)
- Produces: componentes `Button`, `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardContent`, `Separator`, `Badge` (todos de `@/components/ui/*`), helper `cn()` em `@/lib/utils`, e a lib `lucide-react` instalada — usados pelas Tasks 5–8.

- [ ] **Step 1: Inicializar shadcn/ui**

```bash
pnpm dlx shadcn@latest init -d
```

Se abrir prompts mesmo com `-d`, responda: style **New York**, base color **Neutral**, CSS variables **Yes**.

- [ ] **Step 2: Adicionar os componentes base**

```bash
pnpm dlx shadcn@latest add button card separator badge
```

- [ ] **Step 3: Instalar lucide-react**

```bash
pnpm add lucide-react
```

- [ ] **Step 4: Verificar arquivos gerados**

```bash
ls src/components/ui
cat src/lib/utils.ts
```

Expected: `button.tsx`, `card.tsx`, `separator.tsx`, `badge.tsx` existem em `src/components/ui/`; `src/lib/utils.ts` exporta uma função `cn`.

- [ ] **Step 5: Rodar o build de verificação**

```bash
pnpm build
```

Expected: sai com código 0.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: configurar shadcn/ui e lucide-react"
```

---

## Task 3: Supabase clients (browser/server) e env

**Files:**
- Create: `src/lib/supabase/types.ts`, `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `.env.example`
- Modify: `package.json` (novas dependências)

**Interfaces:**
- Consumes: scaffold da Task 1 (alias `@/*`)
- Produces: `createClient()` síncrono em `@/lib/supabase/client` (uso em Client Components), `createClient()` assíncrono em `@/lib/supabase/server` (uso em Server Components/Server Actions), tipo `Database` em `@/lib/supabase/types`. Nenhuma outra task depende disso nesta entrega — é infraestrutura isolada.

- [ ] **Step 1: Instalar as libs do Supabase**

```bash
pnpm add @supabase/ssr @supabase/supabase-js
```

- [ ] **Step 2: Criar o tipo `Database` placeholder**

Create `src/lib/supabase/types.ts`:

```ts
// Placeholder até existir schema real no Supabase.
// Quando houver tabelas, gere os tipos reais com:
//   supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
export type Database = {
  public: {
    Tables: Record<string, never>
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
```

- [ ] **Step 3: Criar o client de browser**

Create `src/lib/supabase/client.ts`:

```ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/supabase/types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 4: Criar o client de servidor**

Create `src/lib/supabase/server.ts`:

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll chamado a partir de um Server Component sem acesso de
            // escrita a cookies — seguro ignorar, pois o middleware
            // (src/middleware.ts) já garante o refresh de sessão.
          }
        },
      },
    }
  )
}
```

- [ ] **Step 5: Criar o `.env.example`**

Create `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- [ ] **Step 6: Verificar que `.env*.local` está no `.gitignore`**

```bash
grep -n "env" .gitignore
```

Expected: alguma linha cobrindo `.env*.local` (gerada por padrão pelo `create-next-app`). Se não existir, adicione `.env*.local` ao `.gitignore`.

- [ ] **Step 7: Rodar o build de verificação**

```bash
pnpm build
```

Expected: sai com código 0. (As chamadas `process.env.NEXT_PUBLIC_SUPABASE_URL!` não quebram o build mesmo sem as envs definidas, pois os clients só são instanciados em runtime, nunca chamados ainda nesta entrega.)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: configurar Supabase SSR clients (browser/server)"
```

---

## Task 4: Middleware de refresh de sessão do Supabase

**Files:**
- Create: `src/middleware.ts`

**Interfaces:**
- Consumes: envs `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Task 3); não importa `@/lib/supabase/server` porque middleware usa cookies de `NextRequest`/`NextResponse` diretamente, não `next/headers`.
- Produces: middleware que roda em toda rota (exceto assets estáticos), mantém a sessão do Supabase viva. Não protege nenhuma rota, não redireciona.

- [ ] **Step 1: Criar o middleware**

Create `src/middleware.ts`:

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Mantém o token de sessão do Supabase atualizado. Nenhuma rota é
  // protegida ainda — isso só evita que a sessão expire silenciosamente
  // quando Auth/Blog forem implementados.
  await supabase.auth.getUser()

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

- [ ] **Step 2: Rodar o build de verificação**

```bash
pnpm build
```

Expected: sai com código 0, middleware listado no output do build.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: adicionar middleware de refresh de sessão do Supabase"
```

---

## Task 5: Types e dados estáticos do Portfólio

**Files:**
- Create: `src/modules/portfolio/types/portfolio.types.ts`, `src/modules/portfolio/data/about.data.ts`, `src/modules/portfolio/data/career.data.ts`, `src/modules/portfolio/data/studies.data.ts`, `src/modules/portfolio/data/social-links.data.ts`

**Interfaces:**
- Consumes: nada
- Produces: tipos `AboutContent`, `CareerItem`, `StudyItem`, `SocialLink`, `SocialPlatform` de `@/modules/portfolio/types/portfolio.types`; constantes `aboutContent: AboutContent`, `careerItems: CareerItem[]`, `studyItems: StudyItem[]`, `socialLinks: SocialLink[]` — consumidas pela Task 6 (componentes) e Task 7 (página).

- [ ] **Step 1: Criar os types**

Create `src/modules/portfolio/types/portfolio.types.ts`:

```ts
export interface AboutContent {
  name: string
  headline: string
  bio: string[]
  highlights: string[]
}

export interface CareerItem {
  id: string
  role: string
  organization: string
  period: string
  description: string
  tags: string[]
}

export interface StudyItem {
  id: string
  title: string
  description: string
  motivation: string
}

export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'twitter' | 'email'

export interface SocialLink {
  id: string
  platform: SocialPlatform
  label: string
  href: string
}
```

- [ ] **Step 2: Criar os dados de "Sobre"**

Create `src/modules/portfolio/data/about.data.ts`:

```ts
import type { AboutContent } from '@/modules/portfolio/types/portfolio.types'

// Conteúdo de exemplo — substitua pelos dados reais de Íris.
export const aboutContent: AboutContent = {
  name: 'Íris',
  headline: 'Especialista em [área] apaixonada por [tema]',
  bio: [
    'Escreva aqui a apresentação principal de Íris: quem é, o que faz hoje e o que a move.',
    'Um segundo parágrafo pode contar a trajetória resumida ou o que torna o trabalho dela único.',
  ],
  highlights: ['Destaque rápido 1', 'Destaque rápido 2', 'Destaque rápido 3'],
}
```

- [ ] **Step 3: Criar os dados de "Carreira & Projetos"**

Create `src/modules/portfolio/data/career.data.ts`:

```ts
import type { CareerItem } from '@/modules/portfolio/types/portfolio.types'

// Conteúdo de exemplo — substitua pelos dados reais de carreira e projetos.
export const careerItems: CareerItem[] = [
  {
    id: 'projeto-1',
    role: 'Cargo ou papel',
    organization: 'Organização ou projeto',
    period: '2024 — atual',
    description:
      'Descreva o que foi feito, o impacto gerado e o contexto do projeto.',
    tags: ['Next.js', 'TypeScript'],
  },
  {
    id: 'projeto-2',
    role: 'Cargo ou papel anterior',
    organization: 'Organização ou projeto anterior',
    period: '2022 — 2024',
    description:
      'Descreva o que foi feito, o impacto gerado e o contexto do projeto.',
    tags: ['Supabase', 'React'],
  },
]
```

- [ ] **Step 4: Criar os dados de "Estudos & Motivações"**

Create `src/modules/portfolio/data/studies.data.ts`:

```ts
import type { StudyItem } from '@/modules/portfolio/types/portfolio.types'

// Conteúdo de exemplo — substitua pelos dados reais de estudos e motivações.
export const studyItems: StudyItem[] = [
  {
    id: 'estudo-1',
    title: 'Área de estudo ou curso',
    description: 'O que foi estudado e principais aprendizados.',
    motivation: 'Por que esse tema importa para Íris.',
  },
  {
    id: 'estudo-2',
    title: 'Outra área de estudo',
    description: 'O que foi estudado e principais aprendizados.',
    motivation: 'Por que esse tema importa para Íris.',
  },
]
```

- [ ] **Step 5: Criar os dados de "Redes Sociais"**

Create `src/modules/portfolio/data/social-links.data.ts`:

```ts
import type { SocialLink } from '@/modules/portfolio/types/portfolio.types'

// Conteúdo de exemplo — substitua pelos links reais das redes sociais.
export const socialLinks: SocialLink[] = [
  { id: 'github', platform: 'github', label: 'GitHub', href: 'https://github.com/' },
  {
    id: 'linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/',
  },
  {
    id: 'instagram',
    platform: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/',
  },
  { id: 'email', platform: 'email', label: 'E-mail', href: 'mailto:contato@exemplo.com' },
]
```

- [ ] **Step 6: Rodar o build de verificação**

```bash
pnpm build
```

Expected: sai com código 0 (esses arquivos não são importados por ninguém ainda, mas precisam compilar sem erro de tipos).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: types e dados estáticos do portfólio"
```

---

## Task 6: Componentes das seções do Portfólio

**Files:**
- Create: `src/modules/portfolio/components/site-nav.tsx`, `src/modules/portfolio/components/hero-about-section.tsx`, `src/modules/portfolio/components/career-section.tsx`, `src/modules/portfolio/components/studies-section.tsx`, `src/modules/portfolio/components/social-links-section.tsx`

**Interfaces:**
- Consumes: `buttonVariants`, `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardContent`, `Separator`, `Badge` de `@/components/ui/*` (Task 2 — nota: usamos `buttonVariants` diretamente em vez do componente `Button`, ver nota na Step 5); ícones de `lucide-react` (Task 2); tipos `AboutContent`, `CareerItem`, `StudyItem`, `SocialLink`, `SocialPlatform` de `@/modules/portfolio/types/portfolio.types` (Task 5)
- Produces: `SiteNav()` (sem props), `HeroAboutSection({ about: AboutContent })`, `CareerSection({ items: CareerItem[] })`, `StudiesSection({ items: StudyItem[] })`, `SocialLinksSection({ links: SocialLink[] })` — usados pela Task 7.

- [ ] **Step 1: Criar a navegação**

Create `src/modules/portfolio/components/site-nav.tsx`:

```tsx
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
```

- [ ] **Step 2: Criar a seção "Sobre"**

Create `src/modules/portfolio/components/hero-about-section.tsx`:

```tsx
import { Badge } from '@/components/ui/badge'
import type { AboutContent } from '@/modules/portfolio/types/portfolio.types'

interface HeroAboutSectionProps {
  about: AboutContent
}

export function HeroAboutSection({ about }: HeroAboutSectionProps) {
  return (
    <section id="sobre" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">Quem é Íris?</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {about.name}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">{about.headline}</p>

      <div className="mt-8 space-y-4 text-base leading-relaxed">
        {about.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {about.highlights.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {about.highlights.map((highlight) => (
            <Badge key={highlight} variant="secondary">
              {highlight}
            </Badge>
          ))}
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 3: Criar a seção "Carreira & Projetos"**

Create `src/modules/portfolio/components/career-section.tsx`:

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { CareerItem } from '@/modules/portfolio/types/portfolio.types'

interface CareerSectionProps {
  items: CareerItem[]
}

export function CareerSection({ items }: CareerSectionProps) {
  return (
    <section id="carreira" className="scroll-mt-20 border-t bg-muted/30">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Carreira & Projetos</h2>
        <Separator className="mt-6 mb-10" />

        <div className="space-y-6">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.role}</CardTitle>
                <CardDescription>
                  {item.organization} · {item.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Criar a seção "Estudos & Motivações"**

Create `src/modules/portfolio/components/studies-section.tsx`:

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { StudyItem } from '@/modules/portfolio/types/portfolio.types'

interface StudiesSectionProps {
  items: StudyItem[]
}

export function StudiesSection({ items }: StudiesSectionProps) {
  return (
    <section id="estudos" className="scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Estudos & Motivações</h2>
        <Separator className="mt-6 mb-10" />

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.motivation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Criar a seção "Redes Sociais"**

Create `src/modules/portfolio/components/social-links-section.tsx`:

> **Nota (ruling registrado no ledger da Task 2):** o shadcn CLI atual gera
> componentes sobre `@base-ui/react` (estilo `base-nova`), não Radix
> (`New York`), e o `Button` gerado não aceita a prop `asChild` (Base UI
> usa uma prop `render` diferente). Em vez de `<Button asChild>`, aplicamos
> `buttonVariants(...)` como `className` direto na `<a>` — evita depender
> da API de polimorfismo específica da lib de primitivos e evita aninhar
> `<a>` dentro do elemento `<button>` real que o `Button` renderiza.

```tsx
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type {
  SocialLink,
  SocialPlatform,
} from '@/modules/portfolio/types/portfolio.types'

interface SocialLinksSectionProps {
  links: SocialLink[]
}

const PLATFORM_ICONS: Record<SocialPlatform, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  email: Mail,
}

export function SocialLinksSection({ links }: SocialLinksSectionProps) {
  return (
    <section id="redes" className="scroll-mt-20 border-t bg-muted/30">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Redes Sociais</h2>
        <Separator className="mt-6 mb-10" />

        <div className="flex flex-wrap gap-3">
          {links.map((link) => {
            const Icon = PLATFORM_ICONS[link.platform]
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className={buttonVariants({ variant: 'outline' })}
              >
                <Icon className="size-4" />
                {link.label}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Rodar o build de verificação**

```bash
pnpm build
```

Expected: sai com código 0 (componentes ainda não são importados por nenhuma página, mas devem compilar sem erro de tipos).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: componentes das seções do portfólio"
```

---

## Task 7: Página do Portfólio, redirect da raiz e layout

**Files:**
- Create: `src/app/portfolio/page.tsx`
- Modify: `src/app/page.tsx` (substituir todo o conteúdo), `src/app/layout.tsx` (substituir todo o conteúdo)

**Interfaces:**
- Consumes: `SiteNav`, `HeroAboutSection`, `CareerSection`, `StudiesSection`, `SocialLinksSection` de `@/modules/portfolio/components/*` (Task 6); `aboutContent`, `careerItems`, `studyItems`, `socialLinks` de `@/modules/portfolio/data/*` (Task 5)
- Produces: rota `/portfolio` renderizando a página completa; rota `/` redirecionando para `/portfolio`; `RootLayout` com metadata e fonte.

- [ ] **Step 1: Substituir `src/app/page.tsx` por um redirect**

Replace the entire contents of `src/app/page.tsx`:

```tsx
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/portfolio')
}
```

- [ ] **Step 2: Criar a página do Portfólio**

Create `src/app/portfolio/page.tsx`:

```tsx
import { SiteNav } from '@/modules/portfolio/components/site-nav'
import { HeroAboutSection } from '@/modules/portfolio/components/hero-about-section'
import { CareerSection } from '@/modules/portfolio/components/career-section'
import { StudiesSection } from '@/modules/portfolio/components/studies-section'
import { SocialLinksSection } from '@/modules/portfolio/components/social-links-section'
import { aboutContent } from '@/modules/portfolio/data/about.data'
import { careerItems } from '@/modules/portfolio/data/career.data'
import { studyItems } from '@/modules/portfolio/data/studies.data'
import { socialLinks } from '@/modules/portfolio/data/social-links.data'

export default function PortfolioPage() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroAboutSection about={aboutContent} />
        <CareerSection items={careerItems} />
        <StudiesSection items={studyItems} />
        <SocialLinksSection links={socialLinks} />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Atualizar o layout raiz (metadata + scroll suave)**

Replace the entire contents of `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Íris — Portfólio',
  description: 'Quem é Íris: carreira, projetos, estudos e motivações.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

Nota: `scroll-smooth` é a utility do Tailwind para `scroll-behavior: smooth`; `scroll-mt-20` (usado em cada `<section>`, Task 6) evita que a nav fixa cubra o topo da seção ao navegar pelas âncoras.

- [ ] **Step 4: Rodar o build de verificação**

```bash
pnpm build
```

Expected: sai com código 0. O output do build deve listar as rotas `/`, `/portfolio` e `/blog` (esta última ainda não existe até a Task 8 — se `/blog` não constar, tudo bem nesta task).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: página do portfólio, redirect da raiz e layout"
```

---

## Task 8: Placeholder do módulo de Blog

**Files:**
- Create: `src/app/blog/page.tsx`, `src/modules/blog/types/blog.types.ts`, `src/modules/blog/components/.gitkeep`, `src/modules/blog/README.md`

**Interfaces:**
- Consumes: nada
- Produces: rota `/blog` (placeholder), tipo `Post` (não usado em runtime ainda) — nenhuma task depende disso nesta entrega.

- [ ] **Step 1: Criar o tipo placeholder do Blog**

Create `src/modules/blog/types/blog.types.ts`:

```ts
/**
 * Tipos placeholder do módulo de Blog.
 *
 * O Blog ainda não foi implementado — este arquivo existe apenas para
 * deixar a forma dos dados combinada com antecedência, para quando o
 * módulo for priorizado. Nenhum destes tipos é consumido em runtime
 * ainda.
 */
export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  coverImageUrl?: string
}
```

- [ ] **Step 2: Reservar a pasta de componentes do Blog**

Create `src/modules/blog/components/.gitkeep`:

```
Componentes do Blog serão adicionados aqui quando o módulo for implementado.
```

- [ ] **Step 3: Documentar o plano futuro**

Create `src/modules/blog/README.md`:

```md
# Módulo de Blog (placeholder)

Este módulo ainda **não está implementado**. Existe apenas para reservar
a estrutura de pastas e os tipos (`types/blog.types.ts`) que serão usados
quando o Blog for priorizado.

## Plano futuro (não implementado nesta entrega)

- Listagem de posts em `/blog`
- Página de detalhe de post em `/blog/[slug]`
- Fonte de conteúdo: a definir (MDX local ou tabela `posts` no Supabase)
- Reaproveitar `src/lib/supabase/server.ts` caso a fonte seja o Supabase
```

- [ ] **Step 4: Criar a rota placeholder**

Create `src/app/blog/page.tsx`:

```tsx
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
```

- [ ] **Step 5: Rodar o build de verificação**

```bash
pnpm build
```

Expected: sai com código 0; output do build lista a rota `/blog`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: placeholder tipado do módulo de blog"
```

---

## Task 9: README do repositório e verificação final end-to-end

**Files:**
- Create: `README.md` (raiz do repositório)

**Interfaces:**
- Consumes: todas as tasks anteriores
- Produces: documentação de como rodar o projeto; confirmação de que build + servidor de produção funcionam end-to-end.

- [ ] **Step 1: Criar o README do repositório**

Create `README.md`:

```md
# Íris — Portfólio

Frontend do ecossistema Íris: portfólio pessoal (produto desta entrega) e
base preparada para o Blog (placeholder, não implementado).

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Supabase (`@supabase/ssr`) — infraestrutura pronta, sem uso ativo ainda

## Rodando localmente

\`\`\`bash
pnpm install
cp .env.example .env.local # preencha com as credenciais do seu projeto Supabase
pnpm dev
\`\`\`

Acesse http://localhost:3000 — redireciona para `/portfolio`.

## Estrutura

- `src/app/portfolio` — página única do portfólio (Sobre, Carreira, Estudos, Redes)
- `src/app/blog` — placeholder do Blog (ver `src/modules/blog/README.md`)
- `src/modules/portfolio` — componentes, dados e tipos do portfólio
- `src/modules/blog` — tipos e estrutura reservada do Blog
- `src/lib/supabase` — clients browser/server do Supabase
```

- [ ] **Step 2: Build de produção**

```bash
pnpm build
```

Expected: sai com código 0.

- [ ] **Step 3: Smoke test do servidor de produção**

```bash
pnpm start &
SERVER_PID=$!
sleep 3
curl -sI http://localhost:3000/ | head -n 1
curl -sI http://localhost:3000/portfolio | head -n 1
curl -sI http://localhost:3000/blog | head -n 1
kill $SERVER_PID
```

Expected: primeira linha mostra `307`/`308` (redirect) para `/`; `200 OK` para `/portfolio` e `/blog`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: README do repositório"
```
