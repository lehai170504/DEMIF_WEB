"use client";

import { LayoutGrid, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddAdminDialog from "./add-admin-dialog";

export function UserHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2 font-mono">
      <div className="space-y-1">
        {/* Nhãn phụ (Overline) */}
        <div className="flex items-center gap-2 text-[#FF7A00] mb-2">
          <div className="p-1.5 rounded-lg bg-[#FF7A00]/10 border border-[#FF7A00]/20 shadow-[0_0_15px_rgba(255,122,0,0.1)]">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Quản lý người dùng
          </span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
          Cộng đồng <span className="text-zinc-700 font-normal">Học viên</span>
        </h1>

        {/* Mô tả */}
        <p className="text-zinc-500 text-xs font-medium italic max-w-lg mt-2">
          Theo dõi hiệu suất và quản lý quyền hạn của toàn bộ học viên trên hệ
          thống.
        </p>
      </div>

      {/* Dialog thêm Admin */}
      <AddAdminDialog>
        <Button className="h-12 px-6 bg-[#FF7A00] text-white hover:bg-[#FF9E2C] font-bold rounded-2xl shadow-[0_10px_20px_rgba(255,122,0,0.2)] transition-all active:scale-95 border-none">
          <Plus className="h-4 w-4 mr-2" /> Cấp quyền Admin
        </Button>
      </AddAdminDialog>
    </div>
  );
}
