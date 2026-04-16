"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, ArrowLeft, User, Clock, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { BlogDto } from "@/types/blog.type";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface BlogDetailHeroProps {
  post: BlogDto | any;
}

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
  const dateDisplay = React.useMemo(() => {
    const targetDate = post.publishedAt || post.createdAt;
    if (!targetDate) return "Đang cập nhật";
    try {
      return format(new Date(targetDate), "dd MMMM, yyyy", { locale: vi });
    } catch (e) {
      return "Ngày không hợp lệ";
    }
  }, [post.publishedAt, post.createdAt]);

  return (
    <div className="relative pt-20 pb-16 bg-white dark:bg-[#050505] overflow-hidden">
      {/* Background Decor: Glow cam mờ phía sau */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[100px] rounded-full opacity-50" />
      </div>

      <div className="relative container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Nút quay lại danh sách */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-500 mb-8 transition-colors group text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Quay lại kho kiến thức
          </Link>

          {/* Hàng Badge: Category & Featured */}
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-orange-500 text-white border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-500/20">
              <Bookmark className="w-3 h-3 mr-1.5 fill-white" />
              {post.displayCategory || post.category || "Kiến thức"}
            </Badge>

            {post.isFeatured && (
              <Badge className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                ★ Tiêu điểm
              </Badge>
            )}
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-4xl md:text-6xl font-black mb-10 text-gray-900 dark:text-white leading-[1.1] tracking-tighter">
            {post.title}
          </h1>

          {/* Tóm tắt ngắn (Excerpt) */}
          {post.summary && post.summary !== "string" && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 mb-10 leading-relaxed font-medium italic border-l-4 border-orange-500/20 pl-6">
              {post.summary}
            </p>
          )}

          {/* Thanh thông tin Metadata */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-8 border-t border-gray-100 dark:border-white/5 text-[11px] font-black text-zinc-400 uppercase tracking-widest">
            {/* Ngày đăng */}
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span>{dateDisplay}</span>
            </div>

            {/* Thời gian đọc (Note 5.1) */}
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{post.readingTimeMinutes || 5} Phút đọc</span>
            </div>

            {/* Lượt xem */}
            <div className="flex items-center gap-2.5">
              <Eye className="h-4 w-4 text-purple-500" />
              <span>{post.viewCount?.toLocaleString() || 0} Lượt xem</span>
            </div>

            {/* Tác giả (Note 5.1) */}
            <div className="flex items-center gap-2.5 text-zinc-900 dark:text-white">
              <User className="h-4 w-4 text-emerald-500" />
              <span>Bởi {post.authorName || "Demif_Admin"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
