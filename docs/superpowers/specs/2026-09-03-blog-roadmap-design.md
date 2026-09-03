# Roadmap — Blog completo, Admin CMS e Supabase (Ecossistema Íris)

Data: 2026-09-03
Status: Aprovado para desdobramento em specs/planos por fase

## Contexto e objetivo

Este documento é o roadmap de alto nível para sair do estado atual — `/blog`
como placeholder tipado, infraestrutura Supabase pronta mas sem uso ativo
(ver `docs/superpowers/specs/2026-09-02-portfolio-scaffold-design.md`) — até
um blog completo: páginas públicas seguindo o design do portfólio, uma área
de admin onde a cliente (Íris) configura todas as partes do blog, e o
Supabase como backend real de dados, autenticação e mídia.

Este documento **não é um plano de implementação**. Ele decompõe o trabalho
em três fases sequenciais; cada fase, ao ser priorizada, passa pelo próprio
ciclo de brainstorming (se necessário) → spec detalhada → plano de
implementação (via skill `writing-plans`) antes de qualquer código ser
escrito.

## Decisões já validadas com o usuário

- **Modelo de conteúdo**: posts com categorias e tags. Autor único (Íris),
  sem suporte a múltiplos autores nesta entrega.
- **Editor de posts**: rich text WYSIWYG (não Markdown) — mais amigável para
  quem vai usar o admin no dia a dia sem saber sintaxe Markdown.
- **Autenticação do admin**: usuário único e fixo, criado manualmente no
  Supabase (sem tela de cadastro público). Login via Supabase Auth
  (email + senha).
- **Escopo do admin**: além do CRUD de posts/categorias/tags, o admin cobre
  configurações gerais do blog (título, descrição, imagem de SEO padrão),
  biblioteca de mídia (upload e reuso de imagens via Supabase Storage) e
  destaque/curadoria manual de posts na listagem pública.
- **Ordem das fases**: estrutura do blog → admin → "Supabase" — mas o schema
  básico do Supabase entra **já na Fase 1**, não na Fase 3. O usuário
  confirmou essa antecipação para evitar retrabalho: a Fase 2 (admin) já
  nasce escrevendo em tabelas reais, em vez de mockar e depois plugar. A
  "Fase 3 — Supabase" deste roadmap é, na prática, hardening, SEO e
  produção, não a criação do schema em si.
- **Sem link de navegação para `/blog`** nesta entrega: a Fase 1 não deve
  adicionar nenhum botão/link no `SiteNav` do portfólio apontando para o
  blog. Acesso apenas via URL direta `/blog`.

## Nota técnica — Next.js 16 neste repositório

Este repositório roda uma versão do Next.js com breaking changes em relação
ao conhecimento de treinamento padrão (ver `AGENTS.md`). Relevante para este
roadmap: **`middleware.js`/`middleware.ts` foi descontinuado no Next.js 16 e
renomeado para `proxy.js`/`proxy.ts`** — mesmo comportamento, convenção de
arquivo e export diferentes. O `src/middleware.ts` atual (refresh de sessão
Supabase, sem rotas protegidas) deve migrar para `proxy.ts` quando a Fase 2
adicionar proteção de rota para `/admin`. `cacheComponents` não está
habilitado em `next.config.ts`, então os padrões "clássicos" de autenticação
do Next (Data Access Layer com `cookies()` + `redirect()`, sem exigir
`Suspense`/`use cache: private`) se aplicam.

## Modelo de dados (Supabase)

Schema alvo, introduzido na Fase 1 e usado por todas as fases seguintes:

- **`posts`**: `id`, `slug` (único), `title`, `excerpt`, `content` (HTML
  sanitizado, gerado pelo editor rich text), `cover_image_url`, `status`
  (`draft` | `published`), `category_id` (FK, nullável), `is_featured`
  (bool), `published_at`, `seo_title`, `seo_description`, `created_at`,
  `updated_at`.
- **`categories`**: `id`, `slug`, `name`, `description`.
- **`tags`**: `id`, `slug`, `name`.
- **`post_tags`**: tabela de junção N:N entre `posts` e `tags`.
- **`blog_settings`**: linha única (singleton) — título do blog, descrição,
  imagem de SEO padrão.
- **`media_assets`**: `id`, `storage_path`, `alt_text`, `uploaded_at` —
  metadados sobre os arquivos no bucket de Storage, necessários para texto
  alternativo (acessibilidade/SEO) e para a biblioteca de mídia reutilizar
  uploads existentes em vez de subir duplicado.

RLS (Row Level Security):

- `anon` (visitante público): `SELECT` em `posts` apenas onde
  `status = 'published'`; `SELECT` livre em `categories`, `tags` e
  `blog_settings`.
- `authenticated` (o único login existente é o da Íris — não há cadastro
  público, então "autenticado" já implica "admin"): leitura e escrita total
  em todas as tabelas.
- Bucket de Storage para mídia: leitura pública, escrita restrita a
  `authenticated`.

Após o schema existir, `src/lib/supabase/types.ts` deixa de ser o
placeholder atual e passa a ser gerado via
`supabase gen types typescript --project-id <id>`.

## Fase 1 — Fundação de dados + Blog público

**Objetivo**: sair do placeholder "Em construção" para um blog público
funcional, servido por dados reais do Supabase, com a identidade visual do
portfólio.

