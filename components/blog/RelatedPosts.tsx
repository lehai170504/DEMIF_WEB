"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp } from "lucide-react";

// Interface đã khớp chuẩn với BE
interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  viewCount: number;
  thumbnailUrl?: string;
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
        <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Bài viết liên quan
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((relatedPost) => {
          const hasValidImage =
            relatedPost.thumbnailUrl && relatedPost.thumbnailUrl !== "string";

          return (
            <Link
              key={relatedPost.id}
              href={`/blog/${relatedPost.id}`}
              className="group block h-full"
            >
              <div className="h-full bg-white dark:bg-[#18181b] rounded-[1.5rem] border border-gray-200 dark:border-white/10 overflow-hidden hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col">
                {/* Cover Area */}
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#27272a] dark:to-black overflow-hidden">
                  {hasValidImage ? (
                    <img
                      src={relatedPost.thumbnailUrl}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-blog.png";
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">
                      {getCategoryIcon(relatedPost.category)}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
                      {relatedPost.category}
                    </Badge>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors leading-snug">
                    {relatedPost.title}
                  </h4>

                  {/* THÊM LOGIC ĐỆM LAYOUT: Có excerpt thì in ra, không có thì chèn 1 thẻ div trống để đẩy footer xuống đáy */}
                  {relatedPost.excerpt && relatedPost.excerpt !== "string" ? (
                    <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                      {relatedPost.excerpt}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}

                  <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 dark:text-zinc-600 uppercase tracking-wider border-t border-gray-200 dark:border-white/5 pt-3 mt-auto">
                    <div className="flex items-center gap-1 ml-auto">
                      <Eye className="h-3 w-3 text-blue-500" />
                      <span>
                        {relatedPost.viewCount?.toLocaleString() || 0} lượt xem
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
