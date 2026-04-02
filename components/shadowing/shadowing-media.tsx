import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function getYoutubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  if (match)
    return `https://www.youtube.com/embed/${match[1]}?rel=0&enablejsapi=1`;
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
  levelLabel: string;
  levelColor: string;
}

export function ShadowingMedia({
  lesson,
  currentSegment,
  mediaRef,
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
            src={`${getYoutubeEmbedUrl(lesson.mediaUrl) ?? ""}${currentSegment ? `&start=${Math.floor(currentSegment.startTime)}` : ""}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : lesson.mediaType === "video" ? (
        <video
          ref={mediaRef}
          className="w-full max-h-64 bg-black"
          src={finalMediaUrl}
          poster={lesson.thumbnailUrl ?? undefined}
        />
      ) : (
        <div className="p-6 flex justify-center bg-gray-50 dark:bg-[#111113]">
          <audio
            ref={mediaRef}
            className="w-full max-w-sm"
            src={finalMediaUrl}
          />
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
