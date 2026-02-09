import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext: string;
  color: string; // vd: "text-blue-500"
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
  // Tách màu nền từ màu text (vd: text-blue-500 -> bg-blue-500)
  const bgGlow = color.replace("text-", "bg-");

  return (
    <div className="p-5 rounded-[1.5rem] bg-[#18181b] border border-white/10 flex items-center gap-4 relative overflow-hidden group">
      <div
        className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${color}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p
          className={cn(
            "text-2xl font-black text-white tracking-tight",
            isCurrency && "text-emerald-400",
          )}
        >
          {value}
        </p>
        <p className="text-[10px] text-zinc-600 font-medium italic mt-0.5">
          {subtext}
        </p>
      </div>

      {/* Decorative Glow */}
      <div
        className={`absolute -right-4 -bottom-4 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity blur-2xl rounded-full ${bgGlow}`}
      />
    </div>
  );
}
