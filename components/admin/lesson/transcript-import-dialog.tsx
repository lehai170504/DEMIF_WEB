// src/components/admin/lesson/transcript-import-dialog.tsx
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
      <DialogContent className="sm:max-w-[600px] font-mono">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" /> Nhập nội dung
            Transcript
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase">
              Định dạng nguồn
            </label>
            <Select value={format} onValueChange={(v: any) => setFormat(v)}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plain">
                  Văn bản thuần (Plain Text)
                </SelectItem>
                <SelectItem value="vtt">Video Text Tracks (VTT)</SelectItem>
                <SelectItem value="srt">SubRip Subtitle (SRT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase">
              Nội dung
            </label>
            <Textarea
              placeholder="Dán nội dung transcript hoặc phụ đề vào đây..."
              className="min-h-[250px] font-mono text-xs"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
            disabled={isPending || !content}
            onClick={handleImport}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Xử lý & Tạo lại Templates
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
