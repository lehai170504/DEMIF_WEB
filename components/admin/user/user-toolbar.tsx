"use client";

import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserStatus = "all" | "active" | "inactive" | "banned";

const STATUS_MAP: Record<UserStatus, string> = {
  all: "Tất cả học viên",
  active: "Đang hoạt động",
  inactive: "Tạm đình chỉ",
  banned: "Đã ban",
};

interface UserToolbarProps {
  activeFilter: UserStatus;
  onFilterChange: (value: UserStatus) => void;
}

export function UserToolbar({
  activeFilter,
  onFilterChange,
}: UserToolbarProps) {
  return (
    <Card className="rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 p-6 shadow-sm relative overflow-hidden font-mono transition-colors duration-300 backdrop-blur-md">
      {/* Tia sáng gradient nhẹ phía trên để tăng chiều sâu */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/10 dark:via-orange-500/20 to-transparent pointer-events-none" />

      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 relative z-10">
        {/* Nhãn lọc */}
        <div className="flex items-center gap-3 mr-4">
          <div className="p-2 bg-slate-100 dark:bg-orange-500/10 rounded-xl border border-slate-200 dark:border-orange-500/20 transition-colors">
            <Filter className="h-4 w-4 text-slate-500 dark:text-orange-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
            Lọc trạng thái:
          </span>
        </div>

        {/* Các nút chọn trạng thái */}
        <div className="flex flex-wrap items-center gap-2.5">
          {(["all", "active", "inactive", "banned"] as UserStatus[]).map(
            (status) => {
              const isActive = activeFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => onFilterChange(status)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border outline-none active:scale-95",
                    isActive
                      ? "bg-slate-900 dark:bg-orange-500 text-white border-slate-900 dark:border-orange-600 shadow-lg shadow-slate-900/10 dark:shadow-orange-500/20"
                      : "bg-white dark:bg-zinc-800 border-slate-200 dark:border-white/5 text-slate-500 dark:text-zinc-500 hover:border-slate-300 dark:hover:border-white/10 hover:text-slate-900 dark:hover:text-white",
                  )}
                >
                  {STATUS_MAP[status]}
                </button>
              );
            },
          )}
        </div>
      </div>
    </Card>
  );
}
