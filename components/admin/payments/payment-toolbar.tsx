"use client";

import * as React from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentToolbarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  dateFrom: string;
  onDateFromChange: (val: string) => void;
  dateTo: string;
  onDateToChange: (val: string) => void;
}

export function PaymentToolbar({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: PaymentToolbarProps) {
  return (
    <div className="flex flex-col xl:flex-row gap-4 bg-white/80 dark:bg-zinc-900/80 p-5 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm backdrop-blur-xl z-20 sticky top-4">
      {/* Search Box */}
      <div className="relative flex-[2]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Tìm theo Tên, Email hoặc Mã..."
          className="h-12 w-full pl-11 rounded-2xl border-none bg-slate-100/50 dark:bg-zinc-950 font-bold text-sm"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Date Filters */}
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="h-12 w-full pl-9 pr-3 rounded-2xl border-none bg-slate-100/50 dark:bg-zinc-950 font-bold text-xs appearance-none"
          />
        </div>
        <span className="text-slate-300 font-bold">→</span>
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="h-12 w-full pl-9 pr-3 rounded-2xl border-none bg-slate-100/50 dark:bg-zinc-950 font-bold text-xs appearance-none"
          />
        </div>
      </div>

      {/* Status & Export */}
      <div className="flex flex-1 gap-3">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-12 flex-1 rounded-2xl border-none bg-slate-100/50 dark:bg-zinc-950 font-bold shadow-inner">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <SelectValue placeholder="Trạng thái" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-2xl font-bold">
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="Completed" className="text-emerald-600">
              Thành công
            </SelectItem>
            <SelectItem value="Pending" className="text-orange-600">
              Chờ xử lý
            </SelectItem>
            <SelectItem value="Failed" className="text-red-600">
              Thất bại
            </SelectItem>
            <SelectItem value="Refunded" className="text-blue-600">
              Đã hoàn tiền
            </SelectItem>
          </SelectContent>
        </Select>

        <Button className="h-12 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
          Xuất CSV
        </Button>
      </div>
    </div>
  );
}
