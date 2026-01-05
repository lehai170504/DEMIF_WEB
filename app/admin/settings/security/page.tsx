"use client";
import { Key, Smartphone, ShieldCheck, Fingerprint } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-black">
            Bảo mật nâng cao
          </CardTitle>
          <CardDescription>
            Bảo vệ tài khoản của bạn bằng các lớp xác thực mạnh mẽ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/50">
            <div className="flex gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Key className="text-orange-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">
                  Xác thực 2 lớp (2FA)
                </h4>
                <p className="text-sm text-slate-500">
                  Mã OTP qua ứng dụng xác thực.
                </p>
              </div>
            </div>
            <Switch className="data-[state=checked]:bg-orange-600" />
          </div>

          <div className="flex items-center justify-between p-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/50">
            <div className="flex gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Fingerprint className="text-orange-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">
                  Đăng nhập sinh trắc học
                </h4>
                <p className="text-sm text-slate-500">
                  Sử dụng FaceID hoặc Vân tay.
                </p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
