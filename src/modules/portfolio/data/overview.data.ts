import type { OverviewContent } from '@/modules/portfolio/types/portfolio.types'

export const overviewContent: OverviewContent = {
  sectionNumber: '02',
  scriptTitle: 'Conexão & Interação com a Psicologia',
  heading: 'A formação em Psicologia colabora para transforma aprendizado em caminhos para a vida profissional.',
  paragraphs: [
    'A transição dos livros acadêmicos para o mercado de trabalho da clínica costuma despertar a famosa "síndrome do impostor": será que estou preparado(a)? E se o paciente ficar em silêncio? Como preencher o prontuário de acordo com a resolução do CFP?',
    'Acredito que o aprendizado clínico floresce quando o estudante é acolhido em sua vulnerabilidade. Não existe dúvida boba na graduação. Aqui, construímos uma ponte sólida entre as teorias aprendidas na faculdade e a sensibilidade humana exigida na escuta clínica.',
  ],
  pillars: [
    {
      title: 'Espaço seguro sem julgamento',
      description: 'Um ambiente livre de pressões acadêmicas para você expor suas inseguranças, medos de atendimento e dúvidas sobre a prática.',
      iconName: 'sun',
    },
    {
      title: 'Da teoria à prática real',
      description: 'Desmistificação de anamneses, hipóteses diagnósticas, manejos e técnicas com aplicabilidade direta nos seus estágios.',
      iconName: 'heart',
    },
    {
      title: 'Ética e Prontuários CFP',
      description: 'Orientações práticas e atualizadas sobre registro documental (Resolução CFP nº 01/2009 e 06/2019), sigilo e postura profissional.',
      iconName: 'star',
    },
    {
      title: 'Sua identidade profissional',
      description: 'Apoio contínuo para você encontrar sua voz clínica e seu caminho teórico, respeitando suas afinidades e singularidade.',
      iconName: 'arch',
    },
  ],
  contact: {
    location: 'Atendimentos Online (Google Meet) & Presencial',
    email: 'contato@irispsicologia.com.br',
    whatsapp: '+55 (11) 98765-4321',
    status: 'Vagas Abertas para Mentoria',
    linkedinHref: 'https://linkedin.com/',
  },
  workspaceImageUrl: '/images/iris-workspace.jpg',
}
