import { Button } from "@/components/ui/button";
import { Volume2, Eye, EyeOff } from "lucide-react";

interface DictationMediaProps {
  lessonTitle: string;
  youtubeUrl: string | null | undefined;
  isVideoType: boolean;
  finalMediaUrl: string | null | undefined;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showHints: boolean;
  onToggleHints: () => void;
  thumbnailUrl: string | null | undefined;
}

export function DictationMedia({
  lessonTitle,
  youtubeUrl,
  isVideoType,
  finalMediaUrl,
  audioRef,
  videoRef,
  showHints,
  onToggleHints,
  thumbnailUrl,
}: DictationMediaProps) {
  return (
    <div className="rounded-[2.5rem] bg-black border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl relative">
      {youtubeUrl ? (
        <div className="w-full aspect-video">
          <iframe
            src={youtubeUrl || undefined}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={lessonTitle}
          />
        </div>
      ) : isVideoType ? (
        <video
          ref={videoRef as any}
          controls
          // ĐÃ XOÁ crossOrigin="anonymous" Ở ĐÂY
          className="w-full max-h-[360px] bg-black"
          src={finalMediaUrl || undefined}
          poster={thumbnailUrl || undefined}
        />
      ) : (
        <div className="p-12 flex flex-col items-center gap-6 bg-gradient-to-b from-zinc-900 to-black">
          <div className="inline-flex p-6 rounded-full bg-orange-500/20 text-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
            <Volume2 className="h-12 w-12" />
          </div>
          <div className="text-center text-white">
            <h2 className="text-2xl font-black mb-1">Nghe & Chép lại</h2>
            <p className="text-xs text-zinc-400">
              Lắng nghe kỹ và điền vào chỗ trống.
            </p>
          </div>
          {finalMediaUrl ? (
            <audio
              ref={audioRef as any}
              controls
              // ĐÃ XOÁ crossOrigin="anonymous" Ở ĐÂY
              className="w-full max-w-sm"
              src={finalMediaUrl || undefined}
            />
          ) : (
            <p className="text-sm text-rose-400 font-bold">
              Không tải được tệp âm thanh.
            </p>
          )}
        </div>
      )}

      <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3 bg-zinc-950">
        <Volume2 className="h-4 w-4 text-orange-500 shrink-0" />
        <span className="text-xs font-bold text-zinc-300 flex-1 line-clamp-1">
          {lessonTitle}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleHints}
          className="rounded-xl text-[10px] uppercase font-bold text-orange-500 hover:bg-orange-500/10 hover:text-orange-400 h-8"
        >
          {showHints ? (
            <EyeOff className="h-3.5 w-3.5 mr-1.5" />
          ) : (
            <Eye className="h-3.5 w-3.5 mr-1.5" />
          )}
          {showHints ? "Ẩn gợi ý" : "Hiện gợi ý"}
        </Button>
      </div>
    </div>
  );
}
