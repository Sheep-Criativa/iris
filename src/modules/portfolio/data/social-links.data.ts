import type { SocialLink } from '@/modules/portfolio/types/portfolio.types'

export const socialLinks: SocialLink[] = [
  {
    id: 'whatsapp',
    platform: 'whatsapp',
    label: 'WhatsApp',
    sublabel: 'Agendar mentoria ou tirar dúvidas',
    href: 'https://wa.me/5511987654321',
  },
  {
    id: 'instagram',
    platform: 'instagram',
    label: 'Instagram',
    sublabel: '@iris.psicologia — Dicas e reflexões',
    href: 'https://instagram.com/',
  },
  {
    id: 'email',
    platform: 'email',
    label: 'E-mail',
    sublabel: 'contato@irispsicologia.com.br',
    href: 'mailto:contato@irispsicologia.com.br',
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    sublabel: 'Artigos e trajetória profissional',
    href: 'https://linkedin.com/',
  },
]
