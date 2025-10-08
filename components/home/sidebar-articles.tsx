"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Article {
  title: string
  excerpt: string
  link: string
  image: string
}

interface SidebarArticlesProps {
  articles: Article[]
}

export function SidebarArticles({ articles }: SidebarArticlesProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="p-5 border border-gray-100 bg-white rounded-xl shadow-lg">
        <div className="space-y-4">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">
              Bài viết phổ biến
            </h3>
            <Link 
              href="/blog" 
              className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
            >
              Xem thêm &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            {articles.slice(0, 4).map((article, index) => (
              <motion.div
                key={article.link}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
              >
                <Link href={article.link} className="block">
                  <div className="group flex gap-4 p-3 transition-all duration-200 rounded-lg hover:bg-orange-50/50 hover:shadow-sm hover:ring-1 hover:ring-orange-200">
                    
                    {/* Đã thay đổi kích thước từ w-20 sang w-24 (tỷ lệ 3:2) để hình ảnh đẹp và không bị méo */}
                    <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.05] transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 py-0.5">
                      <h4 className="line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
                        {article.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-1 text-xs font-medium text-orange-600 opacity-90">
                        <span>Đọc thêm</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {articles.length === 0 && (
                <p className="text-gray-500 italic p-2 text-sm">Không có bài viết phổ biến nào hiện tại.</p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
