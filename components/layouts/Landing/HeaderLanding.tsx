"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { name: "Tính năng", href: "#features" },
  { name: "Giải pháp", href: "#how-it-works" },
  { name: "Bảng giá", href: "#pricing" },
  { name: "Khách hàng", href: "#testimonials" },
];

export function HeaderLanding() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#050505]/60"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between font-mono">
        <Link href="/">
          <motion.div
            whileHover={{
              rotateY: 15,
              rotateX: -10,
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                src="/DemifLogo.png"
                alt="DEMIF Logo"
                className="w-10 h-10 rounded-xl shadow-lg shadow-orange-500/10"
              />
              <div className="absolute inset-0 bg-[#FF7A00] blur-xl scale-50 group-hover:scale-100 transition-transform opacity-0 group-hover:opacity-60 duration-500" />
            </div>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <Link
                href={link.href}
                className="text-[14px] font-bold text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.name}
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF7A00] transition-all duration-300 group-hover:w-full box-shadow-glow" />
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-zinc-300 font-bold hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
              asChild
            >
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px -5px rgba(255, 122, 0, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              className="bg-[#FF7A00] hover:bg-[#FF8A10] text-white font-bold px-6 rounded-full shadow-lg shadow-orange-900/20 border border-white/10"
              asChild
            >
              <Link href="/signup">Bắt đầu</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
