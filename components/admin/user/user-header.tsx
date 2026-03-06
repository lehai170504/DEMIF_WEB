"use client";

import { LayoutGrid, Plus, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddAdminDialog from "./add-admin-dialog";

export function UserHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 px-2 font-mono">
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-orange-600 mb-2">
          <div className="p-2 rounded-2xl bg-orange-100 shadow-sm">
            <Users2 className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">
            Hệ thống quản trị học viên
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none text-gray-900">
          Cộng đồng <span className="text-gray-300">Demif</span>
        </h1>

        <p className="text-gray-500 text-[13px] font-medium italic max-w-lg mt-3 border-l-4 border-orange-500 pl-4">
          Nơi quản lý tập trung toàn bộ hồ sơ, tiến độ và quyền hạn truy cập của
          cộng đồng học viên ngôn ngữ.
        </p>
      </div>

      <AddAdminDialog>
        <Button className="h-16 px-8 bg-orange-500 text-white hover:bg-gray-900 font-black rounded-[2rem] shadow-xl shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 border-none uppercase tracking-widest text-xs gap-3">
          <Plus className="h-5 w-5 stroke-[3px]" /> Khởi tạo Quản trị viên
        </Button>
      </AddAdminDialog>
    </div>
  );
}
