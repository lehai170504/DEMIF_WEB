"use client";

import { Card } from "@/components/ui/card";
import { Flame, Info } from "lucide-react";

export function StreakCalendar() {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
  ];
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const activityData = Array(35)
    .fill(0)
    .map(() =>
      Array(7)
        .fill(0)
        .map(() => Math.random() > 0.8),
    );

  return (
    <Card className="p-8 border border-white/10 bg-[#18181b] rounded-[2.5rem] shadow-2xl font-mono relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-500/20 border border-orange-400/20">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tighter italic text-white">
              HOẠT ĐỘNG STREAK
            </h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
              2 ngày học tập trong 9 tháng qua
            </p>
          </div>
        </div>
        <button className="p-2 text-zinc-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-xl">
          <Info className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-none relative z-10">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex justify-between mb-4 ml-8 px-1">
            {months.map((month) => (
              <div key={month} className="text-[9px] font-black text-zinc-500">
                {month}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {/* Day labels */}
            <div className="flex flex-col gap-[5px] pt-1">
              {days.map((day, i) => (
                <div
                  key={i}
                  className="text-[9px] font-black text-zinc-600 h-3 flex items-center"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="flex gap-[5px]">
              {activityData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[5px]">
                  {week.map((isActive, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-[13px] h-[13px] rounded-[4px] transition-all duration-300 border border-transparent ${
                        isActive
                          ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] hover:scale-125 border-orange-400/50"
                          : "bg-white/5 hover:bg-white/10 hover:border-white/10"
                      } cursor-pointer`}
                      title={
                        isActive ? "Ngày học tập tích cực" : "Không có dữ liệu"
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend Section */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/5">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
              Cường độ:
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-[3px] bg-white/5" />
              <div className="w-3 h-3 rounded-[3px] bg-orange-900/40" />
              <div className="w-3 h-3 rounded-[3px] bg-orange-700/60" />
              <div className="w-3 h-3 rounded-[3px] bg-orange-500/80" />
              <div className="w-3 h-3 rounded-[3px] bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.6)]" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
