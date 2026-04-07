"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Copy,
  Loader2,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useActivePlans } from "@/hooks/use-subscription";
import { useCreatePayment, usePaymentHistory, useCancelPayment } from "@/hooks/use-payment";
import { paymentService } from "@/services/payment.service";
import { extractErrorMessage } from "@/lib/error";
import { PaymentInfoResponse, PaymentStatusResponse } from "@/types/payment.type";

const POLLING_INTERVAL_MS = 3000;

const formatMoney = (amount: number, currency?: string) => {
  const formatted = new Intl.NumberFormat("vi-VN").format(amount);
  return `${formatted} ${currency || "VND"}`;
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("vi-VN");
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const planId = searchParams.get("planId") || "";

  const { data: plans } = useActivePlans();
  const createPaymentMutation = useCreatePayment();
  const { mutate: cancelPayment, isPending: isCanceling } = useCancelPayment();

  const selectedPlan = useMemo(
    () => plans?.find((plan) => plan.id === planId),
    [planId, plans],
  );

  const [paymentReference, setPaymentReference] = useState("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoResponse | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponse | null>(
    null,
  );
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<Date | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasHandledTerminalStatusRef = useRef(false);

  const { data: paymentHistory, isLoading: isLoadingHistory, isFetching: isFetchingHistory } = usePaymentHistory();

  const pendingPayment = useMemo(() => {
    if (!paymentHistory?.items) return null;
    return paymentHistory.items.find(
      (item) => item.status === "Pending" || item.status === "PendingPayment"
    );
  }, [paymentHistory]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const handlePaymentCompleted = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["my-subscription"] }),
      queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
    ]);

    toast.success("Thanh toán thành công. Gói Premium đã được kích hoạt.");
  }, [queryClient]);

  const checkPaymentStatus = useCallback(
    async (reference: string, silent = false) => {
      if (!reference) return;

      if (!silent) {
        setIsCheckingStatus(true);
      }

      try {
        const statusResponse = await paymentService.getPaymentStatus(reference);
        
        // Normalize the payload in case backend only returns `status` strings and not the boolean flags
        const isActuallyCompleted = 
          statusResponse.isCompleted === true || 
          statusResponse.status === "Completed" || 
          statusResponse.status === "Paid";
          
        const isActuallyFailed = 
          statusResponse.isFailed === true || 
          statusResponse.status === "Failed" || 
          statusResponse.status === "Canceled" || 
          statusResponse.status === "Cancelled";

        const normalizedStatus: PaymentStatusResponse = {
          ...statusResponse,
          isCompleted: isActuallyCompleted,
          isFailed: isActuallyFailed,
        };

        setPaymentStatus(normalizedStatus);
        setLastCheckedAt(new Date());

        if (isActuallyCompleted || isActuallyFailed) {
          stopPolling();

          if (!hasHandledTerminalStatusRef.current) {
            hasHandledTerminalStatusRef.current = true;

            if (isActuallyCompleted) {
              await handlePaymentCompleted();
            } else if (isActuallyFailed) {
              toast.error("Giao dịch thất bại. Vui lòng thử lại.");
            }
          }
        }
      } catch (error: any) {
        if (!silent) {
          toast.error("Không thể kiểm tra trạng thái thanh toán", {
            description: extractErrorMessage(error),
          });
        }
      } finally {
        if (!silent) {
          setIsCheckingStatus(false);
        }
      }
    },
    [handlePaymentCompleted, stopPolling],
  );

  const loadPaymentInfo = useCallback(async (reference: string) => {
    setIsLoadingInfo(true);
    try {
      const info = await paymentService.getPaymentInfo(reference);
      setPaymentInfo(info);
    } catch (error: any) {
      toast.error("Không thể tải thông tin chuyển khoản", {
        description: extractErrorMessage(error),
      });
      throw error;
    } finally {
      setIsLoadingInfo(false);
    }
  }, []);

  const startPolling = useCallback(
    (reference: string) => {
      stopPolling();
      pollingRef.current = setInterval(() => {
        void checkPaymentStatus(reference, true);
      }, POLLING_INTERVAL_MS);
    },
    [checkPaymentStatus, stopPolling],
  );

  const handleCreatePayment = useCallback(async () => {
    if (!planId) {
      toast.error("Thiếu planId. Vui lòng quay lại trang nâng cấp.");
      return;
    }

    try {
      setInitError(null);
      hasHandledTerminalStatusRef.current = false;
      stopPolling();
      setPaymentStatus(null);
      setPaymentInfo(null);
      setLastCheckedAt(null);

      const result = await createPaymentMutation.mutateAsync(planId);
      
      if (!result || !result.paymentReference) {
        throw new Error("Không nhận được mã giao dịch từ máy chủ.");
      }
      
      setPaymentReference(result.paymentReference);

      await loadPaymentInfo(result.paymentReference);
      await checkPaymentStatus(result.paymentReference, true);
      if (!hasHandledTerminalStatusRef.current) {
        startPolling(result.paymentReference);
      }

      toast.dismiss();
      toast.success("Đã tạo mã thanh toán. Vui lòng chuyển khoản theo QR.");
    } catch (error: any) {
      toast.dismiss();
      const msg = extractErrorMessage(error, "Lỗi khởi tạo giao dịch.");
      setInitError(msg);
      // Removed redundant toast.error(msg) to prevent notification stacking
    }
  }, [planId, stopPolling, createPaymentMutation, loadPaymentInfo, checkPaymentStatus, startPolling]);

  const handleCancelPayment = useCallback(() => {
    if (!paymentReference) return;
    
    // Stop polling immediately and permanently for this UI session
    stopPolling();
    
    // Optimistic UI: Force failed state locally so user isn't held hostage by slow/failing backend Cancel APIs.
    setPaymentStatus((prev) => prev ? { ...prev, isFailed: true } : {
      amount: 0,
      currency: "VND",
      isCompleted: false,
      isFailed: true,
      lastCheckedAt: new Date().toISOString(),
      referenceCode: paymentReference,
      status: "Failed",
      completedAt: null,
      transactionId: null,
      bankCode: null,
    });

    cancelPayment(paymentReference, {
      onSuccess: () => {
        toast.success("Đã hủy đơn thanh toán thành công");
      },
      onError: () => {
        // Backend cancel might fail, but frontend lets user move on anyway.
        toast.info("Giao dịch đã được hủy trên thiết bị của bạn.");
      }
    });
  }, [paymentReference, stopPolling, cancelPayment]);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`Đã sao chép ${label}.`);
    } catch {
      toast.error("Không thể sao chép. Vui lòng sao chép thủ công.");
    }
  };

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const lastProcessedPlanIdRef = useRef<string | null>(null);

  useEffect(() => {
    // We intentionally removed isFetchingHistory here. If the cache exists and isLoadingHistory is false,
    // we MUST proceed immediately! Otherwise, React Query's background fetch will cause this effect 
    // to miss the initialization window forever.
    if (!planId || isLoadingHistory) return;

    if (lastProcessedPlanIdRef.current === planId) {
      return; // Đã chạy cho gói này rồi
    }

    // Đánh dấu đã chạy để không bị gọi lại bởi StrictMode
    lastProcessedPlanIdRef.current = planId;

    if (pendingPayment) {
      // PRE-FLIGHT CHECK: Avoid resuming if the cache was stale and backend already cancelled it.
      paymentService.getPaymentStatus(pendingPayment.referenceCode)
        .then((status) => {
          if (status.isFailed) {
            // Cache was stale! The transaction has already failed/cancelled on the backend.
            // Proceed to create a brand new payment.
            handleCreatePayment();
          } else {
            // Safe to resume
            setPaymentReference(pendingPayment.referenceCode);
            loadPaymentInfo(pendingPayment.referenceCode).then(() => {
              checkPaymentStatus(pendingPayment.referenceCode, true);
              startPolling(pendingPayment.referenceCode);
            }).catch(() => handleCreatePayment());
            toast.info("Tự động khôi phục giao dịch đang chờ thanh toán.", { duration: 5000 });
          }
        })
        .catch(() => {
           // If checking status errors out entirely, fallback to creating new
           handleCreatePayment();
        });
    } else {
      // Automatically create a new one
      handleCreatePayment();
    }
  }, [
    planId,
    isLoadingHistory,
    isFetchingHistory,
    pendingPayment,
    handleCreatePayment,
    loadPaymentInfo,
    checkPaymentStatus,
    startPolling,
  ]);

  const isCompleted = paymentStatus?.isCompleted === true;
  const isFailed = paymentStatus?.isFailed === true;
  const canPoll = !!paymentReference && !isCompleted && !isFailed;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pb-16 font-mono selection:bg-orange-500/30">
      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            className="hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all"
          >
            <Link href="/upgrade">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Link>
          </Button>
          <Badge className="bg-orange-500/10 text-orange-500 border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold">
            Thanh toán an toàn
          </Badge>
        </div>

        {!planId ? (
          <Card className="p-8 rounded-3xl border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 text-center max-w-lg mx-auto">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
              Không tìm thấy gói thanh toán
            </h2>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-6">
              Vui lòng chọn một gói Premium từ trang nâng cấp để tiếp tục.
            </p>
            <Button
              className="rounded-xl bg-red-500 hover:bg-red-600 text-white"
              onClick={() => router.push("/upgrade")}
            >
              Về trang Upgrade
            </Button>
          </Card>
        ) : initError || createPaymentMutation.isError ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-in fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
              <div className="h-16 w-16 bg-white dark:bg-[#18181b] rounded-2xl flex items-center justify-center border border-red-200 dark:border-red-900/50 shadow-2xl relative z-10">
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <div className="text-center space-y-2 max-w-sm">
              <h3 className="text-lg font-bold text-red-900 dark:text-red-400">
                Lỗi khởi tạo giao dịch
              </h3>
              <p className="text-sm font-medium text-gray-500 dark:text-zinc-500">
                {initError || extractErrorMessage(createPaymentMutation.error, "Bạn đang có giao dịch chờ xử lý hoặc hệ thống bận.")}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-[280px]">
              {pendingPayment && (
                <Button
                  className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                  onClick={() => {
                    toast.dismiss();
                    toast.loading("Đang dọn dẹp giao dịch cũ...", { id: "cleanup-stuck" });
                    cancelPayment(pendingPayment.referenceCode, {
                      onSuccess: () => {
                        toast.success("Đã dọn dẹp thành công! Đang tạo mới...", { id: "cleanup-stuck", duration: 2000 });
                        setTimeout(() => handleCreatePayment(), 500);
                      },
                      onError: () => {
                        toast.error("Không thể hủy giao dịch cũ. Vui lòng thử lại sau.", { id: "cleanup-stuck" });
                      }
                    });
                  }}
                  disabled={isCanceling}
                >
                  {isCanceling ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCcw className="h-4 w-4 mr-2" />
                  )}
                  Gỡ lỗi & Khởi tạo lại
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full rounded-xl border-gray-200 dark:border-white/10"
                onClick={() => router.push("/upgrade")}
              >
                Quay lại trang Gói đăng ký
              </Button>
            </div>
          </div>
        ) : !paymentReference ||
          isLoadingInfo ||
          createPaymentMutation.isPending ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse" />
              <div className="h-16 w-16 bg-white dark:bg-[#18181b] rounded-2xl flex items-center justify-center border border-gray-200 dark:border-white/10 shadow-2xl relative z-10">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Đang khởi tạo giao dịch...
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-500">
                Hệ thống đang thiết lập kết nối an toàn với ngân hàng.
              </p>
            </div>
          </div>
        ) : paymentInfo ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {!paymentStatus?.isCompleted && !paymentStatus?.isFailed && (
              <>
                <div className="text-center space-y-2 mb-8">
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                    Hoàn tất <span className="text-orange-500">thanh toán</span>
                  </h1>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base">
                    Quét mã QR qua ứng dụng ngân hàng để tự động kích hoạt gói{" "}
                    <strong className="text-gray-900 dark:text-white">
                      {selectedPlan?.name || "Premium"}
                    </strong>
                    .
                  </p>
                </div>

                <Card className="rounded-[2.5rem] p-8 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] pointer-events-none rounded-full" />
                  
                  <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                    {/* Cột QR Code */}
                    <div className="flex flex-col items-center space-y-6">
                      <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100">
                        <img
                          src={paymentInfo.qrCodeUrl}
                          alt="VietQR Payment"
                          className="w-full max-w-[240px] aspect-square object-cover rounded-xl"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-xl text-xs font-medium border border-amber-200/50 dark:border-amber-500/20">
                        <Clock3 className="h-4 w-4 animate-pulse" />
                        Đang chờ bạn quét mã...
                      </div>
                    </div>

                    {/* Cột Thông tin */}
                    <div className="space-y-6">
                      <div className="pb-6 border-b border-gray-100 dark:border-white/5 space-y-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                          Số tiền cần thanh toán
                        </p>
                        <p className="text-4xl font-black text-orange-500">
                          {formatMoney(paymentInfo.amount, paymentInfo.currency)}
                        </p>
                      </div>

                      <div className="space-y-4 text-sm">
                        <div className="flex flex-col space-y-1">
                          <span className="text-gray-500 dark:text-zinc-500 text-xs">
                            Ngân hàng thụ hưởng
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {paymentInfo.bankCode}
                          </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <span className="text-gray-500 dark:text-zinc-500 text-xs">
                            Chủ tài khoản
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {paymentInfo.accountName}
                          </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <span className="text-gray-500 dark:text-zinc-500 text-xs">
                            Số tài khoản
                          </span>
                          <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                            <span className="font-mono font-bold text-gray-900 dark:text-white text-base">
                              {paymentInfo.accountNumber}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 hover:bg-orange-500/10 hover:text-orange-500 text-gray-500"
                              onClick={() =>
                                handleCopy(
                                  paymentInfo.accountNumber,
                                  "số tài khoản"
                                )
                              }
                            >
                              <Copy className="h-4 w-4 mr-1.5" /> Copy
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <span className="text-gray-500 dark:text-zinc-500 text-xs">
                            Nội dung chuyển khoản (Bắt buộc)
                          </span>
                          <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-500/10 p-3 rounded-xl border border-orange-200 dark:border-orange-500/20">
                            <span className="font-mono font-black tracking-wider text-orange-600 dark:text-orange-400 text-base">
                              {paymentInfo.transferContent}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 bg-white dark:bg-[#18181b] shadow-sm hover:bg-orange-100 dark:hover:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                              onClick={() =>
                                handleCopy(
                                  paymentInfo.transferContent,
                                  "nội dung"
                                )
                              }
                            >
                              <Copy className="h-4 w-4 mr-1.5" /> Copy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Trạng thái giao dịch */}
            <AnimateTransactionStatus 
              isCompleted={isCompleted} 
              isFailed={isFailed} 
              router={router} 
              lastCheckedAt={lastCheckedAt} 
              onCancel={handleCancelPayment}
              isCanceling={isCanceling}
            />
          </div>
        ) : (
          <div className="text-center text-red-500 p-10 bg-red-50 dark:bg-red-500/10 rounded-2xl">
            Có lỗi xảy ra khi tải thông tin thanh toán.
          </div>
        )}
      </main>
    </div>
  );
}

