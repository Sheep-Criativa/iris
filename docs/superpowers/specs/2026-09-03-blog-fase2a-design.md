# Fase 2a — Autenticação + CRUD de posts (Admin)

Data: 2026-09-03
Status: Aprovado para implementação
Depende de: `docs/superpowers/specs/2026-09-03-blog-fase1-design.md`,
`docs/superpowers/specs/2026-09-03-blog-roadmap-design.md`

## Contexto e objetivo

A Fase 1 entregou o blog público (`/blog`, `/blog/[slug]`) lendo de um schema
Supabase real, mas todo o conteúdo foi inserido via SQL — não existe nenhuma
tela onde a Íris escreva ou edite posts. Esta fase entrega a primeira metade
da área de admin: login, proteção de rota, e CRUD completo de posts com
editor rich text. A segunda metade — categorias, tags, biblioteca de mídia e
configurações gerais do blog — fica para a Fase 2b (spec própria, depois
desta).

## Decisões já validadas com o usuário

- **Editor de conteúdo**: Tiptap (`@tiptap/react` + `@tiptap/starter-kit` +
  `@tiptap/extension-link`), exportando HTML — compatível com o campo
  `posts.content` (HTML) já definido na Fase 1 e com a renderização via
  `dangerouslySetInnerHTML` em `PostBody`.
- **Visual do admin**: painel neutro/funcional (sidebar + conteúdo,
  componentes shadcn/ui), sem replicar a paleta terracota/creme do site
  público — só a Íris usa essa área.
- **Decomposição desta fase**: só posts (CRUD completo). Categorias e tags
  são apenas *selecionadas* no formulário de post (lendo o que já existe,
  criado via seed na Fase 1) — CRUD de categorias/tags fica para a Fase 2b.
- **Imagem de capa nesta fase**: upload direto por post (sem biblioteca de
  mídia reutilizável ainda — isso é escopo da Fase 2b, que introduz a tabela
  `media_assets` na prática). O arquivo vai para o bucket `blog-media`
  (criado na Fase 1) e a URL pública é salva direto em
  `posts.cover_image_url`.
- **Usuário admin**: único usuário, `irisamanda2016123@gmail.com`,
  provisionado diretamente no Supabase Auth (sem tela de cadastro público)
  como parte da Task 1 do plano de implementação — a senha foi fornecida
  pelo usuário em conversa, nunca é gravada em nenhum arquivo do
  repositório.

## Nota técnica — proxy.ts (Next.js 16)

Conforme já registrado na Fase 1: `middleware.ts` está descontinuado no
Next.js 16 em favor de `proxy.ts` (mesmo comportamento, convenção de
arquivo/export diferente). Esta fase migra `src/middleware.ts` →
`src/proxy.ts`, preservando o refresh de sessão Supabase que já existe para
todas as rotas e adicionando a lógica de proteção de `/admin/*`.

## Autenticação e proteção de rota

- **`src/proxy.ts`**: além do refresh de sessão já existente, verifica
  `supabase.auth.getUser()` uma vez por requisição:
  - rota começa com `/admin` e não é `/admin/login` e não há usuário →
    redireciona para `/admin/login`.
  - rota é `/admin/login` e há usuário autenticado → redireciona para
    `/admin`.
  - Esta é uma checagem **otimista** (evita round-trip de página pra quem
    não deveria nem ver o HTML) — não é a única linha de defesa.
- **Data Access Layer** (`src/modules/admin/lib/auth.ts`): função
  `verifySession()` que chama `supabase.auth.getUser()` e redireciona para
  `/admin/login` se não houver usuário; usada em toda página protegida (via
  o layout do grupo de rotas) e no início de toda Server Action de escrita
  — a proteção do proxy é otimista, a autorização real fica perto dos
  dados, como recomendado na documentação oficial do Next.js consultada na
  Fase 1.
- **Login**: `/admin/login` — formulário (email + senha) via Server Action
  chamando `supabase.auth.signInWithPassword`; erro de credencial mostra
  mensagem genérica ("E-mail ou senha inválidos"), sem detalhar qual campo
  está errado.
- **Logout**: Server Action chamando `supabase.auth.signOut()`, acionada
  por um botão no layout do admin.

## Estrutura de rotas

Uso de um route group `(protected)` para aplicar o layout com sidebar/logout
só às páginas autenticadas, mantendo `/admin/login` fora dele (sem sidebar):

