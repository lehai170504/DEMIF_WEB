"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, ArrowRight } from "lucide-react";
import { BlogDto } from "@/types/blog.type";

export function RelatedPosts({ posts }: { posts: BlogDto[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-20 pt-20 border-t border-gray-100 dark:border-white/5">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/20">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
            Khám phá thêm
          </h3>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((relatedPost) => (
          <Link
            key={relatedPost.id}
            href={`/blog/${relatedPost.slug}`}
            className="group flex flex-col h-full bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 border-b-4 border-b-transparent hover:border-b-orange-500"
          >
            <div className="relative h-44 overflow-hidden bg-zinc-100">
              <img
                src={relatedPost.thumbnailUrl || "/placeholder-blog.png"}
                alt={relatedPost.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-black/60 backdrop-blur-md text-white border-none text-[9px] font-black uppercase px-3 py-1">
                  {relatedPost.category || "Kiến thức"}
                </Badge>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h4 className="font-black text-gray-900 dark:text-white text-base line-clamp-2 mb-4 group-hover:text-orange-500 transition-colors leading-snug">
                {relatedPost.title}
              </h4>
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 dark:border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase">
                  <Eye className="h-3.5 w-3.5 text-blue-500" />
                  {relatedPost.viewCount || 0}
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
