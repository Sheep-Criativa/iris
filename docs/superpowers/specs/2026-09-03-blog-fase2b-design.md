# Fase 2b — Categorias, Tags, Mídia e Configurações (Admin)

Data: 2026-09-03
Status: Aprovado para implementação
Depende de: `docs/superpowers/specs/2026-09-03-blog-fase2a-design.md`,
`docs/superpowers/specs/2026-09-03-blog-fase1-design.md`,
`docs/superpowers/specs/2026-09-03-blog-roadmap-design.md`

## Contexto e objetivo

A Fase 2a entregou login, proteção de rota e CRUD de posts. Esta fase
completa a área de admin com as telas de apoio: CRUD de categorias e tags,
biblioteca de mídia (a tabela `media_assets`, criada na Fase 1, ainda não
tinha nenhuma tela usando-a de fato), e configurações gerais do blog
(`blog_settings`). Com isso, o roadmap original (3 fases) fica completo
para o Admin — resta apenas a Fase 3 (hardening/SEO), fora de escopo aqui.

## Decisões já validadas com o usuário

- **Biblioteca de mídia substitui o upload direto de capa da Fase 2a**: o
  formulário de post passa a usar um seletor (`MediaPicker`) que escolhe
  uma imagem já enviada ou envia uma nova ali mesmo, em vez do upload
  direto simples que existia. A Server Action `uploadCoverImage` da Fase
  2a é removida — a biblioteca de mídia (`uploadMedia`) assume esse papel.
- **Exclusão de categoria/tag/mídia mostra quantos posts são afetados**
  antes de confirmar (ex: "Usada em 3 posts") — não impede a exclusão
  (o schema já lida com isso com segurança: categoria excluída vira "sem
  categoria" nos posts via `ON DELETE SET NULL`; tag excluída some da
  lista de tags do post via `ON DELETE CASCADE`), só informa.

## Correção de um achado da Fase 2a

A revisão final da Fase 2a encontrou (e deixou registrado, não bloqueante)
que `delete-post-button.tsx` tem um `catch` genérico que também engole o
erro de controle de fluxo `NEXT_REDIRECT` lançado por `verifySession()`
quando a sessão expira — resultado: em vez de redirecionar para
`/admin/login`, o usuário vê uma mensagem de erro genérica de exclusão.
Esta fase introduz um componente `ConfirmDeleteDialog` compartilhado (ver
abaixo) usando `unstable_rethrow` (de `next/navigation`, a API pública
documentada para exatamente este caso — reflancar erros de controle de
fluxo do Next enquanto trata erros de aplicação normalmente) e **refatora
`delete-post-button.tsx` para usar esse componente**, corrigindo o achado
da Fase 2a como parte natural deste trabalho, em vez de deixá-lo
parado indefinidamente.

## Categorias (`/admin/categorias`)

Uma página só, sem rotas dinâmicas — lista mais um `Dialog` de
criar/editar reaproveitado para os dois casos:

- Lista: nome, slug, descrição (truncada), contagem de posts, ações
  (editar abre o mesmo dialog preenchido, excluir usa
  `ConfirmDeleteDialog`).
- Dialog de criar/editar: nome, slug (auto-gerado do nome via `slugify()`
  já existente em `src/modules/admin/lib/slugify.ts` — reaproveitado, não
  duplicado — enquanto não editado manualmente, mesmo padrão do
  formulário de post), descrição (textarea, opcional).
- A contagem de posts por categoria vem de uma única query adicional
  (`select category_id from posts`) reduzida em memória — não uma
  consulta por categoria — e é reaproveitada tanto na coluna da lista
  quanto no texto do `ConfirmDeleteDialog`, sem nova consulta na hora de
  excluir.

## Tags (`/admin/tags`)

Mesmo padrão de categorias, mais simples (sem campo de descrição — a
tabela `tags` da Fase 1 só tem `slug`/`name`). Contagem de posts por tag
vem de uma consulta a `post_tags` (`select tag_id`), reduzida em memória
da mesma forma.

## Biblioteca de mídia (`/admin/midia`)

- Grade de todas as imagens em `media_assets`, com preview, texto
  alternativo (editável inline) e exclusão.
- Upload: formulário com arquivo + texto alternativo opcional — grava o
  arquivo no bucket `blog-media` (criado na Fase 1) sob o prefixo
  `media/<uuid>-<nome-sanitizado>` (distinto do prefixo `covers/` que a
  Fase 2a usava — mantém os dois tipos de arquivo organizados no mesmo
  bucket) e insere a linha correspondente em `media_assets`.
- Exclusão verifica se a URL pública do arquivo está em uso como capa de
  algum post (`posts.cover_image_url`) antes de mostrar a contagem no
  `ConfirmDeleteDialog` — mesma lógica de aviso das categorias/tags,
  aplicada a mídia.
- **Fora de escopo**: apagar o arquivo do Storage não verifica se ele está
  em uso em outro lugar além de `cover_image_url` (por exemplo, dentro do
  HTML de `content`, se algum dia o editor permitir inserir imagens no
  corpo do post — não permite hoje, o Tiptap desta fase só tem as
  extensões de texto da Fase 2a). Excluir uma imagem em uso deixa o link
  quebrado onde ela era referenciada — comportamento aceito, já registrado
  como risco conhecido na revisão final da Fase 2a.

