"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogDetail } from "@/hooks/use-blog"; // Cập nhật import hook mới
import {
  Calendar,
  Eye,
  Hash,
  ArrowLeft,
  Trash2,
  RefreshCw,
  Clock,
  Settings2,
  Bookmark,
  Star,
  User,
  Archive,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditBlogDialog } from "@/components/admin/blog/edit-blog-dialog";
import { DeleteBlogDialog } from "@/components/admin/blog/delete-blog-dialog";
import { cn } from "@/lib/utils";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = React.useMemo(() => {
    const rawId = params?.id;
    return Array.isArray(rawId) ? rawId[0] : rawId;
  }, [params?.id]);

  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const {
    data: blog,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useBlogDetail(id as string, "id");

  // Skeleton Loading...
  if (isLoading || (isFetching && !blog)) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-12 animate-pulse font-mono">
        <div className="h-10 w-48 bg-slate-100 dark:bg-zinc-800 rounded-2xl" />
        <div className="space-y-6 text-center">
          <div className="w-20 h-6 bg-slate-100 dark:bg-zinc-800 rounded-full mx-auto" />
          <div className="w-3/4 h-16 bg-slate-100 dark:bg-zinc-800 rounded-3xl mx-auto" />
        </div>
        <div className="w-full aspect-[21/9] bg-slate-100 dark:bg-zinc-800 rounded-[4rem]" />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6 font-mono">
        <div className="p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-red-200 text-center">
          <RefreshCw className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <h2 className="font-black uppercase">Không tìm thấy bài viết</h2>
          <p className="text-xs text-slate-500 mt-2">ID: {id}</p>
        </div>
        <Button
          onClick={() => router.push("/admin/blogs")}
          className="rounded-2xl bg-orange-500"
        >
          Quay lại kho bài viết
        </Button>
      </div>
    );
  }

  const tagsList =
    blog.tags
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) || [];

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-zinc-950 pb-20 relative font-mono">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-16">
        {/* TOP BAR: ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/blogs")}
            className="group flex items-center gap-3 font-bold text-xs uppercase text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1.5" />
            Về danh sách quản trị
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={() => setIsEditOpen(true)}
              variant="outline"
              className="flex-1 sm:flex-none h-12 rounded-2xl bg-white dark:bg-zinc-900 border-blue-200 dark:border-blue-500/20 text-blue-600 gap-2 font-black text-[10px] uppercase shadow-sm px-8 transition-all hover:bg-blue-50"
            >
              <Settings2 className="w-4 h-4" /> Hiệu đính
            </Button>
            <Button
              onClick={() => setIsDeleteOpen(true)}
              variant="outline"
              className="flex-1 sm:flex-none h-12 rounded-2xl bg-white dark:bg-zinc-900 border-red-200 dark:border-red-500/20 text-red-600 gap-2 font-black text-[10px] uppercase shadow-sm px-8 transition-all hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" /> Gỡ bỏ
            </Button>
          </div>
        </div>

        {/* HEADER SECTION */}
        <header className="space-y-8 text-center max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Status Badge (3 màu - Note 4.1 & 4.4) */}
            <Badge
              className={cn(
                "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                blog.status.toLowerCase() === "published"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : blog.status.toLowerCase() === "archived"
                    ? "bg-red-500/10 text-red-600 border-red-500/20"
                    : "bg-orange-500/10 text-orange-600 border-orange-500/20",
              )}
            >
              {blog.status.toLowerCase() === "archived" && (
                <Archive className="w-3 h-3 mr-1.5" />
              )}
              {blog.status === "published"
                ? "Công khai"
                : blog.status === "archived"
                  ? "Đã lưu trữ"
                  : "Bản nháp"}
            </Badge>

            {/* Featured Badge (Note 5.3) */}
            {blog.isFeatured && (
              <Badge className="px-5 py-2 rounded-full text-[10px] font-black uppercase bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                <Star className="w-3 h-3 mr-1.5 fill-white" /> Tin nổi bật
              </Badge>
            )}

            {/* Category Badge (Note 5.4) */}
            {blog.category && (
              <div className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm">
                <Bookmark className="w-3 h-3" /> {blog.category}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            {blog.title}
          </h1>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest pt-8 border-t border-slate-200 dark:border-white/5 w-fit mx-auto px-10">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              {blog.publishedAt
                ? format(new Date(blog.publishedAt), "dd MMMM, yyyy", {
                    locale: vi,
                  })
                : format(new Date(blog.createdAt), "dd MMMM, yyyy", {
                    locale: vi,
                  })}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              {blog.readingTimeMinutes || 5} Phút đọc
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              T/G: {blog.authorName || "Demif_Admin"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              {blog.viewCount || 0} Lượt xem
            </span>
          </div>
        </header>

        {/* THUMBNAIL GIỮ TỶ LỆ CÂN ĐỐI */}
        <div className="relative aspect-[21/9] md:aspect-[2.5/1] rounded-[3rem] md:rounded-[4rem] overflow-hidden border-[12px] border-white dark:border-zinc-900 shadow-2xl bg-slate-100 dark:bg-zinc-800 max-w-6xl mx-auto">
          <img
            src={blog.thumbnailUrl || "/placeholder-blog.png"}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-[5000ms] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
        </div>

        {/* CONTENT AREA */}
        <article className="max-w-5xl mx-auto space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 bg-white dark:bg-zinc-900/40 p-8 md:p-16 lg:p-20 rounded-[3rem] shadow-sm border border-slate-200 dark:border-white/5 relative">
          {/* Tags cloud */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tagsList.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 text-[9px] font-black uppercase rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Summary Quote */}
          {blog.summary && (
            <div className="relative bg-orange-500/5 rounded-[2.5rem] p-8 md:p-12 border-l-[8px] border-orange-500 mb-12">
              <p className="text-slate-700 dark:text-slate-300 font-bold text-xl md:text-2xl leading-relaxed italic">
                "{blog.summary}"
              </p>
            </div>
          )}

          {/* HTML Content */}
          <div
            className="text-slate-700 dark:text-slate-300 leading-[1.8] text-lg md:text-xl prose prose-slate dark:prose-invert max-w-none 
            prose-img:rounded-[2rem] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
            prose-a:text-orange-500 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/30"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="pt-20 border-t border-slate-200 dark:border-white/10 text-center flex flex-col items-center gap-5">
            <div className="inline-block px-8 py-4 bg-slate-100 dark:bg-zinc-800 rounded-full">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Clock className="w-4 h-4" /> Hệ thống Demif CMS v2.0
              </p>
            </div>
          </div>
        </article>
      </div>

      {/* DIALOGS */}
      {isEditOpen && (
        <EditBlogDialog
          blog={blog}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      <DeleteBlogDialog
        blogId={id as string}
        blogTitle={blog.title}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={() => router.push("/admin/blogs")}
      />
    </div>
  );
}
