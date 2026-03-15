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
          className="h-8 gap-2 border-dashed border-orange-200 text-orange-600 hover:bg-orange-50"
        >
          <Upload className="h-3.5 w-3.5" /> Nhập Transcript nhanh
        </Button>
      </DialogTrigger>

      {/* 1. sm:max-w-[600px]: Giới hạn chiều rộng
          2. max-h-[90vh]: Giới hạn chiều cao tối đa của toàn bộ Dialog là 90% màn hình
          3. flex flex-col: Sắp xếp các phần tử con theo chiều dọc 
      */}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col font-mono p-0 overflow-hidden rounded-[1.5rem]">
        <DialogHeader className="p-6 border-b border-gray-100 shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" /> Nhập nội dung
            Transcript
          </DialogTitle>
        </DialogHeader>

        {/* Vùng chứa nội dung: 
            - flex-1: Chiếm toàn bộ không gian còn lại
            - overflow-y-auto: Cho phép cuộn dọc khi nội dung dài
            - no-scrollbar: Có thể thêm nếu muốn giao diện sạch hơn 
        */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Định dạng nguồn
            </label>
            <Select value={format} onValueChange={(v: any) => setFormat(v)}>
              <SelectTrigger className="h-11 rounded-xl shadow-sm border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="plain">
                  Văn bản thuần (Plain Text)
                </SelectItem>
                <SelectItem value="vtt">Video Text Tracks (VTT)</SelectItem>
                <SelectItem value="srt">SubRip Subtitle (SRT)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Nội dung văn bản
            </label>
            <Textarea
              placeholder="Dán nội dung transcript hoặc phụ đề vào đây..."
              className="min-h-[350px] font-mono text-xs rounded-2xl border-gray-200 focus:ring-orange-500 p-4 leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="text-[10px] text-gray-400 italic">
              * Lưu ý: Hệ thống sẽ tự động bóc tách và tạo lại các mốc thời gian
              dựa trên định dạng bạn chọn.
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-gray-100 bg-gray-50/50 shrink-0">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl font-bold"
          >
            Hủy
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl px-6 shadow-lg shadow-orange-500/20 transition-all active:scale-95"
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
