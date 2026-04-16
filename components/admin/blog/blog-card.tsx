"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Eye,
  Calendar,
  ArrowRight,
  Hash,
  Bookmark,
  User,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogDto } from "@/types/blog.type";

function Badge({
  text,
  className,
  isTag,
  icon: Icon,
}: {
  text: string;
  className?: string;
  isTag?: boolean;
  icon?: any;
}) {
  return (
    <div
      className={cn(
        "px-3 py-1.5 rounded-xl text-[9px] font-black shadow-sm flex items-center gap-1.5 transition-all uppercase tracking-widest border border-transparent",
        className,
      )}
    >
      {Icon && <Icon className="w-3 h-3 stroke-[3px]" />}
      {isTag && !Icon && <Hash className="w-2.5 h-2.5 stroke-[4px]" />}
      {text}
    </div>
  );
}

export function BlogCard({ blog }: { blog: BlogDto }) {
  // Chuẩn hóa Tags (Note 7)
  const tags =
    blog.tags && blog.tags !== "string"
      ? blog.tags
          .split(",")
          .map((t) => t.trim())
          .slice(0, 2)
      : [];

  // Xác định màu trạng thái
  const statusConfig = {
    published: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    draft: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    archived: "bg-red-500/10 text-red-600 border-red-500/20",
  };
  const currentStatus = blog.status.toLowerCase() as keyof typeof statusConfig;

  return (
    <div
      className={cn(
        "group bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-gray-100 dark:border-white/5 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 font-mono relative",
        blog.isFeatured &&
          "ring-2 ring-orange-500/50 border-orange-500/20 shadow-orange-500/10",
      )}
    >
      {/* Thumbnail Section */}
      <div className="relative h-56 overflow-hidden bg-gray-50 dark:bg-zinc-800">
        <img
          src={blog.thumbnailUrl || "/placeholder-blog.png"}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category Overlay */}
        {blog.category && (
          <div className="absolute top-5 left-5 z-10">
            <Badge
              text={blog.category}
              className="bg-black/60 dark:bg-zinc-900/80 backdrop-blur-md text-white border-white/10"
              icon={Bookmark}
            />
          </div>
        )}

        {/* Status & Tags Overlay */}
        <div className="absolute top-5 right-5 flex flex-col gap-2 items-end z-10">
          <Badge
            text={
              blog.status === "published"
                ? "Đã đăng bài"
                : blog.status === "archived"
                  ? "Lưu trữ"
                  : "Bản nháp"
            }
            className={cn(
              "backdrop-blur-md",
              statusConfig[currentStatus] || statusConfig.draft,
            )}
          />
          {blog.isFeatured && (
            <Badge
              text="Nổi bật"
              className="bg-orange-500 text-white shadow-orange-500/40"
            />
          )}
        </div>

        {/* Featured Glow */}
        {blog.isFeatured && (
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1 space-y-5">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              {blog.publishedAt
                ? format(new Date(blog.publishedAt), "dd/MM/yyyy", {
                    locale: vi,
                  })
                : format(new Date(blog.createdAt), "dd/MM/yyyy", {
                    locale: vi,
                  })}
            </span>
            {/* Reading Time */}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {blog.readingTimeMinutes || 5} phút đọc
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            {blog.viewCount || 0}
          </span>
        </div>

        <div className="space-y-3 flex-1">
          <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-500 dark:text-zinc-400 text-[11px] font-bold leading-relaxed line-clamp-3 opacity-90">
            {blog.summary ||
              "Khám phá chi tiết nội dung bài viết để cập nhật thêm kiến thức mới từ Demif..."}
          </p>
        </div>

        {/* Footer Section */}
        <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-black text-xs shadow-lg group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase">
                {blog.authorName || "Demif_Admin"}
              </span>
              <span className="text-[9px] text-gray-400 font-black uppercase">
                Tác giả
              </span>
            </div>
          </div>

          <Link href={`/admin/blogs/${blog.id}`}>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-95 group/btn shadow-md border-b-2 border-black/20">
              Chi tiết
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
