import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, BookOpen } from "lucide-react"

interface LessonCardSmallProps {
  id: string
  title: string
  code: string
  views: number
  source: string
  thumbnail: string
}

export function LessonCardSmall({ id, title, code, views, source, thumbnail }: LessonCardSmallProps) {
  return (
    <Card className="p-3 border-orange-200/50 bg-white hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex gap-3">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-red-400 to-red-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-8 w-8 text-white" />
          </div>
          <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">ESL</div>
        </div>
        <div className="flex-1 min-w-0">
          <Badge variant="outline" className="text-xs mb-1 border-orange-200 text-orange-600">
            {code}
          </Badge>
          <h3 className="font-semibold text-sm text-slate-800 line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Play className="h-3 w-3" />
            <span>{views}</span>
            <BookOpen className="h-3 w-3 ml-1" />
            <span>{source}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
