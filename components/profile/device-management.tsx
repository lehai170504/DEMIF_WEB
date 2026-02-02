"use client";

import { Monitor, Smartphone, Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeviceManagement() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-4">
        <DeviceItem
          name="MacBook Pro 14 inch"
          info="Chrome • TP. Hồ Chí Minh, Việt Nam"
          isCurrent
          icon={<Monitor className="h-5 w-5" />}
        />
        <DeviceItem
          name="iPhone 15 Pro"
          info="App • TP. Đà Nẵng, Việt Nam"
          time="2 giờ trước"
          icon={<Smartphone className="h-5 w-5" />}
        />
        <DeviceItem
          name="Windows PC"
          info="Edge • Hà Nội, Việt Nam"
          time="Hôm qua"
          icon={<Globe className="h-5 w-5" />}
        />
      </div>

      <div className="pt-4 border-t border-white/5">
        <Button
          variant="ghost"
          className="w-full text-rose-500 font-bold hover:bg-rose-500/10 hover:text-rose-400 rounded-2xl h-12 uppercase text-xs tracking-widest"
        >
          <LogOut className="h-4 w-4 mr-2" /> Đăng xuất tất cả thiết bị khác
        </Button>
      </div>
    </div>
  );
}

function DeviceItem({ name, info, isCurrent, time, icon }: any) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
      <div className="flex items-center gap-5">
        <div
          className={`p-3.5 rounded-xl ${
            isCurrent
              ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
              : "bg-black/40 text-zinc-500 border border-white/5"
          }`}
        >
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-white text-sm flex items-center gap-3">
            {name}
            {isCurrent && (
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md uppercase tracking-wide">
                Hiện tại
              </span>
            )}
          </h4>
          <p className="text-xs text-zinc-500 mt-1 font-medium">{info}</p>
        </div>
      </div>
      {!isCurrent && (
        <div className="text-right flex flex-col items-end gap-2">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">
            {time}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all"
          >
            Xóa
          </Button>
        </div>
      )}
    </div>
  );
}
