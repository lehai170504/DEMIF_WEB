"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserStatus = "all" | "active" | "suspended" | "banned";

interface UserToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeFilter: UserStatus;
  onFilterChange: (value: UserStatus) => void;
  counts: Record<UserStatus, number>;
}

export function UserToolbar({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  counts,
}: UserToolbarProps) {
  return (
    <Card className="rounded-[2.5rem] border border-white/10 bg-[#18181b] p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="flex flex-col lg:flex-row gap-6 items-center relative z-10">
        {/* Search Bar */}
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Tìm theo username hoặc email..."
            className="h-12 pl-12 bg-black/20 border-white/10 text-white rounded-2xl font-bold focus-visible:ring-orange-500/50 focus-visible:border-orange-500 placeholder:text-zinc-600 transition-all"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="h-8 w-px bg-white/10 hidden lg:block" />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mr-2 flex items-center gap-2 italic">
            <Filter className="h-3 w-3" /> Lọc theo:
          </span>
          {(["all", "active", "suspended", "banned"] as UserStatus[]).map(
            (status) => {
              const isActive = activeFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => onFilterChange(status)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[11px] font-bold uppercase transition-all duration-300 flex items-center gap-2 border",
                    isActive
                      ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20"
                      : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white hover:border-white/10",
                  )}
                >
                  {status}
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-md text-[9px] font-black",
                      isActive
                        ? "bg-black/20 text-white"
                        : "bg-white/10 text-zinc-500",
                    )}
                  >
                    {counts[status]}
                  </span>
                </button>
              );
            },
          )}
        </div>
      </div>
    </Card>
  );
}
