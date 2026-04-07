"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Settings,
  BookOpen,
  CreditCard,
  Newspaper,
  Users2,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserProfile } from "@/hooks/use-user";

const MENU_GROUPS = [
  {
    group: "Tổng quan",
    items: [{ href: "/admin", icon: LayoutDashboard, label: "Dashboard" }],
  },
  {
    group: "Nội dung",
    items: [
      { href: "/admin/lessons", icon: BookOpen, label: "Bài tập" },
      { href: "/admin/blogs", icon: Newspaper, label: "Blog" },
    ],
  },
  {
    group: "Hệ thống",
    items: [
      { href: "/admin/users", icon: Users, label: "Người dùng" },
      {
        href: "/admin/subscriptions",
        icon: CreditCard,
        label: "Gói dịch vụ",
      },
      {
        href: "/admin/user-subscriptions",
        icon: Users2,
        label: "Người đăng ký",
      },
    ],
  },
];

const NavItem = ({ href, icon: Icon, label, isActive, showText }: any) => {
  return (
    <Link href={href} className="block w-full">
      <div
        className={cn(
          "group relative flex items-center h-12 rounded-[1rem] transition-all duration-300 mb-2 px-4 mx-3",
          "hover:translate-x-1 active:scale-95",
          isActive
            ? "bg-[#FF7A00] text-white shadow-lg shadow-orange-500/20"
            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50 hover:text-slate-900 dark:hover:text-white",
          !showText && "justify-center px-0 mx-2 w-12", // Vuông vức khi thu gọn
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
            showText && "mr-3",
          )}
        />
        {showText && (
          <span className="text-sm font-bold tracking-tight capitalize truncate">
            {label}
          </span>
        )}

        {/* Vạch kẻ chỉ báo trạng thái Active siêu nhỏ bên trái */}
        {isActive && (
          <div className="absolute -left-3 w-1.5 h-6 bg-[#FF7A00] rounded-r-full shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
        )}
      </div>
    </Link>
  );
};

export default function AdminSidebarContent({ isCollapsed, forceOpen }: any) {
  const pathname = usePathname();
  const { data: user, isLoading } = useUserProfile();

  const showText = forceOpen || !isCollapsed;

  const checkActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const avatarSrc =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${user?.username || "Admin"}&background=FF7A00&color=fff&bold=true`;
  const displayName = user?.username || "Admin User";
  const roleDisplay = user?.roles?.includes("Admin")
    ? "Master Admin"
    : "Moderator";

  return (
    <div className="flex flex-col h-full font-mono py-4">
      {/* ================= HEADER: ADMIN PROFILE ================= */}
      <div
        className={cn(
          "flex items-center justify-center h-20 mb-4 transition-all duration-500",
          showText ? "px-5" : "px-3",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 w-full p-2.5 rounded-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer",
            showText
              ? "bg-slate-50 dark:bg-zinc-900/50 border border-slate-200/60 dark:border-white/5 shadow-inner hover:border-orange-200 dark:hover:border-orange-500/30"
              : "justify-center",
          )}
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin text-[#FF7A00] mx-auto" />
          ) : (
            <>
              {/* Avatar Box */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#FF7A00]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={avatarSrc}
                  alt={displayName}
                  className={cn(
                    "relative rounded-xl border-2 border-white dark:border-zinc-800 object-cover shadow-sm transition-all duration-300 group-hover:scale-105",
                    showText ? "h-11 w-11" : "h-12 w-12", // Trạng thái thu gọn cho avatar to ra tí cho dễ bấm
                  )}
                />
                {/* Dấu chấm Online */}
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full z-10" />
              </div>

              {/* Text Info */}
              {showText && (
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className="font-black text-[13px] text-slate-900 dark:text-white tracking-tighter truncate group-hover:text-[#FF7A00] transition-colors"
                    title={displayName}
                  >
                    {displayName}
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] truncate mt-0.5">
                    {roleDisplay}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ================= SCROLL MENU AREA ================= */}
      <ScrollArea className="flex-1 px-1 no-scrollbar">
        <div className="space-y-6 pb-20">
          {" "}
          {MENU_GROUPS.map((group) => (
            <div key={group.group} className="relative">
              {showText ? (
                <h3 className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 mb-3 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700" />
                  {group.group}
                </h3>
              ) : (
                <div className="h-px bg-slate-200 dark:bg-white/5 w-8 mx-auto mb-4 mt-2" />
              )}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem
                    key={item.href}
                    {...item}
                    isActive={checkActive(item.href)}
                    showText={showText}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
