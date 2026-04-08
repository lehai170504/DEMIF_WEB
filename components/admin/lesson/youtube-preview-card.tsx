"use client";

import { YoutubePreviewResponse } from "@/types/lesson.type";
import { Clock, Globe, AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function YoutubePreviewCard({ data }: { data: YoutubePreviewResponse }) {
  return (
    <div className="bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 font-mono transition-colors duration-300">
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full">
        <Image
          src={data.thumbnailUrl}
          alt={data.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 dark:bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded font-black tracking-widest">
          {Math.floor(data.durationSeconds / 60)}:
          {(data.durationSeconds % 60).toString().padStart(2, "0")}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Title */}
        <h5 className="text-xs font-black text-gray-900 dark:text-slate-100 line-clamp-2 leading-tight uppercase tracking-tight">
          {data.title}
        </h5>

        <div className="flex flex-wrap gap-2">
          {/* Trạng thái Captions */}
          {data.hasCaptions ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2 py-1 rounded-lg">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[9px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-tighter">
                Có phụ đề
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-2 py-1 rounded-lg">
              <AlertCircle className="w-3 h-3 text-red-600 dark:text-red-400" />
              <span className="text-[9px] font-black text-red-700 dark:text-red-400 uppercase tracking-tighter">
                Không phụ đề
              </span>
            </div>
          )}

          {/* Hiển thị các ngôn ngữ phụ đề có sẵn */}
          {data.availableCaptionLanguages.map((lang) => (
            <div
              key={lang}
              className="flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 px-2 py-1 rounded-lg"
            >
              <Globe className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span className="text-[9px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-tighter">
                {lang}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
