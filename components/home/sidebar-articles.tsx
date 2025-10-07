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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card className="border-orange-100 bg-white p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-gray-800">Bài viết phổ biến</h3>
            <Link href="/blog" className="text-sm text-orange-600 hover:text-orange-700">
              Xem thêm
            </Link>
          </div>

          <div className="space-y-3">
            {articles.map((article, index) => (
              <motion.div
                key={article.link}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={article.link}>
                  <div className="group flex gap-3 rounded-lg p-2 transition-all hover:bg-orange-50">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="line-clamp-2 text-sm font-medium text-gray-800 group-hover:text-orange-600">
                        {article.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <span>Đọc thêm</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