```
src/app/admin/
├── login/
│   └── page.tsx                    # /admin/login — sem sidebar
└── (protected)/
    ├── layout.tsx                  # sidebar + botão de logout
    ├── page.tsx                    # /admin — dashboard
    └── posts/
        ├── page.tsx                # /admin/posts — lista
        ├── novo/
        │   └── page.tsx            # /admin/posts/novo
        └── [id]/
            └── editar/
                └── page.tsx        # /admin/posts/[id]/editar
```

(`(protected)` é um route group — não aparece na URL.)

## Dashboard (`/admin`)

Contagem de posts por status (rascunho/publicado) e atalho para "Novo
post". Sem métricas avançadas — YAGNI.

## Lista de posts (`/admin/posts`)

Tabela (shadcn `Table`) com todos os posts (rascunho + publicado, ao
contrário da listagem pública que só mostra publicados), colunas: título
(link para editar), status (badge), categoria, destaque, atualizado em,
ações (editar / excluir com confirmação via `Dialog`).

## Formulário de post (criar/editar)

Mesmo componente client (`PostForm`) para `/admin/posts/novo` e
`/admin/posts/[id]/editar`, campos:

- **Título** — texto livre.
- **Slug** — auto-gerado do título via `slugify()` enquanto o campo não foi
  editado manualmente pelo usuário (rastreado por um estado local
  "tocado"); sempre editável.
- **Excerpt** — textarea.
- **Conteúdo** — editor Tiptap (negrito, itálico, H2/H3, lista com/sem
  marcador, citação, link), sincronizado como HTML num campo oculto do
  formulário para chegar à Server Action via `FormData`.
- **Categoria** — `<select>` nativo (estilizado com Tailwind, não o
  componente `Select` do shadcn — esse é baseado em `@base-ui/react` e não
  produz um elemento de formulário nativo, exigiria sincronizar valor via
  input oculto pra chegar ao `FormData`; um `<select>` nativo evita essa
  complexidade sem perder nada visualmente), populado por
  `getCategories()` (já existente em `src/modules/blog/data/posts.data.ts`
  — reaproveitado, RLS já permite leitura para `authenticated`).
- **Tags** — checkboxes nativos, populadas por `getTags()` (idem, já
  existente).
- **Imagem de capa** — input de arquivo; upload imediato ao selecionar
  (Server Action dedicada, chamada imperativamente a partir do client
  component, não via submit do form) para o bucket `blog-media` em
  `covers/<uuid>-<nome-sanitizado>`; a URL pública resultante fica num
  campo oculto do formulário. Preview simples com `<img>` (sem
  `next/image` — mesma decisão da Fase 1, adiada para a Fase 3).
- **Rascunho / Publicado** — checkbox nativo ("Publicado" marcado/
  desmarcado), pela mesma razão do `<select>` acima: o `Switch` do shadcn
  não é um controle de formulário nativo.
- **Destaque** — checkbox nativo, mesma razão.
- **SEO** — dois campos de texto (título/descrição), opcionais.

Validação: sem biblioteca nova (o projeto não usa Zod nem similar) —
checagem manual dos campos obrigatórios (título, slug, excerpt, conteúdo)
e verificação de unicidade do slug (query direta antes do insert/update,
excluindo o próprio post no caso de edição) na Server Action, retornando
`{ error: string }` via `useActionState` em caso de falha — mesmo padrão
usado no login.

## Server Actions (`src/modules/admin/actions/`)

- `login` / `logout` (`auth.actions.ts`) — já descritos acima.
- `uploadCoverImage(formData)` (`posts.actions.ts`) — recebe um arquivo,
  sobe para o Storage, devolve a URL pública.
- `createPost(prevState, formData)` — `verifySession()`, valida campos,
  checa unicidade de slug, insere em `posts`, insere as linhas de
  `post_tags` correspondentes às tags marcadas, define `published_at =
  now()` se o status for "publicado" (só na primeira vez — nunca
  sobrescreve um `published_at` já existente), `revalidatePath('/blog')` e
  `revalidatePath(`/blog/${slug}`)`, redireciona para `/admin/posts`.
- `updatePost(id, prevState, formData)` — mesma validação, `update` em
  `posts`, substitui as linhas de `post_tags` (apaga todas do post e
  reinsere as marcadas — mais simples e correto que diffing para o volume
  esperado), preserva a mesma regra de `published_at`. Se o slug mudou,
  revalida tanto o slug antigo quanto o novo (`revalidatePath` em ambos)
  para invalidar o cache da página antiga também.
