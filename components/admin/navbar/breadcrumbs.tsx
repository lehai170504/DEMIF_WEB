"use client";

import { ChevronRight, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const routeMap: Record<string, string> = {
  admin: "Quản trị",
  dashboard: "Bảng điều khiển",
  stats: "Thống kê",
  statistics: "Số liệu hệ thống",
  lessons: "Bài học",
  users: "Học viên",
  settings: "Cài đặt",
  feedback: "Phản hồi",
  profile: "Hồ sơ",
  security: "Bảo mật",
  billing: "Thanh toán",
  notifications: "Thông báo",
  logs: "Nhật ký",
  orders: "Đơn hàng",
  progress: "Tiến độ",
};

export function Breadcrumbs({ pathname }: { pathname: string }) {
  const router = useRouter();
  const segments = pathname
    .split("/")
    .filter((s) => Boolean(s) && s !== "admin");

  return (
    <nav className="hidden md:flex items-center text-sm font-medium text-zinc-400 font-mono">
      <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 mr-2">
        <LayoutGrid className="h-4 w-4 text-orange-500" />
      </div>

      <span
        className="hover:text-white cursor-pointer transition-colors"
        onClick={() => router.push("/admin")}
      >
        Hệ thống
      </span>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const translatedName = routeMap[segment] || segment.replace(/-/g, " ");
        const url = `/admin/${segments.slice(0, index + 1).join("/")}`;

        return (
          <div key={segment} className="flex items-center">
            <ChevronRight className="h-3 w-3 mx-1.5 text-zinc-600" />
            <span
              onClick={() => !isLast && router.push(url)}
              className={cn(
                "capitalize transition-all",
                isLast
                  ? "text-white font-black italic tracking-tight"
                  : "hover:text-orange-500 cursor-pointer",
              )}
            >
              {translatedName}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
