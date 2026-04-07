"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Check,
  Star,
  Zap,
  Crown,
  Shield,
  Mic,
  Headphones,
  Loader2,
  Info,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useActivePlans, useMySubscription } from "@/hooks/use-subscription";

export default function UpgradePage() {
  const {
    data: plans,
    isLoading: isLoadingPlans,
    error: plansError,
  } = useActivePlans();
  const { data: mySubscription } = useMySubscription();

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
    return (
      mySubscription?.planName === plan.name && mySubscription?.status === "Active"
    );
  };

  // Tách dữ liệu: Gói miễn phí và Gói trả phí
  const freePlan = plans?.find((p) => p.price === 0 && p.isActive !== false);
  const paidPlans = plans
    ?.filter((p) => p.price > 0 && p.isActive !== false)
    .sort((a, b) => a.price - b.price);

  // Logic hiệu ứng trượt tương tự trang mẫu
  const getCardAnimation = (index: number, total: number) => {
    if (index === 0)
      return { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } };
    if (index === total - 1)
      return { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } };
    return { initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 } };
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-[400px] bg-[#FF7A00]/5 blur-[120px] rounded-full -z-10" />
      </div>

      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-16 max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-[#FF7A00]/10 text-[#FF7A00] border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold">
              Bảng giá Premium
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.1]">
              Đầu tư cho{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
                tương lai
              </span>
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base font-medium">
              Nâng cấp để mở khóa toàn bộ sức mạnh của AI Mentor trong việc
              luyện nghe & nói.
            </p>
          </motion.div>
        </div>

        {isLoadingPlans ? (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">
              Đang tải gói đăng ký...
            </p>
          </div>
        ) : plansError ? (
          <div className="text-center py-20 text-red-500 font-bold">
            Không thể tải danh sách gói. Vui lòng thử lại sau.
          </div>
        ) : (
          <div className="max-w-6xl mx-auto w-full">
            {/* --- PHẦN 1: CÁC GÓI TRẢ PHÍ (GRID 3 CỘT) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
              {paidPlans?.map((plan, index) => {
                const isPopular =
                  plan.badgeText?.toLowerCase().includes("phổ biến") ||
                  plan.badgeText?.toLowerCase().includes("đề xuất");
                const anim = getCardAnimation(index, paidPlans.length);
                const isUserActive = isCurrentPlan(plan);

                return (
                  <motion.div
                    key={plan.id}
                    initial={anim.initial}
                    whileInView={anim.animate}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: index * 0.15,
                    }}
                    className={cn(
                      "relative flex w-full",
                      isPopular ? "md:-translate-y-4 z-10" : "z-0",
                    )}
                  >
                    {isPopular && (
                      <div className="absolute inset-0 bg-[#FF7A00] blur-2xl opacity-10 dark:opacity-20 rounded-[3rem] -z-10" />
                    )}

                    <Card
                      className={cn(
                        "w-full flex flex-col p-8 rounded-[2.5rem] transition-all duration-500",
                        isPopular
                          ? "bg-gray-900 dark:bg-[#0a0a0a] border-[#FF7A00]/50 shadow-[0_20px_50px_rgba(255,122,0,0.15)]"
                          : "bg-white dark:bg-white/[0.03] border-gray-200 dark:border-white/10 hover:border-[#FF7A00]/30 shadow-sm",
                      )}
                    >
                      {plan.badgeText && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge
                            className={cn(
                              "border-none px-4 py-1.5 shadow-lg rounded-full flex items-center gap-1.5",
                              isPopular
                                ? "bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] text-white"
                                : "bg-gray-200 dark:bg-white/20 text-gray-800 dark:text-white",
                            )}
                          >
                            {isPopular && (
                              <Star className="w-3.5 h-3.5 fill-white" />
                            )}
                            <span className="font-bold tracking-wide text-[10px] uppercase">
                              {plan.badgeText}
                            </span>
                          </Badge>
                        </div>
                      )}

                      <div className="mb-6 mt-2">
                        <div className="flex justify-between items-center mb-4">
                          <h3
                            className={cn(
                              "text-xl font-black",
                              isPopular
                                ? "text-white"
                                : "text-gray-900 dark:text-white",
                            )}
                          >
                            {plan.name}
                          </h3>
                          {isPopular && (
                            <Zap className="w-5 h-5 text-[#FF7A00] fill-[#FF7A00]" />
                          )}
                        </div>
                        <div className="flex items-end gap-1 mb-2">
                          <span
                            className={cn(
                              "font-black tracking-tighter text-4xl",
                              isPopular
                                ? "text-white"
                                : "text-gray-900 dark:text-white",
                            )}
                          >
                            {`${(plan.price / 1000).toLocaleString("vi-VN")}K`}
                          </span>
                          <span
                            className={cn(
                              "font-bold mb-1 text-sm",
                              isPopular
                                ? "text-white/60"
                                : "text-gray-500 dark:text-zinc-500",
                            )}
                          >
                            {formatBillingCycle(plan.billingCycle)}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8 flex-grow">
                        {plan.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-xs md:text-sm font-medium"
                          >
                            <div
                              className={cn(
                                "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                                isPopular ? "bg-[#FF7A00]" : "bg-orange-500/10",
                              )}
                            >
                              <Check
                                className={cn(
                                  "w-2.5 h-2.5",
                                  isPopular ? "text-white" : "text-[#FF7A00]",
                                )}
                                strokeWidth={3}
                              />
                            </div>
                            <span
                              className={
                                isPopular
                                  ? "text-white/90"
                                  : "text-gray-700 dark:text-zinc-300"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        size="lg"
                        asChild={!isUserActive}
                        disabled={isUserActive}
                        className={cn(
                          "w-full h-12 rounded-xl font-bold text-sm transition-all duration-300",
                          isUserActive
                            ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 cursor-default"
                            : isPopular
                              ? "bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:from-[#FF8A10] text-white shadow-lg shadow-[#FF7A00]/25"
                              : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10",
                        )}
                      >
                        {isUserActive ? (
                          <span>Gói hiện tại</span>
                        ) : (
                          <Link href={`/payment?planId=${plan.id}`}>
                            Nâng cấp ngay
                          </Link>
                        )}
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* --- PHẦN 2: GÓI MIỄN PHÍ (DÀI NGANG) --- */}
            {freePlan && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.5,
                }}
              >
                <Card className="w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-10 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 shadow-sm">
                  <div className="flex-1 mb-6 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-gray-200 dark:bg-white/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                          {freePlan.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-[10px] font-bold uppercase dark:border-white/20"
                        >
                          Miễn phí trọn đời
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium max-w-md">
                      Bắt đầu hành trình của bạn với các tính năng cơ bản. Luôn
                      miễn phí, không cần thẻ tín dụng.
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {freePlan.features.slice(0, 2).map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest"
                        >
                          <Check className="w-4 h-4 text-emerald-500" /> {feat}
                        </div>
                      ))}
                    </div>
                    <Button
                      size="lg"
                      className="w-full md:w-auto bg-white dark:bg-[#111111] hover:bg-gray-100 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 font-bold rounded-xl h-12 px-8 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Đã kích hoạt
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        )}

        {/* --- FOOTER: TRUST BADGE --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 max-w-2xl">
            <Shield className="w-10 h-10 text-orange-500/50" />
            <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">
              Hệ thống thanh toán bảo mật 256-bit. Cam kết hoàn tiền trong 7
              ngày nếu không hài lòng. <br />
              Bạn có thể hủy đăng ký bất kỳ lúc nào chỉ với một cú nhấp chuột.
            </p>
            <Link
              href="/faq"
              className="text-[#FF7A00] font-black hover:text-orange-400 text-xs uppercase tracking-[0.2em] border-b-2 border-orange-500/20 pb-1"
            >
              Tìm hiểu thêm chính sách
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
