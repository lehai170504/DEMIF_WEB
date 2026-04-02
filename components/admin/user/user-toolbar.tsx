"use client";

import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserStatus = "all" | "active" | "inactive" | "banned";

// Map trạng thái tiếng Anh sang tiếng Việt để hiển thị đẹp hơn
const STATUS_MAP: Record<UserStatus, string> = {
  all: "Tất cả",
  active: "Hoạt động",
  inactive: "Đình chỉ",
  banned: "Bị cấm",
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
    <Card className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden font-mono">
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 relative z-10">
        {/* Nhãn lọc */}
        <div className="flex items-center gap-2 mr-2">
          <div className="p-1.5 bg-slate-100 rounded-lg border border-slate-200">
            <Filter className="h-4 w-4 text-slate-500" />
          </div>
          <span className="text-sm font-semibold text-slate-600">
            Lọc trạng thái:
          </span>
        </div>

        {/* Các nút chọn trạng thái */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "active", "inactive", "banned"] as UserStatus[]).map(
            (status) => {
              const isActive = activeFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => onFilterChange(status)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border active:scale-95",
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50",
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
