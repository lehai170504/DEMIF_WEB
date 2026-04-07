"use client";

import { Card } from "@/components/ui/card";
import { Flame, Info, Loader2 } from "lucide-react";
import { useStatsHeatmap } from "@/hooks/use-stats";
import { parseISO, getDay, format } from "date-fns";

export function StreakCalendar() {
  const { data: heatmapData, isLoading } = useStatsHeatmap(6);
  
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  // Chuyển mảng phẳng thành grid 2D [week][day]
  const activityData: { date: string; count: number; isActive: boolean }[][] = [];
  
  if (heatmapData?.data) {
    let currentWeek: { date: string; count: number; isActive: boolean }[] = [];
    
    heatmapData.data.forEach((item) => {
      const date = parseISO(item.date);
      const dayOfWeek = getDay(date); // 0 (Sunday) to 6 (Saturday)
      
      // Nếu là ngày đầu mảng nhưng không phải Sunday, thì đệm các ngày rỗng vào đầu tuần
      if (currentWeek.length === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: "", count: 0, isActive: false });
        }
      }
      
      currentWeek.push({
        date: item.date,
        count: item.count,
        isActive: item.count > 0
      });
      
      // Sang tuần mới nếu đã đủ 7 ngày
      if (currentWeek.length === 7) {
        activityData.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Nếu tuần cuối bị thiếu ngày, đệm cho đủ 7 ngày
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: 0, isActive: false });
      }
      activityData.push(currentWeek);
    }
  } else {
    // Empty state khi loading hoặc chưa có data
    for (let i = 0; i < 26; i++) {
        activityData.push(Array(7).fill({ date: "", count: 0, isActive: false }));
    }
  }

  // Lấy danh sách tháng dựa trên data
  const displayMonths = activityData
    .map(week => week.find(d => d.date !== "")?.date)
    .filter(Boolean)
    .map(d => months[parseISO(d!).getMonth()])
    .filter((v, i, a) => a.indexOf(v) === i); // Distinct

  return (
    <Card className="p-8 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] rounded-[2.5rem] shadow-2xl font-mono relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-[2.5rem]">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
      )}
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-500/20 border border-orange-400/20">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tighter italic text-gray-900 dark:text-white">
              HOẠT ĐỘNG STREAK
            </h3>
            <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
               {heatmapData?.totalActivities || 0} bài tập trong 6 tháng qua
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl">
          <Info className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-none relative z-10">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex justify-between mb-4 ml-8 px-1">
            {displayMonths.map((month, index) => (
              <div key={index} className="text-[9px] font-black text-gray-500 dark:text-zinc-500">
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
                  className="text-[9px] font-black text-gray-500 dark:text-zinc-600 h-3 flex items-center"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="flex gap-[5px]">
              {activityData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[5px]">
                  {week.map((day, dayIndex) => {
                    const intensity = day.count > 0 
                       ? day.count > 4 
                         ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] hover:scale-125 border-orange-400/50"
                         : day.count > 2
                            ? "bg-orange-700/60 border-orange-700/60"
                            : "bg-orange-900/40 border-orange-900/40"
                       : "bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/10";
                    return (
                      <div
                        key={dayIndex}
                        className={`w-[13px] h-[13px] rounded-[4px] transition-all duration-300 border border-transparent ${
                          day.date === "" ? "opacity-0" : intensity
                        } cursor-pointer`}
                        title={
                          day.date !== "" 
                            ? `${format(parseISO(day.date), "dd/MM/yyyy")}: ${day.count} bài học` 
                            : ""
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend Section */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
              Cường độ:
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-[3px] bg-gray-200 dark:bg-white/5" />
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
