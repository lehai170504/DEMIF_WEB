"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, PenTool, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
  color: string;
}

const banners: Banner[] = [
  {
    id: "1",
    title: "Giải mọi bài tập",
    subtitle: "Nhanh chóng và chính xác nhất với trợ lý AI thế hệ mới",
    image: "/promo-banner-1.jpg",
    cta: "Thực hành ngay",
    link: "dropdown",
    color: "from-blue-600/20 via-indigo-600/20 to-violet-600/20",
  },
  {
    id: "2",
    title: "Bí quyết học tốt",
    subtitle: "Khám phá lộ trình học thông minh từ các thủ khoa",
    image: "/promo-banner-2.jpg",
    cta: "Khám phá",
    link: "/blog",
    color: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
  },
];

export function PromotionalBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
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
    <div className="group relative h-[320px] w-full overflow-hidden rounded-[2.5rem] bg-gray-100 dark:bg-[#0F0F11] border border-gray-200 dark:border-white/10 shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:30px_30px] opacity-[0.03] z-0" />

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
          <div className="relative z-10 max-w-lg space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 dark:bg-white/5 px-3 py-1 text-[10px] font-bold backdrop-blur-md border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white uppercase tracking-widest"
            >
              <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
              Tính năng mới
            </motion.div>

            <div className="space-y-2">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-none"
              >
                {banners[currentIndex].title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-700 dark:text-zinc-400 font-medium max-w-sm"
              >
                {banners[currentIndex].subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {banners[currentIndex].link === "dropdown" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-12 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs px-8 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-slate-200 group">
                      {banners[currentIndex].cta}{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 rounded-2xl p-2 z-[100] border-gray-200 dark:border-white/10 shadow-xl">
                    <DropdownMenuItem asChild className="p-3 cursor-pointer rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                      <Link href="/dictation" className="flex items-center gap-4 w-full outline-none">
                        <div className="bg-orange-500/10 p-2.5 rounded-xl shrink-0">
                          <PenTool className="h-5 w-5 text-orange-500" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Chính tả</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Luyện nghe và chép lại</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="p-3 cursor-pointer rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors mt-1">
                      <Link href="/shadowing" className="flex items-center gap-4 w-full outline-none">
                        <div className="bg-blue-500/10 p-2.5 rounded-xl shrink-0">
                          <Headphones className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Shadowing</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Luyện nói nhại âm</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild className="h-12 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs px-8 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-slate-200 group">
                  <Link href={banners[currentIndex].link}>
                    {banners[currentIndex].cta}{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
            </motion.div>
          </div>

          {/* Image Right (3D Floating) */}
          <div className="relative hidden h-full w-1/3 md:block">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: -30 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full"
            >
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 blur-[60px] rounded-full" />

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

      {/* Navigation Controls */}
      <div className="absolute inset-x-6 top-1/2 z-20 flex -translate-y-1/2 justify-between pointer-events-none">
        <button
          onClick={handlePrevious}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/50 dark:bg-black/20 text-gray-700 dark:text-white/50 backdrop-blur-md border border-gray-300 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-black/40 hover:text-gray-900 dark:hover:text-white hover:scale-110"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/50 dark:bg-black/20 text-gray-700 dark:text-white/50 backdrop-blur-md border border-gray-300 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-black/40 hover:text-gray-900 dark:hover:text-white hover:scale-110"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-10 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-gray-900 dark:bg-white"
                : "w-2 bg-gray-900/20 dark:bg-white/20 hover:bg-gray-900/40 dark:hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
