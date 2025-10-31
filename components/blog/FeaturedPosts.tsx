import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, ArrowRight, Sparkles } from "lucide-react"
import { BlogPost } from "@/lib/data/blog"

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bài viết nổi bật</h2>
          <p className="text-gray-600">Những bài viết được quan tâm nhiều nhất</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 bg-white">
              <div className="relative h-56 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10 group-hover:scale-110 transition-transform duration-300">
                  {post.category === "Mẹo học tập" && "💡"}
                  {post.category === "Phát âm" && "🎤"}
                  {post.category === "Ngữ pháp" && "📖"}
                  {post.category === "Từ vựng" && "📚"}
                </div>
                <Badge className="absolute top-4 left-4 bg-white/90 text-orange-600 border-0 shadow-md">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Nổi bật
                </Badge>
              </div>

              <div className="p-6">
                <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-200">
                  {post.category}
                </Badge>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} phút</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
