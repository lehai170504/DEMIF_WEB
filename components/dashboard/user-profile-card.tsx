import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Heart, Share2, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UserProfileCard() {
  return (
    <Card className="p-8 border-none bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
      {/* Nền trang trí nhẹ */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700" />

      <div className="flex flex-col items-center text-center relative z-10 font-mono">
        {/* Avatar Section */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-3xl font-black italic text-white">HT</span>
          </div>
          <button className="absolute -bottom-1 -right-1 w-9 h-9 bg-orange-500 rounded-2xl flex items-center justify-center border-4 border-white dark:border-slate-900 hover:bg-orange-600 transition-colors shadow-lg">
            <Camera className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Name & Username */}
        <div className="space-y-1 mb-6">
          <Badge
            variant="outline"
            className="mb-2 border-orange-200 text-orange-600 font-bold px-3 rounded-lg text-[9px] uppercase tracking-widest"
          >
            Học viên PRO
          </Badge>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tighter italic uppercase">
            Huỳnh Hữu Toàn
          </h2>
          <p className="text-[11px] font-bold text-slate-400 tracking-wider">
            @huynhtoan135
          </p>
        </div>

        {/* Info Grid */}
        <div className="w-full space-y-3 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-orange-50/50 group/item">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm group-hover/item:text-orange-500 transition-colors">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight">
              TP. Hồ Chí Minh
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-orange-50/50 group/item">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm group-hover/item:text-orange-500 transition-colors">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">
                Tham gia từ
              </p>
              <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                21/10/2024
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-5 gap-2 w-full">
          <Button className="col-span-4 h-12 rounded-2xl bg-slate-900 dark:bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-[0.1em] shadow-lg shadow-orange-500/20 transition-all active:scale-95">
            Chỉnh sửa hồ sơ
          </Button>
          <Button
            variant="outline"
            className="col-span-1 h-12 rounded-2xl border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
          >
            <Share2 className="h-4 w-4 text-slate-600" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
