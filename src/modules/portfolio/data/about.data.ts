import type { AboutContent } from '@/modules/portfolio/types/portfolio.types'

export const aboutContent: AboutContent = {
  name: 'Iris',
  role: 'Estudantes de Psicologia',
  headline: 'Apresentando minha jornada, meus aprendizados e o olhar que venho construindo através da Psicologia.',
  bioShort:
    'Mostrar as possibilidades que a Psicologia oferece, os aprendizados que surgem ao longo da graduação e os caminhos que podem ser construídos para uma carreira profissional com propósito.',
  bio: [
    'Minha história com a Psicologia começou muito antes de entrar na faculdade. Desde cedo, sempre tive um interesse genuíno em conhecer histórias, compreender diferentes perspectivas e entender o que existe por trás de cada situação, pensamento ou comportamento. Essa curiosidade e a vontade de conhecer e estar perto de pessoas foram essenciais para despertar meu interesse pela área e continuam sendo parte importante da minha trajetória.',
    'Ao ingressar na graduação, pude transformar essa curiosidade em conhecimento e experiência, ampliando minha compreensão sobre o comportamento humano e sobre as diferentes formas de atuação da Psicologia. Durante minha formação na UNAMA, tenho contato com diferentes contextos, projetos acadêmicos, trabalhos voluntários, vivência clínica no acompanhamento infantil e atuação em Recursos Humanos (Recrutamento e Seleção). Sigo motivada a aprender, crescer e contribuir para o desenvolvimento das pessoas.',
  ],
  location: 'Belém, Pará · Brasil',
  portraitUrl: '/images/iris-perfil.jpeg',
  badges: [
    'UNAMA · 6º Semestre',
    'Psicologia Clínica & Infantil',
    'Recrutamento e Seleção (RH)',
    'Projetos Acadêmicos & Voluntariado',
  ],
  handles: [
    { platform: 'instagram', handle: '@iris.psicologia', href: 'https://instagram.com/' },
    { platform: 'email', handle: 'contato@irispsicologia.com.br', href: 'mailto:contato@irispsicologia.com.br' },
    { platform: 'linkedin', handle: 'LinkedIn', href: 'https://linkedin.com/' },
  ],
}
