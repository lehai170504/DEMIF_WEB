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
import { useLessonActions } from "@/hooks/use-lesson";

interface DeleteLessonDialogProps {
  lessonId: string;
  lessonTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteLessonDialog({
  lessonId,
  lessonTitle,
  open,
  onOpenChange,
  onSuccess,
}: DeleteLessonDialogProps) {
  const { deleteLesson, isDeleting } = useLessonActions();

  const handleDelete = () => {
    deleteLesson(lessonId, {
      onSuccess: () => {
        onOpenChange(false);
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-[2rem] font-mono p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-8 bg-red-50/50 border-b border-red-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-500 rounded-xl shadow-md shadow-red-500/20">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold text-red-600">
              Xác nhận xóa bài học
            </DialogTitle>
          </div>
          <DialogDescription className="text-red-500 font-medium text-sm leading-relaxed">
            Hành động này sẽ xóa vĩnh viễn bài học khỏi hệ thống và không thể
            khôi phục lại dữ liệu.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500">
              Đối tượng thực thi
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <p className="font-bold text-slate-900 leading-tight">
                "{lessonTitle}"
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <Fingerprint className="h-3.5 w-3.5" />
                ID: {lessonId}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-xl font-semibold text-sm text-slate-600 border-slate-200 hover:bg-slate-50"
            >
              Hủy bỏ thao tác
            </Button>
            <Button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-[0.98]"
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
