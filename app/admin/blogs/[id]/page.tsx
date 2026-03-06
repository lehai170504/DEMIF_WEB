"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogDetail, useManageBlog } from "@/hooks/use-manage-blog";
import {
  Loader2,
  Calendar,
  Eye,
  User,
  Hash,
  ArrowLeft,
  Edit3,
  Trash2,
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
  const id = params.id as string;
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const { deleteBlog, isDeleting } = useManageBlog();
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  const { data: blog, isLoading, isError } = useBlogDetail(id, true);

  const handleDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${blog?.title}"?`)) {
      deleteBlog(id, {
        onSuccess: () => router.push("/admin/blogs"),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 font-mono">
        <Loader2 className="animate-spin h-12 w-12 text-orange-500" />
        <p className="text-xs font-bold text-gray-400">
          Đang tải nội dung bài viết...
        </p>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4 font-mono">
        <p className="font-bold text-red-500">Lỗi: Không tìm thấy bài viết</p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="rounded-xl"
        >
          Quay lại
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-mono space-y-12 animate-in fade-in duration-700">
      {/* 1. Thanh điều hướng & Thao tác */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="group flex items-center gap-2 font-bold text-xs hover:bg-gray-100 rounded-xl px-4"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Quay lại danh sách
        </Button>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsEditOpen(true)}
            variant="outline"
            className="h-10 rounded-xl border-gray-200 gap-2 font-bold text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" /> Hiệu đính
          </Button>
          <Button
            onClick={() => setIsDeleteOpen(true)}
            disabled={isDeleting}
            variant="outline"
            className="h-10 rounded-xl border-gray-200 gap-2 font-bold text-xs hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Gỡ bỏ
          </Button>
        </div>
      </div>

      {/* 2. Tiêu đề & Metadata */}
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-sm font-bold text-orange-500">
          <Hash className="w-4 h-4" /> {blog.tags || "Thông tin chung"}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-8 text-xs font-bold text-gray-400">
          <span className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-orange-500" />
            {format(new Date(blog.createdAt), "dd MMMM, yyyy", { locale: vi })}
          </span>
          <span className="flex items-center gap-2.5">
            <Eye className="w-4 h-4 text-blue-500" />
            {blog.viewCount.toLocaleString()} Lượt xem
          </span>
          <span className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-gray-300" />
            Tác giả: {blog.authorId.substring(0, 8)}
          </span>
        </div>
      </header>

      {/* 3. Hero Image */}
      <div className="relative aspect-[21/9] rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-gray-200 group">
        <img
          src={blog.thumbnailUrl}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      {/* 4. Nội dung chính */}
      <article className="max-w-4xl mx-auto space-y-12 pb-20">
        {blog.summary && (
          <div className="text-gray-500 font-bold text-xl border-l-8 border-orange-500 pl-10 py-4 leading-relaxed bg-gray-50/50 rounded-r-3xl">
            {blog.summary}
          </div>
        )}

        <div
          className="text-gray-800 leading-relaxed font-sans text-lg prose prose-orange max-w-none prose-img:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="pt-16 border-t border-gray-100 text-center">
          <div className="inline-block px-6 py-2 bg-gray-50 rounded-full">
            <p className="text-[10px] font-bold text-gray-300 tracking-widest">
              Nội dung đã được xác thực • Demif Studio
            </p>
          </div>
        </div>
      </article>

      <EditBlogDialog
        blog={blog}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <DeleteBlogDialog
        blogId={id}
        blogTitle={blog.title}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={() => router.push("/admin/blogs")}
      />
    </div>
  );
}
