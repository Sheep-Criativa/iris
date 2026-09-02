export interface AboutContent {
  name: string
  headline: string
  bio: string[]
  highlights: string[]
}

export interface CareerItem {
  id: string
  role: string
  organization: string
  period: string
  description: string
  tags: string[]
}

export interface StudyItem {
  id: string
  title: string
  description: string
  motivation: string
}

export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'twitter' | 'email'

export interface SocialLink {
  id: string
  platform: SocialPlatform
  label: string
  href: string
}
