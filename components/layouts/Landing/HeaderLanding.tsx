"use client";

import Link from "next/link";
import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Tính năng", href: "#features" },
  { name: "Giải pháp", href: "#how-it-works" },
  { name: "Bảng giá", href: "#pricing" },
  { name: "Khách hàng", href: "#testimonials" },
];

const glassIslandClass =
  "pointer-events-auto bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] rounded-full transition-colors duration-500";

export function HeaderLanding() {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  // State quản lý việc ẩn/hiện Header
  const [isHidden, setIsHidden] = useState(false);

  // Theo dõi hướng cuộn chuột
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined) return;

    // Nếu cuộn xuống qua mốc 150px thì ẩn đi, cuộn lên thì hiện lại
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const containerGap = useTransform(smoothY, [0, 150], ["16px", "4px"]);
  const containerY = useTransform(smoothY, [0, 150], [16, 24]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        // HỆ THỐNG ANIMATE MỚI: Tự động trượt lên (-100px) khi isHidden = true
        animate={{
          y: isHidden ? -100 : 0,
          opacity: isHidden ? 0 : 1,
        }}
        style={{
          marginTop: containerY, // Dùng marginTop thay vì y để không xung đột với animate y ở trên
          gap: containerGap,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="flex items-center justify-center w-full max-w-5xl font-mono"
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

        {/* MODULE 2: NAV LINKS */}
        <nav
          className={cn(
            glassIslandClass,
            "hidden md:flex items-center px-6 py-2.5 justify-center",
          )}
        >
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
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
          </div>
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

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="relative overflow-hidden bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] text-white font-black px-6 h-9 rounded-full shadow-[0_0_20px_rgba(255,122,0,0.3)] border-t border-white/20 group"
              asChild
            >
              <Link href="/signup">
                <span className="relative z-10">Bắt đầu</span>
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 z-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
