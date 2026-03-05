"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Eye, Heart, Calendar, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

// Định nghĩa kiểu dữ liệu (hoặc import từ file types chung)
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
}

interface BlogDetailHeroProps {
  post: BlogPost;
}

// Hàm format date đơn giản
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
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
            <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest hover:bg-orange-500/20">
              {post.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-[1.15] tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 mb-10 leading-relaxed font-light">
            {post.excerpt}
          </p>

          {/* Meta Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-gray-200 dark:border-white/10">
            {/* Author */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-gray-200 dark:border-white/10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-400 font-bold">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                  {post.author.role}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400 dark:text-zinc-400" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400 dark:text-zinc-400" />
                <span>{post.readTime} phút đọc</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-400 dark:text-zinc-400" />
                <span>{post.views}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
