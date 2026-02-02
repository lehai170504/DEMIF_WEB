// src/components/layouts/Landing/HowItWorksLanding.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Chọn bài luyện phù hợp",
    description:
      "Lựa chọn giữa Dictation (Chính tả) hoặc Shadowing, được AI cá nhân hóa theo trình độ và mục tiêu riêng của bạn.",
  },
  {
    id: 2,
    title: "Thực hành & Ghi âm",
    description:
      "Nghe, gõ lại hoặc nói nhại theo người bản xứ. Mỗi bài tập là một cơ hội để tinh chỉnh ngữ điệu và phản xạ.",
  },
  {
    id: 3,
    title: "Nhận phản hồi AI",
    description:
      "Nhận đánh giá chi tiết từng giây. AI chỉ ra lỗi sai, chấm điểm phát âm và gợi ý cách sửa ngay lập tức.",
  },
];

export function HowItWorksLanding() {
  return (
    <section
      id="how-it-works"
      className="relative container mx-auto px-4 py-24 font-mono"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <Badge className="mb-6 bg-white/5 hover:bg-white/10 text-[#FF7A00] border border-[#FF7A00]/30 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,122,0,0.1)]">
          Quy trình hoạt động
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Học dễ dàng chỉ với <span className="text-[#FF7A00]">3 bước</span>
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Trải nghiệm hành trình học ngôn ngữ được dẫn dắt bởi AI — đơn giản,
          trực quan và hiệu quả vượt trội.
        </p>
      </motion.div>

      {/* STEPS CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-0" />

        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#FF7A00]/50 to-transparent z-0 blur-[2px]" />

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 -z-10 bg-white/5 rounded-3xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm group-hover:shadow-[0_0_30px_rgba(255,122,0,0.1)]" />

              {/* NUMBER CIRCLE */}
              <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                {/* Glow Effect phía sau số */}
                <div className="absolute inset-0 bg-[#FF7A00] blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />

                {/* Hình khối chứa số */}
                <div className="relative w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 group-hover:border-[#FF7A00]/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
                  <span className="text-3xl font-bold bg-gradient-to-br from-[#FF7A00] to-[#FFD056] bg-clip-text text-transparent">
                    {step.id}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-[50%] top-1/2 -translate-y-1/2 text-zinc-700">
                    <ArrowRight className="w-6 h-6 opacity-20" />
                  </div>
                )}
              </div>

              {/* TEXT CONTENT */}
              <div className="px-4 pb-8">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#FF7A00] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