function AnimateTransactionStatus({ isCompleted, isFailed, router, lastCheckedAt, onCancel, isCanceling }: any) {
  if (isCompleted) {
    return (
      <div className="p-6 rounded-[2rem] bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex flex-col md:flex-row items-center gap-6 justify-between animate-in slide-in-from-bottom-4 fade-in">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-emerald-800 dark:text-emerald-300 font-bold text-lg">
              Thanh toán thành công!
            </h3>
            <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">
              Gói Premium đã được kích hoạt trên hệ thống.
            </p>
          </div>
        </div>
        <Button
          className="rounded-xl w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-12"
          onClick={() => router.push("/profile/edit")}
        >
          Khám phá ngay
        </Button>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="p-6 rounded-[2rem] bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex flex-col md:flex-row items-center gap-6 justify-between animate-in slide-in-from-bottom-4 fade-in">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30">
            <XCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-red-800 dark:text-red-300 font-bold text-lg">
              Giao dịch bị hủy hoặc thất bại
            </h3>
            <p className="text-sm text-red-600/80 dark:text-red-400/80">
              Vui lòng thử tạo lại giao dịch mới từ trang nâng cấp.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="rounded-xl w-full md:w-auto font-bold h-12"
          onClick={() => router.push("/upgrade")}
        >
          Xem các gói
        </Button>
      </div>
    );
  }

  // Pending
  return (
    <div className="p-5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 mx-auto max-w-2xl px-6">
      <div className="flex flex-col gap-1 items-start">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-zinc-300 font-medium">
          <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
          <span>Hệ thống đang chờ nhận thanh toán...</span>
        </div>
        <div className="text-xs text-gray-400 dark:text-zinc-500 pl-7">
          Cập nhật: {lastCheckedAt ? lastCheckedAt.toLocaleTimeString("vi-VN") : "00:00:00"}
        </div>
      </div>
      <Button
        variant="outline"
        className="h-10 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 border-red-200 dark:border-red-900/50"
        onClick={onCancel}
        disabled={isCanceling}
      >
        {isCanceling ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <XCircle className="h-4 w-4 mr-2" />
        )}
        Hủy giao dịch
      </Button>
    </div>
  );
}
