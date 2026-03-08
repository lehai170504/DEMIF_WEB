"use client";

import { Plus, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8 px-2 font-mono">
      <div className="space-y-2">
        {/* Label phụ (Eyebrow) */}
        <div className="flex items-center gap-2 text-orange-600 mb-3">
          <div className="p-1.5 rounded-lg bg-orange-100 border border-orange-200 shadow-sm">
            <Users2 className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Hệ thống quản trị</span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900">
          Cộng đồng <span className="text-slate-400 font-medium">Demif</span>
        </h1>

        {/* Mô tả */}
        <p className="text-slate-500 text-sm font-medium max-w-lg mt-2 border-l-4 border-orange-500 pl-4">
          Nơi quản lý tập trung toàn bộ hồ sơ, tiến độ và quyền hạn truy cập của
          cộng đồng học viên hệ thống.
        </p>
      </div>
    </div>
  );
}
