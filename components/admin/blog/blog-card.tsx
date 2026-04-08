"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Eye, Calendar, ArrowRight, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogDto } from "@/types/blog.type";

function Badge({
  text,
  className,
  isTag,
}: {
  text: string;
  className?: string;
  isTag?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-3 py-1 rounded-lg text-[10px] font-black shadow-sm flex items-center gap-1 transition-all capitalize tracking-widest",
        className,
      )}
    >
      {isTag && <Hash className="w-2.5 h-2.5 stroke-[4px]" />}
      {text}
    </div>
  );
}

export function BlogCard({ blog }: { blog: BlogDto }) {
  const tags =
    blog.tags && blog.tags !== "string"
      ? blog.tags
          .split(",")
          .map((t) => t.trim())
          .slice(0, 2)
      : [];

  return (
    <div className="group bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-gray-100 dark:border-white/5 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-orange-500/10 transition-all duration-500 font-mono relative border-b-4 border-b-transparent hover:border-b-orange-500">
      {/* Thumbnail Section */}
      <div className="relative h-56 overflow-hidden bg-gray-50 dark:bg-zinc-800">
        <img
          src={blog.thumbnailUrl || "/placeholder-blog.png"}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-5 right-5 flex flex-col gap-2 items-end z-10">
          <Badge
            text={blog.status === "Published" ? "Đã xuất bản" : "Bản nháp"}
            className={cn(
              "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md",
              blog.status === "Published"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-orange-600 dark:text-orange-400",
            )}
          />
          {tags.map((t, i) => (
            <Badge
              key={i}
              text={t}
              className="bg-black/70 dark:bg-orange-500/20 text-white dark:text-orange-300 border border-transparent dark:border-orange-500/30"
              isTag
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1 space-y-5">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {blog.createdAt
              ? format(new Date(blog.createdAt), "dd/MM/yyyy", { locale: vi })
              : "N/A"}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            {blog.viewCount?.toLocaleString() || 0} views
          </span>
        </div>

        <div className="space-y-3 flex-1">
          <h3 className="text-xl font-black text-gray-900 dark:text-white leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors line-clamp-2 first-letter:capitalize">
            {blog.title === "string" ? "Tiêu đề chưa cập nhật" : blog.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-[11px] font-bold leading-relaxed line-clamp-3 opacity-90 first-letter:capitalize">
            {blog.summary && blog.summary !== "string"
              ? blog.summary
              : "Khám phá chi tiết nội dung bài viết để cập nhật thêm kiến thức mới nhất từ chuyên gia..."}
          </p>
        </div>

        {/* Footer Section */}
        <div className="pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-900 dark:bg-zinc-800 flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:bg-orange-500 transition-all duration-300">
              {blog.authorId?.substring(0, 2).toUpperCase() || "AD"}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-900 dark:text-gray-200 leading-none uppercase tracking-tighter">
                Admin_Core
              </span>
              <span className="text-[9px] text-gray-400 dark:text-gray-500 font-black mt-1 uppercase">
                Tác giả
              </span>
            </div>
          </div>

          <Link href={`/admin/blogs/${blog.id}`}>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-zinc-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-600 transition-all active:scale-95 group/btn shadow-md">
              Chi tiết
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
