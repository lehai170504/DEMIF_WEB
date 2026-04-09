import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function getYoutubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  let videoId = "";
  if (url.includes("/embed/")) {
    videoId = url.split("/embed/")[1].split("?")[0];
  } else {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match) videoId = match[1];
  }
  if (videoId) {
    // origin parameter is optional but useful, however we omit it to avoid Next.js hydration mismatches
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
}

export function ShadowingMedia({
  lesson,
  currentSegment,
  mediaRef,
  iframeRef,
  levelLabel,
  levelColor,
}: ShadowingMediaProps) {
  const finalMediaUrl =
    getCleanMediaUrl(lesson.mediaUrl) ?? getCleanMediaUrl(lesson.audioUrl);

  return (
    <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl">
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
        <div className="p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#111113] min-h-[160px] relative mt-2 rounded-[2rem]">
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
               Không có link dữ liệu âm thanh/video cho bài này. Xin kiểm tra lại.
             </p>
          )}
        </div>
      )}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-3 bg-gray-50 dark:bg-white/[0.02]">
        <Badge className={cn("text-[10px] font-black", levelColor)}>
          {levelLabel}
        </Badge>
        <span className="text-xs text-gray-500 dark:text-zinc-500 flex-1 line-clamp-1 font-bold">
          {lesson.title}
        </span>
      </div>
    </div>
  );
}
