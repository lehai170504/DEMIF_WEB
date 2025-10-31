import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Linkedin } from "lucide-react"

interface BlogArticleContentProps {
  content: string
  tags: string[]
}

export function BlogArticleContent({ content, tags }: BlogArticleContentProps) {
  return (
    <Card className="p-8 md:p-12 border-2 border-gray-100 shadow-xl bg-white">
      {/* Article Content */}
      <div className="prose prose-lg prose-gray max-w-none">
        <div
          className="text-gray-800 leading-relaxed space-y-6"
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.875rem",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Tags */}
      <Separator className="my-8" />
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Thẻ bài viết
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/blog?search=${tag}`}>
              <Badge
                variant="outline"
                className="text-sm px-4 py-2 border-2 border-orange-200 text-orange-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <Separator className="my-8" />
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Chia sẻ bài viết
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-blue-500 hover:shadow-lg transition-all duration-300"
          >
            <Facebook className="h-5 w-5 mr-2" />
            Facebook
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-sky-200 text-sky-600 hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 hover:text-white hover:border-sky-500 hover:shadow-lg transition-all duration-300"
          >
            <Twitter className="h-5 w-5 mr-2" />
            Twitter
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-300 text-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 hover:text-white hover:border-blue-600 hover:shadow-lg transition-all duration-300"
          >
            <Linkedin className="h-5 w-5 mr-2" />
            LinkedIn
          </Button>
        </div>
      </div>
    </Card>
  )
}
