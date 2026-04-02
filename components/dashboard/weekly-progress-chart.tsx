"use client";

interface WeeklyProgressChartProps {
  data: {
    day: string;
    minutes: number;
  }[];
}

export function WeeklyProgressChart({ data }: WeeklyProgressChartProps) {
  const maxMinutes = Math.max(...data.map((d) => d.minutes));
  const goal = 60; // Daily goal in minutes

  return (
    <div className="w-full font-mono">
      <div className="flex items-end justify-between gap-2 h-40 mb-4">
        {data.map((item, index) => {
          const height = (item.minutes / maxMinutes) * 100;
          const isAboveGoal = item.minutes >= goal;
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2 group"
            >
              <div
                className="relative w-full flex items-end justify-center"
                style={{ height: "100%" }}
              >
                <div className="absolute bottom-0 w-full flex flex-col items-center">
                  <span className="text-[9px] font-black text-orange-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    {item.minutes}m
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${isAboveGoal ? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" : "bg-white/10 group-hover:bg-white/20"}`}
                    style={{ height: `${height}%`, minHeight: "6px" }}
                  />
                </div>
              </div>
              <span className="text-[9px] text-zinc-500 font-bold uppercase">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Goal line indicator */}
      <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-6">
        <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
        <span>Mục tiêu: {goal} phút</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-2xl bg-[#18181b] border border-white/5 hover:border-white/10 transition-colors">
          <div className="text-xl font-black text-white">
            {data.reduce((sum, d) => sum + d.minutes, 0)}
          </div>
          <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
            Tổng phút
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-[#18181b] border border-white/5 hover:border-white/10 transition-colors">
          <div className="text-xl font-black text-white">
            {Math.round(
              data.reduce((sum, d) => sum + d.minutes, 0) / data.length,
            )}
          </div>
          <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
            Trung bình/ngày
          </div>
        </div>
      </div>
    </div>
  );
}
