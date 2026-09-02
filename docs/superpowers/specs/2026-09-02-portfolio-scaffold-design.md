# Scaffold do Frontend — Portfólio (Ecossistema Íris)

Data: 2026-09-02
Status: Aprovado para implementação

## Contexto e objetivo

Este repositório (`portifolio/`) é o frontend do ecossistema Íris. Ele vai
hospedar duas coisas ao longo do tempo:

1. **Portfólio** — o produto real desta primeira entrega. Página única
   (single-page) com seções: Home/Sobre ("Quem é Íris?"), Carreira &
   Projetos, Estudos & Motivações, Redes Sociais.
2. **Blog** — base preparada apenas como placeholder tipado. Não é
   implementado nesta entrega.

O objetivo desta spec é o scaffold completo do repositório: estrutura de
pastas, configuração de ferramentas (Next.js, Tailwind, shadcn/ui,
Supabase SSR client) e o código inicial das rotas do Portfólio, seguindo
clean code.

## Decisões já validadas com o usuário

- **Conteúdo do Portfólio**: dados estáticos tipados em TypeScript
  (arrays/objetos em `src/modules/portfolio/data/`), não Supabase. Zero
  infra de banco necessária para lançar o portfólio.
- **Supabase SSR client**: configurado como infraestrutura pronta
  (clients browser/server + middleware de refresh de sessão), sem uso
  ativo por enquanto — preparação para Blog/Auth futuros. Nenhum
  formulário grava no banco nesta entrega.
- **Gerenciador de pacotes**: pnpm.
- **Rotas em `src/app/`**: `/blog` e `/portfolio` como pastas irmãs,
  ambas explícitas — nada de página solta na raiz. `src/app/page.tsx`
  faz `redirect('/portfolio')` para que o domínio raiz leve direto ao
  portfólio.
- Sem suíte de testes automatizados nesta entrega (não há lógica
  não-trivial que justifique agora); ESLint + Prettier cobrem a
  qualidade estática.

## Stack

- Next.js 14+ (App Router, TypeScript estrito, Server Components por
  padrão, Server Actions disponíveis)
- Tailwind CSS + shadcn/ui
- `@supabase/ssr` + `@supabase/supabase-js`
- pnpm
- Fonte via `next/font` (Geist)

Scaffold inicial gerado via `create-next-app` (TypeScript, App Router,
Tailwind, ESLint, `src/`, alias `@/*`) em vez de configs manuais, para
garantir versões e configuração oficiais corretas. shadcn/ui inicializado
via `shadcn init` + componentes base (`button`, `card`, `separator`,
`badge`) usados pelas seções do portfólio.

## Estrutura de diretórios

```
portifolio/
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── components.json            # shadcn
├── src/
│   ├── app/
│   │   ├── layout.tsx         # metadata raiz, fonts, globals
│   │   ├── globals.css
│   │   ├── page.tsx           # redirect('/portfolio')
│   │   ├── portfolio/
│   │   │   └── page.tsx       # página única, compõe as sections
│   │   └── blog/
│   │       └── page.tsx       # placeholder tipado "Em construção"
│   ├── middleware.ts          # refresh de sessão Supabase (sem rotas protegidas ainda)
│   ├── modules/
│   │   ├── portfolio/
│   │   │   ├── components/
│   │   │   │   ├── site-nav.tsx        # nav fixa com âncoras
│   │   │   │   ├── hero-about-section.tsx
│   │   │   │   ├── career-section.tsx
│   │   │   │   ├── studies-section.tsx
│   │   │   │   └── social-links-section.tsx
│   │   │   ├── data/
│   │   │   │   ├── about.data.ts
│   │   │   │   ├── career.data.ts
│   │   │   │   ├── studies.data.ts
│   │   │   │   └── social-links.data.ts
│   │   │   └── types/
│   │   │       └── portfolio.types.ts
│   │   └── blog/
│   │       ├── components/    # vazio; comentário explicando o placeholder
│   │       ├── types/
│   │       │   └── blog.types.ts   # tipo Post placeholder, comentado
│   │       └── README.md      # documenta o plano futuro do módulo
│   ├── components/
│   │   └── ui/                # componentes gerados pelo shadcn
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts      # createBrowserClient
│       │   ├── server.ts      # createServerClient (cookies, RSC/Server Actions)
│       │   └── types.ts       # tipo Database placeholder comentado
│       └── utils.ts           # cn() helper (shadcn)
```

## Composição da página do Portfólio

`src/app/portfolio/page.tsx` é um Server Component que importa e
renderiza, em ordem, os componentes de `modules/portfolio/components/`:

1. `SiteNav` — nav fixa/sticky com links âncora (`#sobre`, `#carreira`,
   `#estudos`, `#redes`), scroll suave via CSS (`scroll-behavior:
   smooth` + `scroll-margin-top` nas sections).
2. `HeroAboutSection` (`id="sobre"`) — "Quem é Íris?", recebe dados de
   `about.data.ts`.
3. `CareerSection` (`id="carreira"`) — Carreira & Projetos, recebe dados
   de `career.data.ts`.
4. `StudiesSection` (`id="estudos"`) — Estudos & Motivações, recebe
   dados de `studies.data.ts`.
5. `SocialLinksSection` (`id="redes"`) — Redes Sociais, recebe dados de
   `social-links.data.ts`.

Cada seção é isolada, recebe dados via props tipadas (não importa o
arquivo `.data.ts` diretamente dentro do componente, exceto na própria
`page.tsx` que faz a composição) — isso mantém os componentes
testáveis e reutilizáveis independentemente da fonte de dados.

## Blog (placeholder)

`src/app/blog/page.tsx` é um Server Component simples que renderiza uma
mensagem "Em construção" tipada. `src/modules/blog/types/blog.types.ts`
define o tipo `Post` (placeholder, comentado, sem uso real ainda).
`src/modules/blog/README.md` documenta o que será construído quando o
Blog for priorizado (não faz parte desta entrega).

## Supabase

Padrão oficial `@supabase/ssr`:

- `lib/supabase/client.ts`: `createBrowserClient` para uso em Client
  Components.
- `lib/supabase/server.ts`: `createServerClient` usando `next/headers`
  cookies, para uso em Server Components e Server Actions.
- `src/middleware.ts`: helper de refresh de sessão (padrão
  `updateSession`), sem lógica de redirect/proteção de rota — não há
  rotas protegidas nesta entrega.
- `lib/supabase/types.ts`: tipo `Database` placeholder comentado,
  indicando `supabase gen types typescript` como próximo passo quando
  houver schema definido.
- `.env.example` com `NEXT_PUBLIC_SUPABASE_URL` e
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Fora de escopo nesta entrega

- Implementação real do Blog (listagem, detalhe de post, MDX ou
  Supabase-backed).
- Qualquer escrita no Supabase (formulário de contato, newsletter,
  analytics).
- Autenticação/rotas protegidas.
- Suíte de testes automatizados.
- Deploy/CI.
