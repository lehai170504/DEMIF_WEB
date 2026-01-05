// src/components/layouts/Landing/FooterLanding.jsx

import Link from "next/link";
import { Facebook, Instagram, Twitter, Github, Globe } from "lucide-react";

export function FooterLanding() {
  return (
    <footer className="relative border-t border-slate-200 pt-20 pb-10 font-mono overflow-hidden bg-card/50">
      {/* Hiệu ứng nền nhẹ */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-100/50 blur-[100px] rounded-full -z-10" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* 1. Brand Section - Cột lớn chiếm 4/12 */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 group w-fit">
              <div className="relative flex items-center justify-center w-12 h-12 bg-slate-900 rounded-2xl shadow-xl transition-transform group-hover:-rotate-6">
                <img
                  src="/DemifLogo.png"
                  alt="D"
                  className="w-8 h-8 brightness-0 invert"
                />
              </div>
              <span className="text-3xl font-black tracking-tighter italic uppercase text-slate-950">
                DEMIF<span className="text-orange-500 not-italic">.</span>
              </span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
              Nâng tầm kỹ năng ngôn ngữ với AI thông qua phương pháp
              <span className="text-slate-900 font-bold italic">
                {" "}
                Dictation
              </span>{" "}
              và
              <span className="text-slate-900 font-bold italic">
                {" "}
                Shadowing
              </span>{" "}
              chuyên sâu.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-orange-500 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Links Sections - 3 cột nhỏ mỗi cột 2/12 */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600">
              Sản phẩm
            </h4>
            <ul className="space-y-3">
              {["Tính năng", "Bảng giá", "Lộ trình", "Dự án"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm font-bold text-slate-500 hover:text-slate-950 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600">
              Công ty
            </h4>
            <ul className="space-y-3">
              {["Về chúng tôi", "Blog", "Tuyển dụng", "Liên hệ"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm font-bold text-slate-500 hover:text-slate-950 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600">
              Pháp lý
            </h4>
            <ul className="space-y-3">
              {["Bảo mật", "Điều khoản", "Cookie"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm font-bold text-slate-500 hover:text-slate-950 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Newsletter - Cột 2/12 cuối */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-600">
              Ngôn ngữ
            </h4>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-all">
                <Globe className="w-3.5 h-3.5" /> Tiếng Việt
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-all text-slate-400">
                English
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-xs font-bold text-slate-400">
              © 2026 DEMIF SYSTEM. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
              <span>Hà Nội</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
              <span>Sài Gòn</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
              <span>Đà Nẵng</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Hệ thống đang hoạt động tốt
          </div>
        </div>
      </div>
    </footer>
  );
}
