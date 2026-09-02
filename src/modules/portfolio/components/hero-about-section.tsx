import { Badge } from '@/components/ui/badge'
import type { AboutContent } from '@/modules/portfolio/types/portfolio.types'

interface HeroAboutSectionProps {
  about: AboutContent
}

export function HeroAboutSection({ about }: HeroAboutSectionProps) {
  return (
    <section id="sobre" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-20">
      <p className="text-sm font-medium text-muted-foreground">Quem é Íris?</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {about.name}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">{about.headline}</p>

      <div className="mt-8 space-y-4 text-base leading-relaxed">
        {about.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {about.highlights.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {about.highlights.map((highlight) => (
            <Badge key={highlight} variant="secondary">
              {highlight}
            </Badge>
          ))}
        </div>
      )}
    </section>
  )
}
