# Iris — Portfólio

Frontend do ecossistema Iris: portfólio pessoal (produto desta entrega) e
base preparada para o Blog (placeholder, não implementado).

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Supabase (`@supabase/ssr`) — infraestrutura pronta, sem uso ativo ainda

## Rodando localmente

```bash
pnpm install
cp .env.example .env.local # preencha com as credenciais do seu projeto Supabase
pnpm dev
```

Acesse http://localhost:3000 — redireciona para `/portfolio`.

## Estrutura

- `src/app/portfolio` — página única do portfólio (Sobre, Carreira, Estudos, Redes)
- `src/app/blog` — placeholder do Blog (ver `src/modules/blog/README.md`)
- `src/modules/portfolio` — componentes, dados e tipos do portfólio
- `src/modules/blog` — tipos e estrutura reservada do Blog
- `src/lib/supabase` — clients browser/server do Supabase
