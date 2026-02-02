"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, TrendingUp } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  views: number;
}

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

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
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
          <TrendingUp className="h-5 w-5" />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">
          Bài viết liên quan
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((relatedPost) => (
          <Link
            key={relatedPost.id}
            href={`/blog/${relatedPost.id}`}
            className="group block h-full"
          >
            <div className="h-full bg-[#18181b] rounded-[1.5rem] border border-white/10 overflow-hidden hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col">
              {/* Cover */}
              <div className="relative h-40 bg-gradient-to-br from-[#27272a] to-black overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">
                  {getCategoryIcon(relatedPost.category)}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
                    {relatedPost.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-white text-sm line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors leading-snug">
                  {relatedPost.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-600 uppercase tracking-wider border-t border-white/5 pt-3 mt-auto">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{relatedPost.readTime}p</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Eye className="h-3 w-3" />
                    <span>{relatedPost.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
