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
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-orange-600 mb-2">
          <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Quản lý giao dịch</span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900 dark:text-white">
          Lưu lượng{" "}
          <span className="text-slate-400 font-medium">học viên</span>
        </h1>

        {/* Mô tả */}
        <p className="text-slate-500 text-sm font-medium max-w-lg mt-2">
          Quản lý tài khoản và các gói dịch vụ đã đăng ký trên hệ thống.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        {/* Search Input */}
        <div className="relative w-full sm:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Email hoặc Tên..."
            className="h-11 pl-10 bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 rounded-xl font-medium focus:border-orange-500 focus:ring-orange-500/20 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Status Select */}
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-11 w-full sm:w-[180px] bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 rounded-xl font-medium shadow-sm">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
              <SelectValue placeholder="Trạng thái" />
            </div>
          </SelectTrigger>
          <SelectContent className="font-mono font-medium rounded-xl">
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="Active">Đang hoạt động</SelectItem>
            <SelectItem value="PendingPayment">Chờ thanh toán</SelectItem>
            <SelectItem value="Expired">Đã hết hạn</SelectItem>
            <SelectItem value="Cancelled">Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}