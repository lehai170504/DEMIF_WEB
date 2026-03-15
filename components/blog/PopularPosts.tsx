"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  viewCount: number;
}

export function PopularPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <Link key={post.id} href={`/blog/${post.id}`} className="block group">
          <div className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-white/5">
            {/* Cột hiển thị số thứ tự (Rank) */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#27272a] border border-gray-200 dark:border-white/5 flex items-center justify-center text-lg font-black text-gray-500 dark:text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-500/30 transition-all shadow-inner">
                {index + 1}
              </div>
            </div>

            {/* Nội dung bài viết */}
            <div className="flex-1 min-w-0 py-0.5">
              <h4 className="font-bold text-gray-700 dark:text-zinc-300 text-sm line-clamp-2 group-hover:text-orange-500 transition-colors mb-2 leading-snug">
                {post.title}
              </h4>

              <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 dark:text-zinc-600 uppercase tracking-wider group-hover:text-gray-600 dark:group-hover:text-zinc-500 transition-colors">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3 w-3 text-blue-500" />
                  <span>{post.viewCount?.toLocaleString() || 0} lượt xem</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
