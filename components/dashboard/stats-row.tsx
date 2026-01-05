import { Card } from "@/components/ui/card";
import { Target, FileText, CheckCircle, Headphones, Flame } from "lucide-react";

export function StatsRow() {
  const stats = [
    {
      icon: Flame,
      label: "Ngày liên tiếp",
      value: "0",
      color: "text-orange-600",
      border: "border-orange-100",
      bg: "bg-orange-50/50",
    },
    {
      icon: FileText,
      label: "Từ đã nghe",
      value: "9",
      color: "text-blue-600",
      border: "border-blue-100",
      bg: "bg-blue-50/50",
    },
    {
      icon: CheckCircle,
      label: "Bài đã nộp",
      value: "1",
      color: "text-emerald-600",
      border: "border-emerald-100",
      bg: "bg-emerald-50/50",
    },
    {
      icon: Headphones,
      label: "Bài đang nghe",
      value: "1",
      color: "text-purple-600",
      border: "border-purple-100",
      bg: "bg-purple-50/50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`relative overflow-hidden p-5 border-none bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:shadow-lg group`}
        >
          {/* Background Icon Decor */}
          <stat.icon
            className={`absolute -right-2 -bottom-2 h-16 w-16 opacity-[0.03] group-hover:scale-110 transition-transform duration-500 ${stat.color}`}
          />

          <div className="flex flex-col items-start relative z-10">
            {/* Icon Box */}
            <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} mb-4`}>
              <stat.icon className="h-5 w-5" />
            </div>

            {/* Value & Label */}
            <div className="space-y-0.5">
              <div
                className={`text-4xl font-black italic tracking-tighter ${stat.color}`}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {stat.label}
              </div>
            </div>
          </div>

          {/* Bottom highlight bar */}
          <div
            className={`absolute bottom-0 left-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity ${stat.color.replace(
              "text",
              "bg"
            )}`}
          />
        </Card>
      ))}
    </div>
  );
}
