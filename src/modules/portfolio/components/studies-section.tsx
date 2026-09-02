import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { StudyItem } from '@/modules/portfolio/types/portfolio.types'

interface StudiesSectionProps {
  items: StudyItem[]
}

export function StudiesSection({ items }: StudiesSectionProps) {
  return (
    <section id="estudos" className="scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Estudos & Motivações</h2>
        <Separator className="mt-6 mb-10" />

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.motivation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
