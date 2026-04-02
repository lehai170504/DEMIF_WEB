"use client";

import { Search, Filter, UserCircle, Cpu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeedbackFilterProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  source: string;
  setSource: (val: any) => void;
  filter: string;
  setFilter: (val: any) => void;
  totalCount: number;
}

export function FeedbackFilter({
  searchTerm,
  setSearchTerm,
  source,
  setSource,
  filter,
  setFilter,
  totalCount,
}: FeedbackFilterProps) {
  return (
    <Card className="rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-black/40 backdrop-blur-2xl p-8 space-y-8 mx-2">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Thanh tìm kiếm Glass Style */}
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-[#FF7A00] transition-colors" />
          <Input
            placeholder="Tìm theo tên học viên hoặc nội dung..."
            className="h-12 pl-12 bg-white/5 border-white/5 rounded-2xl font-bold focus-visible:ring-2 focus-visible:ring-[#FF7A00]/20 text-zinc-200 placeholder:text-zinc-600 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="h-8 w-px bg-white/10 hidden lg:block" />

        {/* Nguồn phản hồi (Source Toggle) */}
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
          {[
            { label: "Tất cả", value: "all", icon: Filter },
            { label: "Học viên", value: "user", icon: UserCircle },
            { label: "Hệ thống AI", value: "ai", icon: Cpu },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSource(opt.value)}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-tighter transition-all duration-300",
                source === opt.value
                  ? "bg-[#FF7A00] text-white shadow-[0_0_20px_rgba(255,122,0,0.3)]"
                  : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              <opt.icon className="h-4 w-4" /> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lọc theo trạng thái (Status Pills) */}
      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/5">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mr-2 italic">
          Trạng thái:
        </span>
        {[
          { label: "Toàn bộ", value: "all" },
          { label: "Chờ xử lý", value: "pending" },
          { label: "Đang xử lý", value: "in-progress" },
          { label: "Đã xong", value: "resolved" },
        ].map((status) => {
          const isActive = filter === status.value;
          return (
            <button
              key={status.value}
              onClick={() => setFilter(status.value)}
              className={cn(
                "px-5 py-2 rounded-xl text-[11px] font-bold uppercase transition-all flex items-center gap-2 border",
                isActive
                  ? "bg-white text-black border-white shadow-[0_10px_20px_rgba(255,255,255,0.1)] scale-105"
                  : "bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10 hover:border-white/10",
              )}
            >
              {status.label}
              {isActive && (
                <span className="bg-black/10 px-1.5 py-0.5 rounded-md text-[9px] font-black">
                  {totalCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
