"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface OrderToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function OrderToolbar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: OrderToolbarProps) {
  return (
    <div className="p-6 md:p-8 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/[0.02] relative z-10">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
        <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500 hidden sm:block shadow-lg shadow-emerald-500/10">
          <Search className="h-5 w-5" />
        </div>
        <div className="relative group w-full sm:min-w-[350px]">
          <Input
            placeholder="Tìm kiếm mã đơn, khách hàng..."
            className="h-12 pl-4 bg-black/20 border-white/10 text-white rounded-2xl font-bold focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 placeholder:text-zinc-600 transition-all"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-zinc-500" />
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="h-12 w-full sm:w-[200px] rounded-2xl bg-black/20 border-white/10 text-white font-bold shadow-sm italic focus:ring-emerald-500/50">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent className="font-mono rounded-2xl border-white/10 bg-[#18181b] text-white shadow-xl">
            <SelectItem value="all">Tất cả đơn</SelectItem>
            <SelectItem value="completed">Thành công</SelectItem>
            <SelectItem value="pending">Đang xử lý</SelectItem>
            <SelectItem value="failed">Thất bại</SelectItem>
            <SelectItem value="refunded">Hoàn tiền</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
