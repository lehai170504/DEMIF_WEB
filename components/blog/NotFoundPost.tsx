import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileX, Home, ArrowLeft } from "lucide-react"

export function NotFoundPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center p-12 border-2 border-orange-200 shadow-2xl">
          <div className="mb-6 flex justify-center">
            <div className="p-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white">
              <FileX className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Không tìm thấy bài viết
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Rất tiếc, bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-2 text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:border-orange-400 hover:text-white hover:shadow-lg transition-all duration-300"
            >
              <Link href="/blog">
                <ArrowLeft className="h-5 w-5" />
                Quay lại Blog
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Link href="/">
                <Home className="h-5 w-5" />
                Về Trang chủ
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
