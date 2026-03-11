"use client";
import { motion } from "framer-motion";

export function StatsLanding() {
  const stats = [
    { value: "50K+", label: "Học viên toàn cầu" },
    { value: "98%", label: "Cải thiện phát âm" },
    { value: "10M+", label: "Giờ luyện tập" },
    { value: "4.9/5", label: "Đánh giá hài lòng" },
  ];

  return (
    <section className="container mx-auto px-4 py-16 font-mono border-y border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col gap-2"
          >
            <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
              {stat.value}
            </span>
            <span className="text-sm md:text-base text-gray-600 dark:text-zinc-400 font-bold uppercase tracking-wider">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
