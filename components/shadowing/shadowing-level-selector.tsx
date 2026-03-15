import { cn } from "@/lib/utils";

export const LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;
export type Level = (typeof LEVELS)[number];

export const LEVEL_LABELS: Record<Level, string> = {
  Beginner: "Sơ cấp",
  Intermediate: "Trung cấp",
  Advanced: "Nâng cao",
  Expert: "Chuyên gia",
};

export const LEVEL_COLORS: Record<Level, string> = {
  Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Advanced: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Expert: "text-purple-400 bg-purple-500/10 border-purple-500/20",
};

interface LevelSelectorProps {
  level: Level;
  onSelectLevel: (l: Level) => void;
}

export function ShadowingLevelSelector({
  level,
  onSelectLevel,
}: LevelSelectorProps) {
  return (
    <div className="rounded-[2rem] bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 p-5 shadow-xl">
      <h3 className="font-black text-gray-500 dark:text-zinc-500 uppercase text-[10px] tracking-[0.2em] mb-3">
        Cấp độ thử thách
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => onSelectLevel(l)}
            className={cn(
              "px-3 py-2.5 rounded-xl text-xs font-bold transition-all border",
              level === l
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                : "bg-transparent text-gray-600 dark:text-zinc-400 border-transparent hover:bg-gray-100 dark:hover:bg-white/5",
            )}
          >
            {LEVEL_LABELS[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
