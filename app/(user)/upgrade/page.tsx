"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Shield, Loader2 } from "lucide-react";
import { useActivePlans, useMySubscription } from "@/hooks/use-subscription";
import {
  useCreatePayment,
  usePaymentHistory,
  useCancelPayment,
} from "@/hooks/use-payment";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { extractErrorMessage } from "@/lib/error";

import { SubscriptionPlanCard } from "@/components/subscription/SubscriptionPlanCard";

export default function UpgradePage() {
  const {
    data: plans,
    isLoading: isLoadingPlans,
    error: plansError,
  } = useActivePlans();
  const { data: mySubscription } = useMySubscription();
  const queryClient = useQueryClient();

  const subscribeMutation = useCreatePayment();
  const { data: paymentHistory } = usePaymentHistory();
  const cancelMutation = useCancelPayment();

  // --- HELPERS ---
  const formatBillingCycle = (cycle: string) => {
    const cycleMap: Record<string, string> = {
      "0": "/năm",
      "1": "/tháng",
      "2": "/vĩnh viễn",
      Monthly: "/tháng",
      Yearly: "/năm",
      Lifetime: "/vĩnh viễn",
    };
    return cycleMap[cycle] || "";
  };

  const isCurrentPlan = (plan: any) => {
    const status = mySubscription?.status?.toLowerCase();
    return (
      (mySubscription?.planName === plan.name ||
        mySubscription?.plan?.name === plan.name) &&
      (status === "active" || status === "trialing")
    );
  };

  // Chỉ coi là có gói hoạt động nếu status là Active hoặc Trialing (đã confirm)
  const hasAnyActiveSub =
    !!mySubscription &&
    (!!mySubscription.planName || !!mySubscription.planId) &&
    ["Active", "active", "trialing", "Trialing"].includes(
      mySubscription.status,
    );

  // Kiểm tra xem có bất kỳ giao dịch nào đang chờ không
  const hasAnyPendingSub = !!paymentHistory?.items?.some((tx: any) =>
    ["Pending", "PendingPayment"].includes(tx.status),
  );

  const handleActivateFreePlan = async (planId: string) => {
    try {
      toast.loading("Đang xử lý kích hoạt...", { id: "activate-free" });
      const pendingTx = paymentHistory?.items?.find(
        (tx: any) =>
          tx.planId === planId &&
          ["Pending", "PendingPayment"].includes(tx.status),
      );

      if (pendingTx) {
        await cancelMutation.mutateAsync(pendingTx.referenceCode);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      await subscribeMutation.mutateAsync(planId);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["my-subscription"] }),
        queryClient.invalidateQueries({
          queryKey: ["active-subscription-plans"],
        }),
        queryClient.invalidateQueries({ queryKey: ["payment-history"] }),
      ]);

      toast.success("Kích hoạt gói thành công!", { id: "activate-free" });
    } catch (error: any) {
      toast.error(extractErrorMessage(error, "Lỗi kích hoạt gói dùng thử."), {
        id: "activate-free",
      });
    }
  };

  const paidPlans = plans
    ?.filter((p) => p.price > 0 && p.isActive !== false)
    .sort((a, b) => a.price - b.price);

  const freePlans = plans?.filter((p) => p.price === 0 && p.isActive !== false);

  if (isLoadingPlans)
    return (
      <div className="h-screen flex flex-col justify-center items-center font-mono bg-white dark:bg-[#050505]">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
        <p className="text-xs font-black uppercase tracking-widest animate-pulse">
          Đang kết nối vệ tinh...
        </p>
      </div>
    );

  if (plansError)
    return (
      <div className="h-screen flex flex-col justify-center items-center font-mono bg-white dark:bg-[#050505]">
        <p className="text-red-500 font-bold uppercase tracking-widest">
          Không thể tải thông tin gói cước.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono pb-24 relative overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-orange-500/5 blur-[120px] rounded-full -z-10" />

      <main className="container mx-auto px-4 pt-20">
        <div className="text-center mb-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-orange-500/10 text-orange-500 border-none px-4 py-1.5 rounded-full uppercase tracking-[0.3em] text-[9px] font-black mb-6">
              Pricing Plans
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-gray-900 dark:text-white">
              Mở khóa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                giới hạn
              </span>
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
              Đầu tư vào kiến thức là khoản đầu tư sinh lời nhất. Chọn gói
              Premium phù hợp để bứt phá kỹ năng ngoại ngữ ngay hôm nay.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24 items-stretch relative z-10">
            {paidPlans?.map((plan, index) => {
              const isPopular =
                plan.badgeText?.toLowerCase().includes("phổ biến") ||
                plan.badgeText?.toLowerCase().includes("đề xuất");

              // Tìm xem gói này có đang chờ thanh toán không (Match bằng name vì history item không có planId)
              const pendingTx = paymentHistory?.items?.find(
                (tx: any) =>
                  tx.planName === plan.name &&
                  ["Pending", "PendingPayment"].includes(tx.status),
              );

              return (
                <SubscriptionPlanCard
                  key={plan.id}
                  plan={plan}
                  index={index}
                  isPopular={isPopular}
                  isUserActive={isCurrentPlan(plan)}
                  isPending={!!pendingTx}
                  pendingReference={pendingTx?.referenceCode}
                  hasAnyActiveSub={hasAnyActiveSub}
                  hasAnyPendingSub={hasAnyPendingSub}
                  formatBillingCycle={formatBillingCycle}
                  animation={
                    index === 0
                      ? {
                          initial: { opacity: 0, x: -50 },
                          animate: { opacity: 1, x: 0 },
                        }
                      : index === 2
                        ? {
                            initial: { opacity: 0, x: 50 },
                            animate: { opacity: 1, x: 0 },
                          }
                        : {
                            initial: { opacity: 0, y: 50 },
                            animate: { opacity: 1, y: 0 },
                          }
                  }
                />
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center pt-10"
          >
            <div className="p-8 rounded-[3rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 flex flex-col items-center gap-5 text-center max-w-3xl shadow-sm">
              <Shield className="w-12 h-12 text-orange-500/20" />
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-zinc-200 text-sm font-black uppercase tracking-widest">
                  Thanh toán an toàn & Bảo mật
                </p>
                <p className="text-gray-500 dark:text-zinc-500 text-sm font-medium leading-relaxed">
                  Chúng tôi sử dụng cổng thanh toán SEPay đạt chuẩn quốc tế. Cam
                  kết hoàn tiền trong vòng 7 ngày nếu dịch vụ không đạt kỳ vọng
                  của bạn.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
