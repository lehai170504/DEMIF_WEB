import { Card } from "@/components/ui/card";
import { Trophy, Flame, Zap, ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function AchievementCards() {
  const achievements = [
    {
      icon: Trophy,
      title: "Nhập môn",
      subtitle: "Bài nộp đầu tiên",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      isUnlocked: true,
    },
    {
      icon: Flame,
      title: "Ghi điểm",
      subtitle: "10 bài nộp",
      color: "text-slate-400",
      bg: "bg-slate-100",
      isUnlocked: false,
    },
    {
      icon: Zap,
      title: "Bất tận",
      subtitle: "20 bài nộp",
      color: "text-slate-400",
      bg: "bg-slate-100",
      isUnlocked: false,
    },
  ];

  return (
    <div className="font-mono">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-black uppercase tracking-tighter italic text-slate-900">
            Danh hiệu <span className="text-orange-500">(1 / 20)</span>
          </h3>
          <div className="h-1 w-24 bg-orange-100 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-orange-500 w-[5%]" />
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors group">
          Tất cả{" "}
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-3 gap-4">
        {achievements.map((item, index) => (
          <Card
            key={index}
            className={cn(
              "relative p-5 border-none rounded-[2rem] transition-all duration-300 group overflow-hidden",
              item.isUnlocked
                ? "bg-white shadow-[0_10px_30px_rgba(236,72,153,0.1)] hover:-translate-y-1"
                : "bg-slate-50/50 opacity-60 grayscale shadow-none cursor-not-allowed"
            )}
          >
            {/* Lock Overlay for locked items */}
            {!item.isUnlocked && (
              <Lock className="absolute top-3 right-3 h-3 w-3 text-slate-300" />
            )}

            <div className="flex flex-col items-center text-center">
              {/* Icon Badge */}
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                  item.bg,
                  item.color
                )}
              >
                <item.icon className="h-7 w-7" />
              </div>

              {/* Text Info */}
              <h4
                className={cn(
                  "font-black text-[11px] uppercase tracking-tight mb-1 leading-none",
                  item.isUnlocked ? "text-slate-900" : "text-slate-400"
                )}
              >
                {item.title}
              </h4>
              <p className="text-[9px] font-bold text-slate-400 leading-tight">
                {item.subtitle}
              </p>
            </div>

            {/* Shine effect for unlocked items */}
            {item.isUnlocked && (
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
