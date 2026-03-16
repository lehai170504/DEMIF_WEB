"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/public/animations/character-run.json";
import { ArrowUp } from "lucide-react";

export function RunningMascot() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Làm mượt tiến trình cuộn cho vòng tròn Progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Ẩn mascot ở Hero Section, chỉ hiện khi bắt đầu cuộn xuống
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setIsVisible(v > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 50,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
      className="fixed bottom-8 right-8 z-[100] group cursor-pointer"
      onClick={scrollToTop}
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/10 dark:bg-black/50 backdrop-blur-md rounded-full shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
        {/* Vòng tròn hiển thị % cuộn trang (Progress Ring) */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 100 100"
        >
          {/* Vòng mờ phía sau */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-300 dark:text-gray-800"
          />
          {/* Vòng cam chạy theo cuộn */}
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#FF7A00"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="301.59" // 2 * PI * r
            style={{
              strokeDashoffset: useTransform(
                smoothProgress,
                [0, 1],
                [301.59, 0],
              ),
            }}
            className="drop-shadow-[0_0_5px_rgba(255,122,0,0.8)]"
          />
        </svg>

        {/* NHÂN VẬT CHẠY TẠI CHỖ */}
        <div className="w-12 h-12 md:w-16 md:h-16 relative z-10 transition-transform duration-300 group-hover:scale-0 group-hover:opacity-0">
          <Lottie animationData={animationData} loop={true} autoplay={true} />
        </div>

        {/* ICON CUỘN LÊN (Hiện ra khi Hover) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
          <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_#FF7A00]">
            <ArrowUp strokeWidth={3} size={20} />
          </div>
        </div>

        {/* Hiệu ứng Glow mờ đằng sau */}
        <div className="absolute inset-0 bg-[#FF7A00]/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Tooltip nhỏ */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-black text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
        Lên đầu trang
      </div>
    </motion.div>
  );
}
