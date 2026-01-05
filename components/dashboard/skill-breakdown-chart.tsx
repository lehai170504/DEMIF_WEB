"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Nghe hiểu", level: 85, color: "bg-orange-500" },
  { name: "Phát âm", level: 78, color: "bg-blue-500" },
  { name: "Từ vựng", level: 92, color: "bg-emerald-500" },
  { name: "Ngữ pháp", level: 73, color: "bg-violet-500" },
  { name: "Giao tiếp", level: 81, color: "bg-rose-500" },
];

export function SkillBreakdownChart() {
  return (
    <Card className="p-6 border-none bg-gradient-to-br from-white to-slate-50/50 shadow-xl shadow-slate-200/50 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-800 text-lg tracking-tight">
            Phân tích kỹ năng
          </h3>
          <p className="text-xs text-slate-500">
            Dựa trên hiệu suất học tập tháng này
          </p>
        </div>
        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-600 text-lg">📊</span>
        </div>
      </div>

      <div className="space-y-5">
        {skills.map((skill) => (
          <div key={skill.name} className="group">
            <div className="flex justify-between items-end mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                  {skill.name}
                </span>
              </div>
              <span className="text-sm font-bold font-mono text-slate-800">
                {skill.level}%
              </span>
            </div>

            {/* Tùy biến Progress bar để nhận màu từ data */}
            <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "absolute h-full rounded-full transition-all duration-1000 ease-out",
                  skill.color
                )}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2.5 text-sm font-medium text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all border border-dashed border-slate-200 hover:border-orange-200">
        Xem chi tiết lộ trình
      </button>
    </Card>
  );
}
