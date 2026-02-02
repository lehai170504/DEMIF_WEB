"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Shield, CreditCard, Bell, LogOut, Activity } from "lucide-react";

const navItems = [
  { title: "Hồ sơ cá nhân", href: "/admin/settings/profile", icon: User },
  { title: "Bảo mật hệ thống", href: "/admin/settings/security", icon: Shield },
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
  { title: "Nhật ký hoạt động", href: "/admin/settings/logs", icon: Activity },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1.5 font-mono">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 relative group",
            pathname === item.href
              ? "bg-[#FF7A00] text-white shadow-[0_10px_20px_rgba(255,122,0,0.2)] scale-[1.02]"
              : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200",
          )}
        >
          <item.icon
            className={cn(
              "w-4 h-4 transition-transform group-hover:scale-110",
              pathname === item.href ? "text-white" : "text-[#FF7A00]",
            )}
          />
          {item.title}
          {pathname === item.href && (
            <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          )}
        </Link>
      ))}

      <div className="pt-4 border-t border-white/5 mt-4">
        <button className="flex items-center gap-3 px-4 py-3 text-rose-500 font-black uppercase text-[11px] w-full hover:bg-rose-500/10 rounded-2xl transition-all active:scale-95 group">
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Đăng xuất hệ thống
        </button>
      </div>
    </nav>
  );
}
