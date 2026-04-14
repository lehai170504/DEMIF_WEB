"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  ArrowUpRight,
  Command,
} from "lucide-react";

const footerLinks = {
  products: [
    { label: "Luyện nghe (Dictation)", href: "/dictation" },
    { label: "Bảng giá (Premium)", href: "/upgrade" },
    { label: "Bảng xếp hạng", href: "/leaderboard" },
  ],
  company: [
    { label: "Về chúng tôi", href: "/about" },
    { label: "Blog kiến thức", href: "/blog" },
    { label: "Liên hệ hỗ trợ", href: "/contact" },
  ],
};

export function FooterLanding() {
  return (
    <footer className="relative bg-white dark:bg-[#050505] pt-24 pb-12 font-mono overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* ── TOP SECTION: BENTO GRID STYLE ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 mb-20">
          {/* Box 1: Brand & Bio (Large) */}
          <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5 flex flex-col justify-between group">
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
              <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
                Nền tảng học tập thông minh. Khai phá tiềm năng ngôn ngữ của bạn
                bằng sức mạnh của trí tuệ nhân tạo.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#FF7A00] hover:border-[#FF7A00] transition-all duration-300"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Box 2: Quick Links (Products & Company) */}
          <div className="lg:col-span-5 p-8 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00]">
                Điều hướng nhanh
              </h4>
              <Command size={14} className="text-zinc-600" />
            </div>

            {/* ĐÃ CHỈNH SỬA: Chia làm 2 cột rõ ràng */}
            <div className="grid grid-cols-2 gap-8">
              {/* Cột 1: Sản phẩm */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-widest mb-2">
                  Sản phẩm
                </p>
                {footerLinks.products.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm font-bold text-gray-700 dark:text-zinc-400 hover:text-[#FF7A00] dark:hover:text-[#FF7A00] transition-colors group relative w-fit"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="absolute -right-4 top-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </Link>
                ))}
              </div>

              {/* Cột 2: Công ty */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-widest mb-2">
                  Công ty
                </p>
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm font-bold text-gray-700 dark:text-zinc-400 hover:text-[#FF7A00] dark:hover:text-[#FF7A00] transition-colors group relative w-fit"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="absolute -right-4 top-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Box 3: Status & Lang (Small) */}
          <div className="lg:col-span-3 space-y-4 flex flex-col">
            {/* Status Box */}
            <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">
                Trạng thái
              </span>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Hoạt động tốt
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM SECTION: LEGAL & COPYRIGHT ── */}
        <div className="relative pt-10 border-t border-gray-100 dark:border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 relative z-10 px-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-500">
              © 2026 DEMIF System — Crafting the future of Learning
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600">
              <Link
                href="/privacy"
                className="hover:text-[#FF7A00] transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#FF7A00] transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <span className="hidden sm:block text-gray-300 dark:text-zinc-700">
                |
              </span>
              <span className="text-gray-500 dark:text-zinc-500">
                HANOI • SAIGON • DANANG
              </span>
            </div>
          </div>

          <div className="mt-12 select-none pointer-events-none overflow-hidden flex items-end justify-center opacity-40 dark:opacity-100">
            <h2 className="text-[15vw] md:text-[18vw] leading-[0.75] font-black text-gray-100 dark:text-zinc-900/40 uppercase tracking-tighter italic">
              DEMIF
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
