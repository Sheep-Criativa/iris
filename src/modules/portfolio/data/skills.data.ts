import type {
  HobbyItem,
  LanguageItem,
  SkillSoftware,
} from '@/modules/portfolio/types/portfolio.types'

export const softwareSkills: SkillSoftware[] = [
  { name: 'DSM-5-TR', shortName: 'D5', type: 'design', color: '#C35A38' },
  { name: 'CID-11', shortName: 'C1', type: 'design', color: '#E8A76F' },
  { name: 'Código de Ética CFP', shortName: 'CF', type: 'design', color: '#7A8456' },
  { name: 'Prontuários & Laudos', shortName: 'Pr', type: 'dev', color: '#291F1A' },
  { name: 'Notion para Estudos', shortName: 'No', type: 'dev', color: '#C35A38' },
  { name: 'Mendeley & Zotero', shortName: 'Me', type: 'dev', color: '#7A8456' },
  { name: 'Google Scholar & Periódicos', shortName: 'GS', type: 'dev', color: '#E8A76F' },
  { name: 'Roteiros de Anamnese', shortName: 'An', type: 'dev', color: '#7A8456' },
]

export const codingSkills: string[] = [
  'Manejo Clínico e Escuta Ativa nos Primeiros Atendimentos',
  'Elaboração de Documentos Psicológicos (Resolução CFP 06/2019)',
  'Estruturação de Anamnese e Formulação de Casos Clínicos',
  'Desenvolvimento do Vínculo Terapêutico e Manejo de Resistências',
  'Orientação e Escrita Científica de TCC e Estudos de Caso',
  'Postura Ética, Sigilo Profissional e Cuidados em Saúde Mental',
]

export const specialties: string[] = [
  'Mentoria para Estágio Clínico',
  'Supervisão de Casos Iniciais',
  'Orientação de TCC & Artigos',
  'Registro em Prontuário CFP',
  'Grupos de Estudo & Leitura',
  'Psicopatologia Contemporânea',
  'Transição para o CRP & Mercado',
  'Saúde Mental do Graduando',
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
