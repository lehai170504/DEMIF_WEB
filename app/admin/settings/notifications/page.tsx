"use client";
import { Bell, Mail, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  return (
    <Card className="border-border shadow-xl bg-card rounded-[2rem] animate-in fade-in duration-500 font-mono">
      <CardHeader>
        <CardTitle className="text-2xl font-black text-foreground flex items-center gap-3">
          <Bell className="w-6 h-6 text-primary" />
          Cài đặt thông báo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {[
          {
            title: "Thông báo Email",
            desc: "Nhận báo cáo hệ thống qua email hàng ngày.",
            icon: Mail,
          },
          {
            title: "Thông báo đẩy",
            desc: "Thông báo trực tiếp trên trình duyệt/điện thoại.",
            icon: Smartphone,
          },
          {
            title: "Cảnh báo bảo mật",
            desc: "Nhận tin nhắn khi có đăng nhập lạ.",
            icon: Bell,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-muted/20 p-2 rounded-xl transition-colors"
          >
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-muted rounded-xl">
                <item.icon className="text-primary w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
            <Switch
              defaultChecked={i === 2}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
