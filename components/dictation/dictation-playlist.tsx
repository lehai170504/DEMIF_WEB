import { cn } from "@/lib/utils";
import { CheckCircle2, RotateCcw, ChevronRight } from "lucide-react";

interface DictationPlaylistProps {
  segments: any[];
  currentIdx: number;
  segmentResults: Record<number, any>;
  onSelectSegment: (idx: number) => void;
}

export function DictationPlaylist({
  segments,
  currentIdx,
  segmentResults,
  onSelectSegment,
}: DictationPlaylistProps) {
  if (segments.length === 0) return null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#111113]">
      {/* Sidebar Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-orange-500 rounded-full" />
            <h3 className="font-bold font-mono text-foreground uppercase text-[12px] tracking-wide">
              Nội dung bài học
            </h3>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground">
            {currentIdx + 1} / {segments.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-6">
        <div className="space-y-1">
          {segments.map((seg, i) => {
            const isActive = i === currentIdx;
            const result = segmentResults[i];
            const isCompleted = !!result;

            const textPreview = seg.words.map((w: any, index: number) => {
              if (!w.isBlank) {
                return (
                  <span key={index} className="transition-opacity">
                    {w.text}
                  </span>
                );
              }
              
              const isFilled = result && result.accuracy >= 80;
              const displayWord = isFilled ? w.text : "•".repeat(w.length || 4);

              return (
                <span
                  key={index}
                  className={cn(
                    "font-bold tracking-normal transition-colors",
                    isFilled ? "text-emerald-500" : "text-orange-500/60"
                  )}
                >
                  {displayWord}
                </span>
              );
            });

            return (
              <button
                key={i}
                onClick={() => onSelectSegment(i)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all border group relative overflow-hidden",
                  isActive
                    ? "bg-orange-500/[0.03] dark:bg-orange-500/[0.05] border-orange-500/20 shadow-sm"
                    : "border-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-muted-foreground",
                )}
              >
                {/* Active Highlight Glow */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 shadow-[2px_0_8px_rgba(249,115,22,0.4)]" />
                )}

                {/* Circle Index */}
                <div className="relative shrink-0 mt-0.5">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-black transition-colors",
                      isActive
                        ? "border-orange-500 text-orange-500 bg-orange-500/10"
                        : "border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-600",
                    )}
                  >
                    {i + 1}
                  </div>
                  {isCompleted && (
                    <div className="absolute -right-1 -bottom-1 bg-white dark:bg-card border border-gray-100 dark:border-white/5 rounded-full p-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500/10" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4">
                  {isActive && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono px-2 py-0.5 rounded-md bg-gray-900 dark:bg-white text-[9px] font-bold text-white dark:text-black uppercase tracking-tight">
                        Đang học
                      </span>
                      <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {seg.startTime.toFixed(1)}s
                      </span>
                    </div>
                  )}

                  <div
                    className={cn(
                      "text-[13px] leading-relaxed transition-colors flex flex-wrap gap-x-1.5 gap-y-1",
                      isActive
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-gray-500 dark:text-zinc-500 font-medium group-hover:text-gray-700 dark:group-hover:text-zinc-300",
                    )}
                  >
                    {textPreview}
                  </div>
                </div>

                {/* Actions */}
                <div
                  className={cn(
                    "flex flex-col gap-2 shrink-0 self-center transition-opacity",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-50",
                  )}
                >
                  <RotateCcw className="w-3 h-3 hover:text-orange-500 transition-colors cursor-pointer" />
                  <ChevronRight className="w-3 h-3 hover:text-orange-500 transition-colors cursor-pointer" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
