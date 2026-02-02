// components/admin/audio/AudioUploadDialog.tsx

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
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, FileAudio, X, Music } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AudioUploadDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("audio/")) {
        setFile(droppedFile);
      } else {
        toast.error("Vui lòng chỉ tải lên file âm thanh.");
      }
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Vui lòng chọn file Audio để tải lên.");
      return;
    }

    setLoading(true);

    // --- GIẢ LẬP LOGIC UPLOAD ---
    new Promise((resolve) => setTimeout(resolve, 2500))
      .then(() => {
        toast.success(`Đã tải lên thành công file: ${file.name}`);
        setFile(null);
        setOpen(false);
      })
      .catch((err) => {
        toast.error("Lỗi khi tải lên file.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* FIX: Thêm các class định vị 'fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' 
          để đảm bảo Dialog luôn nằm chính giữa màn hình.
      */}
      <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-[480px] translate-x-[-50%] translate-y-[-50%] gap-0 border border-white/10 bg-[#18181b] p-0 shadow-2xl duration-200 sm:rounded-[2rem] text-zinc-100 overflow-hidden font-mono">
        {/* Header Section */}
        <div className="relative p-8 border-b border-white/5 bg-gradient-to-br from-blue-500/10 to-transparent overflow-hidden">
          {/* Decorative Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />

          <DialogHeader className="relative z-10 space-y-4 text-left">
            <DialogTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tight text-white">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500 shadow-lg shadow-blue-500/10">
                <Music className="h-5 w-5" />
              </div>
              Tải Lên Audio
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs font-medium leading-relaxed pl-1">
              Kéo thả hoặc chọn file để thêm vào thư viện.
              <br />
              Hỗ trợ:{" "}
              <span className="text-white font-bold">MP3, WAV, M4A</span> (Max
              50MB)
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body Section */}
        <form onSubmit={handleUpload} className="p-8 pt-6 space-y-6">
          <div
            className={cn(
              "relative flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-[1.5rem] cursor-pointer transition-all duration-300 group overflow-hidden",
              isDragging
                ? "border-blue-500 bg-blue-500/5 scale-[1.02] shadow-xl shadow-blue-500/10"
                : file
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() =>
              !file && document.getElementById("audio-file-input")?.click()
            }
          >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            {file ? (
              <div className="text-center relative z-10 w-full animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <FileAudio className="h-10 w-10 text-emerald-500" />
                </div>
                <p className="font-bold text-white text-sm truncate max-w-[250px] mx-auto px-2">
                  {file.name}
                </p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-6 -right-6 h-8 w-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center relative z-10 space-y-4">
                <div
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-110 shadow-lg",
                    isDragging
                      ? "bg-blue-500/20 text-blue-500 shadow-blue-500/20"
                      : "bg-white/5 text-zinc-500 border border-white/5",
                  )}
                >
                  <UploadCloud className="h-10 w-10" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                    Kéo & Thả file vào đây
                  </p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1 group-hover:text-zinc-400">
                    hoặc nhấn để chọn file
                  </p>
                </div>
              </div>
            )}

            <Input
              id="audio-file-input"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={loading || !file}
              className={cn(
                "w-full h-12 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95",
                file
                  ? "bg-white text-black hover:bg-zinc-200 shadow-white/10"
                  : "bg-white/5 text-zinc-500 hover:bg-white/10",
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận Tải Lên"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
