"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Globe,
  ArrowUpRight,
  Command,
} from "lucide-react";

const footerLinks = {
  products: ["Tính năng", "Bảng giá", "Lộ trình", "Dự án"],
  company: ["Về chúng tôi", "Blog", "Tuyển dụng", "Liên hệ"],
  legal: ["Bảo mật", "Điều khoản", "Cookie"],
};

export function FooterLanding() {
  return (
    <footer className="relative bg-white dark:bg-[#050505] pt-24 pb-12 font-mono overflow-hidden">
      {/* Background Decor - Những vệt sáng mờ ảo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* TOP SECTION: BENTO GRID STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 mb-20">
          {/* Box 1: Brand & Bio (Large) */}
          <div className="lg:col-span-5 p-8 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#FF7A00] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <img
                    src="/DemifLogo.png"
                    alt="D"
                    className="w-7 h-7 brightness-0 invert"
                  />
                </div>
                <span className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic">
                  DEMIF<span className="text-[#FF7A00] not-italic">.</span>
                </span>
              </div>
              <p className="text-gray-500 dark:text-zinc-400 text-lg leading-relaxed max-w-sm font-medium">
                Khai phá tiềm năng ngôn ngữ của bạn bằng trí tuệ nhân tạo thế hệ
                mới.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#FF7A00] hover:border-[#FF7A00] transition-all"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Box 2: Quick Links (Medium) */}
          <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
                Điều hướng
              </h4>
              <Command size={14} className="text-zinc-600" />
            </div>
            <div className="grid grid-cols-2 gap-y-4">
              {Object.values(footerLinks)
                .flat()
                .slice(0, 8)
                .map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="text-sm font-bold text-gray-600 dark:text-zinc-500 hover:text-[#FF7A00] transition-colors flex items-center gap-1 group"
                  >
                    {link}{" "}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1"
                    />
                  </Link>
                ))}
            </div>
          </div>

          {/* Box 3: Status & Lang (Small) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Status Box */}
            <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">
                Hệ thống
              </span>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />{" "}
                Trực tuyến
              </div>
            </div>
            {/* Language Box */}
            <div className="p-6 rounded-[2rem] bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">
                Khu vực
              </h4>
              <button className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 text-xs font-bold text-gray-900 dark:text-white shadow-sm">
                <Globe size={14} className="text-[#FF7A00]" /> Tiếng Việt (VN)
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: GIANT LOGO SIGN-OFF */}
        <div className="relative pt-10 border-t border-gray-100 dark:border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              © 2026 DEMIF System — Crafting the future of Learning
            </p>

            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <Link href="#" className="hover:text-[#FF7A00]">
                Bảo mật
              </Link>
              <Link href="#" className="hover:text-[#FF7A00]">
                Điều khoản
              </Link>
              <span className="text-zinc-700">HANOI • SAIGON • DANANG</span>
            </div>
          </div>

          {/* Chữ DEMIF siêu to làm nền ở dưới cùng */}
          <div className="mt-12 select-none pointer-events-none overflow-hidden h-20 md:h-40 flex items-end">
            <h2 className="text-[15vw] leading-[0.8] font-black text-gray-100 dark:text-zinc-900/30 uppercase tracking-tighter">
              DEMIF
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
