"use client";

import { ShieldCheck, Smartphone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SecurityMFA() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between p-6 rounded-[2rem] bg-emerald-50 border border-emerald-100">
        <div className="flex gap-4 items-center">
          <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">
              Bảo mật hai lớp đang BẬT
            </h4>
            <p className="text-xs text-emerald-700">
              Tài khoản của bạn đang được bảo vệ bởi TOTP Authenticator.
            </p>
          </div>
        </div>
        <Badge className="bg-emerald-500 text-white border-none px-3 py-1 uppercase text-[10px]">
          An toàn
        </Badge>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
          Phương thức xác thực
        </h3>
        <div className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-orange-200 transition-all">
          <div className="flex items-center gap-4">
            <Smartphone className="h-5 w-5 text-slate-400" />
            <div>
              <p className="font-bold text-slate-700">
                Google Authenticator / Authy
              </p>
              <p className="text-xs text-slate-400">
                Sử dụng mã số 6 chữ số từ ứng dụng bảo mật.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-full text-xs font-bold border-rose-100 text-rose-500 hover:bg-rose-50"
          >
            Gỡ bỏ
          </Button>
        </div>
      </div>
    </div>
  );
}
