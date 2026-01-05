"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Article {
  title: string;
  excerpt: string;
  link: string;
  image: string;
  date?: string; // Thêm ngày tháng để tăng uy tín bài viết
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
      className="sticky top-24" // Giúp sidebar trượt theo khi cuộn trang
    >
      <div className="flex items-center justify-between mb-5 px-1">
        <h3 className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-orange-500" />
          Bài viết hay
        </h3>
        <Link
          href="/blog"
          className="text-xs font-bold text-slate-400 hover:text-orange-600 transition-colors uppercase tracking-wider"
        >
          Tất cả
        </Link>
      </div>

      <div className="space-y-3">
        {articles.slice(0, 4).map((article, index) => (
          <motion.div
            key={article.link}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={article.link} className="group block">
              <Card className="overflow-hidden border-none bg-transparent shadow-none transition-all">
                <div className="flex gap-4 items-start py-2">
                  {/* Image với hiệu ứng bo góc Soft-square */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200/50">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay icon khi hover */}
                    <div className="absolute inset-0 bg-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Bookmark className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    {article.date && (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {article.date}
                      </span>
                    )}
                    <h4 className="line-clamp-2 text-[13px] font-bold leading-snug text-slate-700 group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h4>

                    {/* Interaction Hint */}
                    <div className="flex items-center gap-1 text-[11px] font-bold text-orange-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span>Đọc ngay</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}

        {articles.length === 0 && (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-xs text-slate-400 font-medium">
              Đang cập nhật bài viết mới...
            </p>
          </div>
        )}
      </div>

      {/* Newsletter / Quảng cáo nhỏ tích hợp vào Sidebar */}
      <div className="mt-8 p-6 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
        <div className="relative z-10 space-y-3">
          <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">
            Newsletter
          </p>
          <h5 className="text-sm font-bold leading-tight">
            Nhận bí quyết học tiếng Anh hàng tuần
          </h5>
          <Button className="w-full py-2 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-orange-500 hover:text-white transition-colors">
            Đăng ký ngay
          </Button>
        </div>
        <div className="absolute -right-4 -bottom-4 h-20 w-20 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/40 transition-colors" />
      </div>
    </motion.div>
  );
}
