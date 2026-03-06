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
  const bgGlow = color.replace("text-", "bg-");
  const bgIcon = color.replace("text-", "bg-") + "/10";

  return (
    <div className="p-6 rounded-[2.5rem] bg-white border border-gray-100 flex items-center gap-6 relative overflow-hidden group shadow-xl shadow-gray-200/40 hover:shadow-2xl transition-all duration-500 font-mono">
      <div
        className={cn(
          "p-4 rounded-[1.5rem] border border-white shadow-inner transition-transform group-hover:scale-110 duration-500",
          bgIcon,
          color,
        )}
      >
        <Icon className="h-8 w-8 stroke-[2.5px]" />
      </div>

      <div className="space-y-1.5 relative z-10">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
          {label}
        </p>
        <p
          className={cn(
            "text-3xl font-black text-gray-900 tracking-tighter uppercase italic leading-none",
            isCurrency && "text-emerald-600",
          )}
        >
          {value}
        </p>
        <p className="text-[10px] text-gray-500 font-bold italic tracking-tight border-l-2 border-gray-100 pl-2">
          {subtext}
        </p>
      </div>

      {/* Trang trí background nhẹ */}
      <div
        className={cn(
          "absolute -right-6 -bottom-6 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl rounded-full",
          bgGlow,
        )}
      />
    </div>
  );
}
