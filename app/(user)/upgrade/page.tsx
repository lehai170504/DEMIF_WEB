"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown, Shield, Mic, Headphones, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useActivePlans, useMySubscription } from "@/hooks/use-subscription";
import { SubscriptionPlanDto } from "@/types/subscription.type";

export default function UpgradePage() {
  const { data: plans, isLoading: isLoadingPlans, error: plansError } = useActivePlans();
  const { data: mySubscription, isLoading: isLoadingSubscription } = useMySubscription();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50 },
    },
  };

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
    return cycleMap[cycle] || "";
  };

  // Helper function to check if user has this plan
  const isCurrentPlan = (planId: string) => {
    return mySubscription?.planId === planId && mySubscription?.status === "Active";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* --- HEADER --- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-white/5 border border-orange-200 dark:border-white/10 text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md"
          >
            <Crown className="w-3.5 h-3.5 fill-current" /> Premium Access
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter text-gray-900 dark:text-white leading-[1.1]"
          >
            Làm Chủ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Tiếng Anh
            </span>{" "}
            <br className="hidden md:block" /> Cùng AI
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Tối ưu hóa khả năng Nghe & Nói với công nghệ AI tiên tiến.
            <br className="hidden md:block" /> Mở khóa toàn bộ bài tập Dictation
            & Shadowing ngay hôm nay.
          </motion.p>
        </motion.div>

        {/* --- CURRENT SUBSCRIPTION --- */}
        {mySubscription && mySubscription.status === "Active" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-2xl">
                    <Crown className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 font-medium">
                      Gói hiện tại
                    </p>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                      {mySubscription.plan?.name || "Premium"}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  {mySubscription.endDate && (
                    <p className="text-sm text-gray-600 dark:text-zinc-400">
                      Hết hạn: {new Date(mySubscription.endDate).toLocaleDateString("vi-VN")}
                    </p>
                  )}
                  <Badge className="mt-2 bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                    {mySubscription.autoRenew ? "Tự động gia hạn" : "Không tự động gia hạn"}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PRICING CARDS --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-center"
        >
          {isLoadingPlans ? (
            // Loading state
            <div className="col-span-full flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
              <span className="ml-4 text-gray-600 dark:text-zinc-400 font-medium">
                Đang tải gói đăng ký...
              </span>
            </div>
          ) : plansError ? (
            // Error state
            <div className="col-span-full text-center py-20">
              <p className="text-red-500 font-medium">
                Không thể tải danh sách gói. Vui lòng thử lại sau.
              </p>
            </div>
          ) : plans && plans.length > 0 ? (
            // Display plans from API
            plans
              .filter((plan) => plan.isActive !== false) // Chỉ filter out nếu isActive = false
              .map((plan, index) => (
                <PricingCard
                  key={plan.id}
                  planId={plan.id}
                  title={plan.name}
                  description={plan.tier}
                  price={`${plan.price.toLocaleString("vi-VN")}${plan.currency === "VND" ? "đ" : ` ${plan.currency}`}`}
                  period={formatBillingCycle(plan.billingCycle)}
                  features={plan.features}
                  buttonText={isCurrentPlan(plan.id) ? "Đang sử dụng" : "Nâng cấp ngay"}
                  buttonHref={isCurrentPlan(plan.id) ? "#" : `/payment?planId=${plan.id}`}
                  badge={plan.badgeText}
                  badgeColor={plan.badgeColor}
                  isPopular={plan.badgeText?.toLowerCase().includes("phổ biến")}
                  highlightBorder={plan.badgeText?.toLowerCase().includes("tiết kiệm")}
                  disabled={isCurrentPlan(plan.id)}
                  delay={0.1 + index * 0.1}
                />
              ))
          ) : (
            // No plans available
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 dark:text-zinc-400 font-medium">
                Hiện chưa có gói đăng ký nào.
              </p>
            </div>
          )}
        </motion.div>

        {/* --- FEATURE HIGHLIGHTS --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <FeatureCard
            icon={<Headphones className="w-6 h-6 text-blue-400" />}
            title="Dictation Mastery"
            desc="Luyện nghe chép chính tả với kho dữ liệu khổng lồ từ TED, BBC, VOA..."
          />
          <FeatureCard
            icon={<Mic className="w-6 h-6 text-orange-400" />}
            title="Shadowing Pro"
            desc="Cải thiện ngữ điệu và phát âm với công nghệ nhận diện giọng nói AI chính xác."
          />
        </motion.div>

        {/* --- FOOTER --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-6 rounded-3xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5">
            <Shield className="w-8 h-8 text-gray-500 dark:text-zinc-500" />
            <p className="text-gray-600 dark:text-zinc-400 text-sm font-medium">
              Cam kết hoàn tiền trong 7 ngày nếu không hài lòng. <br />
              Hủy đăng ký bất cứ lúc nào.
            </p>
            <Link
              href="/faq"
              className="text-orange-500 font-bold hover:text-orange-400 text-xs uppercase tracking-widest border-b border-orange-500/50 pb-0.5"
            >
              Câu hỏi thường gặp
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Sub-component cho thẻ giá
interface PricingCardProps {
  planId: string;
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  badge?: string | null;
  badgeColor?: string | null;
  isPopular?: boolean;
  highlightBorder?: boolean;
  disabled?: boolean;
  delay?: number;
}

function PricingCard({
  planId,
  title,
  description,
  price,
  period,
  features,
  buttonText,
  buttonHref,
  badge,
  badgeColor,
  isPopular,
  highlightBorder,
  disabled,
  delay,
}: PricingCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      transition={{ delay, type: "spring", stiffness: 100, damping: 20 }}
      whileHover={!disabled ? { y: -12, scale: isPopular ? 1.05 : 1.02 } : {}}
      className={cn(
        "relative p-8 md:p-10 rounded-[2.5rem] border flex flex-col h-full transition-all duration-300",
        isPopular
          ? "bg-white dark:bg-[#18181b] border-orange-500/50 shadow-[0_20px_80px_-20px_rgba(249,115,22,0.4)] z-20 scale-105 md:scale-110"
          : highlightBorder
            ? "bg-gradient-to-b from-white to-gray-50 dark:from-[#18181b] dark:to-black border-gray-300 dark:border-white/20 shadow-2xl"
            : "bg-gray-50 dark:bg-[#0a0a0c] border-gray-200 dark:border-white/5 shadow-xl opacity-90 dark:opacity-80 hover:opacity-100",
      )}
    >
      {/* Badge from Database */}
      {badge && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-full text-center">
          <Badge 
            className="border-none text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg"
            style={{ 
              backgroundColor: badgeColor || "#f97316",
              boxShadow: `0 10px 25px -5px ${badgeColor || "#f97316"}40`
            }}
          >
            {isPopular && <Star className="w-3 h-3 mr-2 fill-current inline" />}
            {badge}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h3
          className={cn(
            "text-2xl font-black uppercase tracking-wide mb-2",
            isPopular ? "text-gray-900 dark:text-white" : "text-gray-800 dark:text-zinc-200",
          )}
        >
          {title}
        </h3>
        <p className="text-gray-500 dark:text-zinc-500 text-sm font-bold">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-8 flex flex-col md:flex-row items-baseline gap-2 pb-8 border-b border-gray-200 dark:border-white/5">
        <span
          className={cn(
            "text-5xl font-black tracking-tighter",
            isPopular ? "text-orange-500" : "text-gray-900 dark:text-white",
          )}
        >
          {price}
        </span>
        <span className="text-gray-500 dark:text-zinc-500 font-bold mb-1.5">{period}</span>
      </div>

      {/* Features List */}
      <ul className="space-y-5 mb-10 flex-1">
        {features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-4 group">
            <div
              className={cn(
                "mt-0.5 p-1 rounded-full flex-shrink-0 transition-colors",
                isPopular
                  ? "bg-orange-500/20 text-orange-500 group-hover:bg-orange-500 group-hover:text-white"
                  : "bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-zinc-400 group-hover:bg-gray-300 dark:group-hover:bg-white/20 group-hover:text-gray-900 dark:group-hover:text-white",
              )}
            >
              <Check className="w-3 h-3" strokeWidth={4} />
            </div>
            <span
              className={cn(
                "text-sm font-medium leading-relaxed",
                isPopular ? "text-gray-700 dark:text-zinc-200" : "text-gray-600 dark:text-zinc-400",
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        asChild={!disabled}
        disabled={disabled}
        className={cn(
          "w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300",
          isPopular
            ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/50 hover:scale-[1.02]"
            : highlightBorder
              ? "bg-orange-500 dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-zinc-200 hover:scale-[1.02]"
              : "bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-gray-300 dark:hover:bg-white/10 text-gray-500 dark:text-zinc-400 cursor-not-allowed",
        )}
      >
        {disabled ? (
          <span>{buttonText}</span>
        ) : (
          <Link href={buttonHref}>{buttonText}</Link>
        )}
      </Button>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-3xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
      <div className="p-3 bg-gray-200 dark:bg-white/5 rounded-2xl border border-gray-300 dark:border-white/5">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
