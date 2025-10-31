import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, TrendingUp } from "lucide-react"
import { BlogPost } from "@/lib/data/blog"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  const getCategoryIcon = (category: string) => {
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
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <TrendingUp className="h-6 w-6" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Bài viết liên quan</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((relatedPost) => (
          <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
            <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <div className="relative h-48 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-10 group-hover:scale-110 transition-transform duration-500">
                  {getCategoryIcon(relatedPost.category)}
                </div>
              </div>
              <div className="p-5">
                <Badge className="bg-orange-100 text-orange-700 mb-3 text-xs border-0">
                  {relatedPost.category}
                </Badge>
                <h4 className="font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-orange-600 transition-colors leading-snug">
                  {relatedPost.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{relatedPost.readTime} phút</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{relatedPost.views}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
