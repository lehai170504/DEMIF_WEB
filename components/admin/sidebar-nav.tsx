"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Shield,
  CreditCard,
  Bell,
  LogOut,
  Activity,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const navItems = [
  {
    title: "Hồ sơ cá nhân",
    href: "/admin/settings/profile",
    icon: User,
  },
  {
    title: "Bảo mật hệ thống",
    href: "/admin/settings/security",
    icon: Shield,
  },
  {
    title: "Gói dịch vụ & Thanh toán",
    href: "/admin/settings/billing",
    icon: CreditCard,
  },
  {
    title: "Cấu hình thông báo",
    href: "/admin/settings/notifications",
    icon: Bell,
  },
  {
    title: "Nhật ký hoạt động",
    href: "/admin/settings/logs",
    icon: Activity,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <nav className="space-y-2 font-mono">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 relative group",
              isActive
                ? "bg-gray-900 text-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.2)] scale-[1.02]"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
            )}
          >
            <item.icon
              className={cn(
                "w-4 h-4 transition-transform duration-300 group-hover:scale-110",
                isActive
                  ? "text-white"
                  : "text-gray-400 group-hover:text-gray-900",
              )}
            />
            {item.title}

            {/* Dấu chấm chỉ báo active */}
            {isActive && (
              <div className="absolute right-3 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_5px_#FF7A00]" />
            )}
          </Link>
        );
      })}

      <div className="pt-4 border-t border-gray-200 mt-4">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-4 py-3 text-rose-600 font-black uppercase text-[11px] w-full hover:bg-rose-50 hover:text-rose-700 rounded-2xl transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          )}
          {isLoggingOut ? "Đang xử lý..." : "Đăng xuất hệ thống"}
        </button>
      </div>
    </nav>
  );
}
