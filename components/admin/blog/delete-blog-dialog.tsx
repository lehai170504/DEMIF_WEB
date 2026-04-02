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
import { Loader2, Trash2, AlertTriangle, Fingerprint } from "lucide-react";
import { useManageBlog } from "@/hooks/use-manage-blog";

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
      <DialogContent className="sm:max-w-[500px] bg-white rounded-[2.5rem] font-mono p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-10 bg-red-50/50 border-b border-red-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-500/20">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-red-600">
              Xác Nhận Gỡ Bỏ
            </DialogTitle>
          </div>
          <DialogDescription className="text-red-400 font-medium text-xs leading-relaxed">
            Hành động này sẽ xóa vĩnh viễn bài viết khỏi hệ thống và không thể
            hoàn tác dữ liệu đã mất.
          </DialogDescription>
        </DialogHeader>

        <div className="p-10 space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Đối tượng thực thi
            </p>
            <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
              <p className="font-bold text-gray-900 leading-tight">
                "{blogTitle}"
              </p>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono italic">
                <Fingerprint className="h-3 w-3" />
                ID: {blogId}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-14 rounded-2xl font-bold text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
            >
              Hủy bỏ thao tác
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-600/20 transition-all active:scale-[0.98]"
            >
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Xác nhận xóa ngay
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