## Seletor de mídia no formulário de post (`MediaPicker`)

Componente compartilhado usado tanto no formulário de post quanto (ver
abaixo) no campo de imagem de SEO das configurações:

- Mostra a imagem atualmente selecionada (se houver) e um botão que abre
  um `Dialog` com: grade das imagens já existentes em `media_assets`
  (clicar seleciona e fecha o dialog) e um campo de upload de nova imagem
  (envia via a mesma Server Action `uploadMedia` da biblioteca, seleciona
  o resultado e fecha o dialog).
- `src/app/admin/(protected)/posts/novo/page.tsx` e
  `.../posts/[id]/editar/page.tsx` passam a buscar a lista de mídia
  (`getAllMedia()`) junto com categorias/tags e repassar para `PostForm`.
- A Server Action `uploadCoverImage` (Fase 2a,
  `src/modules/admin/actions/posts.actions.ts`) é removida — o campo de
  capa do post não faz mais upload direto, só usa o `MediaPicker`.

## Configurações do blog (`/admin/configuracoes`)

Formulário único para a linha singleton de `blog_settings` (criada e já
com uma linha padrão desde a Fase 1): título do blog, descrição
(textarea), imagem de SEO padrão (via `MediaPicker`, mesmo componente do
formulário de post). Leitura reaproveita `getBlogSettings()`, já existente
em `src/modules/blog/data/posts.data.ts` (RLS já permite leitura pública
da configuração, sem necessidade de uma versão "admin" separada) — só a
escrita é nova (`updateBlogSettings`).

Nenhuma página pública consome `default_seo_image_url` ainda (nem
`generateMetadata` de `/blog` nem de `/blog/[slug]` usam esse campo hoje)
— isso é do escopo da Fase 3 (SEO avançado), já registrado no roadmap.
Esta fase só entrega a tela de edição do campo.

## Componentes novos e compartilhados

- `src/modules/admin/components/confirm-delete-dialog.tsx` — genérico
  (`triggerLabel`, `title`, `description`, `onConfirm: () => Promise<void>`),
  usando `unstable_rethrow` para não engolir redirecionamentos do Next.
  Reaproveitado por categorias, tags, mídia, **e** pelo botão de excluir
  post já existente (refatoração da Fase 2a descrita acima).
- `src/modules/admin/components/media-picker.tsx` — descrito acima,
  reaproveitado pelo formulário de post e pela tela de configurações.

## Novas Server Actions e camada de dados

- `src/modules/admin/actions/categories.actions.ts`:
  `createCategory`, `updateCategory`, `deleteCategory`.
- `src/modules/admin/actions/tags.actions.ts`:
  `createTag`, `updateTag`, `deleteTag`.
- `src/modules/admin/actions/media.actions.ts`:
  `uploadMedia`, `updateMediaAltText`, `deleteMedia`.
- `src/modules/admin/actions/settings.actions.ts`: `updateBlogSettings`.
- Toda action de escrita chama `verifySession()` primeiro (mesmo padrão
  já estabelecido) e `revalidatePath('/blog')` ao final (categorias/tags
  aparecem como badges no blog público; mídia e configurações podem
  afetar a exibição de posts/capas).
- `src/modules/admin/data/categories.admin.data.ts`:
  `getCategoriesWithPostCount()`.
- `src/modules/admin/data/tags.admin.data.ts`: `getTagsWithPostCount()`.
- `src/modules/admin/data/media.admin.data.ts`: `getAllMedia()` (inclui a
  URL pública de cada item, resolvida via
  `supabase.storage.from('blog-media').getPublicUrl(...)`).

Tipos novos em `src/modules/admin/types/admin.types.ts`:

```typescript
export interface CategoryWithCount extends Category {
  postCount: number
}

export interface TagWithCount extends Tag {
  postCount: number
}

export interface MediaAsset {
  id: string
  storagePath: string
  altText: string | null
  uploadedAt: string
  publicUrl: string
}
```

(`Category`/`Tag` importados de `src/modules/blog/types/blog.types.ts`,
já existentes desde a Fase 1.)

## Sidebar

`src/modules/admin/components/admin-sidebar.tsx` (Fase 2a) ganha 4 novos
links: Categorias, Tags, Mídia, Configurações — junto aos já existentes
Dashboard e Posts.

## Riscos e observações

- Igual à Fase 2a: as Server Actions de escrita (criar/editar/excluir
  categoria/tag/mídia, salvar configurações) não são testáveis via `curl`
  (ID de action criptografado + checagem de CSRF). Verificação automatizada
  cobre build/lint/typecheck e comportamento de redirecionamento (GET);
  o fluxo completo autenticado fica para checagem manual no navegador ao
  final da fase, junto com o que ficou pendente da Fase 2a.
- Excluir uma imagem em uso (fora do campo de capa) deixa um link quebrado
  — risco aceito, já descrito acima.

## Fora de escopo nesta fase

Consumo de `default_seo_image_url` nas páginas públicas (Fase 3), inserir
imagens no corpo do post via Tiptap (não pedido), qualquer alteração no
schema do Supabase (todas as tabelas usadas já existem desde a Fase 1),
sanitização formal de HTML (mesma decisão da Fase 2a — usuário único,
ainda pendente o fechamento do cadastro público no Supabase, tratado como
ação separada fora deste plano).
