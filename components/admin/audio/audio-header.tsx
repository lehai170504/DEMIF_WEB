"use client";

import { Button } from "@/components/ui/button";
import { Music, Upload } from "lucide-react";
import AudioUploadDialog from "@/components/admin/audio/audio-upload";

export function AudioHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4 px-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-orange-500 mb-2">
          <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <Music className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Media Assets
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
          Audio <span className="text-zinc-600">Library</span>
        </h1>
        <p className="text-zinc-400 text-xs font-medium italic max-w-lg">
          Quản lý tài nguyên âm thanh cho hệ thống bài tập.
        </p>
      </div>

      <AudioUploadDialog>
        <Button className="h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 border border-orange-400/20">
          <Upload className="h-4 w-4 mr-2" /> Tải lên tài nguyên
        </Button>
      </AudioUploadDialog>
    </div>
  );
}
