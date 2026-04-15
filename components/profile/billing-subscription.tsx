"use client";

import { CheckCircle, CreditCard, Download, Zap, Crown, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMySubscription, useActivePlans } from "@/hooks/use-subscription";
import { usePaymentHistory } from "@/hooks/use-payment";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function BillingSubscription() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: mySubscription, isLoading } = useMySubscription(isAuthenticated);
  const { data: activePlans } = useActivePlans();
  const { data: paymentHistory, isLoading: isLoadingHistory } = usePaymentHistory();

  // Format date to Vietnamese format
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isPendingPayment = mySubscription?.status === "PendingPayment";

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
      {/* Current Plan Card - Neon Style */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 dark:from-[#18181b] dark:to-black border border-gray-200 dark:border-white/10 p-1">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative bg-white/50 dark:bg-[#18181b]/50 backdrop-blur-xl rounded-[2.3rem] p-8 md:p-10">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          ) : mySubscription ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg shadow-orange-500/20">
                      <Crown className="h-6 w-6 text-white fill-white" />
                    </div>
                    <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-3 py-1 uppercase tracking-widest text-[10px] font-black">
                      {mySubscription.status}
                    </Badge>
                  </div>
                  <h4 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                    {mySubscription.planName || "Gói đăng ký"}
                  </h4>
                  <p className="text-gray-600 dark:text-zinc-400 font-medium">
                     Ngày hết hạn:{" "}
                    <span className="text-gray-900 dark:text-white">
                      {formatDate(mySubscription.endDate)}
                    </span>
                  </p>
                </div>

                {isPendingPayment ? (
                  <Button
                    className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold h-12"
                    onClick={() => router.push(`/payment?planId=${mySubscription.planId}`)}
                  >
                    Tiếp tục thanh toán
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="rounded-xl border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold h-12"
                    onClick={() => router.push('/upgrade')}
                  >
                    Xem các gói
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-8 border-t border-gray-200 dark:border-white/5">
                {(mySubscription.plan?.features || 
                  activePlans?.find(p => p.id === mySubscription.planId || p.name === mySubscription.planName)?.features || 
                  [
                    "Không giới hạn bài tập",
                    "Phân tích phát âm AI",
                    "Tải về bài học Offline",
                    "Hỗ trợ 1-1 ưu tiên",
                  ]).map((feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-zinc-300"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-500 fill-emerald-500/10" />
                    {feature}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl w-fit mx-auto">
                <Crown className="h-8 w-8 text-gray-400 dark:text-zinc-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Chưa có gói đăng ký
                </h4>
                <p className="text-gray-600 dark:text-zinc-400 mb-6">
                  Nâng cấp tài khoản để trải nghiệm đầy đủ tính năng
                </p>
                <Button
                  className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8"
                  onClick={() => window.location.href = '/upgrade'}
                >
                  Xem các gói đăng ký
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500 pl-2">
          Lịch sử thanh toán
        </h3>
        <div className="rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] overflow-hidden shadow-xl">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider pl-6 py-4">
                  Mã đơn
                </TableHead>
                <TableHead className="font-bold text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider">
                  Ngày
                </TableHead>
                <TableHead className="font-bold text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider">
                  Số tiền
                </TableHead>
                <TableHead className="text-right font-bold text-gray-500 dark:text-zinc-400 text-xs uppercase tracking-wider pr-6">
                  Hóa đơn
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingHistory ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
                    Đang tải lịch sử...
                  </TableCell>
                </TableRow>
              ) : paymentHistory?.items?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500 text-sm">
                    Chưa có giao dịch nào
                  </TableCell>
                </TableRow>
              ) : (
                paymentHistory?.items?.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/5 border-b border-gray-200 dark:border-white/5 last:border-none transition-colors"
                  >
                    <TableCell className="font-mono text-xs text-gray-500 dark:text-zinc-500 pl-6 py-4">
                      {item.referenceCode}
                    </TableCell>
                    <TableCell className="font-medium text-sm text-gray-700 dark:text-zinc-300">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="font-black text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("vi-VN").format(item.amount)}đ
                      <div className="text-[10px] font-normal text-gray-400 mt-0.5">
                        {item.planName}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase font-bold border-none px-2 py-0.5 ${
                          item.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : item.status === 'Pending'
                            ? 'bg-amber-500/10 text-amber-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
