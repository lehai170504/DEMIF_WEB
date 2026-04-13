"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface DeleteVocabularyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  word: string;
  isDeleting: boolean;
}

export function DeleteVocabularyModal({
  isOpen,
  onOpenChange,
  onConfirm,
  word,
  isDeleting,
}: DeleteVocabularyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] border-none bg-white dark:bg-[#0D0D0D] p-8 shadow-2xl font-mono">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 animate-pulse">
            <AlertTriangle size={32} />
          </div>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter dark:text-white">
            Xác nhận <span className="text-rose-500">Loại bỏ</span>
          </DialogTitle>
          <DialogDescription className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed pt-2">
            Hành động này sẽ xóa vĩnh viễn từ{" "}
            <span className="text-zinc-900 dark:text-white">"{word}"</span> khỏi
            kho dữ liệu định danh của bạn.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-12 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5"
          >
            Hủy thao tác
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 h-12 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-rose-500/20 transition-all active:scale-95"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Xác nhận xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
