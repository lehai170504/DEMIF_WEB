"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Eye,
  Sparkles,
  ArrowUpRight,
  User,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import { BlogDto } from "@/types/blog.type";

interface FeaturedPostsProps {
  posts: BlogDto[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <div className="mb-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => {
          const hasValidImage =
            post.thumbnailUrl && post.thumbnailUrl !== "string";

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="group h-full flex flex-col bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 relative border-b-4 border-b-transparent hover:border-b-orange-500">
                  {/* Cover Area */}
                  <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    {hasValidImage ? (
                      <img
                        src={post.thumbnailUrl!}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder-blog.png";
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-transparent">
                        <Bookmark className="w-16 h-16 text-orange-500/20" />
                      </div>
                    )}

                    {/* Badge Nổi bật (Note 5.3) */}
                    <div className="absolute top-5 left-5 z-20">
                      <Badge className="bg-orange-500 text-white border-0 shadow-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 rounded-xl">
                        <Sparkles className="h-3 w-3 fill-current" />
                        Tiêu điểm
                      </Badge>
                    </div>

                    {/* Category Overlay (Note 5.4) */}
                    {post.category && (
                      <div className="absolute bottom-5 left-5 z-20">
                        <div className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase rounded-lg border border-white/10">
                          {post.category}
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-orange-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTimeMinutes || 5} Phút
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <User className="w-3.5 h-3.5" />
                        {post.authorName || "Admin"}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 leading-[1.3] group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>

                    {post.summary && (
                      <p className="text-gray-500 dark:text-zinc-400 mb-8 line-clamp-2 text-sm font-medium leading-relaxed">
                        {post.summary}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs font-black text-zinc-400 uppercase tracking-tighter">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span>{post.viewCount?.toLocaleString() || 0}</span>
                      </div>

                      <div className="h-10 w-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center transition-all duration-500 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-12 shadow-lg">
                        <ArrowUpRight className="w-5 h-5 stroke-[2.5px]" />
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
