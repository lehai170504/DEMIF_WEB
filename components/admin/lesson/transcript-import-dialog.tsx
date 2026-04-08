"use client";

import { useState } from "react";
import { FileText, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateTranscript } from "@/hooks/use-lesson";
import { cn } from "@/lib/utils";

export function TranscriptImportDialog({ lessonId }: { lessonId: string }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [format, setFormat] = useState<"plain" | "vtt" | "srt">("plain");
  const { mutate: updateTranscript, isPending } = useUpdateTranscript();

  const handleImport = () => {
    updateTranscript(
      { id: lessonId, data: { rawContent: content, format } },
      {
        onSuccess: () => {
          setOpen(false);
          setContent("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 border-dashed border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all"
        >
          <Upload className="h-3.5 w-3.5" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Nhập Transcript nhanh
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col font-mono p-0 overflow-hidden rounded-[1.5rem] bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/10 shadow-2xl">
        <DialogHeader className="p-6 border-b border-gray-100 dark:border-white/5 shrink-0 bg-white dark:bg-zinc-950">
          <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <FileText className="h-5 w-5 text-orange-500" />
            <span className="font-black uppercase text-sm tracking-tight">
              Nhập nội dung Transcript
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white dark:bg-zinc-950">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
              Định dạng nguồn
            </label>
            <Select value={format} onValueChange={(v: any) => setFormat(v)}>
              <SelectTrigger className="h-11 rounded-xl shadow-sm border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 dark:text-white focus:ring-orange-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10">
                <SelectItem
                  value="plain"
                  className="text-xs font-bold font-mono focus:bg-orange-50 dark:focus:bg-white/5"
                >
                  {" "}
                  Văn bản thuần (Plain Text){" "}
                </SelectItem>
                <SelectItem
                  value="vtt"
                  className="text-xs font-bold font-mono focus:bg-orange-50 dark:focus:bg-white/5"
                >
                  Video Text Tracks (VTT)
                </SelectItem>
                <SelectItem
                  value="srt"
                  className="text-xs font-bold font-mono focus:bg-orange-50 dark:focus:bg-white/5"
                >
                  SubRip Subtitle (SRT)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
              Nội dung văn bản
            </label>
            <Textarea
              placeholder="Dán nội dung transcript hoặc phụ đề vào đây..."
              className="min-h-[350px] font-mono text-xs rounded-2xl border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 dark:text-slate-200 focus:ring-orange-500 p-4 leading-relaxed custom-scrollbar"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="text-[10px] text-gray-400 dark:text-gray-500 italic px-1">
              * Lưu ý: Hệ thống sẽ tự động bóc tách và tạo lại các mốc thời gian
              dựa trên định dạng bạn chọn.
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-900/50 shrink-0">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5"
          >
            Hủy
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl px-6 shadow-lg shadow-orange-500/20 transition-all active:scale-95"
            disabled={isPending || !content}
            onClick={handleImport}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Đang xử lý..." : "Xác nhận & Tái tạo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
