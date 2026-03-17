"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Loader2, Info, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useActivePlans } from "@/hooks/use-subscription";

export default function Pricing() {
  const { data: plans, isLoading } = useActivePlans();

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

  const freePlan = plans?.find((p) => p.price === 0 && p.isActive !== false);

  let paidPlans = plans
    ?.filter((p) => p.price > 0 && p.isActive !== false)
    .sort((a, b) => a.price - b.price);

  if (paidPlans && paidPlans.length >= 3) {
    const popularIndex = paidPlans.findIndex(
      (plan) =>
        plan.badgeText?.toLowerCase().includes("phổ biến") ||
        plan.badgeText?.toLowerCase().includes("đề xuất"),
    );
    const middleIndex = Math.floor(paidPlans.length / 2);

    if (popularIndex !== -1 && popularIndex !== middleIndex) {
      const popularPlan = paidPlans.splice(popularIndex, 1)[0];
      paidPlans.splice(middleIndex, 0, popularPlan);
    }
  }

  // --- CẤU HÌNH HIỆU ỨNG TRƯỢT (SLIDE ANIMATIONS) ---
  const getCardAnimation = (index: number, total: number) => {
    // Thẻ đầu tiên (trái): Trượt từ trái qua
    if (index === 0)
      return {
        initial: { opacity: 0, x: -80, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
      };
    // Thẻ cuối cùng (phải): Trượt từ phải qua
    if (index === total - 1)
      return {
        initial: { opacity: 0, x: 80, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
      };
    // Các thẻ ở giữa: Trượt từ dưới lên (nếu có 3 thẻ, thẻ phổ biến sẽ ở giữa)
    return {
      initial: { opacity: 0, y: 80, x: 0 },
      animate: { opacity: 1, y: 0, x: 0 },
    };
  };

  return (
    <section
      id="pricing"
      className="relative w-full h-full flex flex-col justify-center py-12 md:py-24 font-mono overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-[400px] bg-[#FF7A00]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* HEADER BẢNG GIÁ */}
      <div className="text-center mb-16 max-w-2xl mx-auto px-4 relative z-10 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -30 }} // Header trượt nhẹ từ trên xuống
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge className="mb-4 bg-[#FF7A00]/10 text-[#FF7A00] border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold">
            Bảng giá Premium
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white tracking-tighter">
            Đầu tư cho{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
              tương lai
            </span>
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base font-medium">
            Nâng cấp để mở khóa toàn bộ sức mạnh của AI Mentor.
          </p>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-20 flex-grow">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF7A00] mb-4" />
          <p className="text-sm text-zinc-500 animate-pulse font-medium">
            Đang tải gói...
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6">
          {/* ==================================================== */}
          {/* PHẦN 1: 3 GÓI TRẢ PHÍ (HIỆU ỨNG SLIDE TỪ 2 BÊN & DƯỚI)*/}
          {/* ==================================================== */}
          {paidPlans && paidPlans.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12 overflow-visible px-2 py-4">
              {paidPlans.map((plan, index) => {
                const isPopular =
                  plan.badgeText?.toLowerCase().includes("phổ biến") ||
                  plan.badgeText?.toLowerCase().includes("đề xuất");

                const anim = getCardAnimation(index, paidPlans.length);

                return (
                  <motion.div
                    key={plan.id}
                    initial={anim.initial}
                    whileInView={anim.animate}
                    viewport={{ once: true, margin: "-50px" }}
                    // Sử dụng type: "spring" cho hiệu ứng trượt có độ nảy nhẹ, tự nhiên
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: index * 0.15, // Delay so le giữa các thẻ
                    }}
                    className={`relative flex w-full ${isPopular ? "md:-translate-y-4 z-10" : "z-0"}`}
                  >
                    {isPopular && (
                      <div className="absolute inset-0 bg-[#FF7A00] blur-2xl opacity-10 dark:opacity-20 rounded-[3rem] -z-10" />
                    )}

                    <Card
                      className={`w-full flex flex-col p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 ${
                        isPopular
                          ? "bg-gray-900 dark:bg-[#0a0a0a] border-[#FF7A00]/50 shadow-[0_20px_50px_rgba(255,122,0,0.15)]"
                          : "bg-white dark:bg-white/[0.03] border-gray-200 dark:border-white/10 hover:border-[#FF7A00]/30 hover:bg-gray-50 dark:hover:bg-white/[0.05] shadow-sm"
                      }`}
                    >
                      {/* Badge Phổ Biến */}
                      {plan.badgeText && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge
                            className={`border-none px-4 py-1.5 shadow-lg rounded-full flex items-center gap-1.5 ${isPopular ? "bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] text-white" : "bg-gray-200 dark:bg-white/20 text-gray-800 dark:text-white"}`}
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

                      {/* Header Gói */}
                      <div className="mb-6 shrink-0 mt-2">
                        <div className="flex justify-between items-center mb-4">
                          <h3
                            className={`text-xl font-black ${isPopular ? "text-white" : "text-gray-900 dark:text-white"}`}
                          >
                            {plan.name}
                          </h3>
                          {isPopular && (
                            <Zap className="w-5 h-5 text-[#FF7A00] fill-[#FF7A00]" />
                          )}
                        </div>

                        <div className="flex items-end gap-1 mb-2">
                          <span
                            className={`font-black tracking-tighter text-4xl ${isPopular ? "text-white" : "text-gray-900 dark:text-white"}`}
                          >
                            {`${(plan.price / 1000).toLocaleString("vi-VN")}K`}
                          </span>
                          <span
                            className={`font-bold mb-1 text-sm ${isPopular ? "text-white/60" : "text-gray-500 dark:text-zinc-500"}`}
                          >
                            {formatBillingCycle(plan.billingCycle)}
                          </span>
                        </div>

                        {plan.billingCycle === "0" && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                            <Info className="w-3 h-3" /> Lựa chọn kinh tế nhất
                          </div>
                        )}
                      </div>

                      {/* Tính năng */}
                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-xs md:text-sm font-medium"
                          >
                            <div
                              className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isPopular ? "bg-[#FF7A00]" : "bg-orange-500/10"}`}
                            >
                              <Check
                                className={`w-2.5 h-2.5 ${isPopular ? "text-white" : "text-[#FF7A00]"}`}
                                strokeWidth={3}
                              />
                            </div>
                            <span
                              className={`leading-snug ${isPopular ? "text-white/90" : "text-gray-700 dark:text-zinc-300"}`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Nút Mua */}
                      <Button
                        size="lg"
                        asChild
                        className={`w-full h-12 rounded-xl font-bold text-sm transition-all duration-300 ${
                          isPopular
                            ? "bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:from-[#FF8A10] hover:to-[#FFAE45] text-white shadow-lg shadow-[#FF7A00]/25 border-none"
                            : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
                        }`}
                      >
                        <Link href="/signup">Nâng cấp ngay</Link>
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* ==================================================== */}
          {/* PHẦN 2: GÓI MIỄN PHÍ (SLIDE TỪ DƯỚI LÊN SAU CÙNG)    */}
          {/* ==================================================== */}
          {freePlan && (
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Slide rõ rệt từ dưới lên
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.5,
              }}
            >
              <Card className="w-full flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-[2rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm">
                <div className="flex-1 mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                      {freePlan.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-bold uppercase dark:border-white/20"
                    >
                      0đ / Mãi mãi
                    </Badge>
                  </div>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">
                    Trải nghiệm sức mạnh của AI với các tính năng cơ bản. Không
                    cần thẻ tín dụng.
                  </p>
                </div>

                <div className="flex-1 w-full md:w-auto flex flex-col md:flex-row items-center gap-6 md:justify-end">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-6 w-full md:w-auto">
                    {freePlan.features.slice(0, 2).map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-zinc-400"
                      >
                        <Check className="w-3 h-3 text-gray-400" /> {feat}
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    asChild
                    className="w-full md:w-auto shrink-0 bg-white dark:bg-[#111111] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 font-bold rounded-xl h-12"
                  >
                    <Link href="/signup">Bắt đầu dùng thử</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
