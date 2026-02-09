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

export default function SecurityPage() {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 font-mono">
      <Card className="border-border bg-card shadow-xl rounded-[2.5rem]">
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl font-black text-foreground flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Bảo mật nâng cao
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            Bảo vệ tài khoản của bạn bằng các lớp xác thực mạnh mẽ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Item 1: 2FA */}
          <div className="flex items-center justify-between p-5 rounded-[1.5rem] border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-primary/10 rounded-xl shadow-inner border border-primary/20">
                <Key className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">
                  Xác thực 2 lớp (2FA)
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Mã OTP qua ứng dụng xác thực.
                </p>
              </div>
            </div>
            <Switch className="data-[state=checked]:bg-primary" />
          </div>

          {/* Item 2: Biometric */}
          <div className="flex items-center justify-between p-5 rounded-[1.5rem] border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-primary/10 rounded-xl shadow-inner border border-primary/20">
                <Fingerprint className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">
                  Đăng nhập sinh trắc học
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Sử dụng FaceID hoặc Vân tay.
                </p>
              </div>
            </div>
            <Switch
              className="data-[state=checked]:bg-primary"
              defaultChecked
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
