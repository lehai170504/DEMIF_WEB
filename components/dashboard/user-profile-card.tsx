import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Share2, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UserProfileCard() {
  return (
    // GIẢM PADDING: p-6 -> p-5
    <div className="p-5 w-full flex flex-col items-center text-center relative z-10 font-mono">
      {/* Nền trang trí nhẹ */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF7A00]/10 blur-2xl rounded-full -mr-8 -mt-8 pointer-events-none" />

      {/* Avatar Section: GIẢM SIZE w-24 -> w-20 */}
      <div className="relative mb-4 group cursor-pointer">
        <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out relative overflow-hidden">
          <span className="text-2xl font-black italic text-white z-10">HT</span>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF7A00] rounded-lg flex items-center justify-center border-[2px] border-[#121212] hover:bg-[#FF9E2C] hover:scale-110 transition-all duration-300 shadow-lg group-hover:rotate-12">
          <Camera className="h-3 w-3 text-white" />
        </button>
      </div>

      {/* Name & Username: GIẢM MARGIN */}
      <div className="space-y-0.5 mb-5">
        <Badge
          variant="outline"
          className="mb-1 border-[#FF7A00]/50 bg-[#FF7A00]/10 text-[#FF7A00] font-bold px-2 py-0 rounded text-[9px] uppercase tracking-widest hover:bg-[#FF7A00]/20 transition-colors"
        >
          Học viên PRO
        </Badge>
        {/* Giảm size chữ tên một chút */}
        <h2 className="text-xl font-black text-white leading-none tracking-tighter italic uppercase drop-shadow-sm">
          Huỳnh Hữu Toàn
        </h2>
        <p className="text-[10px] font-bold text-zinc-500 tracking-wider hover:text-zinc-300 transition-colors cursor-pointer">
          @huynhtoan135
        </p>
      </div>

      {/* Info Grid: GIẢM MARGIN mb-8 -> mb-5 */}
      <div className="w-full space-y-2 mb-5">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 group/item">
          <div className="p-1.5 bg-zinc-900 rounded-lg shadow-inner border border-white/5 group-hover/item:text-[#FF7A00] transition-colors">
            <MapPin className="h-3.5 w-3.5 text-zinc-400 group-hover/item:text-[#FF7A00] transition-colors" />
          </div>
          <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-tight group-hover/item:text-white transition-colors">
            TP. Hồ Chí Minh
          </span>
        </div>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 group/item">
          <div className="p-1.5 bg-zinc-900 rounded-lg shadow-inner border border-white/5 group-hover/item:text-[#FF7A00] transition-colors">
            <Calendar className="h-3.5 w-3.5 text-zinc-400 group-hover/item:text-[#FF7A00] transition-colors" />
          </div>
          <div className="text-left flex flex-col justify-center">
            {/* Gom gọn text */}
            <p className="text-[9px] font-bold text-zinc-400 uppercase leading-none group-hover/item:text-white transition-colors">
              Gia nhập: <span className="text-zinc-300">21/10/2024</span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-5 gap-2 w-full mt-auto">
        <Button className="col-span-4 h-10 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:from-orange-600 hover:to-orange-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-orange-900/20 border border-white/10 transition-all active:scale-95">
          Chỉnh sửa thông tin
        </Button>
        <Button
          variant="outline"
          className="col-span-1 h-10 rounded-xl border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all active:scale-95"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
