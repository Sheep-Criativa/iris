import type { AboutContent } from '@/modules/portfolio/types/portfolio.types'

export const aboutContent: AboutContent = {
  name: 'Iris',
  role: 'Estudantes de Psicologia',
  headline: 'Apresentando minha jornada, meus aprendizados e o olhar que venho construindo através da Psicologia.',
  bioShort:
    'Mostrar as possibilidades que a Psicologia oferece, os aprendizados que surgem ao longo da graduação e os caminhos que podem ser construídos para uma carreira profissional com propósito.',
  bio: [
    'A graduação em Psicologia é cheia de encantos, mas também de angústias: o primeiro atendimento na clínica-escola, o medo do silêncio, a escolha da abordagem teórica e a temida escrita de relatórios.',
    'Minha missão como mentora é construir com você um espaço de acolhimento mútuo e rigor técnico, onde suas dúvidas encontram respostas claras e suas inseguranças se transformam em potência clínica.',
  ],
  location: 'Iris Amanda Rodrigues de Oliveira',
  portraitUrl: '/images/iris-perfil.jpeg',
  badges: [
    'Mentoria para Graduandos',
    'Supervisão Clínica',
    'Orientação de Estágios & TCC',
    'Ética CFP & Afeto',
  ],
  handles: [
    { platform: 'IG', handle: '@iris.psicologia', href: 'https://instagram.com/' },
    { platform: 'WA', handle: 'Agendar Mentoria', href: 'https://wa.me/5511987654321' },
    { platform: 'LT', handle: 'Currículo Lattes', href: 'https://lattes.cnpq.br/' },
  ],
}