Escopo:

- Migrations do schema descrito acima (tabelas + RLS + bucket de Storage).
- Regeneração de `src/lib/supabase/types.ts` a partir do schema real.
- Seed de desenvolvimento (SQL, fora do admin — que ainda não existe nesta
  fase) com 2-3 posts de exemplo, categorias e tags, para as páginas não
  ficarem vazias durante o desenvolvimento.
- Rotas públicas:
  - `/blog` — listagem paginada, com destaque visual para posts
    `is_featured`, filtro opcional por categoria/tag via query string
    (`?categoria=`, `?tag=`) — sem rotas dedicadas `/blog/categoria/[slug]`
    nesta fase (YAGNI até haver necessidade real de indexação/SEO por
    categoria).
  - `/blog/[slug]` — página de post; `notFound()` para slug inexistente ou
    post não publicado.
- Componentes em `src/modules/blog/components/`, seguindo o design system
  do portfólio (paleta terracota/creme definida em `globals.css`, Fraunces
  para títulos, Montserrat para corpo, cards `rounded-2xl`, badges
  reaproveitando `components/ui/badge.tsx`):
  - Nav do blog — variação do `SiteNav`, com link de volta ao portfólio (o
    inverso, portfólio → blog, fica fora desta fase por decisão do
    usuário).
  - `PostCard`, `PostList`.
  - Renderização do corpo do post a partir do HTML salvo em `content`.
  - Badges de categoria/tag.
  - Estado vazio (nenhum post publicado ainda).
- `generateMetadata` por post (title, description, Open Graph) desde já,
  já que o conteúdo real existe desde esta fase.
- `src/modules/blog/types/blog.types.ts` deixa de ser placeholder e passa a
  refletir o schema real (`Post`, `Category`, `Tag`).

Fora de escopo nesta fase: qualquer tela de admin, autenticação, escrita via
UI (os posts de seed são inseridos diretamente no banco).

## Fase 2 — Área de Admin (CMS)

**Objetivo**: dar à Íris uma área onde ela mesma cria, edita e organiza todo
o conteúdo do blog, sem precisar mexer em código.

Escopo:

- Migração de `src/middleware.ts` para `src/proxy.ts` (convenção Next 16),
  cobrindo `/admin/*`: redireciona não-autenticados para `/admin/login`.
- Data Access Layer (`verifySession()`) reforçando a checagem de sessão em
  cada Server Action de escrita — proteção de rota via proxy é otimista,
  a autorização real acontece perto dos dados.
- Criação manual do usuário único (Íris) no painel do Supabase — passo
  documentado no plano da fase, não uma tela de cadastro público.
- `/admin/login` — formulário de login (Server Action +
  `supabase.auth.signInWithPassword`).
- `/admin` — dashboard simples (contagem de posts por status, atalhos para
  as seções abaixo).
- `/admin/posts` (lista, com filtro por status), `/admin/posts/novo`,
  `/admin/posts/[id]/editar` — editor rich text (WYSIWYG), slug
  auto-gerado a partir do título (editável manualmente), seleção de
  categoria, seleção múltipla de tags, seletor de imagem de capa (via
  biblioteca de mídia), toggle rascunho/publicado, toggle destaque, campos
  de SEO (título/descrição).
- `/admin/categorias`, `/admin/tags` — CRUD simples (listar, criar, editar,
  excluir).
- `/admin/midia` — biblioteca de mídia: upload para o Storage, grid de
  arquivos, edição de texto alternativo, exclusão.
- `/admin/configuracoes` — formulário para editar a linha única de
  `blog_settings`.
- Toda escrita via Server Actions, com `revalidatePath`/`revalidateTag`
  para o blog público refletir mudanças imediatamente após publicar.

Fora de escopo nesta fase: RLS avançado além do definido na Fase 1
(revisão/auditoria fica na Fase 3), sitemap/RSS, otimizações de imagem.

## Fase 3 — Hardening, SEO e produção

**Objetivo**: preparar o blog para uso real em produção — segurança,
descoberta (SEO) e resiliência.

Escopo:

- Auditoria de RLS: confirmar que `anon` não consegue ler rascunhos nem
  escrever em nada, e que `authenticated` está corretamente restrito ao
  necessário.
- `sitemap.xml` dinâmico incluindo posts publicados; avaliar RSS/Atom como
  opcional.
- Dados estruturados (JSON-LD) para artigos; imagem OG padrão via
  `blog_settings` quando o post não tiver capa própria.
- Estados de erro/carregamento: `not-found.tsx` e `loading.tsx`
  (skeletons) para as rotas do blog e do admin.
- Otimização de imagens: configuração de domínio do Supabase Storage no
  `next/image`, capas responsivas.
- Checklist de deploy: variáveis de ambiente de produção, CORS do bucket de
  Storage, documentação do processo de provisionamento do usuário admin.

## Fora de escopo do roadmap (não solicitado)

Comentários, newsletter, posts relacionados, busca full-text, analytics,
múltiplos autores, internacionalização. Ficam registrados aqui como
possíveis extensões futuras, não como trabalho planejado.

## Próximos passos

Cada fase, ao ser priorizada para execução, passa por brainstorming (quando
houver decisões em aberto) → spec própria → plano de implementação via
skill `writing-plans`, seguindo o mesmo processo usado neste documento e no
scaffold original do portfólio.
