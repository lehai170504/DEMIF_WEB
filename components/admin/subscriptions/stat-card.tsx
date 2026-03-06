import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext: string;
  color: string;
  isCurrency?: boolean;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
  isCurrency,
}: StatCardProps) {
  // Thay đổi màu background glow cho phù hợp với phong cách nhẹ nhàng
  const bgGlow = color.replace("text-", "bg-");
  const bgIcon = color.replace("text-", "bg-") + "/10";

  return (
    <div className="p-6 rounded-[2rem] bg-white border border-slate-200 flex items-center gap-5 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 font-mono">
      <div
        className={cn(
          "p-4 rounded-2xl border border-white shadow-sm transition-transform group-hover:scale-105 duration-300",
          bgIcon,
          color,
        )}
      >
        <Icon className="h-7 w-7 stroke-[2px]" />
      </div>

      <div className="space-y-1 relative z-10">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p
          className={cn(
            "text-2xl font-bold text-slate-900 tracking-tight leading-none",
            isCurrency && "text-emerald-600",
          )}
        >
          {value}
        </p>
        <p className="text-xs font-medium text-slate-400 pt-1">{subtext}</p>
      </div>

      {/* Trang trí background nhẹ nhàng hơn */}
      <div
        className={cn(
          "absolute -right-6 -bottom-6 w-32 h-32 opacity-0 group-hover:opacity-[0.03] transition-opacity blur-2xl rounded-full",
          bgGlow,
        )}
      />
    </div>
  );
}
