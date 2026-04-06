"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Mail,
  Zap,
  CalendarDays,
  RefreshCcw,
  CreditCard,
  Receipt,
  CheckCircle2,
  Clock,
  XCircle,
  Database,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserSubscriptionDetail } from "@/hooks/use-user-subscription-detail";
// 1. Import component hành động
import { SubscriptionActions } from "@/components/admin/user-subscriptions/subscription-actions";

// Helpers định dạng
const formatCurrency = (amount: number, currency: string = "VND") => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "Expired":
      return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    case "Cancelled":
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "PendingPayment":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    default:
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
};

const getPaymentStatusStyles = (status: string) => {
  switch (status) {
    case "Completed":
      return {
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
      };
    case "Pending":
      return { icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" };
    case "Failed":
    case "Refunded":
      return { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" };
    default:
      return { icon: Receipt, color: "text-slate-500", bg: "bg-slate-500/10" };
  }
};

export default function UserSubscriptionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError, refetch } = useUserSubscriptionDetail(id);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 dark:text-slate-400 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-[#FF7A00]" />
        <p className="text-sm font-medium">Đang tải chi tiết thuê bao...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-5 font-mono">
        <div className="p-4 bg-red-500/10 rounded-full">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Không thể tải dữ liệu thuê bao này.
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="rounded-xl h-11 px-6 font-semibold text-sm mt-2 hover:bg-red-50 dark:hover:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-600"
        >
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pb-10 font-mono bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white">
      <div className="relative z-10 space-y-8 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        {/* Top Navigation & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="h-12 w-12 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Chi tiết thuê bao
              </h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 opacity-70">
                Thông tin đăng ký gói dịch vụ
              </p>
            </div>
          </div>

          <SubscriptionActions
            subscriptionId={data.id}
            currentStatus={data.status}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Card 1: Core Info */}
            <div className="relative bg-white dark:bg-zinc-900/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/5 blur-[60px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-white/5 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-[#FF7A00] to-pink-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-500/20">
                    {data.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{data.userName}</h2>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <Mail className="h-3.5 w-3.5" />
                      {data.userEmail}
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  <span
                    className={cn(
                      "px-5 py-2.5 rounded-2xl text-xs font-semibold border shadow-sm",
                      getStatusStyles(data.status),
                    )}
                  >
                    {data.status === "Active"
                      ? "Đang hoạt động"
                      : data.status === "Expired"
                        ? "Đã hết hạn"
                        : data.status === "Cancelled"
                          ? "Đã hủy"
                          : data.status === "PendingPayment"
                            ? "Chờ thanh toán"
                            : data.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 relative z-10">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                    Gói Dịch Vụ
                  </p>
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-[#FF7A00]" />
                    <span className="text-lg font-bold">{data.planName}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-500/20 uppercase tracking-wider">
                      {data.tier}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                    Giá Trị
                  </p>
                  <div className="flex items-center gap-2 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    <CreditCard className="h-5 w-5" />
                    {formatCurrency(data.planPrice, data.currency)}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                    Thời Gian Hiệu Lực
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    {format(new Date(data.startDate), "dd/MM/yyyy", {
                      locale: vi,
                    })}
                    <span className="text-slate-400 mx-1">→</span>
                    {format(new Date(data.endDate), "dd/MM/yyyy", {
                      locale: vi,
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                    Tự Động Gia Hạn
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <RefreshCcw
                      className={cn(
                        "h-4 w-4",
                        data.autoRenew ? "text-emerald-500" : "text-slate-400",
                      )}
                    />
                    <span
                      className={
                        data.autoRenew ? "text-emerald-500" : "text-slate-400"
                      }
                    >
                      {data.autoRenew ? "Đang bật" : "Đã tắt"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: System Info */}
            <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
              <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-widest">
                <Database className="h-4 w-4 text-slate-400" />
                Dữ liệu hệ thống
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Ngày tạo
                  </p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {format(new Date(data.createdAt), "HH:mm:ss - dd/MM/yyyy", {
                      locale: vi,
                    })}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Cập nhật lần cuối
                  </p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {format(new Date(data.updatedAt), "HH:mm:ss - dd/MM/yyyy", {
                      locale: vi,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột Phải: Lịch Sử Giao Dịch */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-zinc-900/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Receipt className="h-5 w-5 text-slate-400" />
              Lịch sử giao dịch
            </h3>

            {data.payments.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50/50 dark:bg-zinc-900/20">
                <p className="text-xs font-medium text-slate-500">
                  Chưa có giao dịch nào
                </p>
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-white/10 before:to-transparent">
                {data.payments.map((payment) => {
                  const StatusIcon = getPaymentStatusStyles(
                    payment.status,
                  ).icon;
                  const colorClass = getPaymentStatusStyles(
                    payment.status,
                  ).color;
                  const bgClass = getPaymentStatusStyles(payment.status).bg;

                  return (
                    <div
                      key={payment.id}
                      className="relative flex items-start justify-between gap-4"
                    >
                      <div className="relative z-10 flex-none w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-zinc-950 border-2 border-slate-100 dark:border-zinc-800 shadow-sm">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            bgClass,
                          )}
                        >
                          <StatusIcon
                            className={cn("h-3.5 w-3.5", colorClass)}
                          />
                        </div>
                      </div>

                      <div className="flex-1 bg-slate-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                        <div className="flex justify-between items-start mb-3">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {formatCurrency(payment.amount, payment.currency)}
                          </p>
                          <span
                            className={cn(
                              "text-[10px] font-semibold uppercase tracking-widest",
                              colorClass,
                            )}
                          >
                            {payment.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-xs text-slate-500">
                          <p>
                            Phương thức:{" "}
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              {payment.paymentMethod || "N/A"}
                            </span>
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="shrink-0">Mã GD:</span>
                            {payment.transactionId ? (
                              <span className="flex items-center gap-1 font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-200/50 dark:bg-zinc-800 px-2 py-0.5 rounded border border-slate-200 dark:border-white/10 truncate">
                                <Hash className="h-3 w-3" />
                                {payment.transactionId}
                              </span>
                            ) : (
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                N/A
                              </span>
                            )}
                          </div>
                          <div className="pt-2 border-t border-slate-200/50 dark:border-white/5 mt-3">
                            <p className="text-[10px]">
                              Tạo:{" "}
                              {format(
                                new Date(payment.createdAt),
                                "HH:mm - dd/MM/yyyy",
                                { locale: vi },
                              )}
                            </p>
                            {payment.completedAt && (
                              <p className="text-[10px] mt-1 text-emerald-600 dark:text-emerald-500">
                                Hoàn thành:{" "}
                                {format(
                                  new Date(payment.completedAt),
                                  "HH:mm - dd/MM/yyyy",
                                  { locale: vi },
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
