import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { CareerItem } from '@/modules/portfolio/types/portfolio.types'

interface CareerSectionProps {
  items: CareerItem[]
}

export function CareerSection({ items }: CareerSectionProps) {
  return (
    <section id="carreira" className="scroll-mt-20 border-t bg-muted/30">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Carreira & Projetos</h2>
        <Separator className="mt-6 mb-10" />

        <div className="space-y-6">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.role}</CardTitle>
                <CardDescription>
                  {item.organization} · {item.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
