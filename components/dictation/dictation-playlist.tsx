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
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Sidebar Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
             <div className="w-1 h-4 bg-orange-500 rounded-full" />
             <h3 className="font-black text-white uppercase text-[10px] tracking-widest">
               Nội dung bài học
             </h3>
          </div>
          <span className="text-[10px] font-bold text-zinc-500">
            {currentIdx + 1} / {segments.length}
          </span>
        </div>
      </div>
      
      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-6">
        <div className="space-y-1">
          {segments.map((seg, i) => {
            const isActive = i === currentIdx;
            const result = segmentResults[i];
            const isCompleted = !!result;

            // Dot representation for the playlist preview
            const textPreview = seg.words.map((w: any) => {
              if (!w.isBlank) return w.text + " ";
              return "•".repeat(w.length || 4) + " ";
            }).join("");

            return (
              <button
                key={i}
                onClick={() => onSelectSegment(i)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all border group relative overflow-hidden",
                  isActive
                    ? "bg-white/5 border-white/10 shadow-2xl"
                    : "border-transparent hover:bg-white/[0.02] text-zinc-500"
                )}
              >
                {/* Active Highlight Glow */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                )}

                {/* Circle Index */}
                <div className="relative shrink-0 mt-1">
                   <div className={cn(
                     "w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-colors",
                     isActive ? "border-orange-500 text-orange-500" : "border-zinc-800 text-zinc-700"
                   )}>
                     {i + 1}
                   </div>
                   {isCompleted && (
                     <div className="absolute -right-1 -bottom-1 bg-[#0a0a0a] rounded-full p-0.5">
                       <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500/10" />
                     </div>
                   )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4">
                  {isActive && (
                    <div className="flex items-center gap-2 mb-1.5">
                       <span className="px-2 py-0.5 rounded-md bg-white text-[8px] font-black text-black uppercase tracking-tighter">
                          Đang học
                       </span>
                       <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                          {seg.startTime.toFixed(1)}s
                       </span>
                    </div>
                  )}
                  
                  <p className={cn(
                    "text-[11px] leading-relaxed transition-colors",
                    isActive ? "text-zinc-200 font-medium" : "text-zinc-600 font-medium group-hover:text-zinc-400"
                  )}>
                    {textPreview}
                  </p>
                </div>

                {/* Actions (icons show on hover or active) */}
                <div className={cn(
                   "flex flex-col gap-2 shrink-0 self-center transition-opacity",
                   isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                )}>
                   <RotateCcw className="w-3 h-3 hover:text-white transition-colors cursor-pointer" />
                   <ChevronRight className="w-3 h-3 hover:text-white transition-colors cursor-pointer" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

