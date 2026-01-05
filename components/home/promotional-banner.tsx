"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
  color: string; // Thêm màu riêng cho từng banner để tạo sự khác biệt
}

const banners: Banner[] = [
  {
    id: "1",
    title: "Giải mọi bài tập",
    subtitle: "Nhanh chóng và chính xác nhất với trợ lý AI thế hệ mới",
    image: "/promo-banner-1.jpg",
    cta: "Hỏi miễn phí ngay",
    link: "/ai-assistant",
    color: "from-blue-600 via-indigo-600 to-violet-600",
  },
  {
    id: "2",
    title: "Bí quyết học tốt",
    subtitle: "Khám phá lộ trình học thông minh từ các thủ khoa",
    image: "/promo-banner-2.jpg",
    cta: "Khám phá ngay",
    link: "/blog/study-tips",
    color: "from-emerald-600 via-teal-600 to-cyan-600",
  },
];

export function PromotionalBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // Điều hướng slide: 1 (phải), -1 (trái)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <div className="group relative h-[300px] w-full overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={`absolute inset-0 flex items-center justify-between p-10 md:p-16 bg-gradient-to-r ${banners[currentIndex].color}`}
        >
          {/* Content Left */}
          <div className="relative z-10 max-w-lg space-y-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/10"
            >
              <Sparkles className="h-3 w-3 text-yellow-300" />
              TÍNH NĂNG MỚI
            </motion.div>

            <div className="space-y-2">
              <h3 className="font-display text-4xl font-black tracking-tight md:text-5xl">
                {banners[currentIndex].title}
              </h3>
              <p className="text-lg text-white/80 line-clamp-2 max-w-sm">
                {banners[currentIndex].subtitle}
              </p>
            </div>

            <Button className="h-12 rounded-xl bg-white px-8 font-bold text-slate-900 shadow-xl transition-all hover:scale-105 hover:bg-slate-50 active:scale-95">
              {banners[currentIndex].cta}
            </Button>
          </div>

          {/* Image Right */}
          <div className="relative hidden h-full w-1/3 md:block">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              className="relative h-full w-full"
            >
              <Image
                src={banners[currentIndex].image || "/placeholder.svg"}
                alt={banners[currentIndex].title}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Hiện rõ hơn khi hover vào banner */}
      <div className="absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 justify-between opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={handlePrevious}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/30"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/30"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Progress Dots với hiệu ứng Loading */}
      <div className="absolute bottom-6 left-10 z-20 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className="relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-all"
            style={{ width: index === currentIndex ? "40px" : "12px" }}
          >
            {index === currentIndex && (
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute inset-0 bg-white"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
