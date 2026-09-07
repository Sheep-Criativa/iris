import type { OverviewContent } from '@/modules/portfolio/types/portfolio.types'

export const overviewContent: OverviewContent = {
  sectionNumber: '02',
  scriptTitle: 'Propósito & Trajetória',
  heading: 'Transformando a curiosidade genuína em conhecimento, prática e compromisso com as pessoas.',
  paragraphs: [
    'Ao ingressar na graduação, pude transformar o interesse pelas histórias humanas em conhecimento e experiência, ampliando minha compreensão sobre o comportamento humano e sobre as diferentes formas de atuação da Psicologia.',
    'Durante minha formação na UNAMA, busco vivenciar a área em múltiplos contextos: atividades, projetos acadêmicos e trabalhos voluntários. Cada uma dessas vivências é uma oportunidade de aprender, evoluir e descobrir novos caminhos, construindo a profissional dedicada e sensível que quero me tornar.',
  ],
  pillars: [
    {
      title: 'Compreensão de Histórias',
      description: 'Curiosidade empática para compreender diferentes perspectivas e entender o que existe por trás de comportamentos e vivências.',
      iconName: 'heart',
    },
    {
      title: 'Clínica & Reabilitação Infantil',
      description: 'Acompanhamento diário de crianças durante atendimentos clínicos, com registros de evolução e cuidado com o desenvolvimento.',
      iconName: 'sun',
    },
    {
      title: 'Recursos Humanos & R&S',
      description: 'Experiência em recrutamento e seleção, triagem de candidatos, entrevistas e compreensão de pessoas em contextos organizacionais.',
      iconName: 'star',
    },
    {
      title: 'Extensão & Voluntariado',
      description: 'Participação ativa em atividades acadêmicas e projetos voluntários, ampliando o impacto social e a prática humanizada.',
      iconName: 'arch',
    },
  ],
  contact: {
    location: 'Belém, PA · Presencial & Remoto',
    email: 'contato@irispsicologia.com.br',
    whatsapp: '+55 (11) 98765-4321',
    status: '6º Semestre · UNAMA',
    linkedinHref: 'https://linkedin.com/',
  },
  workspaceImageUrl: '/images/iris-workspace.jpg',
}
