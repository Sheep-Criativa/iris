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
