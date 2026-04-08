"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  BookOpen,
  Newspaper,
  LayoutDashboard,
  Loader2,
  Package,
  Receipt,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserProfile } from "@/hooks/use-user";

type MenuItem = {
  href: string;
  icon: any;
  label: string;
  adminOnly?: boolean;
};

type MenuGroup = {
  group: string;
  items: MenuItem[];
};

const MENU_GROUPS: MenuGroup[] = [
  {
    group: "TỔNG QUAN",
    items: [
      {
        href: "/admin",
        icon: LayoutDashboard,
        label: "BẢNG ĐIỀU KHIỂN",
        adminOnly: true,
      },
    ],
  },
  {
    group: "NỘI DUNG",
    items: [
      { href: "/admin/lessons", icon: BookOpen, label: "BÀI TẬP" },
      { href: "/admin/blogs", icon: Newspaper, label: "BÀI VIẾT BLOG" },
    ],
  },
  {
    group: "HỆ THỐNG",
    items: [
      {
        href: "/admin/users",
        icon: Users,
        label: "TÀI KHOẢN",
        adminOnly: true,
      },
      {
        href: "/admin/subscriptions",
        icon: Package,
        label: "GÓI DỊCH VỤ",
        adminOnly: true,
      },
      {
        href: "/admin/payments",
        icon: Receipt,
        label: "GIAO DỊCH",
        adminOnly: true,
      },
      {
        href: "/admin/user-subscriptions",
        icon: UserCheck,
        label: "NGƯỜI DÙNG - GÓI DỊCH VỤ",
        adminOnly: true,
      },
    ],
  },
];

const NavItem = ({ href, icon: Icon, label, isActive, showText }: any) => {
  return (
    <Link href={href} className="block w-full outline-none font-mono">
      <div
        className={cn(
          "group relative flex items-center h-12 rounded-[1rem] transition-all duration-300 mb-1.5 px-4 mx-3",
          "hover:translate-x-1 active:scale-95",
          isActive
            ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/20"
            : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white",
          !showText && "justify-center px-0 mx-2 w-12",
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
            showText && "mr-3",
            isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100",
          )}
        />
        {showText && (
          <span className="text-[11px] font-black uppercase tracking-widest truncate">
            {label}
          </span>
        )}

        {isActive && (
          <div className="absolute -left-3 w-1.5 h-6 bg-orange-500 rounded-r-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
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
    `https://ui-avatars.com/api/?name=${user?.username || "A"}&background=FF7A00&color=fff&bold=true`;
  const displayName = user?.username || "HỆ THỐNG";

  const rolesArray: string[] = Array.isArray(user?.roles)
    ? user.roles
    : [user?.roles || ""];

  const isAdmin = rolesArray.some(
    (r) => typeof r === "string" && r.toLowerCase() === "admin",
  );

  const roleDisplay = isAdmin ? "QUẢN TRỊ VIÊN" : "ĐIỀU HÀNH VIÊN";

  const visibleMenuGroups = MENU_GROUPS.map((group) => {
    const filteredItems = group.items.filter(
      (item) => isAdmin || !item.adminOnly,
    );
    return { ...group, items: filteredItems };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col h-full font-mono py-4">
      {/* ================= HEADER: ADMIN PROFILE ================= */}
      <div
        className={cn(
          "flex items-center justify-center h-20 mb-6 transition-all duration-500",
          showText ? "px-5" : "px-3",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 w-full p-2.5 rounded-[1.25rem] transition-all duration-500 relative overflow-hidden group cursor-pointer",
            showText
              ? "bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-inner hover:border-orange-200 dark:hover:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10"
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
                    "relative rounded-xl border border-slate-200 dark:border-white/10 object-cover shadow-sm transition-all duration-300 group-hover:scale-105",
                    showText ? "h-11 w-11" : "h-12 w-12",
                  )}
                />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-zinc-950 rounded-full z-10 shadow-sm" />
              </div>

              {/* Text Info */}
              {showText && (
                <div className="flex flex-col min-w-0 flex-1 space-y-0.5">
                  <span
                    className="font-black text-[11px] text-slate-900 dark:text-white uppercase tracking-widest truncate group-hover:text-[#FF7A00] transition-colors"
                    title={displayName}
                  >
                    {displayName}
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] truncate">
                    {roleDisplay}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ================= SCROLL MENU AREA ================= */}
      <ScrollArea className="flex-1 px-1 custom-scrollbar">
        <div className="space-y-8 pb-20">
          {visibleMenuGroups.map((group) => (
            <div key={group.group} className="relative font-mono">
              {showText ? (
                <h3 className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-600 mb-4 flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-sm bg-orange-500/50 dark:bg-orange-500/30" />
                  {group.group}
                </h3>
              ) : (
                <div className="h-px bg-slate-200 dark:bg-white/5 w-6 mx-auto mb-4 mt-2" />
              )}

              <div className="space-y-1.5">
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
