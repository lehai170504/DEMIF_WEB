import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface ChartProps {
  title: string;
  icon: ElementType;
  data?: { key: string; count: number }[];
  colorTheme: "orange" | "blue" | "emerald" | "indigo";
  isLoading?: boolean;
  isCurrency?: boolean; // Prop mới: Format tiền
}

export function TailwindChartCard({
  title,
  icon: Icon,
  data,
  colorTheme,
  isLoading,
  isCurrency = false,
}: ChartProps) {
  const themeMap: Record<string, string> = {
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    indigo: "bg-indigo-500",
  };

  const bgClass = themeMap[colorTheme] || "bg-slate-500";

  const total =
    data?.reduce((acc: number, curr: any) => acc + curr.count, 0) || 1;

  const formatValue = (val: number) => {
    if (isCurrency) {
      return `${val.toLocaleString("vi-VN")} đ`;
    }
    return val.toLocaleString("vi-VN");
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A]/80 border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-4 h-4 text-slate-400" />
        <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-10 bg-slate-100 dark:bg-zinc-800/50 rounded-xl animate-pulse"
              />
            ))
          : data?.slice(0, 5).map((item: any, idx: number) => {
              const percent = ((item.count / total) * 100).toFixed(1);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600 dark:text-zinc-300">
                      {item.key || "Khác"}
                    </span>
                    <span className="text-slate-900 dark:text-white">
                      {formatValue(item.count)}{" "}
                      <span className="opacity-40 ml-1">({percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        bgClass,
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
