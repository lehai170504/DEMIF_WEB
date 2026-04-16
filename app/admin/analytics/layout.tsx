"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const TABS = [
  { name: "Người dùng", path: "/admin/analytics/users", icon: Users },
  { name: "Bài học", path: "/admin/analytics/lessons", icon: BookOpen },
  { name: "Tài chính", path: "/admin/analytics/payments", icon: Wallet },
];

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="max-w-[1600px] mx-auto pb-16 px-4 md:px-8 font-mono relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50/50 to-transparent dark:from-[#111]/50" />
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-orange-400/5 dark:bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 pt-8 space-y-8">
        {/* Header & Tabs */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight text-slate-900 dark:text-white tracking-tight">
              Trung tâm{" "}
              <span className="text-orange-500 font-medium">Phân tích</span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 text-sm font-medium mt-2">
              Dữ liệu thời gian thực về hoạt động của hệ thống
            </p>
          </div>

          {/* Navigation Tabs with Framer Motion */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-zinc-800/50 rounded-2xl w-fit overflow-x-auto hide-scrollbar border border-slate-200 dark:border-white/5 relative z-20">
            {TABS.map((tab) => {
              const isActive = pathname === tab.path;
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.path}
                  href={tab.path}
                  className={cn(
                    "relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap z-10",
                    isActive
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-analytics-tab"
                      className="absolute inset-0 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200/50 dark:border-white/10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>

        <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
