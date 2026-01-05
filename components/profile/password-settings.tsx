"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function PasswordSettings() {
  return (
    <div className="max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-start">
        <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed font-medium">
          Mật khẩu mạnh giúp tài khoản an toàn hơn. Chúng tôi khuyên bạn nên sử
          dụng kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Mật khẩu hiện tại
          </Label>
          <Input type="password" className="rounded-xl border-slate-100" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Mật khẩu mới
          </Label>
          <Input type="password" className="rounded-xl border-slate-100" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-slate-400">
            Xác nhận mật khẩu
          </Label>
          <Input type="password" className="rounded-xl border-slate-100" />
        </div>
      </div>

      <Button className="w-full rounded-xl bg-slate-900 font-bold hover:bg-slate-800">
        Cập nhật mật khẩu
      </Button>
    </div>
  );
}
