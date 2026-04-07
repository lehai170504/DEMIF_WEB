"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogDetail } from "@/hooks/use-manage-blog";
import {
  Calendar,
  Eye,
  Hash,
  ArrowLeft,
  Trash2,
  RefreshCw,
  Clock,
  Settings2,
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
  } = useBlogDetail(id as string);

  if (isLoading || (isFetching && !blog)) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-12 animate-pulse">
        <div className="flex justify-between items-center border-b border-slate-100 pb-8">
          <div className="w-32 h-10 bg-slate-100 dark:bg-zinc-800 rounded-2xl" />
          <div className="flex gap-3">
            <div className="w-28 h-10 bg-slate-100 dark:bg-zinc-800 rounded-2xl" />
            <div className="w-28 h-10 bg-slate-100 dark:bg-zinc-800 rounded-2xl" />
          </div>
        </div>
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="flex justify-center gap-3">
            <div className="w-24 h-6 bg-slate-100 dark:bg-zinc-800 rounded-full" />
            <div className="w-24 h-6 bg-slate-100 dark:bg-zinc-800 rounded-full" />
          </div>
          <div className="w-3/4 h-20 bg-slate-100 dark:bg-zinc-800 rounded-3xl mx-auto" />
          <div className="w-1/2 h-20 bg-slate-100 dark:bg-zinc-800 rounded-3xl mx-auto mt-2" />
          <div className="flex justify-center gap-6 pt-4">
            <div className="w-32 h-4 bg-slate-100 dark:bg-zinc-800 rounded-md" />
            <div className="w-32 h-4 bg-slate-100 dark:bg-zinc-800 rounded-md" />
            <div className="w-32 h-4 bg-slate-100 dark:bg-zinc-800 rounded-md" />
          </div>
        </div>
        <div className="w-full aspect-[21/9] bg-slate-100 dark:bg-zinc-800 rounded-[3.5rem] max-w-6xl mx-auto" />
        <div className="space-y-5 max-w-5xl mx-auto pt-8">
          <div className="w-full h-5 bg-slate-100 dark:bg-zinc-800 rounded-md" />
          <div className="w-full h-5 bg-slate-100 dark:bg-zinc-800 rounded-md" />
          <div className="w-5/6 h-5 bg-slate-100 dark:bg-zinc-800 rounded-md" />
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6 font-mono p-10 text-center animate-in zoom-in-95 fade-in duration-500">
        <div className="p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border border-dashed border-red-200 dark:border-red-500/20 shadow-2xl shadow-red-500/10 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500" />
          <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce">
            <RefreshCw className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="font-black text-slate-900 dark:text-white uppercase text-lg tracking-tighter">
            Trang Không Tồn Tại
          </h2>
          <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-[300px] mx-auto">
            Bài viết mang mã định danh <br />{" "}
            <strong className="text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded mt-1 inline-block">
              {id}
            </strong>{" "}
            <br /> đã bị gỡ bỏ hoặc bạn không có quyền truy cập.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/admin/blogs")}
            variant="outline"
            className="rounded-2xl font-bold text-xs uppercase h-14 px-8 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Về Danh Sách
          </Button>
          <Button
            onClick={() => refetch()}
            className="rounded-2xl font-bold text-xs uppercase h-14 px-8 bg-[#FF7A00] text-white shadow-xl shadow-orange-500/20 hover:scale-105 transition-all hover:bg-[#FF9E2C]"
          >
            Thử Lại Ngay
          </Button>
        </div>
      </div>
    );
  }

  const tagsList =
    blog.tags && blog.tags !== "string"
      ? blog.tags.split(",").map((t) => t.trim())
      : [];

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-zinc-950 pb-20 relative">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-400/5 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-400/5 blur-[120px] rounded-full" />
      </div>

      {/* Main Container*/}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-16">
        {/* Top Navigation & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-8 duration-700 ease-out">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/blogs")}
            className="group flex items-center gap-3 font-bold text-xs uppercase hover:bg-white dark:hover:bg-zinc-900 rounded-2xl px-5 h-12 transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-white/5 shadow-none hover:shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
            Quay lại kho lưu trữ
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={() => setIsEditOpen(true)}
              variant="outline"
              className="flex-1 sm:flex-none h-12 rounded-2xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 gap-2 font-bold text-[10px] uppercase hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all px-6 shadow-sm"
            >
              <Settings2 className="w-4 h-4" /> Hiệu đính
            </Button>
            <Button
              onClick={() => setIsDeleteOpen(true)}
              variant="outline"
              className="flex-1 sm:flex-none h-12 rounded-2xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 gap-2 font-bold text-[10px] uppercase hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-500/30 transition-all px-6 shadow-sm"
            >
              <Trash2 className="w-4 h-4" /> Gỡ bỏ
            </Button>
          </div>
        </div>

        {/* Blog Header (Title, Meta) - Căn giữa và mở rộng */}
        <header className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out text-center max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge
              variant="outline"
              className={cn(
                "px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border shadow-sm",
                blog.status === "Published"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
              )}
            >
              {blog.status === "Published" ? "Đã Xuất Bản" : "Bản Nháp"}
            </Badge>

            {tagsList.length > 0 ? (
              tagsList.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-5 py-2 bg-slate-200/50 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase shadow-sm"
                >
                  <Hash className="w-4 h-4 text-slate-400" />
                  {tag}
                </div>
              ))
            ) : (
              <div className="px-5 py-2 bg-slate-200/50 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase shadow-sm">
                <Hash className="w-4 h-4 text-slate-400" /> Kiến thức chung
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
            {blog.title === "string"
              ? "Tiêu đề bài viết chưa cập nhật"
              : blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest pt-6 border-t border-slate-200/60 dark:border-white/5 w-fit mx-auto px-8">
            <span className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#FF7A00]" />
              {blog.createdAt
                ? format(new Date(blog.createdAt), "dd MMMM, yyyy", {
                    locale: vi,
                  })
                : "N/A"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700 hidden sm:block" />
            <span className="flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-blue-500" />
              {blog.viewCount?.toLocaleString() || 0} Lượt xem
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700 hidden sm:block" />
          </div>
        </header>

        {/* Hero Image - Rộng hơn */}
        <div className="relative aspect-[21/9] md:aspect-[2.5/1] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-[8px] sm:border-[20px] border-white dark:border-zinc-900 shadow-2xl shadow-slate-200/50 dark:shadow-none bg-slate-100 dark:bg-zinc-800 group animate-in fade-in zoom-in-[0.97] duration-1000 delay-200 fill-mode-both max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-slate-200 dark:bg-zinc-700 animate-pulse" />
          <img
            src={blog.thumbnailUrl || "/placeholder-blog.png"}
            alt={blog.title}
            className="w-full h-full object-cover relative z-10 transition-transform duration-[4000ms] group-hover:scale-105 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-blog.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-20 mix-blend-multiply rounded-[2.5rem] md:rounded-[3.5rem]" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 z-30 rounded-[2.5rem] md:rounded-[3.5rem] pointer-events-none" />
        </div>

        {/* Main Content - Tăng max-w lên 5xl (1024px) */}
        <article className="max-w-5xl mx-auto space-y-14 pb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both bg-white dark:bg-zinc-900/50 p-8 md:p-16 lg:p-20 rounded-[3rem] shadow-sm border border-slate-200 dark:border-white/5">
          {/* Summary / Quote Box */}
          {blog.summary && blog.summary !== "string" && (
            <div className="relative bg-orange-50/50 dark:bg-orange-500/5 rounded-[2.5rem] p-8 md:p-12 border border-orange-100 dark:border-orange-500/10 mb-12">
              <div className="absolute -top-6 -left-4 text-8xl text-orange-200 dark:text-orange-500/20 font-serif font-black leading-none">
                "
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium text-xl md:text-2xl leading-relaxed italic relative z-10 text-center px-4">
                {blog.summary}
              </p>
            </div>
          )}

          {/* HTML Content Render - Tăng size chữ và khoảng cách */}
          <div
            className="text-slate-700 dark:text-slate-300 leading-[1.8] text-lg md:text-xl prose prose-slate dark:prose-invert max-w-none 
            prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:w-full prose-img:object-cover prose-img:my-16
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:mt-16 prose-headings:mb-8
            prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl
            prose-p:mb-8 prose-p:font-medium
            prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
            prose-a:text-[#FF7A00] prose-a:no-underline hover:prose-a:underline prose-a:font-bold
            prose-blockquote:border-l-[6px] prose-blockquote:border-[#FF7A00] prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-zinc-800/50 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-3xl prose-blockquote:my-12 prose-blockquote:not-italic prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400 prose-blockquote:text-xl
            prose-ul:list-disc prose-ul:my-8 prose-ul:pl-8
            prose-ol:list-decimal prose-ol:my-8 prose-ol:pl-8
            prose-li:marker:text-[#FF7A00] prose-li:marker:font-black prose-li:pl-2 prose-li:mb-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="pt-20 border-t border-slate-200 dark:border-white/10 text-center flex flex-col items-center gap-5 mt-20">
            <div className="w-16 h-2 bg-[#FF7A00] rounded-full opacity-80" />
            <div className="inline-block px-8 py-4 bg-slate-100 dark:bg-zinc-800 rounded-[2rem]">
              <p className="text-xs font-black text-slate-500 dark:text-slate-400 tracking-[0.4em] uppercase flex items-center gap-2.5">
                <Clock className="w-4 h-4" />
                Demif CMS • Đã cập nhật xong
              </p>
            </div>
          </div>
        </article>
      </div>

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
