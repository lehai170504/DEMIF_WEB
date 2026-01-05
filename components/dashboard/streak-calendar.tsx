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
        .map(() => Math.random() > 0.8)
    );

  return (
    <Card className="p-8 border-none bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] font-mono">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
              HOẠT ĐỘNG STREAK
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              2 ngày học tập trong 9 tháng qua
            </p>
          </div>
        </div>
        <button className="p-2 text-slate-300 hover:text-orange-500 transition-colors">
          <Info className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex justify-between mb-4 ml-8 px-1">
            {months.map((month) => (
              <div key={month} className="text-[9px] font-black text-slate-400">
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
                  className="text-[9px] font-black text-slate-300 h-3 flex items-center"
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
                      className={`w-[13px] h-[13px] rounded-[3.5px] transition-all duration-300 ${
                        isActive
                          ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)] hover:scale-125"
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
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
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
              Cường độ học:
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-[3px] bg-slate-100 dark:bg-slate-800" />
              <div className="w-3 h-3 rounded-[3px] bg-orange-200" />
              <div className="w-3 h-3 rounded-[3px] bg-orange-300" />
              <div className="w-3 h-3 rounded-[3px] bg-orange-400" />
              <div className="w-3 h-3 rounded-[3px] bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.4)]" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Tăng dần
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
