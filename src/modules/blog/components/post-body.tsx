// Conteúdo vem de seed confiável nesta fase (sem editor de usuário ainda).
// A Fase 2 introduz sanitização em tempo de escrita antes de qualquer HTML
// gerado por usuário chegar aqui — ver spec da Fase 1, seção "Riscos e
// observações".
export function PostBody({ html }: { html: string }) {
  return (
    <div className="prose-blog max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
