"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserStatus = "all" | "active" | "inactive" | "banned";

interface UserToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilter: UserStatus;
  onFilterChange: (value: UserStatus) => void;
  // ĐÃ XÓA counts KHỎI INTERFACE
}

export function UserToolbar({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: UserToolbarProps) {
  return (
    <Card className="rounded-[2.5rem] border border-gray-200 bg-white p-8 space-y-6 shadow-xl shadow-gray-200/50 relative overflow-hidden font-mono transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

      <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-orange-500 group-focus-within:scale-110 transition-all duration-300" />
          <Input
            placeholder="Tìm theo Username hoặc Email định danh..."
            className="h-14 pl-12 bg-gray-50 border-gray-200 text-gray-900 rounded-2xl font-bold focus-visible:ring-orange-500/10 focus-visible:border-orange-500 placeholder:text-gray-400 shadow-inner transition-all placeholder:font-medium"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="h-10 w-px bg-gray-100 hidden lg:block" />

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <Filter className="h-3 w-3 text-gray-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">
              Lọc Danh Sách:
            </span>
          </div>

          {(["all", "active", "inactive", "banned"] as UserStatus[]).map(
            (status) => {
              const isActive = activeFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => onFilterChange(status)}
                  className={cn(
                    "px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase transition-all border shadow-sm active:scale-95",
                    isActive
                      ? "bg-gray-900 text-white border-gray-900 shadow-orange-900/10"
                      : "bg-white border-gray-100 text-gray-400 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/20",
                  )}
                >
                  <span className="tracking-widest">{status}</span>
                </button>
              );
            },
          )}
        </div>
      </div>
    </Card>
  );
}
