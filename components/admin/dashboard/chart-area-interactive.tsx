"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Dữ liệu mẫu (giữ nguyên hoặc thay bằng props)
const chartData = [
  { date: "2024-06-01", dictation: 200, shadowing: 178 },
  { date: "2024-06-02", dictation: 410, shadowing: 470 },
  { date: "2024-06-03", dictation: 160, shadowing: 103 },
  { date: "2024-06-04", dictation: 380, shadowing: 439 },
  { date: "2024-06-05", dictation: 140, shadowing: 88 },
  { date: "2024-06-06", dictation: 250, shadowing: 294 },
  { date: "2024-06-07", dictation: 370, shadowing: 323 },
  { date: "2024-06-08", dictation: 320, shadowing: 385 },
  { date: "2024-06-09", dictation: 480, shadowing: 438 },
  { date: "2024-06-10", dictation: 200, shadowing: 155 },
  { date: "2024-06-11", dictation: 150, shadowing: 92 },
  { date: "2024-06-12", dictation: 420, shadowing: 492 },
  { date: "2024-06-13", dictation: 130, shadowing: 81 },
  { date: "2024-06-14", dictation: 380, shadowing: 426 },
  { date: "2024-06-15", dictation: 350, shadowing: 307 },
  { date: "2024-06-16", dictation: 310, shadowing: 371 },
  { date: "2024-06-17", dictation: 520, shadowing: 475 },
  { date: "2024-06-18", dictation: 170, shadowing: 107 },
  { date: "2024-06-19", dictation: 290, shadowing: 341 },
  { date: "2024-06-20", dictation: 450, shadowing: 408 },
  { date: "2024-06-21", dictation: 210, shadowing: 169 },
  { date: "2024-06-22", dictation: 270, shadowing: 317 },
  { date: "2024-06-23", dictation: 530, shadowing: 480 },
  { date: "2024-06-24", dictation: 180, shadowing: 132 },
  { date: "2024-06-25", dictation: 190, shadowing: 141 },
  { date: "2024-06-26", dictation: 380, shadowing: 434 },
  { date: "2024-06-27", dictation: 490, shadowing: 448 },
  { date: "2024-06-28", dictation: 200, shadowing: 149 },
  { date: "2024-06-29", dictation: 160, shadowing: 103 },
  { date: "2024-06-30", dictation: 400, shadowing: 446 },
];

export default function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;
    if (timeRange === "90d") daysToSubtract = 90;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return chartData.filter((item) => new Date(item.date) >= startDate);
  }, [timeRange]);

  return (
    <div className="w-full h-full flex flex-col font-mono">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          {/* Tiêu đề đã được handle ở component cha, ở đây chỉ render phần filter nếu cần thiết hoặc ẩn đi */}
          {/* Nếu component này đứng độc lập thì bỏ comment phần dưới */}
          {/* <h3 className="text-lg font-bold text-white">Chi tiết hiệu suất</h3> */}
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => val && setTimeRange(val)}
            className="bg-black/20 border border-white/5 p-1 rounded-xl hidden sm:flex"
          >
            {["7d", "30d", "90d"].map((range) => (
              <ToggleGroupItem
                key={range}
                value={range}
                className="rounded-lg text-[10px] font-bold px-3 py-1 data-[state=on]:bg-orange-500 data-[state=on]:text-white text-zinc-500 hover:text-zinc-300 transition-all"
              >
                {range === "7d"
                  ? "7 ngày"
                  : range === "30d"
                    ? "30 ngày"
                    : "3 tháng"}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {/* Mobile Select */}
          <div className="sm:hidden">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px] h-9 text-xs bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#18181b] border-white/10 text-white">
                <SelectItem value="7d">7 ngày qua</SelectItem>
                <SelectItem value="30d">30 ngày qua</SelectItem>
                <SelectItem value="90d">3 tháng qua</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillDictation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />{" "}
                {/* Orange-500 */}
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillShadowing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />{" "}
                {/* Emerald-500 */}
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              tick={{ fontSize: 10, fill: "#71717a", fontWeight: "bold" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#71717a", fontWeight: "bold" }}
            />
            <Tooltip
              cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "rgba(24, 24, 27, 0.9)", // zinc-900
                backdropFilter: "blur(10px)",
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
                fontSize: "12px",
                color: "#fff",
                padding: "12px",
              }}
              itemStyle={{ paddingBottom: 4 }}
              labelStyle={{
                marginBottom: 8,
                color: "#a1a1aa",
                fontWeight: "bold",
              }}
            />
            <Area
              type="monotone"
              dataKey="dictation"
              name="Dictation"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#fillDictation)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="shadowing"
              name="Shadowing"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#fillShadowing)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Dictation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Shadowing
          </span>
        </div>
      </div>
    </div>
  );
}
