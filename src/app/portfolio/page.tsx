import { SiteNav } from '@/modules/portfolio/components/site-nav'
import { HeroAboutSection } from '@/modules/portfolio/components/hero-about-section'
import { PersonalOverviewSection } from '@/modules/portfolio/components/personal-overview-section'
import { CareerSection } from '@/modules/portfolio/components/career-section'
import { StudiesSection } from '@/modules/portfolio/components/studies-section'
import { SocialLinksSection } from '@/modules/portfolio/components/social-links-section'

import { aboutContent } from '@/modules/portfolio/data/about.data'
import { overviewContent } from '@/modules/portfolio/data/overview.data'
import { careerItems, educationItems } from '@/modules/portfolio/data/career.data'
import {
  softwareSkills,
  codingSkills,
  specialties,
  languages,
  hobbies,
} from '@/modules/portfolio/data/skills.data'
import { socialLinks } from '@/modules/portfolio/data/social-links.data'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#F3E6D3] text-[#291F1A]">
      <SiteNav />
      <main>
        {/* Seção 01: Hero com tipografia editorial sobreposta + retrato */}
        <HeroAboutSection about={aboutContent} />

        {/* Seção 02: Visão Pessoal com bloco terracota imersivo e pilares */}
        <PersonalOverviewSection overview={overviewContent} />

        {/* Seção 03: Trajetória com Formação & Experiência */}
        <CareerSection education={educationItems} career={careerItems} />

        {/* Seção 04: Competências Técnicas, Softwares, Idiomas e Hobbies */}
        <StudiesSection
          softwares={softwareSkills}
          codingSkills={codingSkills}
          specialties={specialties}
          languages={languages}
          hobbies={hobbies}
        />

        {/* Seção 05: Contato, Etiquetas Artesanais e Redes */}
        <SocialLinksSection links={socialLinks} />
      </main>
    </div>
  )
}
