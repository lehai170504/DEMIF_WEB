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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-orange-500 pl-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-orange-600">
              <div className="p-2 bg-orange-50 rounded-xl">
                <Newspaper className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em]">
                Biên tập nội dung
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
              Blog & <span className="text-gray-200">Insights</span>
            </h1>
            <p className="text-gray-400 text-sm font-medium italic">
              Quản lý kho tri thức và các bài viết hướng dẫn học tập cho cộng
              đồng.
            </p>
          </div>

          <CreateBlogDialog />
        </div>

        {/* 2. TOOLBAR SECTION (Search & Stats) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="lg:col-span-3 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-orange-500 transition-colors" />
            <Input
              placeholder="Tìm kiếm bài viết theo tiêu đề hoặc từ khóa hashtag..."
              className="h-14 pl-14 bg-gray-50 border-gray-100 font-bold rounded-2xl focus-visible:ring-orange-500/10 placeholder:text-gray-400 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-3 bg-gray-900 text-white h-14 rounded-2xl px-6 shadow-lg shadow-gray-900/20">
            <LayoutGrid className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-black uppercase tracking-widest">
              Total: {filteredBlogs.length} bài viết
            </span>
          </div>
        </div>

        {/* 3. CONTENT AREA */}
        {isLoading ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-5">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
              <RefreshCw className="absolute inset-0 w-12 h-12 animate-pulse text-orange-200 -z-10" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 animate-pulse">
              Đang đồng bộ dữ liệu từ máy chủ...
            </p>
          </div>
        ) : isError ? (
          <div className="h-[40vh] flex flex-col items-center justify-center p-10 bg-red-50 border-2 border-dashed border-red-100 rounded-[3rem] gap-4">
            <AlertCircle className="w-12 h-12 text-red-500 opacity-20" />
            <p className="text-red-600 font-black uppercase text-xs tracking-widest">
              Lỗi kết nối hạ tầng API
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all"
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
              <div className="h-[40vh] flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[3rem] space-y-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-200" />
                </div>
                <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] italic">
                  Không tìm thấy bài viết nào phù hợp với từ khóa
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. FOOTER */}
      <footer className="pt-12 border-t border-gray-100 flex flex-col items-center gap-4">
        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em]">
          Blog Management System v2.0 • Demif Studio
        </p>
      </footer>
    </div>
  );
}
