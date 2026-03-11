"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { name: "Tính năng", href: "#features" },
  { name: "Giải pháp", href: "#how-it-works" },
  { name: "Bảng giá", href: "#pricing" },
  { name: "Khách hàng", href: "#testimonials" },
];

export function HeaderLanding() {
  const { scrollY } = useScroll();

  // Sử dụng useSpring để hiệu ứng co giãn Header mượt hơn, không bị lag
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  // 1. Độ rộng: Co lại từ 100% về 85% khi cuộn
  const headerWidth = useTransform(smoothY, [0, 150], ["100%", "85%"]);

  // 2. Vị trí Y: Đẩy xuống một chút để tạo cảm giác "nổi"
  const headerTop = useTransform(smoothY, [0, 150], [0, 20]);

  // 3. Độ mờ nền: Đậm dần khi cuộn
  const bgOpacity = useTransform(smoothY, [0, 150], [0.4, 0.8]);

  return (
    // Z-index cực cao (z-[100]) để luôn nằm trên các Stacked Cards và CinematicJourney
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          marginTop: headerTop,
          width: headerWidth,
          maxWidth: "1100px",
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          bounce: 0.3,
        }}
        className="pointer-events-auto rounded-full border border-gray-200/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Lớp nền Glassmorphism đồng nhất với các thẻ bên dưới */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-white/60 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl -z-10"
        />

        <div className="px-6 py-2.5 flex items-center justify-between font-mono">
          {/* Lô-gô */}
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
                  className="w-8 h-8 rounded-lg shadow-lg"
                />
                {/* Hiệu ứng hào quang Cam quanh Logo */}
                <div className="absolute inset-0 bg-[#FF7A00] blur-xl scale-50 group-hover:scale-125 transition-all opacity-0 group-hover:opacity-40 duration-500" />
              </div>
              <span className="hidden sm:block font-black tracking-tighter text-gray-900 dark:text-white text-lg">
                DEMIF<span className="text-[#FF7A00]">.</span>
              </span>
            </motion.div>
          </Link>

          {/* Điều hướng */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -1 }}
                className="relative group px-2 py-1"
              >
                <Link
                  href={link.href}
                  className="text-[13px] font-bold text-gray-600 dark:text-zinc-400 hover:text-[#FF7A00] dark:hover:text-white transition-all duration-300"
                >
                  {link.name}
                </Link>
                {/* Chấm tròn cam thay cho gạch chân truyền thống */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF7A00] opacity-0 transition-all duration-300 group-hover:opacity-100 shadow-[0_0_8px_#FF7A00]" />
              </motion.div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="h-4 w-px bg-gray-300 dark:bg-zinc-800 mx-1 hidden sm:block" />

            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-gray-700 dark:text-zinc-300 font-bold hover:text-[#FF7A00] dark:hover:text-white rounded-full px-4"
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
        </div>
      </motion.header>
    </div>
  );
}
