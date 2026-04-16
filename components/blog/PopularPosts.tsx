"use client";

import Link from "next/link";
import { Eye, TrendingUp } from "lucide-react";
import { BlogDto } from "@/types/blog.type";
import { cn } from "@/lib/utils";

export function PopularPosts({ posts }: { posts: BlogDto[] }) {
  return (
    <div className="space-y-3">
      {posts.map((post, index) => {
        const rankColors = [
          "text-orange-500 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20",
          "text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
          "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
        ];

        const defaultRankStyle =
          "text-slate-400 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-white/5";

        return (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <div className="flex items-start gap-4 p-3 rounded-[1.25rem] transition-all duration-300 hover:bg-white dark:hover:bg-white/[0.03] border border-transparent hover:border-slate-200/60 dark:hover:border-white/5 hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-none">
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl border flex items-center justify-center text-sm font-black transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                    index < 3 ? rankColors[index] : defaultRankStyle,
                  )}
                >
                  {index + 1}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-700 dark:text-zinc-300 text-sm line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-2 leading-snug">
                  {post.title}
                </h4>

                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5">
                    <Eye className="h-3 w-3 text-blue-500" />
                    <span>{post.viewCount?.toLocaleString() || 0}</span>
                  </div>

                  {post.category && (
                    <span className="truncate max-w-[80px] italic">
                      # {post.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}

      {posts.length === 0 && (
        <div className="py-10 text-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-3xl">
          <TrendingUp className="w-8 h-8 text-slate-200 mx-auto mb-2" />
          <p className="text-[10px] font-black uppercase text-slate-400">
            Chưa có bài viết tiêu biểu
          </p>
        </div>
      )}
    </div>
  );
}
