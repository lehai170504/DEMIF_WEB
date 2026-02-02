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
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
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
              <div className="flex gap-4 items-start p-3 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/5">
                {/* Image Thumbnail */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 group-hover:border-orange-500/30 transition-colors">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  {article.date && (
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                      {article.date}
                    </span>
                  )}
                  <h4 className="line-clamp-2 text-sm font-bold leading-snug text-zinc-300 group-hover:text-white transition-colors">
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
          <div className="text-center py-8 rounded-2xl border border-dashed border-white/10 bg-white/5">
            <p className="text-xs text-zinc-500 font-medium">
              Đang cập nhật bài viết mới...
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Card - Glass Style */}
      <div className="mt-8 p-6 rounded-[2rem] bg-gradient-to-br from-[#18181b] to-[#09090b] border border-white/10 relative overflow-hidden group shadow-2xl">
        {/* Glow Effect */}
        <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-orange-500/10 blur-[60px] rounded-full group-hover:bg-orange-500/20 transition-colors duration-500" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-orange-500">
            <Sparkles className="h-4 w-4 fill-current animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Newsletter
            </span>
          </div>

          <h5 className="text-lg font-bold text-white leading-tight">
            Nhận bí quyết học <br />{" "}
            <span className="text-zinc-400">tiếng Anh hàng tuần</span>
          </h5>

          <Button className="w-full h-10 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-orange-500/40">
            Đăng ký ngay
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
