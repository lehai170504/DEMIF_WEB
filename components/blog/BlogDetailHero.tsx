"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, ArrowLeft, User } from "lucide-react";
import { motion } from "framer-motion";

// Định nghĩa lại kiểu dữ liệu sát với thực tế BlogDto
interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null; // Đã fix lỗi string | null
  category: string;
  authorId: string; // Dùng authorId thay vì object author phức tạp
  createdAt: string; // Dùng createdAt thay vì publishedAt
  viewCount: number; // Dùng viewCount thay vì views
}

interface BlogDetailHeroProps {
  post: BlogPost;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
  // Lấy chữ cái đầu của authorId làm Avatar Fallback
  const authorInitial = post.authorId
    ? post.authorId.charAt(0).toUpperCase()
    : "A";

  return (
    <div className="relative pt-20 pb-16 bg-white dark:bg-[#050505]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[100px] rounded-full opacity-50" />
      </div>

      <div className="relative container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors group text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Quay lại Blog
          </Link>

          {/* Category */}
          <div className="mb-6">
            <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest hover:bg-orange-500/20 shadow-sm">
              {post.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-[1.15] tracking-tight first-letter:capitalize">
            {post.title}
          </h1>

          {/* Excerpt (Chỉ hiển thị khi không bị null) */}
          {post.excerpt && post.excerpt !== "string" && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 mb-10 leading-relaxed font-light">
              {post.excerpt}
            </p>
          )}

          {/* Meta Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-gray-200 dark:border-white/10">
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-gray-200 dark:border-white/10 bg-gradient-to-br from-orange-400 to-orange-600 text-white font-black text-lg shadow-sm">
                {authorInitial}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm uppercase truncate max-w-[150px] sm:max-w-xs">
                  {post.authorId}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                  Tác giả
                </p>
              </div>
            </div>

            {/* Stats (Chỉ giữ lại Ngày và Lượt xem) */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[11px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-400" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-400" />
                <span>{post.viewCount?.toLocaleString() || 0} lượt xem</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
