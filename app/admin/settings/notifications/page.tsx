"use client";
import { Bell, Mail, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  return (
    <Card className="border-none shadow-xl bg-white rounded-[2rem]">
      <CardHeader>
        <CardTitle className="text-2xl font-black">Cài đặt thông báo</CardTitle>
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
            className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0"
          >
            <div className="flex gap-4">
              <item.icon className="text-orange-500 w-5 h-5" />
              <div>
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
            <Switch
              defaultChecked={i === 2}
              className="data-[state=checked]:bg-orange-600"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
