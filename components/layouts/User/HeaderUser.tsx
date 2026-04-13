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
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NotificationBell } from "@/components/notifications/notification-bell";

const navLinks = [
  { name: "Trang chủ", href: "/home" },
  { name: "Chính tả", href: "/dictation" },
  { name: "Shadowing", href: "/shadowing" },
  { name: "Ôn tập", href: "/review" },
  { name: "Bảng xếp hạng", href: "/leaderboard" },
  { name: "Bài viết", href: "/blog" },
];

export function HeaderUser() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const firstLetter = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "U";
  const displayName = user?.username || "Người dùng";
  const displayEmail = user?.email || "Chưa cập nhật email";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-[100] w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-black/10"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex h-20 items-center justify-between gap-8 font-mono">
          {/* --- LEFT: LOGO SECTION --- */}
          <div className="flex items-center gap-10">
            <Link href="/home" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] shadow-lg shadow-orange-500/20 border border-white/10"
              >
                <img
                  src="/DemifLogo.png"
                  alt="Demif Logo"
                  className="w-7 h-7 brightness-0 invert drop-shadow-md"
                />
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter italic uppercase text-gray-900 dark:text-white leading-none group-hover:text-orange-500 dark:group-hover:text-orange-100 transition-colors">
                  DEMIF<span className="text-[#FF7A00] not-italic">.</span>
                </span>
              </div>
            </Link>

            {/* --- MIDDLE: DESKTOP NAVIGATION --- */}
            <nav className="hidden xl:flex items-center gap-1 p-1.5 bg-gray-100/80 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-2xl backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-5 py-2.5 text-[12px] font-bold rounded-xl transition-colors duration-200 whitespace-nowrap",
                      isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/20 to-[#FF9E2C]/20 border border-[#FF7A00]/30 rounded-xl shadow-[0_0_20px_rgba(255,122,0,0.15)]"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10 uppercase tracking-wider">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* --- RIGHT: ACTIONS SECTION --- */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* A. Upgrade PRO Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex h-11 px-6 rounded-xl border-[#FF7A00]/50 bg-[#FF7A00]/10 text-[#FF7A00] font-black text-[10px] uppercase tracking-widest hover:bg-[#FF7A00] hover:text-white hover:border-[#FF7A00] hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all duration-300 gap-2"
                asChild
              >
                <Link href="/upgrade">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      repeatDelay: 3,
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  Upgrade_Pro
                </Link>
              </Button>
            </motion.div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* --- NÚT CHUÔNG THÔNG BÁO Ở ĐÂY --- */}
            <NotificationBell />

            <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-white/10 mx-1" />

            {/* B. User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all outline-none group border border-transparent hover:border-gray-200 dark:hover:border-white/10"
                >
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-900 border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-white font-black text-xs shadow-lg relative overflow-hidden">
                    {isMounted && user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="relative z-10">{firstLetter}</span>
                    )}
                    <div className="absolute inset-0 bg-[#FF7A00]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Tên hiển thị */}
                  <div className="hidden sm:block text-left">
                    <p className="text-[12px] font-bold leading-none text-gray-700 dark:text-zinc-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors max-w-[100px] truncate">
                      {displayName}
                    </p>
                    <p className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">
                      Online
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-zinc-500 group-hover:text-gray-900 dark:group-hover:text-white group-data-[state=open]:rotate-180 transition-all duration-300" />
                </motion.button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 p-3 rounded-[1.5rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-[#09090b]/90 backdrop-blur-xl shadow-2xl shadow-gray-300/50 dark:shadow-black/50 font-mono mt-4 mr-2"
              >
                <DropdownMenuLabel className="p-0 mb-3 select-none">
                  <div className="group/item flex items-center gap-4 p-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/20 overflow-hidden shrink-0 border border-white/20">
                      <div className="w-full h-full transition-transform duration-500 group-hover/item:scale-110 flex items-center justify-center">
                        {isMounted && user?.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={displayName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xl">{firstLetter}</span>
                        )}
                      </div>
                    </div>

                    {/* Text info */}
                    <div className="overflow-hidden space-y-0.5">
                      <p className="text-xs font-mono text-slate-900 dark:text-white tracking-tight truncate">
                        {displayName}
                      </p>
                      <p
                        className="text-[9px] text-slate-500 dark:text-zinc-500 font-mono truncate tracking-tight"
                        title={displayEmail}
                      >
                        {displayEmail}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <div className="space-y-1">
                  {[
                    {
                      icon: User,
                      label: "Tài khoản",
                      href: "/profile/edit",
                    },
                    {
                      icon: LayoutGrid,
                      label: "Bảng quản lý",
                      href: "/dashboard",
                    },
                    {
                      icon: CreditCard,
                      label: "Gói dịch vụ",
                      href: "/profile/edit?tab=billing",
                    },
                    {
                      icon: Settings,
                      label: "Cài đặt",
                      href: "/profile/settings",
                    },
                  ].map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      asChild
                      className="rounded-xl cursor-pointer p-3 focus:bg-gray-100 dark:focus:bg-white/10 focus:text-gray-900 dark:focus:text-white text-gray-600 dark:text-zinc-400 transition-all duration-200 group border border-transparent focus:border-gray-200 dark:focus:border-white/5"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center w-full"
                      >
                        <item.icon className="mr-3 h-4 w-4 text-gray-500 dark:text-zinc-500 group-focus:text-[#FF7A00] transition-colors" />
                        <span className="font-bold text-[10px] uppercase tracking-wider">
                          {item.label}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>

                <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-white/10" />

                {/* Nút Logout */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl cursor-pointer p-3 text-red-400 focus:bg-red-500/10 focus:text-red-400 focus:border-red-500/20 border border-transparent"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-bold text-[10px] uppercase tracking-wider">
                    Đăng xuất
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* C. Mobile Burger Menu */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/5"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
