"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Users, TrendingUp, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Component Đếm Số Riêng Biệt ---
const AnimatedCounter = ({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);

  // Format số với số thập phân (nếu có) và thêm hậu tố (K+, %, M+, /5)
  const displayValue = useTransform(
    motionValue,
    (latest) => latest.toFixed(decimals) + suffix,
  );

  useEffect(() => {
    if (inView) {
      animate(motionValue, value, {
        duration: 2.5, // Chạy hiệu ứng trong 2.5s
        ease: "easeOut",
      });
    }
  }, [inView, motionValue, value]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export default function StatsLanding() {
  const stats = [
    {
      value: 50,
      suffix: "K+",
      label: "Học viên toàn cầu",
      icon: Users,
      desc: "Đã và đang tin dùng hệ thống",
    },
    {
      value: 98,
      suffix: "%",
      label: "Cải thiện phát âm",
      icon: TrendingUp,
      desc: "Sau 30 ngày luyện tập liên tục",
    },
    {
      value: 10,
      suffix: "M+",
      label: "Giờ luyện tập",
      icon: Clock,
      desc: "Được AI phân tích Real-time",
    },
    {
      value: 4.9,
      suffix: "/5",
      decimals: 1,
      label: "Đánh giá hài lòng",
      icon: Star,
      desc: "Trên các kho ứng dụng",
    },
  ];

  return (
    // FIX: Thiết lập h-full và flex để nó tự căn giữa hoàn hảo trong StackedSection
    <section className="relative w-full h-full flex flex-col justify-center py-20 font-mono overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[300px] bg-[#FF7A00]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        {/* HEADER THỐNG KÊ */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#FF7A00]/10 text-[#FF7A00] border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold">
              Thành tựu
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
              Những con số{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFD056]">
                biết nói
              </span>
            </h2>
          </motion.div>
        </div>

        {/* LƯỚI THỐNG KÊ (BENTO GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-8 rounded-[2rem] bg-white/60 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-none hover:border-[#FF7A00]/30 transition-all duration-500 group flex flex-col items-center text-center"
            >
              {/* Icon nổi */}
              <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF7A00]/10 transition-all duration-500">
                <stat.icon className="w-6 h-6 text-gray-600 dark:text-zinc-400 group-hover:text-[#FF7A00] transition-colors" />
              </div>

              {/* Component Đếm Số */}
              <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] mb-2 tracking-tighter">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </h3>

              <span className="text-sm md:text-base text-gray-900 dark:text-white font-bold uppercase tracking-wider mb-2">
                {stat.label}
              </span>

              <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
