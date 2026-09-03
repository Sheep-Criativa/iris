# Fase 1 — Fundação de dados + Blog público

Data: 2026-09-03
Status: Aprovado para implementação
Depende de: `docs/superpowers/specs/2026-09-03-blog-roadmap-design.md`

## Contexto e objetivo

Primeira fase do roadmap do blog: sair do placeholder "Em construção" em
`/blog` para um blog público real, servido por um schema Supabase completo,
seguindo a identidade visual do portfólio. Sem admin e sem autenticação
nesta fase — os dados de exemplo são inseridos diretamente no banco.

## Infraestrutura Supabase

Projeto criado nesta sessão via MCP do Supabase:

- Nome: `ecossistema-iris-blog`
- Ref: `ptwvuamkioywkqdhzqcz`
- Região: `sa-east-1` (São Paulo)
- Org: `Nathanviana's Org` (plano free, custo R$0/mês)
- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` já
  preenchidos em `.env.local` (gitignored — não versionado).

## Modelo de dados

Todas as tabelas em `public`, RLS habilitada em todas (schema exposto via
Data API). Nomenclatura e tipos:

- **`posts`**
  - `id uuid pk default gen_random_uuid()`
  - `slug text not null unique`
  - `title text not null`
  - `excerpt text not null`
  - `content text not null` — HTML. Nesta fase o conteúdo vem de seed
    confiável (inserido por nós via SQL), então sanitização em tempo de
    escrita **não** é necessária ainda — mas é um requisito obrigatório da
    Fase 2 (ver "Riscos e observações" abaixo), já que lá o conteúdo passa
    a vir de um editor rich text controlado pelo usuário final.
  - `cover_image_url text`
  - `status text not null default 'draft' check (status in ('draft','published'))`
  - `category_id uuid references categories(id) on delete set null`
  - `is_featured boolean not null default false`
  - `published_at timestamptz`
  - `seo_title text`, `seo_description text`
  - `created_at timestamptz not null default now()`
  - `updated_at timestamptz not null default now()` — mantida por trigger
    (`set_updated_at()`), não pela aplicação.
  - Índice em `(status, published_at desc)` para a query de listagem.
- **`categories`**: `id uuid pk`, `slug text not null unique`,
  `name text not null`, `description text`.
- **`tags`**: `id uuid pk`, `slug text not null unique`, `name text not null`.
- **`post_tags`**: `post_id uuid references posts(id) on delete cascade`,
  `tag_id uuid references tags(id) on delete cascade`,
  `primary key (post_id, tag_id)`, índice adicional em `tag_id` para
  consulta reversa (posts por tag).
- **`blog_settings`**: linha única (`id smallint primary key default 1
  check (id = 1)`), `blog_title text not null default 'Blog'`,
  `blog_description text`, `default_seo_image_url text`,
  `updated_at timestamptz not null default now()` (mesma trigger).
- **`media_assets`**: `id uuid pk`, `storage_path text not null unique`,
  `alt_text text`, `uploaded_at timestamptz not null default now()`. Tabela
  de metadados; os arquivos em si ficam no bucket de Storage `blog-media`.
  Sem uso público direto nesta fase — existe desde já porque faz parte do
  mesmo schema e evita uma migration extra na Fase 2.

## RLS — regras e papéis

Seguindo o checklist de segurança do Supabase (papel especificado via `TO`
em vez de `auth.role()`, que é depreciado e quebra silenciosamente com
login anônimo habilitado):

- `posts`: `anon` lê apenas `status = 'published'`; `authenticated` lê
  todos (rascunho incluso — necessário para o admin na Fase 2) e tem
  insert/update/delete liberado. Não há conceito de "dono" da linha aqui —
  o único login existente é o da própria Íris, então `TO authenticated`
  sem predicado de ownership é intencional, não um descuido do padrão
  BOLA/IDOR mencionado no checklist.
- `categories`, `tags`, `blog_settings`: leitura pública (`anon` e
  `authenticated`); escrita restrita a `authenticated`.
- `media_assets`: sem policy para `anon` (nega por padrão); leitura e
  escrita completas para `authenticated`. As imagens em si são servidas
  pela URL pública do bucket, não por query nesta tabela.
- Policies de update incluem `USING` e `WITH CHECK` (não só `USING`), e
  cada tabela com escrita tem uma policy de `SELECT` para `authenticated` —
  sem ela, updates retornam 0 linhas silenciosamente.

## Storage

Bucket `blog-media`, público para leitura (URLs diretas para capas de post
e imagens do corpo). Policies em `storage.objects` restringindo
insert/select/update/delete nesse bucket a `authenticated` — upsert exige
INSERT + SELECT + UPDATE, não só INSERT.

## Fluxo de migration (via MCP, sem CLI local)

Não há stack Supabase local (sem Docker/CLI configurados neste repo) — o
projeto é 100% remoto, criado via MCP nesta sessão. Fluxo:

1. Iterar o schema com `execute_sql` (MCP) até o resultado ficar correto.
2. Rodar `get_advisors` (MCP) e corrigir qualquer alerta de segurança antes
   de seguir.
3. Confirmar em Data API settings do projeto se as tabelas novas precisam
   de `GRANT` explícito para `anon`/`authenticated` (é um passo separado de
   RLS — RLS controla linhas, o `GRANT`/Data API controla se a tabela é
   alcançável).
4. Commitar cada mudança de schema como uma migration nomeada via
   `apply_migration` (MCP) — abordagem correta para um projeto criado
   direto no remoto, sem CLI local para gerar diff.
5. Gerar `src/lib/supabase/types.ts` real via `generate_typescript_types`
   (MCP), substituindo o placeholder atual.

## Seed de desenvolvimento

2-3 posts de exemplo (1 em destaque), 2 categorias, algumas tags — inserido
via SQL direto (não pela UI, que não existe nesta fase), só para as páginas
públicas não ficarem vazias durante o desenvolvimento.

## Rotas e componentes públicos

- `/blog` — listagem paginada; destaque visual para posts
  `is_featured`; filtro opcional por categoria/tag via query string
  (`?categoria=`, `?tag=`) — sem rotas dedicadas `/blog/categoria/[slug]`
  nesta fase (YAGNI).
- `/blog/[slug]` — página de post; `notFound()` para slug inexistente ou
  não publicado.
- `generateMetadata` por post (title, description, Open Graph) desde já.
- Componentes novos em `src/modules/blog/components/`, substituindo o
  placeholder atual: nav do blog (variação do `SiteNav`, com link de volta
  ao portfólio — sem o inverso, por decisão já registrada no roadmap), 
  `PostCard`, `PostList`, corpo do post (renderiza o HTML salvo),
  badges de categoria/tag (reaproveitando `components/ui/badge.tsx`),
  estado vazio.
  Segue a paleta terracota/creme, Fraunces nos títulos, Montserrat no
  corpo, cards `rounded-2xl` definidos em `globals.css`.
- `src/modules/blog/types/blog.types.ts` deixa de ser placeholder e passa
  a refletir o schema real (`Post`, `Category`, `Tag`).
- Nenhum link para `/blog` é adicionado ao `SiteNav` do portfólio — acesso
  só via URL direta, conforme já confirmado no roadmap.

## Riscos e observações

- **Sanitização de HTML é um requisito da Fase 2, não desta.** A
  renderização do corpo do post via HTML direto (sem sanitização em tempo
  de leitura) só é segura enquanto o conteúdo vem de seed confiável escrito
  por nós. Quando o editor rich text da Fase 2 permitir que a Íris escreva
  conteúdo livremente, a sanitização deve acontecer no momento da escrita
  (Server Action), antes do insert/update — isso precisa entrar
  explicitamente na spec da Fase 2, não pode ser esquecido.
- `media_assets` e o bucket `blog-media` são criados nesta fase mas não têm
  nenhuma UI ainda — só passam a ser usados na Fase 2 (biblioteca de
  mídia). Risco baixo: é só schema parado, sem dado sensível.

## Fora de escopo nesta fase

Admin, autenticação, qualquer escrita via UI, sanitização de conteúdo
gerado por usuário (não se aplica ainda — ver acima), sitemap/SEO avançado,
otimização de imagens (ficam para a Fase 3, conforme o roadmap).
