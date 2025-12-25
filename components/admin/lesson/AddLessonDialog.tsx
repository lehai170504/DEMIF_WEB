"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Plus,
  FileText,
  Music,
  CloudUpload,
  Type,
  BarChart,
  X,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AddLessonDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = React.useState(false);
  const [audioFile, setAudioFile] = React.useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập API call
    setTimeout(() => {
      toast.success("Bài học mới đã được đưa lên hệ thống!");
      setLoading(false);
      setAudioFile(null);
    }, 2000);
  };

  return (
    <Dialog onOpenChange={(open) => !open && setAudioFile(null)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none rounded-[2rem] font-mono shadow-2xl">
        {/* Header với Background Accent */}
        <div className="bg-slate-900 px-8 py-10 text-white relative">
          <SparklesBg />
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500 rounded-xl">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                Content Creator
              </span>
            </div>
            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">
              Tạo <span className="text-orange-500">Bài Học</span> Mới
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs font-medium italic">
              Thiết lập học liệu nghe chép và shadowing cho học viên.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white dark:bg-slate-950 space-y-6"
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Cột trái: Thông tin cơ bản */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                  <Type className="h-3 w-3 text-orange-500" /> Tiêu đề bài tập
                </Label>
                <Input
                  id="title"
                  required
                  className="h-11 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 font-bold"
                  placeholder="E.g. Daily English #01..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest">
                    Phân loại
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-none">
                      <SelectValue placeholder="Loại bài" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dictation">Dictation</SelectItem>
                      <SelectItem value="Shadowing">Shadowing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest">
                    Cấp độ
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-none">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B1">Cơ bản (B1)</SelectItem>
                      <SelectItem value="B2">Trung cấp (B2)</SelectItem>
                      <SelectItem value="C1">Nâng cao (C1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Cột phải: Upload Audio */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Music className="h-3 w-3 text-orange-500" /> File âm thanh
              </Label>
              <div
                className={cn(
                  "relative group h-[115px] rounded-[1.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden",
                  audioFile
                    ? "border-emerald-500 bg-emerald-50/50"
                    : "border-slate-200 hover:border-orange-500 hover:bg-orange-50/30"
                )}
              >
                {audioFile ? (
                  <div className="flex flex-col items-center animate-in zoom-in-95">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-1" />
                    <span className="text-[10px] font-bold text-emerald-700 truncate max-w-[150px]">
                      {audioFile.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setAudioFile(null);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm text-red-500 hover:scale-110 transition-transform"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <CloudUpload className="h-8 w-8 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-orange-600">
                      Click hoặc kéo thả MP3
                    </span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) =>
                        setAudioFile(e.target.files?.[0] || null)
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
            >
              <Plus className="h-3 w-3 text-orange-500" /> Nội dung bản thảo
              (Transcript)
            </Label>
            <Textarea
              id="content"
              required
              className="rounded-2xl bg-slate-50 border-none min-h-[150px] p-4 focus-visible:ring-2 focus-visible:ring-orange-500/20 font-medium"
              placeholder="Nhập nội dung văn bản học viên sẽ nghe chép hoặc shadowing..."
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-500/10 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Plus className="h-5 w-5 mr-2" />
              )}
              Xác nhận tạo bài học
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Background decoration phụ
function SparklesBg() {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 h-40 w-40 bg-orange-500 blur-[80px]" />
      <div className="absolute bottom-0 left-0 h-32 w-32 bg-blue-500 blur-[60px]" />
    </div>
  );
}
