"use client";

import { cn } from "@/lib/utils";
import { useSkillsAnalytics } from "@/hooks/use-stats";
import { Loader2, BrainCircuit } from "lucide-react";

// Đổi từ màu bệt sang Gradient rực rỡ
const SKILL_COLOR_MAP: Record<string, string> = {
  listening:
    "bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.5)]",
  pronunciation:
    "bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  vocabulary:
    "bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  grammar:
    "bg-gradient-to-r from-violet-400 to-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.5)]",
  communication:
    "bg-gradient-to-r from-rose-400 to-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]",
  ngheHieu:
    "bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.5)]",
  phatAm:
    "bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  tuVung:
    "bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  nguPhap:
    "bg-gradient-to-r from-violet-400 to-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.5)]",
  giaotiep:
    "bg-gradient-to-r from-rose-400 to-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]",
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
  "bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.5)]",
  "bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  "bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  "bg-gradient-to-r from-violet-400 to-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.5)]",
  "bg-gradient-to-r from-rose-400 to-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]",
];

export function SkillBreakdownChart() {
  const { data: skillsData, isLoading } = useSkillsAnalytics();

  // Normalize skill data from API (flexible shape)
  const skills = (() => {
    if (!skillsData) return [];

    // If it's an array directly
    if (Array.isArray(skillsData)) {
      return skillsData.map((item: any, i: number) => ({
        name:
          SKILL_LABEL_MAP[item.skill ?? item.name ?? item.category] ??
          item.skill ??
          item.name ??
          `Kỹ năng ${i + 1}`,
        level: Math.round(
          item.score ?? item.level ?? item.percentage ?? item.value ?? 0,
        ),
        color:
          SKILL_COLOR_MAP[item.skill ?? item.name] ?? COLORS[i % COLORS.length],
      }));
    }

    // If it's an object with named keys (e.g. { listening: 85, pronunciation: 70 })
    const entries = Object.entries(skillsData).filter(
      ([, v]) => typeof v === "number",
    );
    if (entries.length > 0) {
      return entries.map(([key, value], i) => ({
        name: SKILL_LABEL_MAP[key] ?? key,
        level: Math.round(value as number),
        color: SKILL_COLOR_MAP[key] ?? COLORS[i % COLORS.length],
      }));
    }

    // If nested in a "skills" or "categories" sub-key
    const nested =
      (skillsData as any).skills ??
      (skillsData as any).categories ??
      (skillsData as any).data;
    if (Array.isArray(nested)) {
      return nested.map((item: any, i: number) => ({
        name:
          SKILL_LABEL_MAP[item.skill ?? item.name ?? item.category] ??
          item.skill ??
          item.name ??
          `Kỹ năng ${i + 1}`,
        level: Math.round(
          item.score ?? item.level ?? item.percentage ?? item.value ?? 0,
        ),
        color:
          SKILL_COLOR_MAP[item.skill ?? item.name] ?? COLORS[i % COLORS.length],
      }));
    }

    return [];
  })();

  return (
    <div className="p-6 md:p-8 relative overflow-hidden flex flex-col h-full font-mono z-10">
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-500 shadow-inner">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">
            Phân tích kỹ năng
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-zinc-500 mt-0.5">
            Thống kê tháng này
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-10 flex-1">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : skills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-3 flex-1 opacity-60">
          <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-full">
            <BrainCircuit className="w-8 h-8 text-gray-400 dark:text-zinc-600" />
          </div>
          <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
            Chưa có dữ liệu phân tích
          </p>
        </div>
      ) : (
        <div className="space-y-5 relative z-10 flex-1 flex flex-col justify-center">
          {skills.map((skill) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[11px] font-bold text-gray-600 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-widest">
                  {skill.name}
                </span>
                <span className="text-sm font-black text-gray-900 dark:text-white transition-transform group-hover:scale-110">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-2.5 w-full bg-gray-100 dark:bg-[#111113] rounded-full overflow-hidden border border-gray-200 dark:border-white/5 shadow-inner">
                {/* Active Progress Bar */}
                <div
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out relative",
                    skill.color,
                  )}
                  style={{ width: `${Math.min(skill.level, 100)}%` }}
                >
                  {/* Shimmer overlay cho thanh progress */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
