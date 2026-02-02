"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User } from "lucide-react";

export function AccountInfo() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Avatar với hiệu ứng Glow */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <Avatar className="h-28 w-28 border-4 border-[#18181b] shadow-2xl relative">
            <AvatarImage src="/avatar-placeholder.jpg" />
            <AvatarFallback className="bg-zinc-800 text-zinc-400 font-bold text-2xl">
              D
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 p-2.5 bg-orange-500 text-white rounded-full border-4 border-[#18181b] hover:bg-orange-600 hover:scale-110 transition-all shadow-lg">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black text-white tracking-tight">
            Thông tin cá nhân
          </h3>
          <p className="text-sm text-zinc-400 max-w-md">
            Cập nhật ảnh đại diện và thông tin cơ bản của bạn để hiển thị trên
            hồ sơ công khai.
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Tên đăng nhập
          </Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
            <Input
              defaultValue="demif_user"
              className="pl-11 h-12 rounded-2xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Email (Cố định)
          </Label>
          <Input
            value="user@example.com"
            disabled
            className="h-12 rounded-2xl bg-white/5 border-transparent text-zinc-500 cursor-not-allowed"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Họ và tên
          </Label>
          <Input
            placeholder="Nguyễn Văn A"
            className="h-12 rounded-2xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Số điện thoại
          </Label>
          <Input
            placeholder="090 123 4567"
            className="h-12 rounded-2xl border-white/10 bg-black/20 text-white focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-6 border-t border-white/5">
        <Button className="h-12 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
