"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SubscriptionPlanCard({
  plan,
  index,
  isPopular,
  isUserActive,
  hasAnyActiveSub,
  formatBillingCycle,
  animation,
}: any) {
  const isDisabled = hasAnyActiveSub && !isUserActive;

  const buttonText = isUserActive
    ? "Đang sử dụng"
    : isDisabled
      ? "Đã có gói hoạt động"
      : "Nâng cấp ngay";

  return (
    <motion.div
      initial={animation.initial}
      whileInView={animation.animate}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      className={cn(
        "relative flex w-full h-full",
        isPopular ? "z-20" : "z-10",
        isDisabled && "opacity-80", 
      )}
    >
      <Card
        className={cn(
          "w-full flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 relative border-2",
          isPopular
            ? "bg-white dark:bg-[#0D0D0D] border-orange-500 shadow-[0_20px_50px_rgba(255,122,0,0.2)] md:-translate-y-6"
            : "bg-white dark:bg-white/[0.02] border-gray-100 dark:border-white/5 shadow-xl",
          isUserActive &&
            "border-emerald-500 dark:border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]",
        )}
      >
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
          {isPopular && !isUserActive && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
          )}
        </div>

        {/* Badge cho gói Popular */}
        {isPopular && !isUserActive && !isDisabled && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-none px-4 py-1.5 shadow-lg rounded-full flex items-center gap-1.5 whitespace-nowrap">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span className="font-black tracking-widest text-[10px] uppercase">
                Đề xuất tốt nhất
              </span>
            </Badge>
          </div>
        )}

        {/* Badge cho gói đang sử dụng */}
        {isUserActive && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
            <Badge className="bg-emerald-500 text-white border-none px-4 py-1.5 shadow-lg rounded-full flex items-center gap-1.5 whitespace-nowrap">
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
              <span className="font-black tracking-widest text-[10px] uppercase">
                Gói hiện tại
              </span>
            </Badge>
          </div>
        )}

        <div className="mb-8 mt-2 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
                {plan.name}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em] mt-1">
                Gói Premium
              </p>
            </div>
            {isUserActive ? (
              <Zap className="w-6 h-6 text-emerald-500 fill-emerald-500" />
            ) : (
              isPopular && (
                <Zap className="w-6 h-6 text-orange-500 fill-orange-500" />
              )
            )}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
              {`${(plan.price / 1000).toLocaleString("vi-VN")}K`}
            </span>
            <span className="text-sm font-bold text-gray-500 dark:text-zinc-500">
              {formatBillingCycle(plan.billingCycle)}
            </span>
          </div>
        </div>

        <ul className="space-y-4 mb-10 flex-grow relative z-10 text-left">
          {plan.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                  isUserActive ? "bg-emerald-500" : "bg-orange-500",
                )}
              >
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
              </div>
              <span className="text-sm font-bold text-gray-600 dark:text-zinc-300 leading-tight">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="space-y-3 relative z-10">
          {isUserActive ? (
            <Button
              size="lg"
              asChild
              className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
            >
              <Link href="/profile/edit?tab=billing">{buttonText}</Link>
            </Button>
          ) : (
            <Button
              size="lg"
              asChild={!isDisabled}
              disabled={isDisabled}
              className={cn(
                "w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg",
                isDisabled
                  ? "bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-zinc-600 cursor-not-allowed border border-transparent shadow-none"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25",
              )}
            >
              {isDisabled ? (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> {buttonText}
                </span>
              ) : (
                <Link href={`/payment?planId=${plan.id}`}>{buttonText}</Link>
              )}
            </Button>
          )}

          {isUserActive && (
            <p className="text-[9px] text-center font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">
              Cảm ơn bạn đã đồng hành cùng DEMIF
            </p>
          )}

          {isDisabled && (
            <p className="text-[9px] text-center font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-tighter px-4">
              Bạn đang sử dụng gói Premium khác. Vui lòng hủy gói cũ để thay
              đổi.
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
