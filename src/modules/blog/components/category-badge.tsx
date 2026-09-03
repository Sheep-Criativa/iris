import { Badge } from '@/components/ui/badge'
import type { Category } from '@/modules/blog/types/blog.types'

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <Badge className="bg-[#C35A38] text-[#FAF4ED] hover:bg-[#A84728]">
      {category.name}
    </Badge>
  )
}
