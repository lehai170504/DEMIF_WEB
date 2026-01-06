"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  User,
  Shield,
  Trash2,
  ArrowLeft,
  Save,
  Info,
} from "lucide-react";
import { mockUserProfile } from "@/lib/data/user-profile";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [activeTab, setActiveTab] = useState("account"); // State cho sidebar
  const [isSaving, setIsSaving] = useState(false);

  const menuItems = [
    { id: "account", label: "Tài khoản", icon: User },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "privacy", label: "Quyền riêng tư", icon: Shield },
    {
      id: "danger",
      label: "Vùng nguy hiểm",
      icon: Trash2,
      color: "text-destructive",
    },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    // Bạn nên dùng toast ở đây thay vì alert
    alert("Đã cập nhật cấu hình!");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-black font-mono">
      {/* Header tối giản */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md ">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full"
            >
              <Link href="/user/profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold tracking-tight">
              Cài đặt hệ thống
            </h1>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full px-6 transition-all active:scale-95"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />{" "}
                Đang lưu
              </span>
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 space-y-1">
            <p className="text-xs font-medium text-muted-foreground px-3 mb-4 uppercase tracking-widest">
              Cấu hình
            </p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className={cn("h-4 w-4", item.color)} />
                {item.label}
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section: Account */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <Card className="border-none shadow-sm ring-1 ring-slate-200">
                  <CardHeader>
                    <CardTitle>Thông tin định danh</CardTitle>
                    <CardDescription>
                      Email này sẽ được sử dụng cho tất cả các giao dịch và bảo
                      mật.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-[13px]">
                        Địa chỉ Email
                      </Label>
                      <Input
                        id="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="max-w-md bg-slate-50/50 focus-visible:ring-primary"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-700">
                  <Info className="h-5 w-5 shrink-0" />
                  <p className="text-[13px] leading-relaxed">
                    Để thay đổi thông tin hiển thị (tên, avatar), vui lòng truy
                    cập
                    <Link
                      href="/user/profile/edit"
                      className="font-bold underline ml-1"
                    >
                      Hồ sơ cá nhân
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}

            {/* Section: Notifications */}
            {activeTab === "notifications" && (
              <Card className="border-none shadow-sm ring-1 ring-slate-200">
                <CardHeader>
                  <CardTitle>Cấu hình thông báo</CardTitle>
                  <CardDescription>
                    Kiểm soát cách chúng tôi liên lạc với bạn.
                  </CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-slate-100">
                  <div className="py-4 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Thông báo Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Nhận tin tức về các bài học mới.
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifications.email}
                      onCheckedChange={(v) =>
                        setProfile({
                          ...profile,
                          notifications: { ...profile.notifications, email: v },
                        })
                      }
                    />
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Nhắc nhở học tập</Label>
                      <p className="text-sm text-muted-foreground">
                        Giúp bạn duy trì streak hàng ngày.
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifications.dailyReminder}
                      onCheckedChange={(v) =>
                        setProfile({
                          ...profile,
                          notifications: {
                            ...profile.notifications,
                            dailyReminder: v,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section: Danger Zone */}
            {activeTab === "danger" && (
              <Card className="border-destructive/20 bg-destructive/[0.02]">
                <CardHeader>
                  <CardTitle className="text-destructive">
                    Vùng nguy hiểm
                  </CardTitle>
                  <CardDescription>
                    Hành động này không thể hoàn tác. Hãy cẩn trọng.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    className="rounded-full shadow-lg shadow-destructive/20"
                  >
                    Xóa vĩnh viễn tài khoản
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
