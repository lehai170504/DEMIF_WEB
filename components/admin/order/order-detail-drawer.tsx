"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  FileText,
  Send,
} from "lucide-react";
import { type Order, getOrderTimelineById } from "@/lib/data/orders";
import { cn } from "@/lib/utils";

interface OrderDetailDrawerProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
    case "payment_completed":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "pending":
    case "created":
    case "payment_processing":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "failed":
    case "payment_failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "cancelled":
      return <AlertCircle className="h-4 w-4 text-zinc-500" />;
    case "refunded":
    case "refund_requested":
      return <RefreshCw className="h-4 w-4 text-blue-500" />;
    default:
      return <Clock className="h-4 w-4 text-zinc-500" />;
  }
};

const getStatusBadge = (status: Order["status"]) => {
  const config = {
    completed: {
      label: "Thành công",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    pending: {
      label: "Chờ xử lý",
      className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    },
    failed: {
      label: "Thất bại",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
    },
    cancelled: {
      label: "Đã hủy",
      className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    },
    refunded: {
      label: "Hoàn tiền",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
  };

  const { label, className } = config[status];
  return (
    <Badge variant="outline" className={cn("font-bold", className)}>
      {label}
    </Badge>
  );
};

const getPaymentMethodLabel = (method: string) => {
  const methods = {
    credit_card: "Thẻ tín dụng",
    paypal: "PayPal",
    bank_transfer: "Chuyển khoản",
    momo: "MoMo",
    zalopay: "ZaloPay",
  };
  return methods[method as keyof typeof methods] || method;
};

export default function OrderDetailDrawer({
  order,
  open,
  onOpenChange,
}: OrderDetailDrawerProps) {
  if (!order) return null;

  const timeline = getOrderTimelineById(order.id);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-0 bg-[#18181b] border-l border-white/10 text-zinc-100 font-mono shadow-2xl no-scrollbar">
        {/* Header Section */}
        <div className="relative p-6 border-b border-white/5 bg-gradient-to-br from-emerald-500/10 to-transparent overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none" />
          <SheetHeader className="relative z-10 text-left space-y-4">
            <SheetTitle className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              Chi tiết đơn hàng{" "}
              <span className="text-emerald-500">#{order.id.slice(0, 8)}</span>
            </SheetTitle>
            <SheetDescription className="text-zinc-400 text-xs font-medium">
              Thông tin chi tiết và lịch sử giao dịch.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-6 space-y-8 relative z-10">
          {/* Order Status Summary */}
          <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5 shadow-lg backdrop-blur-md">
            <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              Trạng thái hiện tại
            </span>
            {getStatusBadge(order.status)}
          </div>

          <Separator className="bg-white/10" />

          {/* Customer Info Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-l-2 border-orange-500 pl-2">
              Thông tin khách hàng
            </h4>
            <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Tên khách hàng:</span>
                <span className="font-bold text-white">{order.userName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Email đăng ký:</span>
                <span className="text-zinc-300 font-medium">
                  {order.userEmail}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">ID định danh (UID):</span>
                <span className="text-xs font-mono text-zinc-500 bg-black/20 px-2 py-0.5 rounded">
                  {order.userId}
                </span>
              </div>
            </div>
          </div>

          {/* Package & Billing Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-l-2 border-blue-500 pl-2">
              Chi tiết gói dịch vụ
            </h4>
            <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Gói đăng ký:</span>
                <span className="font-bold text-white text-right">
                  {order.packageName}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Phân loại:</span>
                <Badge
                  variant="outline"
                  className="capitalize border-white/20 text-zinc-300 bg-white/5"
                >
                  {order.packageType}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-white/5">
                <span className="text-zinc-400 font-bold">
                  Tổng thanh toán:
                </span>
                <span className="font-black text-xl text-emerald-400 italic">
                  {formatCurrency(order.amount)}
                </span>
              </div>
              {order.expiresAt && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Ngày hết hạn:</span>
                  <span className="text-zinc-300">
                    {formatDateTime(order.expiresAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-l-2 border-purple-500 pl-2">
              Phương thức thanh toán
            </h4>
            <div className="grid gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Cổng thanh toán:</span>
                <span className="font-bold text-white">
                  {getPaymentMethodLabel(order.paymentMethod)}
                </span>
              </div>
              {order.transactionId && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Mã giao dịch hệ thống:</span>
                  <span className="font-mono text-xs bg-black/20 text-zinc-300 px-2 py-1 rounded border border-white/5">
                    {order.transactionId}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Ngày khởi tạo:</span>
                <span className="text-zinc-300">
                  {formatDateTime(order.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Features Included Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-l-2 border-pink-500 pl-2">
              Quyền lợi kèm theo
            </h4>
            <div className="space-y-2.5 pl-2">
              {order.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-zinc-300 group"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 group-hover:text-emerald-400 transition-colors" />
                  <span className="leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History Timeline */}
          <div className="space-y-4 pb-12">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-l-2 border-zinc-500 pl-2">
              Lịch sử trạng thái
            </h4>
            <div className="space-y-6 pl-2 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
              {timeline.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 relative group"
                >
                  <div className="mt-0.5 flex-shrink-0 relative z-10 bg-[#18181b] rounded-full p-0.5 group-hover:scale-110 transition-transform">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-1 space-y-1 pb-1">
                    <p className="text-sm font-medium leading-relaxed text-zinc-200 group-hover:text-white transition-colors">
                      {event.description}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                      {formatDateTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Footer Actions */}
        <div className="sticky bottom-0 p-6 border-t border-white/5 bg-[#18181b]/95 backdrop-blur-md z-20 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-11 border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl font-bold transition-all"
          >
            <FileText className="h-4 w-4 mr-2 text-zinc-400" /> Xuất hóa đơn
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-11 border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl font-bold transition-all"
          >
            <Send className="h-4 w-4 mr-2 text-zinc-400" /> Gửi email
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
