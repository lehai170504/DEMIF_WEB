"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Article {
  title: string;
  excerpt: string;
  link: string;
  image: string;
  date?: string;
}

interface SidebarArticlesProps {
  articles: Article[];
}

export function SidebarArticles({ articles }: SidebarArticlesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-orange-500" />
          Bài viết hay
        </h3>
        <Link
          href="/blog"
          className="text-[10px] font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-wider"
        >
          Tất cả
        </Link>
      </div>

      {/* Article List */}
      <div className="space-y-4">
        {articles.slice(0, 4).map((article, index) => (
          <motion.div
            key={article.link}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={article.link} className="group block">
              <div className="flex gap-4 items-start p-3 rounded-2xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/5">
                {/* Image Thumbnail */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 group-hover:border-orange-500/30 transition-colors">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  {article.date && (
                    <span className="text-[9px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest block mb-1">
                      {article.date}
                    </span>
                  )}
                  <h4 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 dark:text-zinc-300 group-hover:text-orange-600 dark:group-hover:text-white transition-colors">
                    {article.title}
                  </h4>

                  {/* Read More Link (Hidden by default) */}
                  <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span>Đọc ngay</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {articles.length === 0 && (
          <div className="text-center py-8 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
            <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium">
              Đang cập nhật bài viết mới...
            </p>
          </div>
        )}
      </div>

    </motion.div>
  );
}
