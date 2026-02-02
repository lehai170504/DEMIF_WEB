// src/components/layouts/Landing/TestimonialsLanding.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Định nghĩa kiểu dữ liệu
interface TestimonialItem {
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Nguyễn Minh Tường",
    role: "Sinh viên",
    location: "Việt Nam",
    content:
      "DEMIF đã thay đổi kỹ năng nghe tiếng Anh của tôi chỉ trong 3 tháng. Phản hồi của AI cực kỳ chính xác, giúp tôi nhận ra những lỗi sai nhỏ nhất mà giáo viên thường bỏ qua.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    location: "Singapore",
    content:
      "Các bài tập Shadowing giúp tôi cải thiện ngữ điệu đáng kể. Giờ đây tôi tự tin hơn rất nhiều khi thuyết trình bằng tiếng Anh trước các đối tác quốc tế.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Giáo viên IELTS",
    location: "Hàn Quốc",
    content:
      "Nền tảng học ngôn ngữ tốt nhất tôi từng trải nghiệm. Hệ thống theo dõi tiến độ rất trực quan, và bảng xếp hạng tạo động lực cạnh tranh lành mạnh.",
    rating: 5,
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

export function TestimonialsLanding() {
  return (
    <section
      id="testimonials"
      className="relative container mx-auto px-4 py-24 font-mono"
    >
      {/* Background Decoration (Optional) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-orange-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Badge className="mb-6 bg-white/5 hover:bg-white/10 text-[#FF7A00] border border-[#FF7A00]/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,122,0,0.1)]">
          Lời chứng thực
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Yêu thích bởi{" "}
          <span className="text-[#FF7A00]">cộng đồng toàn cầu</span>
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Hàng ngàn người học đã cải thiện khả năng giao tiếp nhờ DEMIF. Đây là
          câu chuyện của họ.
        </p>
      </motion.div>

      {/* GRID CARDS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#FF7A00]/50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm"
          >
            {/* Quote Icon Background */}
            <div className="absolute top-6 right-8 text-white/5 group-hover:text-[#FF7A00]/10 transition-colors duration-300">
              <Quote size={80} strokeWidth={0.5} />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < item.rating
                      ? "fill-[#FF7A00] text-[#FF7A00]"
                      : "text-zinc-600"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-zinc-300 mb-8 leading-relaxed relative z-10 flex-grow text-sm md:text-base">
              &quot;{item.content}&quot;
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 mt-auto relative z-10">
              {/* Avatar Placeholder with Gradient */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
                {item.name.charAt(0)}
              </div>

              <div>
                <p className="font-bold text-white group-hover:text-[#FF7A00] transition-colors">
                  {item.name}
                </p>
                <div className="flex items-center text-xs text-zinc-500 gap-2">
                  <span>{item.role}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FF7A00]/0 to-[#FF7A00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
