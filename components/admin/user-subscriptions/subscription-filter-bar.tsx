"use client";

import * as React from "react";
import { Search, Filter, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SubscriptionFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
}

export function SubscriptionFilterBar({
  searchTerm,
  onSearchChange,
  status,
  onStatusChange,
}: SubscriptionFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2 font-mono transition-colors duration-300">
      <div className="space-y-2">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 mb-2">
          <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 shadow-sm">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Danh sách học viên
          </span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight text-slate-900 dark:text-white tracking-tighter">
          Lưu lượng{" "}
          <span className="text-slate-400 dark:text-zinc-500">học viên</span>
        </h1>

        {/* Mô tả */}
        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-tight opacity-80">
          Quản lý tài khoản và các gói dịch vụ đặc quyền trên toàn hệ thống.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        {/* Search Input Island */}
        <div className="relative w-full sm:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-zinc-600 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Email hoặc Tên hồ sơ..."
            className="h-12 pl-11 bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-white/5 rounded-2xl font-bold text-[11px] tracking-wider focus:border-orange-500 focus:ring-orange-500/10 transition-all shadow-sm dark:text-white"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Status Select Island */}
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-12 w-full sm:w-[200px] bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm dark:text-slate-200 focus:ring-orange-500/10 transition-all">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-3 text-slate-400 dark:text-zinc-600 shrink-0" />
              <SelectValue placeholder="Trạng thái" />
            </div>
          </SelectTrigger>
          <SelectContent className="font-mono bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl">
            <SelectItem
              value="all"
              className="text-[10px] font-black uppercase focus:bg-orange-50 dark:focus:bg-white/5"
            >
              Tất cả trạng thái
            </SelectItem>
            <SelectItem
              value="Active"
              className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 focus:bg-emerald-50 dark:focus:bg-emerald-500/10"
            >
              Đang hoạt động
            </SelectItem>
            <SelectItem
              value="PendingPayment"
              className="text-[10px] font-black uppercase text-orange-600 dark:text-orange-400 focus:bg-orange-50 dark:focus:bg-orange-500/10"
            >
              Chờ thanh toán
            </SelectItem>
            <SelectItem
              value="Expired"
              className="text-[10px] font-black uppercase text-slate-500 dark:text-zinc-500 focus:bg-slate-100 dark:focus:bg-white/5"
            >
              Đã hết hạn
            </SelectItem>
            <SelectItem
              value="Cancelled"
              className="text-[10px] font-black uppercase text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-500/10"
            >
              Đã hủy
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
