import { cn } from "@/lib/utils";

interface ShadowingPlaylistProps {
  segments: any[];
  currentIdx: number;
  checkResults: Record<number, any>;
  onSelectSegment: (idx: number) => void;
}

export function ShadowingPlaylist({
  segments,
  currentIdx,
  checkResults,
  onSelectSegment,
}: ShadowingPlaylistProps) {
  if (segments.length === 0) return null;

  return (
    <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 shadow-xl max-h-72 overflow-y-auto custom-scrollbar">
      <h3 className="font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-3 sticky top-0 bg-white dark:bg-[#18181b] py-1 z-10">
        Bản chép câu nói
      </h3>
      <ol className="space-y-2">
        {segments.map((seg, i) => {
          const acc =
            checkResults[i]?.accuracyScore ?? checkResults[i]?.accuracy;
          return (
            <li
              key={i}
              onClick={() => onSelectSegment(i)}
              className={cn(
                "flex gap-3 p-3 rounded-xl cursor-pointer text-sm transition-all border",
                i === currentIdx
                  ? "bg-blue-500/10 border-blue-500/30 text-gray-900 dark:text-white"
                  : "border-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-zinc-400",
              )}
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] flex items-center justify-center font-black">
                {i + 1}
              </span>
              <span className="leading-relaxed line-clamp-2">{seg.text}</span>
              {acc !== undefined && (
                <span
                  className={cn(
                    "ml-auto shrink-0 text-[10px] font-black px-2 py-1 rounded-md",
                    acc >= 80
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-rose-500/10 text-rose-500",
                  )}
                >
                  {acc.toFixed(0)}%
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
