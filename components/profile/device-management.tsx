"use client";

import { Monitor, Smartphone, Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeviceManagement() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
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
      <Button
        variant="ghost"
        className="w-full text-rose-500 font-bold hover:bg-rose-50 rounded-2xl"
      >
        <LogOut className="h-4 w-4 mr-2" /> Đăng xuất khỏi tất cả thiết bị khác
      </Button>
    </div>
  );
}

function DeviceItem({ name, info, isCurrent, time, icon }: any) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl ${
            isCurrent
              ? "bg-orange-500 text-white shadow-orange-200"
              : "bg-slate-100 text-slate-400 shadow-sm"
          } shadow-lg`}
        >
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-slate-700 text-sm">
            {name}{" "}
            {isCurrent && (
              <span className="ml-2 text-[10px] text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                Hiện tại
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-400">{info}</p>
        </div>
      </div>
      {!isCurrent && (
        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-tighter">
            {time}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-rose-500 hover:bg-rose-50 rounded-lg text-xs font-bold"
          >
            Xóa
          </Button>
        </div>
      )}
    </div>
  );
}
