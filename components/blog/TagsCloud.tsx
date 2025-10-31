import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { blogPosts } from "@/lib/data/blog"

interface TagsCloudProps {
  onTagClick: (tag: string) => void
}

export function TagsCloud({ onTagClick }: TagsCloudProps) {
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  return (
    <Card className="p-6 border-2 border-gray-100 bg-white shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Thẻ phổ biến</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer border-2 border-gray-200 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:border-transparent transition-all duration-300 px-3 py-1.5 text-sm"
            onClick={() => onTagClick(tag)}
          >
            #{tag}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
