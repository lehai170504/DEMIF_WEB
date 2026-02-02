"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock } from "lucide-react";

export function PasswordSettings() {
  return (
    <div className="max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Alert Box */}
      <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-4 items-start">
        <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
          <ShieldCheck className="h-5 w-5 text-blue-400" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-blue-300">Bảo mật mật khẩu</h4>
          <p className="text-xs text-blue-200/70 leading-relaxed font-medium">
            Sử dụng mật khẩu mạnh bao gồm chữ hoa, chữ thường, số và ký tự đặc
            biệt để bảo vệ tài khoản tốt nhất.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Mật khẩu hiện tại
          </Label>
          <div className="relative">
            <Input
              type="password"
              className="h-12 pl-11 rounded-2xl bg-black/20 border-white/10 text-white focus-visible:ring-orange-500/50 transition-all"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Mật khẩu mới
          </Label>
          <Input
            type="password"
            className="h-12 rounded-2xl bg-black/20 border-white/10 text-white focus-visible:ring-orange-500/50 transition-all"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            Xác nhận mật khẩu
          </Label>
          <Input
            type="password"
            className="h-12 rounded-2xl bg-black/20 border-white/10 text-white focus-visible:ring-orange-500/50 transition-all"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button className="w-full h-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
          Cập nhật mật khẩu
        </Button>
      </div>
    </div>
  );
}
