"use client";

import * as React from "react";
import { useBlogs } from "@/hooks/use-blogs";
import { BlogCard } from "@/components/admin/blog/blog-card";
import { CreateBlogDialog } from "@/components/admin/blog/create-blog-dialog";
import { Loader2, Newspaper, LayoutGrid, Inbox, RefreshCw } from "lucide-react";
import { BlogDto } from "@/types/blog.type";

export default function BlogPage() {
  const { data: blogs = [], isLoading, isError, refetch } = useBlogs();

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-12 font-mono relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-orange-500 pl-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-orange-600 mb-2">
              <div className="p-2 bg-orange-50 rounded-xl">
                <Newspaper className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold">Quản trị nội dung</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Kho bài viết{" "}
              <span className="text-slate-400 font-medium text-2xl md:text-3xl">
                Hệ thống
              </span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Danh sách bài viết được truy xuất trực tiếp từ cơ sở dữ liệu trung
              tâm.
            </p>
          </div>
          <CreateBlogDialog />
        </div>

        <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
            <LayoutGrid className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-600">
              Chế độ xem: Grid
            </span>
          </div>
          <div className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-xl border-b-4 border-orange-500">
            Tổng cộng: {blogs.length} Bài viết
          </div>
        </div>

        {isLoading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
            <p className="text-[10px] font-bold text-slate-400 animate-pulse">
              Đang đồng bộ dữ liệu...
            </p>
          </div>
        ) : isError ? (
          <div className="h-[40vh] flex flex-col items-center justify-center p-10 bg-red-50/50 border-2 border-dashed border-red-200 rounded-[3rem] gap-4">
            <RefreshCw className="w-10 h-10 text-red-400 animate-spin" />
            <p className="text-red-900 font-bold text-sm">
              Lỗi đồng bộ hóa dữ liệu
            </p>
            <button
              onClick={() => refetch()}
              className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all"
            >
              Thử lại ngay
            </button>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog: BlogDto) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="h-[40vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] space-y-5 bg-slate-50/30">
            <Inbox className="w-16 h-16 text-slate-200" />
            <div className="text-center">
              <p className="text-slate-900 font-bold text-sm">
                Kho bài viết đang trống
              </p>
              <p className="text-slate-400 text-[10px] font-medium mt-1">
                Vui lòng tạo bài viết mới để hiển thị nội dung trên hệ thống.
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="pt-20 pb-10 border-t border-slate-100 flex flex-col items-center gap-2 text-slate-300">
        <p className="text-[10px] font-bold">Demif CMS Engine v2.0</p>
      </footer>
    </div>
  );
}
