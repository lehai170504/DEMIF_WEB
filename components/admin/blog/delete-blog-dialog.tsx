"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Trash2,
  AlertTriangle,
  Fingerprint,
  Archive,
} from "lucide-react";
import { useManageBlog } from "@/hooks/use-blog"; // Dùng hook mới refactor
import { cn } from "@/lib/utils";

interface DeleteBlogDialogProps {
  blogId: string;
  blogTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteBlogDialog({
  blogId,
  blogTitle,
  open,
  onOpenChange,
  onSuccess,
}: DeleteBlogDialogProps) {
  const { deleteBlog, isDeleting } = useManageBlog();

  const handleDelete = () => {
    deleteBlog(blogId, {
      onSuccess: () => {
        onOpenChange(false);
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-950 rounded-[2.5rem] font-mono p-0 overflow-hidden border-none shadow-2xl transition-colors duration-300">
        {/* HEADER CẢNH BÁO LƯU TRỮ (Note 4.4) */}
        <DialogHeader className="p-10 bg-red-50/50 dark:bg-red-500/10 border-b border-red-100 dark:border-white/5">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-500/20">
              <Archive className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-black text-red-600 dark:text-red-500 uppercase tracking-tighter">
              Gỡ Bỏ Bài Viết
            </DialogTitle>
          </div>
          <DialogDescription className="text-red-500/80 dark:text-red-400/80 font-bold text-[10px] leading-relaxed uppercase tracking-widest">
            Hành động này sẽ chuyển bài viết vào trạng thái **Lưu trữ
            (Archived)**. Nội dung sẽ bị ẩn khỏi giao diện công khai nhưng vẫn
            có thể khôi phục trong CMS.
          </DialogDescription>
        </DialogHeader>

        <div className="p-10 space-y-8 bg-white dark:bg-zinc-950">
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
              Bài viết thực thi
            </p>
            <div className="p-6 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl space-y-2">
              <p className="font-black text-slate-900 dark:text-white leading-tight text-base line-clamp-2">
                "{blogTitle}"
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase tracking-tighter">
                <Fingerprint className="h-3.5 w-3.5 text-red-400" />
                ID: {blogId}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              Hủy bỏ
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-95"
            >
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              {isDeleting ? "Đang xử lý..." : "Xác nhận gỡ"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
