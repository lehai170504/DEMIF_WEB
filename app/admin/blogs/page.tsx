"use client";

import * as React from "react";
import { useBlogs } from "@/hooks/use-blogs";
import { BlogCard } from "@/components/admin/blog/blog-card";
import { CreateBlogDialog } from "@/components/admin/blog/create-blog-dialog";
// Import BlogTable mới tạo
import { BlogTable } from "@/components/admin/blog/blog-table";
import {
  Loader2,
  Newspaper,
  LayoutGrid,
  List,
  Inbox,
  RefreshCw,
} from "lucide-react";
import { BlogDto } from "@/types/blog.type";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const { data: blogs = [], isLoading, isError, refetch } = useBlogs();

  // STATE ĐIỀU KHIỂN CHẾ ĐỘ XEM (Mặc định là Grid)
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-12 font-mono relative">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-[#FF7A00] pl-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-[#FF7A00] mb-2">
              <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <Newspaper className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">
                Quản trị nội dung
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              Kho bài viết{" "}
              <span className="text-slate-400 font-medium text-2xl md:text-3xl">
                Hệ thống
              </span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1 max-w-xl">
              Quản lý toàn bộ ấn phẩm, tin tức và bài học hiển thị trên nền
              tảng.
            </p>
          </div>
          <CreateBlogDialog />
        </div>

        {/* BỘ LỌC & TOOLBAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-zinc-900/40 p-4 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm gap-4">
          {/* Nút Toggle Grid / Table */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-zinc-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                viewMode === "grid"
                  ? "bg-white dark:bg-zinc-800 text-[#FF7A00] shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Lưới</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                viewMode === "table"
                  ? "bg-white dark:bg-zinc-800 text-[#FF7A00] shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
              )}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Danh sách</span>
            </button>
          </div>

          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl border-b-4 border-[#FF7A00]">
            Tổng cộng: {blogs.length} Bài viết
          </div>
        </div>

        {/* RENDER DỮ LIỆU */}
        {isLoading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-4 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm rounded-[3rem] border border-slate-200 dark:border-white/5">
            <Loader2 className="w-12 h-12 animate-spin text-[#FF7A00]" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
              Đang đồng bộ dữ liệu...
            </p>
          </div>
        ) : isError ? (
          <div className="h-[40vh] flex flex-col items-center justify-center p-10 bg-red-50/50 dark:bg-red-500/10 border-2 border-dashed border-red-200 dark:border-red-500/20 rounded-[3rem] gap-4">
            <RefreshCw className="w-10 h-10 text-red-500 animate-spin" />
            <p className="text-red-600 dark:text-red-400 font-bold text-sm uppercase tracking-widest">
              Lỗi đồng bộ hóa dữ liệu
            </p>
            <button
              onClick={() => refetch()}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all"
            >
              Thử lại ngay
            </button>
          </div>
        ) : blogs.length > 0 ? (
          /* RENDERING DỰA TRÊN CHẾ ĐỘ XEM */
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {blogs.map((blog: BlogDto) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <BlogTable blogs={blogs} />
          )
        ) : (
          <div className="h-[40vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem] space-y-5 bg-white/50 dark:bg-zinc-900/10">
            <div className="p-5 bg-slate-100 dark:bg-zinc-800 rounded-full">
              <Inbox className="w-12 h-12 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest mb-2">
                Kho bài viết đang trống
              </p>
              <p className="text-slate-500 text-xs font-medium max-w-sm mx-auto">
                Vui lòng tạo bài viết mới để hiển thị nội dung trên hệ thống
                CMS.
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="pt-20 pb-10 border-t border-slate-200/50 dark:border-white/5 flex flex-col items-center gap-2 text-slate-400">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
          Demif CMS Engine v2.0
        </p>
      </footer>
    </div>
  );
}
