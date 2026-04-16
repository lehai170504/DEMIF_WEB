"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight, Clock, User, Bookmark } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function BlogPostCard({ post }: { post: any }) {
  const tagsArray = post.tags?.split(",").map((t: string) => t.trim()) || [];
  const category =
    post.category || (tagsArray.length > 0 ? tagsArray[0] : "Kiến thức");
  const hasValidImage = post.thumbnailUrl && post.thumbnailUrl !== "string";

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden group relative border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-1 border-b-4 border-b-transparent hover:border-b-orange-500">
      <Link
        href={`/blog/${post.slug || post.id}`}
        className="block relative h-56 overflow-hidden bg-zinc-100 dark:bg-zinc-900"
      >
        {hasValidImage ? (
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-blog.png";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Bookmark className="w-16 h-16 text-orange-500" />
          </div>
        )}

        {/* Overlay Badge Category */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-black/60 dark:bg-white/10 backdrop-blur-md text-white border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg">
            {category}
          </Badge>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </Link>

      {/* AREA: CONTENT */}
      <div className="flex-1 p-8 pt-6 flex flex-col relative z-10">
        {/* Meta Top: Date & Reading Time  */}
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-orange-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTimeMinutes || 5} Phút đọc
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-zinc-400">
            {post.publishedAt || post.createdAt
              ? format(
                  new Date(post.publishedAt || post.createdAt),
                  "dd/MM/yyyy",
                  { locale: vi },
                )
              : "Chưa cập nhật"}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug || post.id}`}
          className="block group/title"
        >
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 leading-[1.3] group-hover/title:text-orange-500 transition-colors">
            {post.title}
          </h2>
        </Link>

        {post.excerpt || post.summary ? (
          <p className="text-gray-500 dark:text-zinc-400 text-sm mb-8 line-clamp-2 font-medium leading-relaxed flex-1">
            {post.excerpt || post.summary}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        {/* Footer: Author & Action */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-500">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-900 dark:text-zinc-300 uppercase leading-none">
                {post.authorName || "Demif_Admin"}
              </span>
              <span className="text-[9px] text-zinc-500 font-bold mt-1 uppercase tracking-tighter">
                Tác giả
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-400 uppercase">
              <Eye className="w-3.5 h-3.5 text-blue-500" />
              {post.viewCount || 0}
            </div>

            <Button
              size="icon"
              className="h-10 w-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-black/10 group/btn"
              asChild
            >
              <Link href={`/blog/${post.slug || post.id}`}>
                <ArrowRight className="h-4 w-4 group-hover/btn:-rotate-45 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
