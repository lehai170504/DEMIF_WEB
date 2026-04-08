import { cn } from "@/lib/utils";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface DictationPlaylistProps {
  segments: any[];
  currentIdx: number;
  segmentResults: Record<number, any>; // for showing % or correct marks
  onSelectSegment: (idx: number) => void;
}

export function DictationPlaylist({
  segments,
  currentIdx,
  segmentResults,
  onSelectSegment,
}: DictationPlaylistProps) {
  const [showAll, setShowAll] = useState(false);

  if (segments.length === 0) return null;

  return (
    <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 shadow-xl max-h-[400px] flex flex-col custom-scrollbar">
      <div className="flex items-center justify-between mb-3 sticky top-0 bg-white dark:bg-[#18181b] py-1 z-10">
        <h3 className="font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em]">
          Danh sách câu
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400">
            {currentIdx + 1}/{segments.length}
          </span>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase hover:text-orange-600 transition-colors"
          >
            {showAll ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showAll ? "Ẩn" : "Hiện"}
          </button>
        </div>
      </div>
      
      <ol className="space-y-2 overflow-y-auto pr-2 pb-2">
        {segments.map((seg, i) => {
          const result = segmentResults[i];
          const hasResult = !!result;

          // Tạo text hiển thị (ẩn đi từ trống nếu không showAll)
          const displayNodes = seg.words.map((w: any, wIndex: number) => {
            if (!w.isBlank) return <span key={wIndex}>{w.text} </span>;
            if (showAll) return <span key={wIndex} className="text-orange-500 font-bold">{w.text || "___"} </span>;
            // Nếu bị đục lỗ và không show, render các dấu chấm
            const dots = "•".repeat(w.length || 4);
            return <span key={wIndex} className="opacity-50 tracking-[0.2em]">{dots} </span>;
          });

          return (
            <li
              key={i}
              onClick={() => onSelectSegment(i)}
              className={cn(
                "flex gap-3 p-3 rounded-xl cursor-pointer text-sm transition-all border",
                i === currentIdx
                  ? "bg-orange-500/10 border-orange-500/30 text-gray-900 dark:text-white"
                  : "border-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-zinc-400"
              )}
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] flex items-center justify-center font-black relative">
                {i + 1}
                {hasResult && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 absolute -right-1 -bottom-1 bg-white dark:bg-[#18181b] rounded-full" />
                )}
              </span>
              <div className="leading-relaxed line-clamp-3 text-xs">
                 {displayNodes}
              </div>
              {hasResult && result.accuracy !== undefined && (
                <span
                  className={cn(
                    "ml-auto shrink-0 text-[10px] font-black px-2 py-1 rounded-md max-h-6 flex items-center",
                    result.accuracy >= 80
                      ? "bg-emerald-500/10 text-emerald-500"
                      : result.accuracy >= 50
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-rose-500/10 text-rose-500",
                  )}
                >
                  {result.accuracy.toFixed(0)}%
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
