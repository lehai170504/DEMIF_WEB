"use client";

import { Badge } from "@/components/ui/badge";
import {
  Headphones,
  Mic,
  BarChart3,
  Trophy,
  BookOpen,
  Zap,
  LucideIcon,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features_vi: FeatureItem[] = [
  {
    icon: Headphones,
    title: "Chính tả AI (AI Dictation)",
    description:
      "Nghe giọng nói của người bản xứ và gõ lại những gì bạn nghe được. AI sẽ đánh giá độ chính xác, nhận diện lỗi và chỉ ra điểm cần cải thiện.",
  },
  {
    icon: Mic,
    title: "Luyện tập Shadowing",
    description:
      "Ghi âm giọng nói khi bạn bắt chước người bản xứ. AI phân tích phát âm, ngữ điệu và độ trôi chảy để giúp bạn nói tự nhiên hơn.",
  },
  {
    icon: BarChart3,
    title: "Theo dõi tiến độ",
    description:
      "Quan sát sự tiến bộ của bạn qua biểu đồ radar và thống kê chi tiết. Nắm rõ điểm mạnh, điểm yếu để tối ưu quá trình học tập.",
  },
  {
    icon: BookOpen,
    title: "Ôn tập thông minh",
    description:
      "Áp dụng kỹ thuật lặp lại ngắt quãng (Spaced Repetition) được cá nhân hóa. Ghi nhớ từ vựng và cấu trúc ngữ pháp lâu dài.",
  },
  {
    icon: Trophy,
    title: "Thành tích & Xếp hạng",
    description:
      "Cạnh tranh cùng cộng đồng học viên toàn cầu. Nhận huy hiệu, đạt thành tựu và duy trì động lực với bảng xếp hạng realtime.",
  },
  {
    icon: Zap,
    title: "Học tập thích ứng",
    description:
      "AI tự động điều chỉnh độ khó và nội dung phù hợp với năng lực hiện tại của bạn, đảm bảo luôn học trong vùng phát triển tối ưu.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 10 },
  },
};

export function FeaturesLanding() {
  return (
    <section id="features" className="container mx-auto px-4 py-24 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Badge className="mb-6 bg-white/5 hover:bg-white/10 text-[#FF7A00] border border-[#FF7A00]/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,122,0,0.1)]">
          Tính năng nổi bật
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Mọi công cụ bạn cần để{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
            bứt phá
          </span>
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Bộ công cụ toàn diện được hỗ trợ bởi AI — giúp bạn học hiệu quả hơn,
          phát âm chuẩn hơn và tự tin giao tiếp như người bản xứ.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {features_vi.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#FF7A00]/50 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/0 via-[#FF7A00]/0 to-[#FF7A00]/5 group-hover:via-[#FF7A00]/10 transition-all duration-500" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all duration-300">
                <IconComponent className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-[#FF7A00] transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base group-hover:text-zinc-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
