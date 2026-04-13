"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FreePlanRow({
  plan,
  isCurrent,
  canPurchase,
  onActivate,
  isPending,
}: any) {
  const isTrial = plan.billingCycle?.toLowerCase().includes("trial");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="w-full flex flex-col md:flex-row items-center justify-between p-8 md:p-10 rounded-[2.5rem] bg-gray-50/50 dark:bg-white/[0.01] border-dashed border-2 border-gray-200 dark:border-white/10">
        <div className="flex-1 mb-8 md:mb-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-sm">
              <Sparkles className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                  {plan.name}
                </h3>
                <Badge
                  variant="secondary"
                  className="text-[9px] font-black uppercase bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500 border-none"
                >
                  {isTrial ? "Dùng thử" : "Mãi mãi"}
                </Badge>
              </div>
              <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium mt-1">
                {isTrial
                  ? "Trải nghiệm Premium không giới hạn"
                  : "Khởi đầu hành trình học tập miễn phí"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {plan.features.slice(0, 3).map((feat: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest"
              >
                <Check
                  className="w-3.5 h-3.5 text-emerald-500"
                  strokeWidth={3}
                />{" "}
                {feat}
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => onActivate(plan.id)}
          disabled={isPending || (!isCurrent && !canPurchase)}
          variant={isCurrent ? "outline" : "default"}
          className={cn(
            "w-full md:w-auto h-14 px-10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all",
            isCurrent
              ? "border-emerald-500 text-emerald-500 bg-emerald-500/5"
              : "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-100 shadow-xl",
          )}
        >
          {isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
          {isCurrent
            ? "Đang sử dụng"
            : !canPurchase
              ? "Đã có gói"
              : "Kích hoạt miễn phí"}
        </Button>
      </Card>
    </motion.div>
  );
}
