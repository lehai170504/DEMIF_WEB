"use client";

import * as React from "react";
import { useAdminBlogs } from "@/hooks/use-blog";
import { BlogCard } from "@/components/admin/blog/blog-card";
import { CreateBlogDialog } from "@/components/admin/blog/create-blog-dialog";
import { BlogTable } from "@/components/admin/blog/blog-table";
import {
  Loader2,
  Newspaper,
  LayoutGrid,
  List,
  Inbox,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BlogDto, GetBlogsParams } from "@/types/blog.type";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  const [params, setParams] = React.useState<
    GetBlogsParams & { status: string }
  >({
    page: 1,
    pageSize: 12,
    search: "",
    status: "all",
    sortBy: "createdAt",
    sortDirection: "desc",
  });

  const debouncedSearch = useDebounce(params.search, 500);

  const apiParams = React.useMemo(
    () => ({
      ...params,
      search: debouncedSearch,
      status: params.status === "all" ? undefined : params.status,
    }),
    [params, debouncedSearch],
  );

  const { data, isLoading, isError, refetch } = useAdminBlogs(apiParams);

  const blogs = data?.items || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 1;

  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid");

  const updateParam = (key: string, value: any) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1, // Reset về trang 1 khi đổi bộ lọc
    }));
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-12 font-mono relative">
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
            <h1 className="text-3xl md:text-4xl font-black uppercase text-slate-900 dark:text-white leading-tight">
              Kho bài viết{" "}
              <span className="text-slate-400 font-medium text-2xl md:text-3xl">
                Hệ thống
              </span>
            </h1>
          </div>
          <CreateBlogDialog />
        </div>

        {/* BỘ LỌC & TOOLBAR */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between bg-white dark:bg-zinc-900/40 p-4 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Tìm tiêu đề, tóm tắt..."
                  value={params.search}
                  onChange={(e) => updateParam("search", e.target.value)}
                  className="pl-11 h-12 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border-none font-bold text-xs"
                />
              </div>

              {/* Status Tabs - Fix logic Active cực chuẩn */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-2xl">
                {["all", "published", "draft", "archived"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateParam("status", s)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                      params.status === s
                        ? "bg-white dark:bg-zinc-800 text-orange-500 shadow-sm"
                        : "text-slate-400 hover:text-slate-600",
                    )}
                  >
                    {s === "all" ? "Tất cả" : s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-zinc-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    viewMode === "grid"
                      ? "bg-white dark:bg-zinc-800 text-[#FF7A00] shadow-sm"
                      : "text-slate-400",
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    viewMode === "table"
                      ? "bg-white dark:bg-zinc-800 text-[#FF7A00] shadow-sm"
                      : "text-slate-400",
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl border-b-4 border-[#FF7A00]">
                {totalCount} Bài viết
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        {isLoading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-[#FF7A00]" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
              Đang đồng bộ dữ liệu CMS...
            </p>
          </div>
        ) : isError ? (
          <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-10 h-10 text-red-500" />
            <p className="text-red-500 font-bold uppercase text-xs">
              Lỗi tải dữ liệu
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="rounded-xl font-black text-[10px] uppercase"
            >
              Thử lại
            </Button>
          </div>
        ) : blogs.length > 0 ? (
          <div className="space-y-10">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {blogs.map((blog: BlogDto) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <BlogTable blogs={blogs} />
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-10">
                {/* Nút quay lại */}
                <Button
                  variant="outline"
                  disabled={(params.page ?? 1) <= 1} // Nếu undefined thì coi như trang 1
                  onClick={() => updateParam("page", (params.page ?? 1) - 1)}
                  className="rounded-2xl h-12 w-12 p-0 border-none bg-white dark:bg-zinc-900 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Trang
                  </span>
                  <div className="h-10 px-4 flex items-center justify-center bg-orange-500 text-white rounded-xl font-black text-sm">
                    {params.page ?? 1}{" "}
                    {/* Hiển thị 1 nếu chưa có dữ liệu trang */}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    / {totalPages}
                  </span>
                </div>

                {/* Nút kế tiếp */}
                <Button
                  variant="outline"
                  disabled={(params.page ?? 1) >= totalPages}
                  onClick={() => updateParam("page", (params.page ?? 1) + 1)}
                  className="rounded-2xl h-12 w-12 p-0 border-none bg-white dark:bg-zinc-900 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[40vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem] bg-white/50 dark:bg-zinc-900/10">
            <Inbox className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest">
              Không tìm thấy bài viết
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
