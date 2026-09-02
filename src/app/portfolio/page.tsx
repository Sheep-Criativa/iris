import { SiteNav } from '@/modules/portfolio/components/site-nav'
import { HeroAboutSection } from '@/modules/portfolio/components/hero-about-section'
import { CareerSection } from '@/modules/portfolio/components/career-section'
import { StudiesSection } from '@/modules/portfolio/components/studies-section'
import { SocialLinksSection } from '@/modules/portfolio/components/social-links-section'
import { aboutContent } from '@/modules/portfolio/data/about.data'
import { careerItems } from '@/modules/portfolio/data/career.data'
import { studyItems } from '@/modules/portfolio/data/studies.data'
import { socialLinks } from '@/modules/portfolio/data/social-links.data'

export default function PortfolioPage() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroAboutSection about={aboutContent} />
        <CareerSection items={careerItems} />
        <StudiesSection items={studyItems} />
        <SocialLinksSection links={socialLinks} />
      </main>
    </>
  )
}
