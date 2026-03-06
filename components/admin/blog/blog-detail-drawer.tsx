"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useBlogDetail } from "@/hooks/use-manage-blog";
import { Loader2, Calendar, Eye, Tag, User, Hash } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function BlogDetailDrawer({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: blog, isLoading } = useBlogDetail(id, isOpen);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="sm:max-w-[800px] h-full overflow-y-auto font-mono bg-white rounded-none border-l border-gray-100 shadow-2xl">
        {/* FIX: Luôn hiển thị Title để tránh lỗi Radix UI. 
            Sử dụng VisuallyHidden nếu muốn ẩn tiêu đề mặc định khi chưa có data */}
        <DrawerHeader className="sr-only">
          <DrawerTitle>{blog?.title || "Đang tải bài viết..."}</DrawerTitle>
        </DrawerHeader>

        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
              Đang truy xuất nội dung...
            </p>
          </div>
        ) : blog ? (
          <div className="p-10 space-y-10">
            {/* Header hiển thị thực tế */}
            <header className="space-y-5 border-b border-gray-100 pb-10">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 italic">
                <Hash className="w-3 h-3" /> {blog.tags || "General Insights"}
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 leading-[1.1]">
                {blog.title}
              </h2>
              <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {format(new Date(blog.createdAt), "dd MMMM, yyyy", {
                    locale: vi,
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  {blog.viewCount.toLocaleString()} Views
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-orange-500" />
                  ID: {blog.authorId.substring(0, 8)}
                </span>
              </div>
            </header>

            {/* Thumbnail */}
            <div className="aspect-video rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl shadow-gray-200">
              <img
                src={blog.thumbnailUrl}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Content Section */}
            <article className="max-w-none space-y-8">
              {blog.summary && (
                <div className="text-gray-500 font-bold italic text-xl border-l-4 border-orange-500 pl-8 py-2 leading-relaxed">
                  {blog.summary}
                </div>
              )}

              <div
                className="text-gray-700 leading-relaxed font-sans text-lg prose prose-orange"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* Footer của Drawer */}
            <footer className="pt-10 border-t border-gray-50 text-center">
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em]">
                End of Verified Content
              </p>
            </footer>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-20 text-gray-400">
            <p className="font-black uppercase tracking-widest">
              Không tìm thấy dữ liệu bài viết
            </p>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
