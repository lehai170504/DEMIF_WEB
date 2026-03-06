"use client";

import * as React from "react";
import { useBlogs } from "@/hooks/use-blogs";
import { BlogCard } from "@/components/admin/blog/blog-card";
import { CreateBlogDialog } from "@/components/admin/blog/create-blog-dialog";
import {
  Loader2,
  Newspaper,
  Search,
  LayoutGrid,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Gọi Hook chuẩn chỉnh với params (nếu BE hỗ trợ search)
  const {
    data: blogs,
    isLoading,
    isError,
    refetch,
  } = useBlogs({
    SearchTerm: debouncedSearch,
  });

  // Logic lọc client-side nếu API trả về mảng phẳng
  const filteredBlogs = React.useMemo(() => {
    if (!blogs) return [];
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        blog.tags.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [blogs, debouncedSearch]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-12 font-mono relative">
      {/* Hiệu ứng Glow nền nhẹ nhàng */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-10">
        {/* 1. HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-orange-500 pl-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-orange-600 mb-2">
              <div className="p-2 bg-orange-50 rounded-xl">
                <Newspaper className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Biên tập nội dung</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Kho bài viết{" "}
              <span className="text-slate-400 font-medium">hệ thống</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Quản lý kho tri thức và các bài viết hướng dẫn học tập cho cộng
              đồng.
            </p>
          </div>

          <CreateBlogDialog />
        </div>

        {/* 2. TOOLBAR SECTION (Search & Stats) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="lg:col-span-3 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            <Input
              placeholder="Tìm kiếm bài viết theo tiêu đề hoặc từ khóa hashtag..."
              className="h-12 pl-12 bg-slate-50 border-slate-200 font-medium rounded-xl focus-visible:ring-orange-500/50 focus-visible:border-orange-500 placeholder:text-slate-400 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-900 text-white h-12 rounded-xl px-6 shadow-md shadow-slate-900/10">
            <LayoutGrid className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold">
              Tổng cộng: {filteredBlogs.length} bài viết
            </span>
          </div>
        </div>

        {/* 3. CONTENT AREA */}
        {isLoading ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
              <RefreshCw className="absolute inset-0 w-10 h-10 animate-pulse text-orange-200 -z-10" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              Đang tải dữ liệu bài viết...
            </p>
          </div>
        ) : isError ? (
          <div className="h-[40vh] flex flex-col items-center justify-center p-10 bg-red-50 border border-dashed border-red-200 rounded-[2rem] gap-4">
            <AlertCircle className="w-10 h-10 text-red-500 opacity-80" />
            <p className="text-red-600 font-semibold text-sm">
              Không thể tải dữ liệu từ máy chủ
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-all shadow-sm"
            >
              Thử kết nối lại
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Empty State */}
            {filteredBlogs.length === 0 && (
              <div className="h-[40vh] flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-[2rem] space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium text-sm">
                  Không tìm thấy bài viết nào phù hợp với từ khóa.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. FOOTER */}
      <footer className="pt-12 border-t border-slate-200 flex flex-col items-center gap-4">
        <p className="text-sm font-medium text-slate-400">
          Hệ thống quản lý nội dung v2.0 • Demif Studio
        </p>
      </footer>
    </div>
  );
}
