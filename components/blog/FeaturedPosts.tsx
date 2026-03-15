"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// 1. Cập nhật Interface: Fix excerpt và thêm thumbnailUrl
interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null; // Fix lỗi string | null
  category: string;
  viewCount: number;
  thumbnailUrl?: string; // Thêm field lấy từ API
}

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
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
    <div className="mb-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => {
          // Kiểm tra xem bài viết có ảnh hợp lệ không
          const hasValidImage =
            post.thumbnailUrl && post.thumbnailUrl !== "string";

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`}>
                <div className="group h-full flex flex-col bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 relative">
                  {/* Cover Area */}
                  <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#27272a] dark:to-black overflow-hidden">
                    {/* Render ảnh thật nếu có, ngược lại render Icon */}
                    {hasValidImage ? (
                      <img
                        src={post.thumbnailUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder-blog.png";
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500 group-hover:opacity-30 grayscale group-hover:grayscale-0">
                        {getCategoryIcon(post.category)}
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 text-white border-0 shadow-lg shadow-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 fill-current" />
                        Nổi bật
                      </Badge>
                    </div>

                    {/* Gradient Overlay để text dễ đọc */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#18181b] via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Content Area */}
                  <div className="p-6 pt-0 flex-1 flex flex-col relative z-10 -mt-12">
                    <div className="mb-4">
                      <Badge
                        variant="outline"
                        className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                      >
                        {post.category}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>

                    {/* Chỉ hiển thị Excerpt nếu nó tồn tại */}
                    {post.excerpt && post.excerpt !== "string" && (
                      <p className="text-gray-600 dark:text-zinc-400 mb-6 line-clamp-2 text-sm leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider pt-4 border-t border-gray-200 dark:border-white/5 mt-auto">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>5p</span> {/* Placeholder */}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{post.viewCount?.toLocaleString() || 0}</span>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                        <span className="group-hover:-rotate-45 transition-transform duration-300 leading-none">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
