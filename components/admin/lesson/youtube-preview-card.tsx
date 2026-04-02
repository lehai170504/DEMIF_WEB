"use client";

import { YoutubePreviewResponse } from "@/types/lesson.type";
import { Clock, Globe, AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function YoutubePreviewCard({ data }: { data: YoutubePreviewResponse }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 font-mono">
      <div className="relative aspect-video w-full">
        <Image
          src={data.thumbnailUrl}
          alt={data.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-bold">
          {Math.floor(data.durationSeconds / 60)}:
          {(data.durationSeconds % 60).toString().padStart(2, "0")}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h5 className="text-xs font-black text-gray-900 line-clamp-2 leading-tight uppercase tracking-tight">
          {data.title}
        </h5>

        <div className="flex flex-wrap gap-2">
          {/* Trạng thái Captions */}
          {data.hasCaptions ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span className="text-[9px] font-bold text-emerald-700 uppercase">
                Có phụ đề
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 px-2 py-1 rounded-lg">
              <AlertCircle className="w-3 h-3 text-red-600" />
              <span className="text-[9px] font-bold text-red-700 uppercase">
                Không phụ đề
              </span>
            </div>
          )}

          {/* Hiển thị các ngôn ngữ phụ đề có sẵn */}
          {data.availableCaptionLanguages.map((lang) => (
            <div
              key={lang}
              className="flex items-center gap-1 bg-blue-50 border border-blue-100 px-2 py-1 rounded-lg"
            >
              <Globe className="w-3 h-3 text-blue-600" />
              <span className="text-[9px] font-bold text-blue-700 uppercase">
                {lang}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
