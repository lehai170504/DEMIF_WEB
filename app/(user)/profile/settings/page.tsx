"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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
  CheckCircle,
  Loader2,
  Settings as SettingsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data (Thay thế bằng import thực tế)
const mockUserProfile = {
  email: "student@demif.com",
  notifications: {
    email: true,
    dailyReminder: false,
  },
};

export default function SettingsPage() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);

  const menuItems = [
    { id: "account", label: "Tài khoản", icon: User },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "privacy", label: "Quyền riêng tư", icon: Shield },
    {
      id: "danger",
      label: "Vùng nguy hiểm",
      icon: Trash2,
      color: "text-red-500 group-hover:text-red-400",
      activeColor: "text-white bg-red-500/20 border-red-500/50",
    },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-zinc-100 selection:bg-orange-500/30 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <Link href="/profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                <SettingsIcon className="h-4 w-4 text-zinc-400" />
              </div>
              <h1 className="text-sm font-bold uppercase tracking-wider text-white">
                Cài đặt hệ thống
              </h1>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "rounded-xl px-6 font-bold text-xs uppercase tracking-widest transition-all h-10 shadow-lg",
              isSaving
                ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-zinc-200 shadow-white/10",
            )}
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="h-3.5 w-3.5" />
                <span>Lưu thay đổi</span>
              </div>
            )}
          </Button>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* --- SIDEBAR --- */}
          <aside className="w-full md:w-64 space-y-2 sticky top-24 h-fit">
            <p className="text-[10px] font-black text-zinc-500 px-4 mb-4 uppercase tracking-[0.2em]">
              Menu Cấu hình
            </p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all overflow-hidden",
                  activeTab === item.id
                    ? item.activeColor ||
                        "text-white bg-white/10 border border-white/10 shadow-xl"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent",
                )}
              >
                {/* Active Indicator Line */}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="active-settings-tab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"
                  />
                )}

                <item.icon
                  className={cn("h-4 w-4 transition-colors", item.color)}
                />
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </aside>

          {/* --- MAIN CONTENT --- */}
          <div className="flex-1 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Section: Account */}
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <div className="p-8 rounded-[2rem] bg-[#18181b] border border-white/10 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none" />

                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-1">
                          Thông tin định danh
                        </h2>
                        <p className="text-zinc-400 text-sm">
                          Email này sẽ được sử dụng cho tất cả các giao dịch và
                          bảo mật.
                        </p>
                      </div>

                      <div className="grid gap-6 max-w-lg">
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-xs font-bold text-zinc-500 uppercase tracking-wider"
                          >
                            Địa chỉ Email
                          </Label>
                          <div className="relative group">
                            <Input
                              id="email"
                              value={profile.email}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  email: e.target.value,
                                })
                              }
                              className="h-12 rounded-xl bg-black/20 border-white/10 text-white focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all pl-4"
                            />
                            {/* Status Icon */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-200">
                      <Info className="h-5 w-5 shrink-0 text-blue-400" />
                      <p className="text-xs leading-relaxed font-medium">
                        Để thay đổi thông tin hiển thị (tên, avatar), vui lòng
                        truy cập
                        <Link
                          href="/profile/edit"
                          className="font-bold text-white underline decoration-blue-400/50 hover:decoration-blue-400 ml-1 transition-all"
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
                  <div className="p-8 rounded-[2rem] bg-[#18181b] border border-white/10 shadow-2xl">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        Cấu hình thông báo
                      </h2>
                      <p className="text-zinc-400 text-sm">
                        Kiểm soát cách chúng tôi liên lạc với bạn.
                      </p>
                    </div>

                    <div className="space-y-6 divide-y divide-white/5">
                      <div className="flex items-center justify-between pt-4 first:pt-0">
                        <div className="space-y-1">
                          <Label className="text-base font-bold text-white">
                            Thông báo Email
                          </Label>
                          <p className="text-xs text-zinc-500 font-medium">
                            Nhận tin tức về các bài học mới và khuyến mãi.
                          </p>
                        </div>
                        <Switch
                          checked={profile.notifications.email}
                          onCheckedChange={(v) =>
                            setProfile({
                              ...profile,
                              notifications: {
                                ...profile.notifications,
                                email: v,
                              },
                            })
                          }
                          className="data-[state=checked]:bg-orange-500"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-6">
                        <div className="space-y-1">
                          <Label className="text-base font-bold text-white">
                            Nhắc nhở học tập
                          </Label>
                          <p className="text-xs text-zinc-500 font-medium">
                            Thông báo đẩy giúp bạn duy trì streak hàng ngày.
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
                          className="data-[state=checked]:bg-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section: Privacy (Placeholder for demo) */}
                {activeTab === "privacy" && (
                  <div className="p-8 rounded-[2rem] bg-[#18181b] border border-white/10 shadow-2xl flex flex-col items-center justify-center min-h-[300px] text-center">
                    <Shield className="h-12 w-12 text-zinc-700 mb-4" />
                    <h3 className="text-lg font-bold text-zinc-300">
                      Quyền riêng tư
                    </h3>
                    <p className="text-zinc-500 text-sm max-w-sm">
                      Các cài đặt về hiển thị hồ sơ và dữ liệu cá nhân sẽ được
                      cập nhật tại đây.
                    </p>
                  </div>
                )}

                {/* Section: Danger Zone */}
                {activeTab === "danger" && (
                  <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 mix-blend-overlay" />

                    <div className="relative z-10">
                      <h2 className="text-2xl font-bold text-red-500 mb-2">
                        Vùng nguy hiểm
                      </h2>
                      <p className="text-zinc-400 text-sm mb-8">
                        Các hành động tại đây không thể hoàn tác. Dữ liệu học
                        tập của bạn sẽ bị xóa vĩnh viễn.
                      </p>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div>
                          <h4 className="text-sm font-bold text-red-200">
                            Xóa tài khoản
                          </h4>
                          <p className="text-xs text-red-300/70">
                            Xóa vĩnh viễn tài khoản và dữ liệu liên quan.
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          className="rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20"
                        >
                          Xóa vĩnh viễn
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
