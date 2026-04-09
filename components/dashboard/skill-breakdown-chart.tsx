"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSkillsAnalytics } from "@/hooks/use-stats";
import { Loader2 } from "lucide-react";

// Mapping có sẵn nếu API trả về key dạng chuỗi
const SKILL_COLOR_MAP: Record<string, string> = {
  listening: "bg-orange-500 shadow-orange-500/50",
  pronunciation: "bg-blue-500 shadow-blue-500/50",
  vocabulary: "bg-emerald-500 shadow-emerald-500/50",
  grammar: "bg-violet-500 shadow-violet-500/50",
  communication: "bg-rose-500 shadow-rose-500/50",
  ngheHieu: "bg-orange-500 shadow-orange-500/50",
  phatAm: "bg-blue-500 shadow-blue-500/50",
  tuVung: "bg-emerald-500 shadow-emerald-500/50",
  nguPhap: "bg-violet-500 shadow-violet-500/50",
  giaotiep: "bg-rose-500 shadow-rose-500/50",
};

const SKILL_LABEL_MAP: Record<string, string> = {
  listening: "Nghe hiểu",
  pronunciation: "Phát âm",
  vocabulary: "Từ vựng",
  grammar: "Ngữ pháp",
  communication: "Giao tiếp",
  ngheHieu: "Nghe hiểu",
  phatAm: "Phát âm",
  tuVung: "Từ vựng",
  nguPhap: "Ngữ pháp",
  giaotiep: "Giao tiếp",
  dictation: "Chính tả",
  shadowing: "Đọc theo (Shadowing)",
};

const COLORS = [
  "bg-orange-500 shadow-orange-500/50",
  "bg-blue-500 shadow-blue-500/50",
  "bg-emerald-500 shadow-emerald-500/50",
  "bg-violet-500 shadow-violet-500/50",
  "bg-rose-500 shadow-rose-500/50",
  "bg-amber-500 shadow-amber-500/50",
];

export function SkillBreakdownChart() {
  const { data: skillsData, isLoading } = useSkillsAnalytics();

  // Normalize skill data from API (flexible shape)
  const skills = (() => {
    if (!skillsData) return [];

    // If it's an array directly
    if (Array.isArray(skillsData)) {
      return skillsData.map((item: any, i: number) => ({
        name: SKILL_LABEL_MAP[item.skill ?? item.name ?? item.category] ?? item.skill ?? item.name ?? `Kỹ năng ${i + 1}`,
        level: Math.round(item.score ?? item.level ?? item.percentage ?? item.value ?? 0),
        color: SKILL_COLOR_MAP[item.skill ?? item.name] ?? COLORS[i % COLORS.length],
      }));
    }

    // If it's an object with named keys (e.g. { listening: 85, pronunciation: 70 })
    const entries = Object.entries(skillsData).filter(
      ([, v]) => typeof v === "number"
    );
    if (entries.length > 0) {
      return entries.map(([key, value], i) => ({
        name: SKILL_LABEL_MAP[key] ?? key,
        level: Math.round(value as number),
        color: SKILL_COLOR_MAP[key] ?? COLORS[i % COLORS.length],
      }));
    }

    // If nested in a "skills" or "categories" sub-key
    const nested = (skillsData as any).skills ?? (skillsData as any).categories ?? (skillsData as any).data;
    if (Array.isArray(nested)) {
      return nested.map((item: any, i: number) => ({
        name: SKILL_LABEL_MAP[item.skill ?? item.name ?? item.category] ?? item.skill ?? item.name ?? `Kỹ năng ${i + 1}`,
        level: Math.round(item.score ?? item.level ?? item.percentage ?? item.value ?? 0),
        color: SKILL_COLOR_MAP[item.skill ?? item.name] ?? COLORS[i % COLORS.length],
      }));
    }

    return [];
  })();

  return (
    <Card className="p-6 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] shadow-2xl rounded-3xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 dark:bg-white/5 blur-[50px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="font-black text-gray-900 dark:text-white text-lg tracking-tight mb-1">
            Phân tích kỹ năng
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500">
            Tháng này
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-center gap-2">
          <p className="text-xs text-gray-500 dark:text-zinc-500 font-mono">
            Chưa có dữ liệu kỹ năng.
          </p>
          <p className="text-[10px] text-gray-400 dark:text-zinc-600">
            Hoàn thành bài học để xem phân tích!
          </p>
        </div>
      ) : (
        <div className="space-y-6 relative z-10">
          {skills.map((skill) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between items-end mb-2.5">
                <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-wide">
                  {skill.name}
                </span>
                <span className="text-xs font-black font-mono text-gray-900 dark:text-white">
                  {skill.level}%
                </span>
              </div>

              <div className="relative h-2 w-full bg-gray-200 dark:bg-black rounded-full overflow-hidden border border-gray-300 dark:border-white/5">
                <div
                  className={cn(
                    "absolute h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px]",
                    skill.color,
                  )}
                  style={{ width: `${Math.min(skill.level, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
