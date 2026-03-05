// src/components/layouts/Pricing/Pricing.tsx (hoặc đường dẫn tương ứng)
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Pricing() {
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
        {/* --- Gói Miễn phí --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#FF7A00]/30 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm rounded-3xl shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Miễn phí</h3>
              <p className="text-gray-600 dark:text-zinc-400">Bắt đầu học ngay</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">0đ</span>
                <span className="text-gray-500 dark:text-zinc-500">/mãi mãi</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Truy cập bài học chính tả giới hạn",
                "Phản hồi AI cơ bản (chỉ độ chính xác)",
                "Chuỗi ngày học & thử thách hàng ngày",
                "Truy cập cộng đồng & bảng xếp hạng",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 dark:text-zinc-300 text-sm"
                >
                  <Check className="w-5 h-5 text-gray-400 dark:text-zinc-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-gray-400 dark:text-zinc-600 text-sm opacity-50">
                <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Không có theo dõi tiến độ nâng cao</span>
              </li>
            </ul>
            <Button
              className="w-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
              size="lg"
              asChild
            >
              <Link href="/signup">Tham gia Miễn phí</Link>
            </Button>
          </Card>
        </motion.div>

        {/* --- Gói Premium Monthly (Highlight) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-[#FF7A00] blur-3xl opacity-20 rounded-3xl -z-10" />

          <Card className="p-8 bg-gradient-to-b from-orange-50 to-white dark:from-[#FF7A00]/20 dark:to-black/80 border border-[#FF7A00]/50 relative shadow-2xl shadow-orange-500/30 dark:shadow-orange-900/40 rounded-3xl transform scale-105 z-10 backdrop-blur-xl">
            <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF7A00] text-white border-none px-4 py-1 shadow-lg shadow-orange-500/40">
              <Star className="w-3 h-3 mr-1 fill-white" /> Được Đề Xuất
            </Badge>

            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white flex items-center justify-center gap-2">
                Premium Tháng{" "}
                <Zap className="w-5 h-5 text-[#FFD056] fill-[#FFD056]" />
              </h3>
              <p className="text-orange-600 dark:text-orange-200/80">
                Linh hoạt, hoàn hảo để dùng thử
              </p>
            </div>

            <div className="mb-8 text-center bg-orange-100/50 dark:bg-white/5 py-4 rounded-2xl border border-orange-200 dark:border-white/10">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                  39K
                </span>
                <span className="text-gray-600 dark:text-zinc-400">/tháng</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Phản hồi AI toàn diện (chính xác + phát âm)",
                "Chính tả & shadowing không giới hạn",
                "Bảng điều khiển theo dõi tiến độ",
                "Truy cập kịch bản chuyên nghiệp",
                "Lộ trình học AI cá nhân hóa",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-900 dark:text-white text-sm"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#FF7A00] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full bg-[#FF7A00] hover:bg-[#FF8A10] text-white font-bold h-12 shadow-lg shadow-orange-900/40 border-t border-white/20"
              size="lg"
              asChild
            >
              <Link href="/signup">Bắt đầu ngay</Link>
            </Button>
          </Card>
        </motion.div>

        {/* --- Gói Premium Annual --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#FF7A00]/30 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm rounded-3xl shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Premium Năm
              </h3>
              <p className="text-gray-600 dark:text-zinc-400">Tiết kiệm nhiều nhất</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">299K</span>
                <span className="text-gray-500 dark:text-zinc-500">/năm</span>
              </div>
              <p className="text-sm text-[#FF7A00] mt-2 font-bold">
                Chỉ ~25K / tháng
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Mọi tính năng của Premium Tháng",
                "Gói nội dung độc quyền (Business, Academic)",
                "Báo cáo tiến độ chi tiết bằng AI",
                "Hỗ trợ ưu tiên & cập nhật tương lai",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 dark:text-zinc-300 text-sm"
                >
                  <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
              size="lg"
              asChild
            >
              <Link href="/signup">Chọn Gói Hàng Năm</Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
