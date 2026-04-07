"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Receipt,
  User,
  CreditCard,
  Building,
  CheckCircle2,
  XCircle,
  Clock,
  Banknote,
  RotateCcw,
  Code2,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePaymentDetail, useRefundPayment } from "@/hooks/use-payments";
import { cn } from "@/lib/utils";
import { RefundDialog } from "@/components/admin/payments/refund-dialog";

const formatCurrency = (amount: number, currency: string = "VND") => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const getPaymentStatusStyles = (status: string) => {
  switch (status) {
    case "Completed":
      return {
        icon: CheckCircle2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        label: "Thành công",
      };
    case "Pending":
      return {
        icon: Clock,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        label: "Đang chờ xử lý",
      };
    case "Failed":
      return {
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        label: "Thất bại",
      };
    case "Refunded":
      return {
        icon: RotateCcw,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        label: "Đã hoàn tiền",
      };
    default:
      return {
        icon: Receipt,
        color: "text-slate-500",
        bg: "bg-slate-500/10",
        border: "border-slate-500/20",
        label: status,
      };
  }
};

export default function AdminPaymentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError, refetch } = usePaymentDetail(id);
  const refundMutation = useRefundPayment();

  const [isRefundOpen, setIsRefundOpen] = React.useState(false);
  const [refundReason, setRefundReason] = React.useState("");

  const handleRefund = () => {
    if (!refundReason.trim()) return;
    refundMutation.mutate(
      { id, payload: { reason: refundReason } },
      {
        onSuccess: () => {
          setIsRefundOpen(false);
          setRefundReason("");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-500 font-mono">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Đang tải hóa đơn...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-5 font-mono">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-sm font-bold text-red-600">
          Không tìm thấy giao dịch này.
        </p>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="rounded-xl"
        >
          Thử lại
        </Button>
      </div>
    );
  }

  const statusUi = getPaymentStatusStyles(data.status);
  let parsedGateway = null;
  if (data.gatewayResponse) {
    try {
      parsedGateway = JSON.parse(data.gatewayResponse);
    } catch (e) {
      parsedGateway = data.gatewayResponse;
    }
  }

  return (
    <div className="w-full min-h-screen pb-20 font-mono bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-white">
      <div className="relative z-10 space-y-8 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        {/* TOP NAVIGATION & ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="h-12 w-12 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-slate-200 dark:border-white/5 hover:bg-slate-100 transition-all active:scale-90"
            >
              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </Button>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">
                Chi tiết <span className="text-slate-400">Giao dịch</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1 opacity-70">
                #{data.transactionId || data.paymentReference}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {data.status === "Completed" && (
              <RefundDialog
                paymentId={data.id}
                amount={data.amount}
                currency={data.currency}
                userName={data.userName}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="lg:col-span-2 space-y-8">
            {/* Card 1: Khách hàng & Gói */}
            <div className="relative bg-white dark:bg-zinc-900/40 p-8 md:p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

              <h3 className="text-[10px] font-black flex items-center gap-2 text-slate-400 uppercase tracking-[0.3em] mb-8 relative z-10">
                <User className="h-4 w-4 text-blue-500" /> Thông tin đăng ký
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-[1.2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20">
                      {data.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {data.userName}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500 mt-1">
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                        {data.userEmail}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:pl-8 sm:border-l border-slate-100 dark:border-white/5">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Sản phẩm dịch vụ
                    </p>
                    <div className="flex items-center gap-3 text-xl font-black text-slate-900 dark:text-white">
                      <div className="p-2 bg-[#FF7A00]/10 rounded-lg">
                        <CreditCard className="h-5 w-5 text-[#FF7A00]" />
                      </div>
                      {data.planName}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Tham chiếu thanh toán
                    </p>
                    <p className="text-[12px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 w-fit px-3 py-1 rounded-xl">
                      {data.paymentReference}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Thông tin Ngân hàng */}
            <div className="bg-white dark:bg-zinc-900/40 p-8 md:p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-sm space-y-8">
              <h3 className="text-[10px] font-black flex items-center gap-2 text-slate-400 uppercase tracking-[0.3em]">
                <Building className="h-4 w-4 text-emerald-500" /> Chi tiết giao
                dịch ngân hàng
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-[1.5rem] border border-slate-100 dark:border-white/5 space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Phương thức
                  </p>
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    {data.paymentMethod}
                  </p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-[1.5rem] border border-slate-100 dark:border-white/5 space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Ngân hàng đối tác
                  </p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {data.bankCode || "N/A"}
                  </p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-[1.5rem] border border-slate-100 dark:border-white/5 space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Mã chuẩn chi (Bank No)
                  </p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">
                    {data.bankTransactionNo || "N/A"}
                  </p>
                </div>
              </div>

              {parsedGateway && (
                <div className="mt-6 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                    <Code2 className="w-4 h-4 text-[#FF7A00]" /> Dữ liệu phản
                    hồi Gateway (JSON)
                  </p>
                  <div className="p-6 bg-slate-950 rounded-[2rem] border border-slate-800 overflow-x-auto custom-scrollbar shadow-inner">
                    <pre className="text-[11px] text-emerald-400/90 font-mono leading-relaxed">
                      {JSON.stringify(parsedGateway, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm flex flex-col items-center justify-center text-center gap-6">
              <div
                className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-xl",
                  statusUi.bg,
                  statusUi.color,
                  statusUi.border,
                )}
              >
                <statusUi.icon className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <span
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border",
                    statusUi.bg,
                    statusUi.color,
                    statusUi.border,
                  )}
                >
                  {statusUi.label}
                </span>
                <p className="text-4xl font-black text-slate-900 dark:text-white pt-2 tracking-tighter italic">
                  {formatCurrency(data.amount, data.currency)}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm space-y-8">
              <h3 className="text-[10px] font-black flex items-center gap-2 text-slate-400 uppercase tracking-[0.3em]">
                <Clock className="h-4 w-4" /> Dòng thời gian
              </h3>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100 dark:before:bg-white/5">
                <div className="relative flex items-center justify-between pl-12">
                  <div className="absolute left-3.5 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 bg-slate-300 z-10" />
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">
                      Tạo giao dịch
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                      {format(
                        new Date(data.createdAt),
                        "HH:mm:ss - dd/MM/yyyy",
                      )}
                    </p>
                  </div>
                </div>

                {data.completedAt && (
                  <div className="relative flex items-center justify-between pl-12">
                    <div className="absolute left-3.5 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 bg-emerald-500 z-10 shadow-sm shadow-emerald-500/50" />
                    <div>
                      <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        Xử lý hoàn tất
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                        {format(
                          new Date(data.completedAt),
                          "HH:mm:ss - dd/MM/yyyy",
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