- `deletePost(id)` — `verifySession()`, busca o slug antes de apagar (para
  revalidar depois), `delete` em `posts` (cascade já apaga `post_tags` via
  FK `on delete cascade` definida na Fase 1), `revalidatePath('/blog')` e
  `revalidatePath(`/blog/${slug}`)`.

Toda Server Action de escrita chama `verifySession()` como primeira linha —
a proteção do proxy é só otimista.

## Camada de dados do admin (`src/modules/admin/data/posts.admin.data.ts`)

- `getAllPostsForAdmin(): Promise<AdminPostListItem[]>` — todos os posts
  (qualquer status), ordenados por `updated_at desc`, com categoria
  embutida (nome) para a coluna da tabela.
- `getPostForEdit(id: string): Promise<PostEditable | null>` — dados
  completos de um post para popular o formulário de edição, incluindo
  `categoryId` (não só o nome) e a lista de `tagIds` selecionados (via
  join com `post_tags`).

Tipos novos em `src/modules/admin/types/admin.types.ts`:

```typescript
export interface AdminPostListItem {
  id: string
  slug: string
  title: string
  status: 'draft' | 'published'
  categoryName: string | null
  isFeatured: boolean
  updatedAt: string
}

export interface PostEditable {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImageUrl: string | null
  status: 'draft' | 'published'
  categoryId: string | null
  tagIds: string[]
  isFeatured: boolean
  seoTitle: string | null
  seoDescription: string | null
}
```

## Utilitário de slug

`src/modules/admin/lib/slugify.ts` — função pura `slugify(input: string):
string`: minúsculas, remove acentos (`normalize('NFD')` + strip de
diacríticos), substitui qualquer sequência de caracteres não
alfanuméricos por um único hífen, remove hífens nas pontas.

## Novos componentes shadcn/ui

Adicionados via `pnpm exec shadcn add <nome>` (CLI já é dependência do
projeto, `components.json` já configurado): `input`, `textarea`, `label`
(wrappers estilizados sobre elementos nativos — compatíveis com
`FormData` normalmente), `dialog` (confirmação de exclusão — não é um
controle de formulário, não tem esse problema) e `table` (semântico, só
estrutura `<table>`). `select` e `switch` do shadcn **não** entram nesta
fase — ver justificativa na seção do formulário de post acima.

## Novas dependências

`@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`,
`@tiptap/extension-link` — único acréscimo de dependências desta fase,
necessário para o editor rich text (decisão já validada com o usuário).

## Riscos e observações

- **Conteúdo gerado pelo editor passa a vir de um usuário real a partir
  desta fase** — isso é exatamente o gatilho que a Fase 1 identificou como
  "requisito da Fase 2": sanitização do HTML antes de gravar. Como o único
  usuário existente é a própria Íris (sem cadastro público, sem múltiplos
  autores), o risco de XSS armazenado é baixo, mas ainda assim o Tiptap
  deve ser configurado só com as extensões necessárias (não habilitar
  extensões que aceitem HTML arbitrário colado sem processar) — não é
  sanitização formal (isso fica para quando houver múltiplos
  autores/cadastro), mas evita o caso óbvio de colar HTML malicioso direto
  no editor.
- **Sem controle de concorrência otimista**: se a Íris editar o mesmo post
  em duas abas, a última a salvar sobrescreve a outra. Aceitável para
  usuário único — não vale a complexidade agora.
- **Limite da verificação automatizada nesta fase**: ao contrário da Fase
  1 (onde `curl` verificava páginas públicas via GET), as Server Actions
  de escrita (login, criar/editar/excluir post) usam um ID de action
  criptografado e checagem de CSRF (Origin/Host) — não são testáveis de
  forma confiável via `curl` direto sem um navegador real. A verificação
  automatizada desta fase cobre: build/lint/typecheck, comportamento de
  redirecionamento via `curl` (rota protegida sem sessão → `/admin/login`,
  etc.) e leitura cuidadosa do código pelos revisores. O fluxo completo
  (login → criar/editar/excluir post) precisa de uma checagem manual num
  navegador real antes de considerar a fase encerrada.

## Fora de escopo nesta fase

CRUD de categorias/tags (Fase 2b), biblioteca de mídia reutilizável com
metadados (Fase 2b — `media_assets` só é usada pela Fase 2b), configurações
gerais do blog (Fase 2b), sanitização formal de HTML, auditoria/RLS
avançada (Fase 3), qualquer suporte a múltiplos autores.
