import type {
  HobbyItem,
  LanguageItem,
  SkillSoftware,
} from '@/modules/portfolio/types/portfolio.types'

export const softwareSkills: SkillSoftware[] = [
  { name: 'DSM-5-TR', shortName: 'D5', type: 'design', color: '#C35A38' },
  { name: 'CID-11', shortName: 'C1', type: 'design', color: '#E8A76F' },
  { name: 'Código de Ética CFP', shortName: 'CF', type: 'design', color: '#7A8456' },
  { name: 'Avaliações & Evolução', shortName: 'Av', type: 'dev', color: '#291F1A' },
  { name: 'Recrutamento & Seleção', shortName: 'RS', type: 'dev', color: '#C35A38' },
  { name: 'Notion para Estudos', shortName: 'No', type: 'dev', color: '#7A8456' },
  { name: 'Google Scholar & Artigos', shortName: 'GS', type: 'dev', color: '#E8A76F' },
  { name: 'Roteiros de Entrevista', shortName: 'En', type: 'dev', color: '#7A8456' },
]

export const codingSkills: string[] = [
  'Acompanhamento diário e registros de evolução clínica infantil',
  'Condução de etapas de Recrutamento e Seleção de pessoas',
  'Triagem de currículos, contato e realização de entrevistas',
  'Compreensão do desenvolvimento humano e comportamento',
  'Participação em projetos acadêmicos e atividades voluntárias',
  'Compromisso com o Código de Ética Profissional do Psicólogo (CFP)',
]

export const specialties: string[] = [
  'Psicologia Clínica & Infantil',
  'Recrutamento e Seleção (RH)',
  'Acompanhamento e Avaliação',
  'Comportamento Humano',
  'Projetos Acadêmicos & Voluntariado',
  'Grupos de Estudo na UNAMA',
  'Escuta Empática & Acolhimento',
  'Ética e Resoluções do CFP',
]

export const languages: LanguageItem[] = [
  { language: 'Português', proficiency: 'Nativo' },
  { language: 'Inglês', proficiency: 'Leitura de Artigos Científicos' },
  { language: 'Espanhol', proficiency: 'Compreensão de Textos Acadêmicos' },
]

export const hobbies: HobbyItem[] = [
  {
    id: 'coffee',
    title: 'Café & Conversa',
    subtitle: 'Momentos de pausa e escuta',
    icon: 'coffee',
  },
  {
    id: 'digitalArt',
    title: 'Literatura & Poesia',
    subtitle: 'Narrativas que ampliam o olhar',
    icon: 'digitalArt',
  },
  {
    id: 'plant',
    title: 'Plantas & Botânica',
    subtitle: 'Cultivo de paciência e cuidado',
    icon: 'plant',
  },
  {
    id: 'vinyl',
    title: 'Cinema & Análise',
    subtitle: 'Psicologia através da arte',
    icon: 'vinyl',
  },
  {
    id: 'cat',
    title: 'Amor por Bichinhos',
    subtitle: 'Afeto e descompressão diária',
    icon: 'cat',
  },
]
