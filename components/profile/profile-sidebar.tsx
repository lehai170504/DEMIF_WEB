"use client";

import {
  User,
  Lock,
  Shield,
  Smartphone,
  CreditCard,
  ChevronRight,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { id: "account", label: "Thông tin cá nhân", icon: User },
  { id: "password", label: "Mật khẩu", icon: Lock },
  { id: "mfa", label: "Bảo mật 2FA", icon: Shield },
  { id: "devices", label: "Thiết bị", icon: Smartphone },
  { id: "billing", label: "Thanh toán", icon: CreditCard },
  { id: "settings", label: "Cài đặt", icon: Settings },
];

export function ProfileSidebar({ activeTab, onTabChange }: any) {
  return (
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "group relative w-full flex items-center justify-between px-5 py-4 rounded-[1.5rem] transition-colors duration-300 overflow-hidden",
              // Loại bỏ background tĩnh ở đây, chúng ta sẽ dùng motion.div để làm background động
              isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300",
            )}
          >
            {/* --- 1. Hiệu ứng nền trượt (Floating Background) --- */}
            {isActive && (
              <motion.div
                layoutId="active-profile-tab-bg" // ID duy nhất để Framer nhận diện và animate giữa các tab
                className="absolute inset-0 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5 rounded-[1.5rem]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* --- 2. Hiệu ứng thanh chỉ dẫn trượt (Active Indicator) --- */}
            {isActive && (
              <motion.div
                layoutId="active-profile-tab-indicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Hover Background (cho các item không active) */}
            {!isActive && (
              <div className="absolute inset-0 bg-gray-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]" />
            )}

            {/* Nội dung chính (cần z-10 để nổi lên trên background) */}
            <div className="flex items-center gap-4 relative z-10">
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  isActive
                    ? "text-orange-500"
                    : "text-gray-400 dark:text-zinc-600 group-hover:text-gray-600 dark:group-hover:text-zinc-400",
                )}
              />
              <span className="font-bold text-sm">{item.label}</span>
            </div>

            <ChevronRight
              className={cn(
                "h-4 w-4 transition-all duration-300 relative z-10",
                isActive
                  ? "opacity-100 translate-x-0 text-gray-900 dark:text-white"
                  : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 text-gray-400 dark:text-zinc-600",
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
