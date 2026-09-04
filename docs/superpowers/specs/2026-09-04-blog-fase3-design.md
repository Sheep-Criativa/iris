# Fase 3 — Hardening, SEO e produção

Data: 2026-09-04
Status: Aprovado para implementação
Depende de: `docs/superpowers/specs/2026-09-03-blog-roadmap-design.md`,
`docs/superpowers/specs/2026-09-03-blog-fase1-design.md`,
`docs/superpowers/specs/2026-09-03-blog-fase2a-design.md`,
`docs/superpowers/specs/2026-09-03-blog-fase2b-design.md`

## Contexto e objetivo

Última fase do roadmap original. Fase 1 (blog público) e Fase 2 (admin CMS,
em duas partes — 2a: auth + CRUD de posts; 2b: categorias, tags, mídia,
configurações) estão completas e mergeadas em `main`. Esta fase prepara o
blog para uso real em produção: confirmar que a segurança (RLS) está
correta, dar ao conteúdo uma chance real de ser descoberto (SEO), tratar
estados de erro/carregamento que hoje simplesmente não existem, otimizar
imagens, e documentar o que falta para um deploy de produção.

Não há mudança de schema nesta fase — todas as tabelas e o bucket já
existem desde a Fase 1.

## Auditoria de RLS

Já executada como parte deste brainstorming, contra o projeto Supabase real
(`ptwvuamkioywkqdhzqcz`, ativo), via `pg_policies` e `get_advisors` (MCP) —
não apenas releitura do que a Fase 1 documentou.

**Resultado: nenhuma divergência.** As políticas ao vivo batem exatamente
com o que a Fase 1 especificou:

- `posts`: `anon` só lê `status = 'published'`; `authenticated` lê tudo e
  tem insert/update/delete liberado (`true`/`true`, sem conceito de
  "dono" — único login existente).
- `categories`, `tags`, `blog_settings`, `post_tags`: leitura pública
  (`anon`+`authenticated`); escrita só `authenticated`.
- `media_assets`: **sem policy para `anon`** (nega por padrão, intencional
  — a Fase 1 não previu leitura pública desta tabela de metadados, só do
  bucket em si). `authenticated` tem acesso total.
- Bucket `blog-media` (`storage.objects`): `SELECT` público restrito a
  `bucket_id = 'blog-media'`; `INSERT`/`UPDATE`/`DELETE` só
  `authenticated`, mesma restrição de bucket.

`get_advisors(type: security)` não aponta nenhum problema de RLS. Único
achado (fora do escopo de RLS, mas alinhado ao objetivo de hardening desta
fase): **"Leaked Password Protection Disabled"** — o Supabase Auth não está
verificando senhas comprometidas contra a base do HaveIBeenPwned. É uma
configuração no painel do Supabase Auth (Authentication → Policies), não
uma migration — habilitar faz parte do plano desta fase como uma ação
documentada (não há Server Action ou código envolvido).

Esta seção da spec já é a evidência da auditoria — o plano de implementação
não precisa repetir a consulta, só registrar que foi feita aqui e, se
aplicável, o passo de habilitar a proteção de senha vazada.

## SEO

### Variável de ambiente nova

Nenhuma URL absoluta é necessária hoje (nem sitemap, nem OG, nem canonical
existem). Precisa de `NEXT_PUBLIC_SITE_URL` (ex:
`https://iris-blog.exemplo.com` em produção, `http://localhost:3000` em
dev) — adicionada a `.env.example` e `.env.local`, documentada no checklist
de deploy. Usada para montar URLs absolutas em `sitemap.ts`, `robots.ts`,
`metadataBase` do layout raiz (ou de `src/app/blog/layout.tsx`, se existir
um) e no JSON-LD.

### `sitemap.xml`

`src/app/sitemap.ts`, convenção `MetadataRoute.Sitemap` do Next 16 — uma
entrada para `/blog` e uma para cada post com `status = 'published'`
(reaproveita `getPublishedPosts`/uma query equivalente sem paginação, já
existente em `src/modules/blog/data/posts.data.ts`), com `lastModified`
vindo de `updated_at`.

### `robots.ts`

`src/app/robots.ts` — simples: permite tudo, referencia o sitemap gerado
acima. Sem regra de bloqueio a `/admin/*` via robots (a proteção real já é
`verifySession()` + redirect do proxy; um `Disallow` em `robots.txt` é
apenas cosmético e não substitui isso, mas não custa nada incluir por
convenção).

### Open Graph — fallback de imagem

Hoje `generateMetadata` de `/blog` (`src/app/blog/page.tsx:18-24`) não
define `openGraph` nenhum, e o de `/blog/[slug]`
(`src/app/blog/[slug]/page.tsx:9-30`) define `openGraph.images` só quando
`post.coverImageUrl` existe — sem fallback, fica `undefined`. Esta fase
adiciona: quando não há capa (post ou configuração geral do `/blog`), usar
`settings.defaultSeoImageUrl` (já existe em `getBlogSettings()`, só nunca
foi consumido em página pública nenhuma — a Fase 2b só entregou a tela de
edição do campo, como já registrado na spec 2b). `metadataBase` (novo, no
layout que envolve as rotas de blog) resolve URLs relativas de OG image
para absolutas usando `NEXT_PUBLIC_SITE_URL`.

### Dados estruturados (JSON-LD)

