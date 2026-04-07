"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  ChevronRight,
  Hash,
  Receipt,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentDto } from "@/types/payment.type";

interface PaymentTableProps {
  items: PaymentDto[];
  isFetching: boolean;
}

const formatCurrency = (amount: number, currency: string = "VND") => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency }).format(
    amount,
  );
};

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    Completed: "Thành công",
    Pending: "Chờ xử lý",
    Failed: "Thất bại",
    Refunded: "Đã hoàn tiền",
  };
  return map[status] || status;
};

const getPaymentStatusStyles = (status: string) => {
  switch (status) {
    case "Completed":
      return {
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
      };
    case "Pending":
      return {
        icon: Clock,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
      };
    case "Failed":
      return {
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
      };
    case "Refunded":
      return {
        icon: RotateCcw,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
      };
    default:
      return {
        icon: Receipt,
        color: "text-slate-500",
        bg: "bg-slate-500/10",
        border: "border-slate-500/20",
      };
  }
};

export function PaymentTable({ items, isFetching }: PaymentTableProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-20 text-center flex flex-col items-center justify-center gap-4">
        <Receipt className="h-10 w-10 text-slate-200" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Không có dữ liệu trong khoảng thời gian này
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden relative min-h-[400px]">
      {isFetching && (
        <div className="absolute inset-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-[2px] z-20 flex items-center justify-center" />
      )}

      <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-zinc-900/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        <div className="col-span-4">Người dùng</div>
        <div className="col-span-2">Dịch vụ</div>
        <div className="col-span-2 text-right">Số tiền</div>
        <div className="col-span-2 text-center">Thời gian</div>
        <div className="col-span-2 text-right">Trạng thái</div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/5">
        {items.map((item) => {
          const statusUi = getPaymentStatusStyles(item.status);
          return (
            <Link
              key={item.id}
              href={`/admin/payments/${item.id}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-6 lg:px-8 py-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="col-span-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-emerald-600 font-black text-xs shadow-inner">
                  {item.userName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-500 transition-colors">
                    {item.userName}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-widest mt-0.5">
                    {item.userEmail}
                  </p>
                </div>
              </div>
              <div className="col-span-2 space-y-1">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {item.planName}
                </p>
                <div className="flex items-center gap-1 font-mono text-[9px] text-slate-400">
                  <Hash className="w-2.5 h-2.5" />{" "}
                  {item.transactionId || item.paymentReference.slice(0, 8)}
                </div>
              </div>
              <div className="col-span-2 text-right text-sm font-black text-slate-900 dark:text-white">
                {formatCurrency(item.amount, item.currency)}
              </div>
              <div className="col-span-2 text-center space-y-0.5">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {format(new Date(item.createdAt), "dd/MM/yyyy")}
                </p>
                <p className="text-[9px] font-bold uppercase text-slate-400 tracking-tighter">
                  {format(new Date(item.createdAt), "HH:mm")}
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-3">
                <span
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-widest border shadow-sm",
                    statusUi.bg,
                    statusUi.color,
                    statusUi.border,
                  )}
                >
                  <statusUi.icon className="w-3.5 h-3.5" />
                  {getStatusLabel(item.status)}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
