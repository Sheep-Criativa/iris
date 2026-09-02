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
