"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogDetail } from "@/hooks/use-manage-blog";
import {
  Calendar,
  Eye,
  User,
  Hash,
  ArrowLeft,
  Edit3,
  Trash2,
  RefreshCw,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { EditBlogDialog } from "@/components/admin/blog/edit-blog-dialog";
import { DeleteBlogDialog } from "@/components/admin/blog/delete-blog-dialog";

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
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12 animate-pulse">
        <div className="flex justify-between items-center border-b border-slate-100 pb-8">
          <div className="w-32 h-10 bg-slate-100 rounded-2xl" />
          <div className="flex gap-3">
            <div className="w-28 h-10 bg-slate-100 rounded-2xl" />
            <div className="w-28 h-10 bg-slate-100 rounded-2xl" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex gap-3">
            <div className="w-24 h-6 bg-slate-100 rounded-full" />
            <div className="w-24 h-6 bg-slate-100 rounded-full" />
          </div>
          <div className="w-3/4 h-16 bg-slate-100 rounded-3xl" />
          <div className="w-1/2 h-16 bg-slate-100 rounded-3xl mt-2" />
          <div className="flex gap-6 pt-4">
            <div className="w-32 h-4 bg-slate-100 rounded-md" />
            <div className="w-32 h-4 bg-slate-100 rounded-md" />
            <div className="w-32 h-4 bg-slate-100 rounded-md" />
          </div>
        </div>
        <div className="w-full aspect-[21/9] bg-slate-100 rounded-[3.5rem]" />
        <div className="space-y-4 max-w-4xl mx-auto pt-8">
          <div className="w-full h-4 bg-slate-100 rounded-md" />
          <div className="w-full h-4 bg-slate-100 rounded-md" />
          <div className="w-5/6 h-4 bg-slate-100 rounded-md" />
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6 font-mono p-10 text-center animate-in zoom-in-95 fade-in duration-500">
        <div className="p-10 bg-white rounded-[3rem] border border-dashed border-red-200 shadow-2xl shadow-red-500/10 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500" />
          <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce">
            <RefreshCw className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="font-black text-slate-900 uppercase text-lg tracking-tighter">
            Trang Không Tồn Tại
          </h2>
          <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-[300px] mx-auto">
            Bài viết mang mã định danh <br />{" "}
            <strong className="text-slate-800 bg-slate-100 px-2 py-1 rounded mt-1 inline-block">
              {id}
            </strong>{" "}
            <br /> đã bị gỡ bỏ hoặc bạn không có quyền truy cập.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/admin/blogs")}
            variant="outline"
            className="rounded-2xl font-bold text-xs uppercase h-14 px-8 border-slate-200 hover:bg-slate-50 hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Về Danh Sách
          </Button>
          <Button
            onClick={() => refetch()}
            className="rounded-2xl font-bold text-xs uppercase h-14 px-8 bg-slate-900 text-white shadow-xl hover:scale-105 transition-all hover:bg-orange-600"
          >
            Thử Lại Ngay
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-mono space-y-16 relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-400/5 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-blue-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200/60 pb-8 gap-6 animate-in fade-in slide-in-from-top-8 duration-700 ease-out">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/blogs")}
            className="group flex items-center gap-3 font-black text-xs uppercase hover:bg-slate-100 rounded-2xl px-5 h-12 transition-all text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
            Quay lại kho lưu trữ
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={() => setIsEditOpen(true)}
              variant="outline"
              className="flex-1 sm:flex-none h-12 rounded-2xl border-slate-200 gap-2 font-bold text-[10px] uppercase hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all px-6 shadow-sm hover:shadow-md"
            >
              <Edit3 className="w-4 h-4" /> Hiệu đính
            </Button>
            <Button
              onClick={() => setIsDeleteOpen(true)}
              variant="outline"
              className="flex-1 sm:flex-none h-12 rounded-2xl border-slate-200 gap-2 font-bold text-[10px] uppercase hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all px-6 shadow-sm hover:shadow-md"
            >
              <Trash2 className="w-4 h-4" /> Gỡ bỏ
            </Button>
          </div>
        </div>

        <header className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-5 py-2 bg-orange-50/80 backdrop-blur-md text-orange-600 rounded-full text-[10px] font-black border border-orange-200/50 flex items-center gap-2 uppercase shadow-sm">
              <Hash className="w-3.5 h-3.5 stroke-[3px]" />
              {blog.tags && blog.tags !== "string"
                ? blog.tags
                : "Kiến thức chung"}
            </div>
            <div className="px-5 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/20">
              {blog.status === "Published" ? "Đã Xuất Bản" : "Bản Nháp"}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter first-letter:capitalize drop-shadow-sm">
            {blog.title === "string"
              ? "Tiêu đề bài viết chưa cập nhật"
              : blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-xl">
              <Calendar className="w-4 h-4 text-orange-500" />
              {blog.createdAt
                ? format(new Date(blog.createdAt), "dd MMM, yyyy", {
                    locale: vi,
                  })
                : "N/A"}
            </span>
            <span className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-xl">
              <Eye className="w-4 h-4 text-blue-500" />
              {blog.viewCount?.toLocaleString() || 0} Lượt xem
            </span>
            <span className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-xl">
              <User className="w-4 h-4 text-slate-400" />
              Tác giả:{" "}
              <span className="text-slate-900">
                {blog.authorId?.substring(0, 8)}
              </span>
            </span>
          </div>
        </header>

        <div className="relative aspect-[21/9] rounded-[3.5rem] overflow-hidden border-[8px] sm:border-[16px] border-white shadow-2xl shadow-slate-200/80 bg-slate-100 group animate-in fade-in zoom-in-[0.97] duration-1000 delay-200 fill-mode-both">
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          <img
            src={blog.thumbnailUrl || "/placeholder-blog.png"}
            alt={blog.title}
            className="w-full h-full object-cover relative z-10 transition-transform duration-[3000ms] group-hover:scale-105 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-blog.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent z-20 mix-blend-multiply rounded-[2.5rem]" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 z-30 rounded-[2.5rem]" />
        </div>

        <article className="max-w-3xl mx-auto space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          {blog.summary && blog.summary !== "string" && (
            <div className="relative">
              <div className="absolute -left-4 sm:-left-10 top-0 text-6xl text-orange-200 font-serif font-black opacity-50">
                "
              </div>
              <div className="text-slate-600 font-bold text-xl sm:text-2xl leading-relaxed italic border-l-[4px] border-orange-500 pl-6 sm:pl-8 py-2">
                {blog.summary}
              </div>
            </div>
          )}

          <div
            className="text-slate-700 leading-loose font-sans text-lg md:text-xl prose prose-orange max-w-none 
            prose-img:rounded-[2.5rem] prose-img:shadow-xl prose-img:border-[8px] prose-img:border-white
            prose-headings:font-mono prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900
            prose-p:mb-8 prose-strong:text-slate-900 prose-strong:bg-orange-50 prose-strong:px-1 prose-strong:rounded
            prose-a:text-orange-600 prose-a:underline-offset-4 hover:prose-a:text-orange-700
            selection:bg-orange-200 selection:text-orange-900"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="pt-24 border-t border-slate-200/60 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-1 bg-orange-500 rounded-full" />
            <div className="inline-block px-8 py-4 bg-slate-50/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Đã duyệt & Xác thực • Demif CMS 2026
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
