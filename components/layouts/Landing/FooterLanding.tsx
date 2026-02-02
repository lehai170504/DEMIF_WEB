"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Github, Globe } from "lucide-react";

export function FooterLanding() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 font-mono overflow-hidden bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* 1. Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 group w-fit">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] rounded-xl shadow-lg shadow-orange-500/20 transition-transform group-hover:-rotate-6">
                <img
                  src="/DemifLogo.png"
                  alt="D"
                  className="w-6 h-6 brightness-0 invert" // Logo trắng
                />
              </div>
              <span className="text-2xl font-black tracking-tighter italic uppercase text-white">
                DEMIF<span className="text-[#FF7A00] not-italic">.</span>
              </span>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium">
              Nâng tầm kỹ năng ngôn ngữ với AI thông qua phương pháp
              <span className="text-zinc-200 font-bold italic">
                {" "}
                Dictation
              </span>{" "}
              và
              <span className="text-zinc-200 font-bold italic">
                {" "}
                Shadowing
              </span>{" "}
              chuyên sâu.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl bg-white/5 text-zinc-400 hover:bg-[#FF7A00] hover:text-white transition-all border border-white/5 hover:border-[#FF7A00]"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Links Sections */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Sản phẩm
            </h4>
            <ul className="space-y-3">
              {["Tính năng", "Bảng giá", "Lộ trình", "Dự án"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm font-bold text-zinc-500 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Công ty
            </h4>
            <ul className="space-y-3">
              {["Về chúng tôi", "Blog", "Tuyển dụng", "Liên hệ"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm font-bold text-zinc-500 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Pháp lý
            </h4>
            <ul className="space-y-3">
              {["Bảo mật", "Điều khoản", "Cookie"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm font-bold text-zinc-500 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Language */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF7A00]">
              Ngôn ngữ
            </h4>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-all">
                <Globe className="w-3.5 h-3.5" /> Tiếng Việt
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 text-xs font-bold text-zinc-600 hover:text-zinc-400 hover:border-white/10 transition-all">
                English
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-xs font-bold text-zinc-600">
              © 2026 DEMIF SYSTEM. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-700">
              <span>Hà Nội</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full" />
              <span>Sài Gòn</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full" />
              <span>Đà Nẵng</span>
            </div>
          </div>

          {/* System Status - Dark Mode Style */}
          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            Hệ thống ổn định
          </div>
        </div>
      </div>
    </footer>
  );
}
