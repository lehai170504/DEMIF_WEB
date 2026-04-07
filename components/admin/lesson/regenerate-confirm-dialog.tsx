"use client";

import * as React from "react";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RegenerateConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function RegenerateConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: RegenerateConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] p-10 border-orange-100 dark:border-white/5 bg-white dark:bg-zinc-950 shadow-2xl font-mono">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-mono font-bold tracking-tight flex items-center gap-3 text-orange-600 dark:text-orange-500">
            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-500" />
            </div>
            Cảnh báo ghi đè
          </DialogTitle>
          <DialogDescription className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed pt-2">
            Thao tác này sẽ xóa toàn bộ các từ bạn đã đục lỗ thủ công và{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              thay thế bằng bản tự động sinh ra từ AI
            </span>
            . Bạn có chắc chắn muốn tiếp tục?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3 mt-6">
          <Button
            variant="ghost"
            className="h-12 rounded-2xl font-bold uppercase text-[10px] tracking-widest text-slate-500 hover:text-slate-700 dark:hover:text-white"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Hủy bỏ
          </Button>
          <Button
            className="h-12 rounded-2xl px-8 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-orange-500/20 transition-all active:scale-95"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Xác nhận Sinh lại
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
