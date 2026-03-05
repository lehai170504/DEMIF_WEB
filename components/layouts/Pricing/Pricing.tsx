// src/components/layouts/Pricing/Pricing.tsx (hoặc đường dẫn tương ứng)
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useActivePlans } from "@/hooks/use-subscription";

export function Pricing() {
  const { data: plans, isLoading } = useActivePlans();

  // Helper function to format billing cycle
  const formatBillingCycle = (cycle: string) => {
    // Handle both number string ("0", "1", "2") and text string
    const cycleMap: Record<string, string> = {
      "0": "/năm",
      "1": "/tháng", 
      "2": "/vĩnh viễn",
      "Monthly": "/tháng",
      "Yearly": "/năm",
      "Lifetime": "/vĩnh viễn"
    };
    return cycleMap[cycle] || "/tháng";
  };
  return (
    <section
      id="pricing"
      className="relative container mx-auto px-4 py-24 font-mono"
    >
      {/* Background Glow phía sau */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Badge className="mb-6 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-orange-600 dark:text-[#FF7A00] border border-orange-500/50 dark:border-[#FF7A00]/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,122,0,0.1)]">
          Bảng giá
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
          Chọn lộ trình <span className="text-[#FF7A00]">học tập</span> của bạn
        </h2>
        <p className="text-gray-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Các gói linh hoạt được thiết kế để phù hợp với hành trình học ngôn ngữ
          của bạn.
        </p>
      </motion.div>

      {/* PRICING CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        {isLoading ? (
          // Loading state
          <div className="col-span-full flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
            <span className="ml-4 text-gray-600 dark:text-zinc-400 font-medium">
              Đang tải gói đăng ký...
            </span>
          </div>
        ) : plans && plans.length > 0 ? (
          // Display plans from API
          plans
            .filter((plan) => plan.isActive !== false) // Chỉ filter out nếu isActive = false
            .sort((a, b) => a.price - b.price) // Sắp xếp theo giá tăng dần
            .map((plan, index) => {
              const isPopular = plan.badgeText?.toLowerCase().includes("phổ biến") || 
                                plan.badgeText?.toLowerCase().includes("được đề xuất");
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : index === 1 ? 0 : 20, y: index === 1 ? 30 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={index === 1 ? "relative" : ""}
                >
                  {/* Glow Effect for middle card */}
                  {isPopular && (
                    <div className="absolute inset-0 bg-[#FF7A00] blur-3xl opacity-20 rounded-3xl -z-10" />
                  )}

                  <Card
                    className={
                      isPopular
                        ? "p-8 bg-gradient-to-b from-orange-50 to-white dark:from-[#FF7A00]/20 dark:to-black/80 border border-[#FF7A00]/50 relative shadow-2xl shadow-orange-500/30 dark:shadow-orange-900/40 rounded-3xl transform scale-105 z-10 backdrop-blur-xl"
                        : "p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#FF7A00]/30 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm rounded-3xl shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none"
                    }
                  >
                    {/* Badge */}
                    {plan.badgeText && isPopular && (
                      <Badge 
                        className="absolute -top-4 left-1/2 -translate-x-1/2 border-none text-white px-4 py-1 shadow-lg"
                        style={{
                          backgroundColor: plan.badgeColor || "#FF7A00",
                          boxShadow: `0 10px 25px -5px ${plan.badgeColor || "#FF7A00"}40`
                        }}
                      >
                        <Star className="w-3 h-3 mr-1 fill-white" /> {plan.badgeText}
                      </Badge>
                    )}

                    <div className={isPopular ? "mb-6 text-center" : "mb-6"}>
                      <h3 className={`text-2xl font-bold mb-2 text-gray-900 dark:text-white ${
                        isPopular ? "flex items-center justify-center gap-2" : ""
                      }`}>
                        {plan.name}
                        {isPopular && <Zap className="w-5 h-5 text-[#FFD056] fill-[#FFD056]" />}
                      </h3>
                      <p className={isPopular ? "text-orange-600 dark:text-orange-200/80" : "text-gray-600 dark:text-zinc-400"}>
                        {plan.tier}
                      </p>
                    </div>

                    <div className={`mb-8 ${
                      isPopular 
                        ? "text-center bg-orange-100/50 dark:bg-white/5 py-4 rounded-2xl border border-orange-200 dark:border-white/10" 
                        : ""
                    }`}>
                      <div className={`flex items-baseline gap-2 ${isPopular ? "justify-center" : ""}`}>
                        <span className={`font-bold text-gray-900 dark:text-white ${
                          isPopular ? "text-5xl tracking-tight" : "text-4xl"
                        }`}>
                          {plan.price === 0 
                            ? "0đ" 
                            : `${Math.floor(plan.price / 1000)}${plan.price >= 1000 ? "K" : "đ"}`
                          }
                        </span>
                        <span className="text-gray-600 dark:text-zinc-400">
                          {formatBillingCycle(plan.billingCycle)}
                        </span>
                      </div>
                      {(plan.billingCycle === "Yearly" || plan.billingCycle === "0") && plan.price > 0 && (
                        <p className="text-sm text-[#FF7A00] mt-2 font-bold">
                          Chỉ ~{Math.floor(plan.price / 12 / 1000)}K / tháng
                        </p>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 text-sm ${
                            isPopular 
                              ? "text-gray-900 dark:text-white" 
                              : "text-gray-700 dark:text-zinc-300"
                          }`}
                        >
                          {isPopular ? (
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-[#FF7A00] flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                          ) : (
                            <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                          )}
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={
                        isPopular
                          ? "w-full bg-[#FF7A00] hover:bg-[#FF8A10] text-white font-bold h-12 shadow-lg shadow-orange-900/40 border-t border-white/20"
                          : "w-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
                      }
                      size="lg"
                      asChild
                    >
                      <Link href={plan.price === 0 ? "/signup" : "/signup"}>
                        {plan.price === 0 ? "Tham gia Miễn phí" : "Bắt đầu ngay"}
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              );
            })
        ) : (
          // Fallback: No plans
          <div className="col-span-full text-center py-20">
            <p className="text-gray-600 dark:text-zinc-400 font-medium">
              Hiện chưa có gói đăng ký nào.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
