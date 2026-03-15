"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  viewCount: number;
  createdAt: string;
  authorId: string;
  thumbnailUrl?: string;
}

const formatDate = (date: string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("vi-VN");
};

export function BlogPostCard({ post }: { post: BlogPost }) {
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

  const hasValidImage = post.thumbnailUrl && post.thumbnailUrl !== "string";

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#18181b] rounded-[2.2rem] overflow-hidden group relative">
      <Link
        href={`/blog/${post.id}`}
        className="block relative h-56 overflow-hidden"
      >
        {hasValidImage ? (
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-blog.png";
            }}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#27272a] dark:to-[#09090b] transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 select-none text-9xl grayscale group-hover:grayscale-0">
              {getCategoryIcon(post.category)}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#18181b] via-transparent to-transparent opacity-80" />

        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 dark:bg-black/50 backdrop-blur-md text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-black/70 transition-colors shadow-sm">
            {post.category}
          </Badge>
        </div>
      </Link>

      <div className="flex-1 p-6 pt-2 flex flex-col relative z-10">
        <Link href={`/blog/${post.id}`} className="block group/title">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover/title:text-orange-500 transition-colors">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && post.excerpt !== "string" ? (
          <p className="text-gray-600 dark:text-zinc-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
            {post.excerpt}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        {/* Meta Stats (Chỉ giữ lại Lượt xem) */}
        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-6 border-t border-gray-200 dark:border-white/5 pt-4">
          <div className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-blue-500" />
            <span>{post.viewCount?.toLocaleString() || 0} lượt xem</span>
          </div>
        </div>

        {/* Footer: Author & Action */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-xs shadow-lg uppercase">
              {post.authorId ? post.authorId.charAt(0) : "A"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white leading-none mb-1 uppercase truncate max-w-[100px]">
                {post.authorId || "Quản trị viên"}
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>

          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-white text-black hover:bg-orange-500 hover:text-white transition-all shadow-lg hover:shadow-orange-500/25 group/btn"
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
