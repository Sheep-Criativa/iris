import type {
  CareerItem,
  EducationItem,
} from '@/modules/portfolio/types/portfolio.types'

export const educationItems: EducationItem[] = [
  {
    id: 'edu-1',
    period: '2022 — 2024',
    institution: 'Instituto de Pós-Graduação em Psicologia Clínica',
    degree: 'Especialização em Psicoterapia Clínica & Práticas Baseadas em Evidências',
    description: 'Aprofundamento em manejo clínico, psicopatologia contemporânea, psicodiagnóstico e ética profissional.',
  },
  {
    id: 'edu-2',
    period: '2016 — 2021',
    institution: 'Universidade Federal / Centro Universitário de Excelência',
    degree: 'Bacharelado & Formação de Psicólogo(a)',
    description: 'Ênfase em Processos Clínicos e da Saúde, com estágios supervisionados em clínica-escola, hospitais e CAPS.',
  },
  {
    id: 'edu-3',
    period: '2021 — 2022',
    institution: 'Conselho e Sociedades de Psicologia',
    degree: 'Extensão em Supervisão Clínica e Docência no Ensino Superior',
    description: 'Capacitação pedagógica voltada para preceptoria de estágios, discussão de casos e acolhimento acadêmico.',
  },
]

export const careerItems: CareerItem[] = [
  {
    id: 'exp-1',
    period: '2022 — Presente',
    role: 'Mentora Acadêmica & Supervisora de Estudantes',
    organization: 'Programa Aconchego Psi / Mentoria para Graduandos',
    description:
      'Supervisão clínica e mentoria individual e em pequenos grupos para estudantes de Psicologia. Orientações sobre primeiros atendimentos, estruturação de prontuários, escolha de abordagem e preparação para a vida profissional pós-CRP.',
    tags: [
      '#MentoriaPsi',
      '#SupervisãoClínica',
      '#ClínicaEscola',
      '#PrimeirosAtendimentos',
      '#ÉticaCFP',
    ],
  },
  {
    id: 'exp-2',
    period: '2021 — Presente',
    role: 'Psicóloga Clínica Autônoma (CRP Ativo)',
    organization: 'Consultório Particular (Online & Presencial)',
    description:
      'Atendimentos psicoterapêuticos a adolescentes e adultos. Desenvolvimento de materiais didáticos e guias práticos de acolhimento e escuta terapêutica utilizados por graduandos em seus estágios.',
    tags: [
      '#Psicoterapia',
      '#SaúdeMental',
      '#Acolhimento',
      '#ManejoClínico',
      '#PráticaBaseadaEmEvidências',
    ],
  },
  {
    id: 'exp-3',
    period: '2020 — 2022',
    role: 'Preceptora & Facilitadora de Grupos de Estudos',
    organization: 'Núcleo de Apoio ao Estudante de Psicologia',
    description:
      'Condução de grupos focados em desmistificar a literatura clínica, escrita de estudos de caso e preparatórios para provas de estágio e residência em saúde mental.',
    tags: [
      '#GruposDeEstudo',
      '#EstudosDeCaso',
      '#EscritaCientífica',
      '#TCCPsi',
    ],
  },
]
