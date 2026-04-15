"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IconTrash, IconAlertCircle } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DeleteLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  lessonTitle?: string;
}

export function DeleteLessonModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  lessonTitle,
}: DeleteLessonModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[400px] bg-white/80 dark:bg-zinc-950/90 backdrop-blur-xl border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-8">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-4">
          {/* Icon Warning nảy nảy */}
          <div className="size-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center animate-pulse">
            <IconAlertCircle className="size-8 text-red-600 dark:text-red-500" />
          </div>

          <div className="space-y-2">
            <AlertDialogTitle className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              Xác nhận xóa bài?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Ông có chắc chắn muốn xóa bài học{" "}
              <span className="font-bold text-slate-900 dark:text-slate-200">
                "{lessonTitle}"
              </span>{" "}
              không? Hành động này không thể hoàn tác đâu homie!
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-6">
          <AlertDialogCancel
            onClick={onClose}
            className="flex-1 rounded-2xl font-bold uppercase text-[11px] tracking-widest border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 transition-all h-12"
          >
            Hủy bỏ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={loading}
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "flex-1 rounded-2xl font-bold uppercase text-[11px] tracking-widest bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all h-12",
            )}
          >
            {loading ? (
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <IconTrash className="mr-2 size-4" /> Xóa ngay
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
