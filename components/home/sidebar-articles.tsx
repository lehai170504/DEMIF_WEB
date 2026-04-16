"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Newspaper, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "../ui/button";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative p-6 md:p-8 bg-white dark:bg-[#0D0D0D] border border-gray-100 dark:border-white/5 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-black/20"
    >
      {/* ── Background Decor ── */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white leading-tight">
              Bài viết hay
            </h3>
            <p className="text-[9px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
              Kiến thức mỗi ngày
            </p>
          </div>
        </div>
        <Link
          href="/blog"
          className="group h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/[0.02] text-gray-400 dark:text-zinc-500 hover:bg-orange-500 hover:text-white transition-all border border-gray-200 dark:border-white/5 shadow-sm"
        >
          <ArrowRight className="h-4 w-4 group-hover:-rotate-45 transition-transform" />
        </Link>
      </div>

      {/* ── ARTICLE LIST ── */}
      <div className="space-y-4 relative z-10">
        {articles.slice(0, 4).map((article, index) => (
          <motion.div
            key={article.link}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Link href={article.link} className="group block">
              <div className="flex gap-4 items-center p-3 rounded-2xl transition-all duration-300 bg-gray-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] border border-gray-100 dark:border-white/5 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5">
                {/* Image Thumbnail */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 group-hover:border-orange-500/30 transition-colors bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={article.image || "/placeholder-blog.png"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    {article.date && (
                      <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {article.date}
                      </span>
                    )}
                    {/* Badge "Mới" cho bài đầu tiên */}
                    {index === 0 && (
                      <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-md font-black uppercase animate-pulse">
                        Mới
                      </span>
                    )}
                  </div>
                  <h4 className="line-clamp-2 text-xs md:text-sm font-bold leading-snug text-gray-700 dark:text-zinc-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {article.title}
                  </h4>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* ── EMPTY STATE ── */}
        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-3 opacity-60">
            <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/5">
              <Newspaper className="w-6 h-6 text-gray-400 dark:text-zinc-500" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
              Chưa có bài viết mới
            </p>
          </div>
        )}
      </div>

      {/* ── VIEW ALL BUTTON ── */}
      {articles.length > 0 && (
        <div className="mt-6 pt-2">
          <Link href="/blog" className="block w-full">
            <Button className="w-full h-12 gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">
              Khám phá kho kiến thức
              <Sparkles className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
