import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookmarkPlus } from "lucide-react";
import React from "react";

function getYoutubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  let videoId = "";
  if (url.includes("/embed/")) {
    videoId = url.split("/embed/")[1].split("?")[0];
  } else {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    );
    if (match) videoId = match[1];
  }
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;
  }
  return url;
}

const getCleanMediaUrl = (url: string | null | undefined) => {
  if (!url || url === "string" || url.trim() === "") return undefined;
  if (url.startsWith("storage.")) return `https://${url}`;
  return url;
};

interface ShadowingMediaProps {
  lesson: any;
  currentSegment: any;
  mediaRef: React.Ref<any>;
  iframeRef?: (el: HTMLIFrameElement | null) => void;
  levelLabel: string;
  levelColor: string;
  onAddVocab?: (word: string) => void;
}

export function ShadowingMedia({
  lesson,
  currentSegment,
  mediaRef,
  iframeRef,
  levelLabel,
  levelColor,
  onAddVocab,
}: ShadowingMediaProps) {
  const finalMediaUrl =
    getCleanMediaUrl(lesson.mediaUrl) ?? getCleanMediaUrl(lesson.audioUrl);

  return (
    <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl">
      {/* 1. KHU VỰC TRÌNH PHÁT MEDIA */}
      {lesson.mediaType === "youtube" ? (
        <div className="w-full aspect-video">
          <iframe
            ref={iframeRef ?? (mediaRef as any)}
            src={getYoutubeEmbedUrl(lesson.mediaUrl) ?? ""}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : lesson.mediaType === "video" ? (
        <video
          ref={mediaRef}
          controls
          className="w-full max-h-64 bg-black"
          src={finalMediaUrl || undefined}
          poster={lesson.thumbnailUrl ?? undefined}
          onError={(e) => console.error("Media Load Error", e)}
        />
      ) : (
        <div className="p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#111113] min-h-[120px] relative">
          {finalMediaUrl ? (
            <audio
              ref={mediaRef}
              controls
              className="w-full max-w-sm z-10 relative"
              src={finalMediaUrl}
              onError={(e) => console.error("Audio Load Error", e)}
            />
          ) : (
            <p className="text-sm text-rose-400 font-bold">
              Không có dữ liệu âm thanh cho bài học này.
            </p>
          )}
        </div>
      )}

      {/* 2. KHU VỰC HIỂN THỊ CÂU MẪU (TRANSCRIPT) - ĐÃ FIX LỖI SPLIT NULL */}
      {currentSegment && currentSegment.text && (
        <div className="p-6 pt-2 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-900/50">
          <div className="flex flex-wrap gap-x-2 gap-y-3 items-center justify-center text-lg font-black font-mono leading-relaxed text-center text-gray-900 dark:text-white">
            {/* Sử dụng ?. để cực kỳ an toàn */}
            {currentSegment?.text?.split(" ").map((word: string, i: number) => (
              <span
                key={i}
                className="group relative inline-block cursor-help hover:text-orange-500 transition-colors"
              >
                {word}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const cleanWord = word.replace(
                      /[.,/#!$%^&*;:{}=\-_`~()]/g,
                      "",
                    );
                    onAddVocab?.(cleanWord);
                  }}
                  className="absolute -top-5 -right-1 opacity-0 group-hover:opacity-100 text-[#FF7A00] hover:scale-125 transition-all bg-white dark:bg-zinc-800 rounded-full shadow-md p-[2px] z-20 border border-orange-500/20"
                  title="Lưu vào từ vựng"
                >
                  <BookmarkPlus size={12} />
                </button>
              </span>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Badge
              className={cn(
                "uppercase text-[9px] font-black tracking-widest px-3 py-0.5",
                levelColor,
              )}
            >
              {levelLabel}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}
