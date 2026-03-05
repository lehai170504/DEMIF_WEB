"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Nghe hiểu", level: 85, color: "bg-orange-500 shadow-orange-500/50" },
  { name: "Phát âm", level: 78, color: "bg-blue-500 shadow-blue-500/50" },
  { name: "Từ vựng", level: 92, color: "bg-emerald-500 shadow-emerald-500/50" },
  { name: "Ngữ pháp", level: 73, color: "bg-violet-500 shadow-violet-500/50" },
  { name: "Giao tiếp", level: 81, color: "bg-rose-500 shadow-rose-500/50" },
];

export function SkillBreakdownChart() {
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
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-8 py-3 text-xs font-black uppercase tracking-widest text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 relative z-10">
        Xem chi tiết lộ trình
      </button>
    </Card>
  );
}
