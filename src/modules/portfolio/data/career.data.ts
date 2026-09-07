import type {
  CareerItem,
  EducationItem,
} from '@/modules/portfolio/types/portfolio.types'

export const educationItems: EducationItem[] = [
  {
    id: 'edu-1',
    period: '2024 — 2029 (Previsão de Conclusão)',
    institution: 'UNAMA — Universidade da Amazônia (Belém, PA)',
    degree: 'Bacharelado em Psicologia · 6º Semestre',
    description:
      'Formação acadêmica voltada para a compreensão integral do comportamento humano, processos de desenvolvimento e diferentes formas de atuação psicológica. Desenvolvimento de base teórica e prática com ênfase em ética profissional e cuidado com as pessoas.',
  },
  {
    id: 'edu-2',
    period: '2024 — Presente',
    institution: 'UNAMA & Comunidade',
    degree: 'Projetos Acadêmicos & Trabalhos Voluntários',
    description:
      'Participação em atividades extracurriculares, projetos acadêmicos e ações de voluntariado em múltiplos contextos, transformando a curiosidade em vivência prática e contribuindo para a construção da identidade profissional.',
  },
]

export const careerItems: CareerItem[] = [
  {
    id: 'exp-1',
    period: 'mar de 2026 — ago de 2026 · 6 meses',
    role: 'Estagiária',
    organization: 'Gestor Consultoria · Estágio (Belém, PA)',
    description:
      '• Condução de processos de recrutamento e seleção, desde a divulgação até a escolha dos candidatos.\n• Triagem, contato, entrevistas e acompanhamento dos candidatos nas etapas seletivas.',
    tags: [
      '#RecrutamentoESeleção',
      '#TriagemDeCandidatos',
      '#Entrevistas',
      '#ProcessosSeletivos',
      '#RH',
    ],
  },
  {
    id: 'exp-2',
    period: 'ago de 2025 — fev de 2026 · 7 meses',
    role: 'Estagiária',
    organization: 'Clínica Reabilitar · Estágio (Belém, PA)',
    description:
      '• Acompanhamento diário das crianças durante os atendimentos clínicos.\n• Realização e registro de avaliações e atividades diárias.',
    tags: [
      '#AtendimentoClínico',
      '#PsicologiaInfantil',
      '#Avaliações',
      '#AcompanhamentoClínico',
      '#ClínicaReabilitar',
    ],
  },
]
