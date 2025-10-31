import { Badge } from "@/components/ui/badge"

interface BlogCoverImageProps {
  category: string
}

export function BlogCoverImage({ category }: BlogCoverImageProps) {
  const getCategoryIcon = () => {
    switch (category) {
      case "Mẹo học tập":
        return "💡"
      case "Phát âm":
        return "🎤"
      case "Ngữ pháp":
        return "📖"
      case "Từ vựng":
        return "📚"
      default:
        return "📚"
    }
  }

  return (
    <div className="relative h-[400px] bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 rounded-3xl mb-8 overflow-hidden shadow-2xl border-4 border-white">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[200px] opacity-10">{getCategoryIcon()}</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      <div className="absolute bottom-6 left-6">
        <Badge className="bg-white/90 text-gray-900 border-0 shadow-lg text-sm px-4 py-2">
          {category}
        </Badge>
      </div>
    </div>
  )
}
