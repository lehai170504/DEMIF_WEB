"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Settings,
  User,
  Menu,
  ChevronDown,
  Sparkles,
  CreditCard,
  LayoutGrid,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Trang chủ", href: "/user/home" },
  { name: "Chính tả", href: "/user/dictation" },
  { name: "Shadowing", href: "/user/shadowing" },
  { name: "Ôn tập", href: "/user/review" },
  { name: "Bảng xếp hạng", href: "/user/leaderboard" },
];

export function HeaderUser() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-8 font-mono">
          {/* 1. LOGO SECTION - Sharp & Clear */}
          <div className="flex items-center gap-10">
            <Link href="/home" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-10 h-10 bg-orange-500 rounded-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <img
                  src="/DemifLogo.png"
                  alt="D"
                  className="w-7 h-7 brightness-0 invert"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter italic uppercase text-slate-950">
                DEMIF<span className="text-orange-500 not-italic">.</span>
              </span>
            </Link>

            {/* 2. DESKTOP NAV - Enhanced Contrast */}
            <nav className="hidden xl:flex items-center gap-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/50">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-5 py-2 text-[13px] font-bold rounded-xl transition-all duration-200 whitespace-nowrap",
                      isActive
                        ? "bg-white text-orange-600 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* 3. ACTIONS SECTION */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* PRO Badge - More Visible */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex h-10 px-5 rounded-xl border-orange-200 bg-orange-50 text-orange-600 font-black text-xs hover:bg-orange-100 hover:text-neutral-800 transition-all gap-2 shadow-sm shadow-orange-100"
              asChild
            >
              <Link href="/user/upgrade">
                <Sparkles className="w-4 h-4 fill-orange-500" />
                UPGRADE PRO
              </Link>
            </Button>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-slate-200" />

            {/* USER PROFILE - Clean & Bold */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-1 pr-3 rounded-2xl hover:bg-slate-50 transition-all outline-none group border border-transparent hover:border-slate-200">
                  <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:bg-orange-600 transition-colors">
                    HV
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-[12px] font-black leading-none uppercase text-slate-900">
                      Hà Vi
                    </p>
                    <p className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">
                      Online
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-data-[state=open]:rotate-180 transition-transform" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 p-3 rounded-[2rem] shadow-2xl border-slate-200 bg-white font-mono mt-2"
              >
                <DropdownMenuLabel className="px-3 py-4 mb-2 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black">
                      HV
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase">
                        Hà Vi
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold lowercase">
                        havi.student@demif.com
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <div className="space-y-1">
                  {[
                    {
                      icon: User,
                      label: "Tài khoản",
                      href: "/user/profile/edit",
                    },
                    {
                      icon: LayoutGrid,
                      label: "Bảng quản lý",
                      href: "/user/dashboard",
                    },
                    {
                      icon: CreditCard,
                      label: "Gói dịch vụ",
                      href: "/user/upgrade",
                    },
                    {
                      icon: Settings,
                      label: "Cài đặt",
                      href: "/user/profile/settings",
                    },
                  ].map((item) => (
                    /* Sử dụng asChild để tránh việc render 2 thẻ <a> chồng nhau */
                    <DropdownMenuItem
                      key={item.label}
                      asChild
                      className="rounded-xl cursor-pointer p-3 focus:bg-slate-100 focus:text-slate-900 transition-colors group"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center w-full"
                      >
                        <item.icon className="mr-3 h-4 w-4 text-slate-400 group-focus:text-orange-500" />
                        <span className="font-bold text-[11px] uppercase tracking-wider">
                          {item.label}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem className="rounded-xl cursor-pointer p-3 text-red-500 focus:bg-red-50 focus:text-red-600">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-black text-[11px] uppercase tracking-wider">
                    Đăng xuất
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Burger */}
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden rounded-xl bg-slate-100"
            >
              <Menu className="h-5 w-5 text-slate-900" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
