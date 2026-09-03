import { Badge } from '@/components/ui/badge'
import type { Tag } from '@/modules/blog/types/blog.types'

export function TagBadge({ tag }: { tag: Tag }) {
  return (
    <Badge variant="outline" className="border-[#E0CEB7] text-[#6B5B52]">
      #{tag.name}
    </Badge>
  )
}
