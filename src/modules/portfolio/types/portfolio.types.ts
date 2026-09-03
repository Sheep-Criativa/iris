export interface SocialHandle {
  platform: string
  handle: string
  href: string
}

export interface AboutContent {
  name: string
  role: string
  headline: string
  bioShort: string
  bio?: string[]
  location: string
  handles: SocialHandle[]
  portraitUrl: string
  badges: string[]
}


export interface PillarItem {
  title: string
  description: string
  iconName: 'sun' | 'heart' | 'star' | 'arch'
}

export interface OverviewContent {
  sectionNumber: string
  scriptTitle: string
  heading: string
  paragraphs: string[]
  pillars: PillarItem[]
  contact: {
    location: string
    email: string
    whatsapp: string
    status: string
    linkedinHref: string
  }
  workspaceImageUrl: string
}

export interface EducationItem {
  id: string
  period: string
  institution: string
  degree: string
  description?: string
}

export interface StudyItem {
  id: string
  title: string
  description: string
  motivation: string
}


export interface CareerItem {
  id: string
  period: string
  role: string
  organization: string
  description: string
  tags: string[]
}

export interface SkillSoftware {
  name: string
  shortName: string
  type: 'design' | 'dev'
  color: string
}

export interface LanguageItem {
  language: string
  proficiency: string
}

export interface HobbyItem {
  id: string
  title: string
  subtitle: string
  icon: 'vinyl' | 'coffee' | 'plant' | 'digitalArt' | 'cat'
}

export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'instagram'
  | 'whatsapp'
  | 'email'
  | 'behance'

export interface SocialLink {
  id: string
  platform: SocialPlatform
  label: string
  sublabel?: string
  href: string
}
