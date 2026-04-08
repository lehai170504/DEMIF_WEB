"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Newspaper } from "lucide-react";

const routeMap: Record<string, string> = {
  admin: "Quản trị",
  dashboard: "Bảng điều khiển",
  blogs: "Bài viết",
  lessons: "Bài học",
  users: "Học viên",
  profile: "Hồ sơ",
  notifications: "Thông báo",
  progress: "Tiến độ",
  subscriptions: "Gói dịch vụ",
  "user-subscriptions": "Quản lý đăng ký",
  payments: "Giao dịch",
};

export function Breadcrumbs({ pathname }: { pathname: string }) {
  const router = useRouter();

  const segments = React.useMemo(() => {
    return pathname
      .split("/")
      .filter((s) => Boolean(s) && s.toLowerCase() !== "admin");
  }, [pathname]);

  return (
    <nav className="hidden md:flex items-center text-sm text-slate-500 gap-2.5 animate-in fade-in slide-in-from-top-4 duration-500 ease-out p-2">
      <div
        className="flex shrink-0 items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/40 dark:bg-orange-500/10 border border-orange-200/50 dark:border-orange-500/10 group cursor-pointer transition-all hover:bg-orange-100 dark:hover:bg-orange-500/20 active:scale-95"
        onClick={() => router.push("/admin")}
      >
        <Newspaper className="h-3.5 w-3.5 text-[#FF7A00] shrink-0" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] whitespace-nowrap">
          Hệ thống
        </span>
      </div>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        const rawName = routeMap[segment] || segment.replace(/-/g, " ");

        const isId = /^[0-9a-fA-F-]{20,}$/.test(segment);

        const url = `/admin/${segments.slice(0, index + 1).join("/")}`;

        return (
          <div
            key={`${segment}-${index}`}
            className="flex items-center gap-2.5 min-w-0"
          >
            <span className="text-slate-300 dark:text-zinc-700 font-light select-none shrink-0">
              /
            </span>

            <span
              onClick={() => !isLast && router.push(url)}
              className={cn(
                "transition-all leading-none whitespace-nowrap",
                isId &&
                  "font-mono text-xs text-slate-400 bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded",
                isLast
                  ? "text-slate-900 dark:text-white font-semibold truncate max-w-[200px]"
                  : "hover:text-[#FF7A00] cursor-pointer",
              )}
            >
              {rawName}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
