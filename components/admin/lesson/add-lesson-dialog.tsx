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
  X,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Background decoration phụ
function SparklesBg() {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 h-40 w-40 bg-orange-500 blur-[80px]" />
      <div className="absolute bottom-0 left-0 h-32 w-32 bg-blue-500 blur-[60px]" />
    </div>
  );
}

export default function AddLessonDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = React.useState(false);
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setAudioFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && setAudioFile(null)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none rounded-[2rem] font-mono shadow-2xl bg-[#18181b] text-zinc-100">
        {/* Header với Background Accent */}
        <div className="relative px-8 py-10 border-b border-white/5 bg-gradient-to-br from-[#18181b] to-black overflow-hidden">
          <SparklesBg />
          <DialogHeader className="relative z-10 text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20 shadow-lg shadow-orange-500/10">
                <FileText className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                Content Creator
              </span>
            </div>
            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-white">
              Tạo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Bài Học
              </span>{" "}
              Mới
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs font-medium italic mt-1">
              Thiết lập học liệu nghe chép và shadowing cho học viên.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Cột trái: Thông tin cơ bản */}
            <div className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-500"
                >
                  <Type className="h-3 w-3 text-orange-500" /> Tiêu đề bài tập
                </Label>
                <Input
                  id="title"
                  required
                  className="h-11 rounded-xl bg-black/20 border-white/10 text-white focus-visible:ring-orange-500/50 focus-visible:border-orange-500 font-bold placeholder:text-zinc-600 transition-all"
                  placeholder="E.g. Daily English #01..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Phân loại
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-11 rounded-xl bg-black/20 border-white/10 text-white font-medium focus:ring-orange-500/50">
                      <SelectValue placeholder="Loại bài" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#18181b] border-white/10 text-white">
                      <SelectItem value="Dictation">Dictation</SelectItem>
                      <SelectItem value="Shadowing">Shadowing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Cấp độ
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-11 rounded-xl bg-black/20 border-white/10 text-white font-medium focus:ring-orange-500/50">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#18181b] border-white/10 text-white">
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
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-500">
                <Music className="h-3 w-3 text-blue-500" /> File âm thanh
              </Label>
              <div
                className={cn(
                  "relative group h-[135px] rounded-[1.5rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden",
                  audioFile
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : isDragging
                      ? "border-orange-500 bg-orange-500/5 scale-[1.02]"
                      : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {/* Background Noise */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

                {audioFile ? (
                  <div className="flex flex-col items-center animate-in zoom-in-95 relative z-10 w-full px-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 truncate max-w-full text-center px-2">
                      {audioFile.name}
                    </span>
                    <p className="text-[9px] text-emerald-500/60 font-bold uppercase tracking-wider mt-0.5">
                      {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // Prevent opening file dialog
                        setAudioFile(null);
                      }}
                      className="absolute -top-8 -right-2 p-1.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-110"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className={cn(
                        "p-3 rounded-full bg-white/5 transition-transform duration-300 group-hover:scale-110",
                        isDragging && "bg-orange-500/20 text-orange-500",
                      )}
                    >
                      <CloudUpload
                        className={cn(
                          "h-6 w-6 text-zinc-500 transition-colors",
                          isDragging && "text-orange-500",
                        )}
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors block">
                        Kéo thả hoặc click chọn
                      </span>
                      <span className="text-[9px] font-medium text-zinc-600 uppercase tracking-wider group-hover:text-zinc-500">
                        MP3, WAV, M4A
                      </span>
                    </div>
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
              className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-500"
            >
              <Plus className="h-3 w-3 text-orange-500" /> Nội dung bản thảo
              (Transcript)
            </Label>
            <Textarea
              id="content"
              required
              className="rounded-2xl bg-black/20 border-white/10 min-h-[120px] p-4 text-white focus-visible:ring-orange-500/50 focus-visible:border-orange-500 font-medium placeholder:text-zinc-600 resize-none transition-all scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
              placeholder="Nhập nội dung văn bản học viên sẽ nghe chép hoặc shadowing..."
            />
          </div>

          <DialogFooter className="pt-2 border-t border-white/5">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-white/5 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Xác nhận tạo bài học
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