Em `/blog/[slug]`, um `<script type="application/ld+json">` com schema
`BlogPosting`: `headline` (título), `description` (excerpt/seo_description),
`image` (capa do post ou `defaultSeoImageUrl`), `datePublished`
(`publishedAt`), `dateModified` (`updatedAt` — campo novo em `PostDetail`,
mapeando `posts.updated_at`, que já existe na tabela desde a Fase 1 mas
nunca foi exposto no tipo; mudança de tipo/mapeamento, não de schema),
`author` — objeto `Person` com `name: "Íris"` (nome já usado em
`src/app/layout.tsx:24` como identidade do site; hardcoded, sem novo campo
no schema — autor único fixo, consistente com a decisão de "autor único"
do roadmap). Sem JSON-LD em `/blog` (a listagem não é uma entidade que se
beneficia de `BlogPosting`; `WebSite`/`CollectionPage` ficaria
over-engineering para o que foi pedido).

## Otimização de imagens

Escopo: **só páginas públicas do blog** (`PostCard` e a capa em
`/blog/[slug]`). A biblioteca de mídia do admin (`media-item.tsx`,
`media-picker.tsx`) continua com `<img>` simples — são thumbnails internos
de uso único (o próprio admin), não afetam SEO nem a experiência de quem
visita o blog, e migrar geraria trabalho sem benefício real.

`next.config.ts` ganha `images.remotePatterns` apontando para o domínio do
Storage do Supabase deste projeto (`ptwvuamkioywkqdhzqcz.supabase.co`,
caminho `/storage/v1/object/public/blog-media/**`) — hoje o arquivo não tem
nenhuma config de imagem. `PostCard` (`src/modules/blog/components/
post-card.tsx:16-20`) e a capa de `/blog/[slug]`
(`src/app/blog/[slug]/page.tsx:71-78`) trocam `<img>` por `next/image`,
com `sizes` apropriado para o grid responsivo já existente (`PostList`)
e para a largura de leitura de um post.

## Estados de erro e carregamento

`loading.tsx` (skeleton) reaproveitável — um esqueleto de lista/card
genérico, não um desenho por tela — para:

- `/blog` (skeleton de grid de cards)
- `/blog/[slug]` (skeleton de artigo: título, meta, corpo)
- `/admin/posts`, `/admin/categorias`, `/admin/tags`, `/admin/midia`,
  `/admin/configuracoes` — todas essas páginas buscam dados no Server
  Component sem `Suspense` hoje; um `loading.tsx` por rota (podendo
  compartilhar um componente de esqueleto de tabela/grid entre elas) cobre
  o tempo de fetch inicial.

`not-found.tsx` — UI para os dois pontos que já chamam `notFound()` mas
não têm página customizada:

- `/blog/[slug]` (slug inexistente ou não publicado)
- `/admin/posts/[id]/editar` (post inexistente)

Sem mudança de comportamento — só a UI que o Next renderiza quando
`notFound()` já é chamado, seguindo a paleta de cada área (terracota/creme
no blog público, cinza neutro no admin, mesma distinção já estabelecida
nas fases anteriores).

## Checklist de deploy

Documento (dentro desta spec, seção final que o plano pode referenciar
diretamente — não precisa de arquivo separado), cobrindo:

- **Variáveis de ambiente de produção**: `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_USER_ID` (já existentes,
  documentadas em `.env.example`) + `NEXT_PUBLIC_SITE_URL` (novo, nesta
  fase).
- **CORS do bucket `blog-media`**: confirmar (via painel do Supabase ou
  `execute_sql`/API de Storage) que o domínio de produção está liberado
  para requisições ao bucket — hoje só foi testado em `localhost`.
- **Provisionamento do usuário admin**: passo a passo de como o usuário
  único (Íris) foi criado manualmente no painel do Supabase Auth na Fase
  2a, documentado aqui para reprodutibilidade caso precise recriar em outro
  projeto/ambiente (staging, por exemplo).
- **Proteção de senha vazada**: habilitar em Authentication → Policies no
  painel do Supabase (achado da auditoria de RLS acima).

## Riscos e observações

- A auditoria de RLS já foi feita nesta sessão de brainstorming (ver seção
  acima) — o plano de implementação não repete a consulta ao banco, só
  referencia o resultado e, se aplicável, documenta o passo manual de
  habilitar a proteção de senha vazada (não há código para isso).
- `dateModified` do JSON-LD expõe `updatedAt` em `PostDetail`
  (`src/modules/blog/types/blog.types.ts`), mapeado de `posts.updated_at`
  — mudança de tipo pequena, sem migration (a coluna já existe desde a
  Fase 1).
- O checklist de deploy é documentação — não gera código nem testes.
  `pnpm lint`/`tsc`/`build` não verificam esses itens; a verificação é
  manual (o CORS do bucket, por exemplo, só é confirmável testando contra
  o domínio real de produção, que ainda não existe).

## Fora de escopo nesta fase

RSS/Atom (avaliado e descartado — YAGNI, ninguém pediu). Rotas dedicadas
`/blog/categoria/[slug]` (YAGNI, decisão já registrada na Fase 1).
`next/image` na área de admin (thumbnails internos, sem benefício de
SEO/performance pro visitante). Qualquer mudança de schema Supabase.
Sanitização de HTML do editor rich text (já tratada nas fases anteriores).
Comentários, newsletter, posts relacionados, busca full-text, analytics,
múltiplos autores, internacionalização (fora do roadmap inteiro, não só
desta fase).
