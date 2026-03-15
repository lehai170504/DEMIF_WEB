"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Tính năng", href: "#features" },
  { name: "Giải pháp", href: "#how-it-works" },
  { name: "Bảng giá", href: "#pricing" },
  { name: "Khách hàng", href: "#testimonials" },
];

// Định nghĩa chung class Glassmorphism để tái sử dụng cho cả 3 modules
const glassIslandClass =
  "pointer-events-auto bg-white/70 dark:bg-[#111111]/80 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] rounded-full transition-colors duration-500";

export function HeaderLanding() {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  // Cuộn trang: Thu hẹp khoảng cách giữa các khối (100% -> 85%) và đẩy xuống
  const containerWidth = useTransform(smoothY, [0, 150], ["100%", "85%"]);
  const containerY = useTransform(smoothY, [0, 150], [16, 24]); // Nổi cách top 16px -> 24px

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          width: containerWidth,
          y: containerY,
          maxWidth: "1200px",
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          bounce: 0.3,
        }}
        className="flex items-center justify-between gap-3 md:gap-4 font-mono"
      >
        {/* MODULE 1: LOGO */}
        <div
          className={cn(
            glassIslandClass,
            "px-5 py-2.5 flex items-center shrink-0",
          )}
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src="/DemifLogo.png"
                  alt="DEMIF Logo"
                  className="w-8 h-8 rounded-lg shadow-lg relative z-10"
                />
                <div className="absolute inset-0 bg-[#FF7A00] blur-xl scale-50 group-hover:scale-125 transition-all opacity-0 group-hover:opacity-40 duration-500" />
              </div>
              <span className="hidden sm:block font-black tracking-tighter text-gray-900 dark:text-white text-lg">
                DEMIF<span className="text-[#FF7A00]">.</span>
              </span>
            </motion.div>
          </Link>
        </div>

        {/* MODULE 2: NAV LINKS (Ẩn trên mobile) */}
        <nav
          className={cn(
            glassIslandClass,
            "hidden md:flex items-center gap-2 px-6 py-2.5",
          )}
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -1 }}
              className="relative group px-3 py-1"
            >
              <Link
                href={link.href}
                className="text-[13px] font-bold text-gray-600 dark:text-zinc-400 hover:text-[#FF7A00] dark:hover:text-white transition-all duration-300"
              >
                {link.name}
              </Link>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF7A00] opacity-0 transition-all duration-300 group-hover:opacity-100 shadow-[0_0_8px_#FF7A00]" />
            </motion.div>
          ))}
        </nav>

        {/* MODULE 3: ACTIONS */}
        <div
          className={cn(
            glassIslandClass,
            "p-1.5 flex items-center gap-1.5 shrink-0",
          )}
        >
          <ThemeToggle />

          <div className="h-4 w-px bg-gray-300 dark:bg-zinc-800 mx-1 hidden sm:block transition-colors" />

          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex text-gray-700 dark:text-zinc-300 font-bold hover:text-[#FF7A00] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full px-4 transition-all h-9"
            asChild
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] text-white font-black px-6 h-9 rounded-full shadow-lg shadow-orange-500/20 border-t border-white/20"
              asChild
            >
              <Link href="/signup">Bắt đầu</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
