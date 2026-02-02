"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, Heart, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Giả sử interface này được import từ types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  views: number;
  likes: number;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
}

// Hàm format date đơn giản
const formatDate = (date: string) => new Date(date).toLocaleDateString("vi-VN");

export function BlogPostCard({ post }: { post: BlogPost }) {
  // Hàm lấy icon dựa trên category (bạn có thể tách ra utility riêng)
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mẹo học tập":
        return "💡";
      case "Phát âm":
        return "🎤";
      case "Ngữ pháp":
        return "📖";
      case "Từ vựng":
        return "📚";
      default:
        return "🚀";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#18181b] rounded-[2rem] overflow-hidden group relative">
      {/* Cover Image Area */}
      <Link
        href={`/blog/${post.id}`}
        className="block relative h-56 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#27272a] to-[#09090b] transition-transform duration-700 group-hover:scale-105" />

        {/* Category Icon Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 select-none text-9xl grayscale group-hover:grayscale-0">
          {getCategoryIcon(post.category)}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent opacity-80" />

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-black/50 backdrop-blur-md text-white border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-black/70 transition-colors">
            {post.category}
          </Badge>
        </div>
      </Link>

      <div className="flex-1 p-6 pt-2 flex flex-col relative z-10">
        {/* Title */}
        <Link href={`/blog/${post.id}`} className="block group/title">
          <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover/title:text-orange-500 transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-zinc-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
          {post.excerpt}
        </p>

        {/* Meta Stats */}
        <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-6 border-t border-white/5 pt-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readTime}p</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Heart className="h-3.5 w-3.5 text-red-500/70" />
            <span className="text-zinc-400">{post.likes}</span>
          </div>
        </div>

        {/* Footer: Author & Action */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
              {post.author.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-none mb-1">
                {post.author.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>

          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-white text-black hover:bg-orange-500 hover:text-white transition-all shadow-lg hover:shadow-orange-500/25 group/btn"
            asChild
          >
            <Link href={`/blog/${post.id}`}>
              <ArrowRight className="h-4 w-4 group-hover/btn:-rotate-45 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
