import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Eye, Heart, Calendar, ArrowRight } from "lucide-react"
import { BlogPost, formatDate } from "@/lib/data/blog"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 bg-white">
      {/* Cover Image */}
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-52 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10 group-hover:scale-110 transition-transform duration-500">
            {post.category === "Mẹo học tập" && "💡"}
            {post.category === "Phát âm" && "🎤"}
            {post.category === "Ngữ pháp" && "📖"}
            {post.category === "Từ vựng" && "📚"}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </Link>

      <div className="p-6">
        {/* Category Badge */}
        <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">
          {post.category}
        </Badge>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} phút</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-red-400" />
            <span>{post.likes}</span>
          </div>
        </div>

        {/* Author & Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>

        {/* Read More Button */}
        <Button
          className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all group"
          asChild
        >
          <Link href={`/blog/${post.id}`}>
            Đọc tiếp
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
