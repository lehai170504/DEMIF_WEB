import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Eye, Heart, TrendingUp } from "lucide-react"
import { BlogPost } from "@/lib/data/blog"

interface PopularPostsProps {
  posts: BlogPost[]
}

export function PopularPosts({ posts }: PopularPostsProps) {
  return (
    <Card className="p-6 border-2 border-gray-100 bg-white shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white">
          <TrendingUp className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Bài viết phổ biến</h3>
      </div>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="block group">
            <div className="flex gap-4 p-3 rounded-xl hover:bg-orange-50 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-2xl font-bold text-orange-600 shadow-md group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors mb-2 text-sm leading-snug">
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
