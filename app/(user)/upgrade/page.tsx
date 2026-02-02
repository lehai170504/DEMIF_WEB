"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown, Shield, Mic, Headphones } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UpgradePage() {
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

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-zinc-100 selection:bg-orange-500/30 pb-20 overflow-hidden">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md"
          >
            <Crown className="w-3.5 h-3.5 fill-current" /> Premium Access
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter text-white leading-[1.1]"
          >
            Làm Chủ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Tiếng Anh
            </span>{" "}
            <br className="hidden md:block" /> Cùng AI
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Tối ưu hóa khả năng Nghe & Nói với công nghệ AI tiên tiến.
            <br className="hidden md:block" /> Mở khóa toàn bộ bài tập Dictation
            & Shadowing ngay hôm nay.
          </motion.p>
        </motion.div>

        {/* --- PRICING CARDS --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-center"
        >
          {/* Gói 1: Free */}
          <PricingCard
            title="Free"
            description="Trải nghiệm cơ bản"
            price="0đ"
            period="mãi mãi"
            features={[
              "5 Bài Nghe chép chính tả/tuần",
              "3 Bài Shadowing cơ bản/tuần",
              "Phân tích lỗi sai cơ bản",
              "Truy cập cộng đồng",
            ]}
            buttonText="Đang sử dụng"
            buttonHref="#"
            disabled
            delay={0.1}
          />

          {/* Gói 2: Monthly (Hero) */}
          <PricingCard
            title="Standard"
            description="Tăng tốc toàn diện"
            price="59.000đ"
            period="/tháng"
            features={[
              "Không giới hạn bài Dictation",
              "Không giới hạn bài Shadowing",
              "Chấm điểm phát âm AI chi tiết",
              "Phân tích lỗi sai chuyên sâu",
              "Chế độ ôn tập SRS thông minh",
              "Tải xuống bài học offline",
            ]}
            buttonText="Nâng cấp ngay"
            buttonHref="/checkout-monthly"
            isPopular
            delay={0.2}
          />

          {/* Gói 3: Yearly */}
          <PricingCard
            title="Prenium"
            description="Cam kết dài hạn"
            price="499.000đ"
            period="/năm"
            features={[
              "Tất cả quyền lợi gói Chiến Binh",
              "Kho bài luyện thi IELTS/TOEIC",
              "AI Coach phân tích lộ trình",
              "Hỗ trợ ưu tiên 24/7",
              "Early access tính năng mới",
              "Huy hiệu Legend độc quyền",
            ]}
            buttonText="Tiết kiệm 30%"
            buttonHref="/checkout-yearly"
            highlightBorder
            delay={0.3}
          />
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
          <div className="inline-flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5">
            <Shield className="w-8 h-8 text-zinc-500" />
            <p className="text-zinc-400 text-sm font-medium">
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
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  isPopular?: boolean;
  highlightBorder?: boolean;
  disabled?: boolean;
  delay?: number;
}

function PricingCard({
  title,
  description,
  price,
  period,
  features,
  buttonText,
  buttonHref,
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
          ? "bg-[#18181b] border-orange-500/50 shadow-[0_20px_80px_-20px_rgba(249,115,22,0.4)] z-20 scale-105 md:scale-110"
          : highlightBorder
            ? "bg-gradient-to-b from-[#18181b] to-black border-white/20 shadow-2xl"
            : "bg-[#0a0a0c] border-white/5 shadow-xl opacity-80 hover:opacity-100",
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-full text-center">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-600 border-none text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-500/40">
            <Star className="w-3 h-3 mr-2 fill-current" /> Phổ biến nhất
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h3
          className={cn(
            "text-2xl font-black uppercase tracking-wide mb-2",
            isPopular ? "text-white" : "text-zinc-200",
          )}
        >
          {title}
        </h3>
        <p className="text-zinc-500 text-sm font-bold">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-8 flex flex-col md:flex-row items-baseline gap-2 pb-8 border-b border-white/5">
        <span
          className={cn(
            "text-5xl font-black tracking-tighter",
            isPopular ? "text-orange-500" : "text-white",
          )}
        >
          {price}
        </span>
        <span className="text-zinc-500 font-bold mb-1.5">{period}</span>

        {/* Yearly Saving Note */}
        {price.includes("499") && (
          <div className="md:ml-auto inline-flex items-center px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
            <Zap className="w-3 h-3 mr-1 fill-current" /> -30%
          </div>
        )}
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
                  : "bg-white/10 text-zinc-400 group-hover:bg-white/20 group-hover:text-white",
              )}
            >
              <Check className="w-3 h-3" strokeWidth={4} />
            </div>
            <span
              className={cn(
                "text-sm font-medium leading-relaxed",
                isPopular ? "text-zinc-200" : "text-zinc-400",
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
              ? "bg-white text-black hover:bg-zinc-200 hover:scale-[1.02]"
              : "bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 cursor-not-allowed",
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
    <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
      <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
