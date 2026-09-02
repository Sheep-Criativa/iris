import { Code, Briefcase, Heart, MessageCircle, Mail } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type {
  SocialLink,
  SocialPlatform,
} from '@/modules/portfolio/types/portfolio.types'

interface SocialLinksSectionProps {
  links: SocialLink[]
}

const PLATFORM_ICONS: Record<SocialPlatform, typeof Code> = {
  github: Code,
  linkedin: Briefcase,
  instagram: Heart,
  twitter: MessageCircle,
  email: Mail,
}

export function SocialLinksSection({ links }: SocialLinksSectionProps) {
  return (
    <section id="redes" className="scroll-mt-20 border-t bg-muted/30">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Redes Sociais</h2>
        <Separator className="mt-6 mb-10" />

        <div className="flex flex-wrap gap-3">
          {links.map((link) => {
            const Icon = PLATFORM_ICONS[link.platform]
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className={buttonVariants({ variant: 'outline' })}
              >
                <Icon className="size-4" />
                {link.label}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
