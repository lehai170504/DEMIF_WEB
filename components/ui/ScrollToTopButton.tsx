// src/components/ui/ScrollToTopButton.tsx
"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Làm mượt vòng tròn tiến độ
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- FIX LỖI Ở ĐÂY ---
  // Di chuyển useTransform ra khỏi JSX, đặt lên đầu component
  // Biến đổi giá trị scroll (0-1) thành chu vi vòng tròn (176 -> 0)
  const pathLength = useTransform(scaleX, [0, 1], [176, 0]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-8 right-8 z-50 group"
        >
          {/* Nút bấm chính */}
          <button
            onClick={scrollToTop}
            className="relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer outline-none transition-transform duration-300 hover:-translate-y-1 active:scale-95"
          >
            {/* 1. Lớp nền Glassmorphism (Mặc định) */}
            <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-[#FF7A00] group-hover:border-[#FF7A00]" />

            {/* 2. Hiệu ứng Glow 3D (Khi hover) */}
            <div className="absolute inset-0 rounded-full bg-[#FF7A00] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60" />

            {/* 3. Vòng tròn tiến độ (Progress Ring) */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none transform scale-110"
              width="60"
              height="60"
              viewBox="0 0 60 60"
            >
              {/* Vòng tròn nền mờ */}
              <circle
                cx="30"
                cy="30"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/5"
              />
              {/* Vòng tròn chạy theo scroll */}
              <motion.circle
                cx="30"
                cy="30"
                r="28"
                fill="none"
                stroke="#FF7A00"
                strokeWidth="2"
                strokeDasharray="176" // 2 * PI * 28 ≈ 176
                style={{
                  strokeDashoffset: pathLength, 
                }}
                strokeLinecap="round"
                className="transition-colors duration-300 group-hover:stroke-white"
              />
            </svg>

            {/* 4. Icon Arrow (Có animation trượt) */}
            <div className="relative z-10 overflow-hidden w-6 h-6 flex flex-col items-center justify-center text-zinc-400 group-hover:text-white transition-colors duration-300">
              {/* Mũi tên chính */}
              <motion.div
                className="absolute"
                initial={{ y: 0 }}
                whileHover={{ y: -24 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ArrowUp className="w-6 h-6" />
              </motion.div>

              {/* Mũi tên phụ (Trượt từ dưới lên khi hover) */}
              <motion.div
                className="absolute translate-y-6"
                initial={{ y: 24 }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ArrowUp className="w-6 h-6" />
              </motion.div>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
