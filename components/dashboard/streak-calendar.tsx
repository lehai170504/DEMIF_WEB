"use client";

import { Flame, Info, Loader2, CalendarRange } from "lucide-react";
import { useStatsHeatmap } from "@/hooks/use-stats";
import { parseISO, getDay, format } from "date-fns";
import { cn } from "@/lib/utils";

export function StreakCalendar() {
  const { data: heatmapData, isLoading } = useStatsHeatmap(6);

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
    "NOV",
    "DEC",
  ];
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const activityData: { date: string; count: number; isActive: boolean }[][] =
    [];

  if (heatmapData?.data) {
    let currentWeek: { date: string; count: number; isActive: boolean }[] = [];

    heatmapData.data.forEach((item) => {
      const date = parseISO(item.date);
      const dayOfWeek = getDay(date);

      if (currentWeek.length === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: "", count: 0, isActive: false });
        }
      }

      currentWeek.push({
        date: item.date,
        count: item.count,
        isActive: item.count > 0,
      });

      if (currentWeek.length === 7) {
        activityData.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: 0, isActive: false });
      }
      activityData.push(currentWeek);
    }
  } else {
    for (let i = 0; i < 26; i++) {
      activityData.push(Array(7).fill({ date: "", count: 0, isActive: false }));
    }
  }

  // Lấy danh sách tháng dựa trên data
  const displayMonths = activityData
    .map((week) => week.find((d) => d.date !== "")?.date)
    .filter(Boolean)
    .map((d) => months[parseISO(d!).getMonth()])
    .filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="p-6 md:p-8 font-mono relative overflow-hidden flex flex-col h-full z-10">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-500/20 border border-orange-400 dark:border-white/10">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
              Bản đồ nhiệt
              <span className="hidden sm:inline-flex items-center justify-center bg-orange-500/10 text-orange-500 text-[9px] px-2 py-0.5 rounded-full border border-orange-500/20">
                <CalendarRange className="w-3 h-3 mr-1" /> 6 Tháng
              </span>
            </h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
              Tổng cộng{" "}
              <span className="text-orange-500 font-black">
                {heatmapData?.totalActivities || 0}
              </span>{" "}
              hoạt động
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <button className="p-2 text-gray-400 dark:text-zinc-500 hover:text-orange-500 transition-colors bg-gray-50 dark:bg-white/5 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl border border-gray-100 dark:border-white/5">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-4 scrollbar-none relative z-10 flex-1">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex justify-between mb-3 ml-7 px-1">
            {displayMonths.map((month, index) => (
              <div
                key={index}
                className="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest"
              >
                {month}
              </div>
            ))}
          </div>

          <div className="flex gap-1.5 md:gap-2 items-start">
            {/* Day labels */}
            <div className="flex flex-col gap-[7px] md:gap-[9px] pt-1 mr-2">
              {days.map((day, i) => (
                <div
                  key={i}
                  className="text-[9px] font-black text-gray-400 dark:text-zinc-600 h-3 md:h-4 flex items-center"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="flex gap-1.5 md:gap-2">
              {activityData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1.5 md:gap-2">
                  {week.map((day, dayIndex) => {
                    const intensity =
                      day.count > 0
                        ? day.count >= 4
                          ? "bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.5)] border-orange-300 dark:border-orange-500/50 hover:scale-125 z-10"
                          : day.count >= 2
                            ? "bg-gradient-to-br from-orange-600 to-red-700 border-orange-500/30"
                            : "bg-orange-900/60 dark:bg-orange-950/60 border-orange-900/40"
                        : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border-gray-200 dark:border-white/5";
                    return (
                      <div
                        key={dayIndex}
                        className={cn(
                          "w-3 h-3 md:w-4 md:h-4 rounded-[4px] transition-all duration-300 cursor-pointer relative",
                          day.date === "" ? "opacity-0" : `border ${intensity}`,
                        )}
                        title={
                          day.date !== ""
                            ? `${format(parseISO(day.date), "dd/MM/yyyy")}: ${day.count} hoạt động`
                            : ""
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-white/5 relative z-10">
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500">
          * Mỗi ô đại diện cho 1 ngày
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
            Cường độ:
          </span>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-[4px] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-[4px] bg-orange-900/60 dark:bg-orange-950/60 border border-orange-900/40" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-[4px] bg-gradient-to-br from-orange-600 to-red-700 border border-orange-500/30" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-[4px] bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_8px_rgba(249,115,22,0.4)] border border-orange-300 dark:border-orange-500/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
