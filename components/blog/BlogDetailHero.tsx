import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Eye, Heart, Calendar, ArrowLeft } from "lucide-react"
import { BlogPost, formatDate } from "@/lib/data/blog"

interface BlogDetailHeroProps {
  post: BlogPost
}

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-b border-orange-200">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Quay lại Blog</span>
          </Link>

          {/* Category */}
          <Badge className="mb-4 bg-white border-2 border-orange-300 text-orange-700 hover:bg-orange-50 shadow-sm">
            {post.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.role}</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-10 hidden md:block" />
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-500" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span>{post.readTime} phút đọc</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-orange-500" />
                <span>{post.views} lượt xem</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>{post.likes} lượt thích</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
