// components/admin/AudioUploadDialog.tsx

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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, FileAudio } from "lucide-react";
import { toast } from "sonner";

export default function AudioUploadDialog({ children }: { children: React.ReactNode }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Vui lòng chọn file Audio để tải lên.");
      return;
    }

    setLoading(true);
    
    // --- GIẢ LẬP LOGIC UPLOAD (Dùng API) ---
    new Promise((resolve) => setTimeout(resolve, 2500))
      .then(() => {
        toast.success(`Đã tải lên thành công file: ${file.name}`);
        setFile(null);
        // Đóng modal sau khi upload thành công
      })
      .catch((err) => {
        toast.error("Lỗi khi tải lên file.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] rounded-lg font-mono">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-primary" /> Tải Lên Audio Mới
          </DialogTitle>
          <DialogDescription>
            Chỉ hỗ trợ định dạng MP3, WAV hoặc M4A.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpload} className="grid gap-4 py-4">
          
          <div
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:border-primary/50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('audio-file-input')?.click()}
          >
            {file ? (
                <div className="text-center">
                    <FileAudio className="h-8 w-8 text-green-500 mx-auto" />
                    <p className="mt-2 font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
                </div>
            ) : (
                <div className="text-center">
                    <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto" />
                    <p className="mt-2 font-semibold">Kéo & Thả file vào đây</p>
                    <p className="text-sm text-muted-foreground">hoặc nhấn để chọn file</p>
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

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading || !file}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Xác nhận Tải Lên
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}