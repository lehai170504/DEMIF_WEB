"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Import các component con đã tách
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { AccountInfo } from "@/components/profile/account-info";
import { PasswordSettings } from "@/components/profile/password-settings";
import { SecurityMFA } from "@/components/profile/security-mfa";
import { DeviceManagement } from "@/components/profile/device-management";
import { BillingSubscription } from "@/components/profile/billing-subscription";

export default function EditProfilePage() {
  const [activeTab, setActiveTab] = useState("account");
  const RedirectToPage = ({ href }: { href: string }) => {
    const router = useRouter();
    useEffect(() => {
      router.push(href);
    }, [href, router]);
    return null;
  };

  // Hàm helper để lấy tiêu đề và mô tả động
  const getTabMetadata = () => {
    const meta: Record<string, { title: string; desc: string }> = {
      account: {
        title: "Thông tin cá nhân",
        desc: "Cập nhật đầy đủ thông tin để DEMIF hỗ trợ bạn tốt nhất.",
      },
      password: {
        title: "Thay đổi mật khẩu",
        desc: "Cập nhật mật khẩu định kỳ để bảo vệ tài khoản an toàn hơn.",
      },
      mfa: {
        title: "Xác thực hai yếu tố (2FA)",
        desc: "Thiết lập lớp bảo mật bổ sung cho tài khoản của bạn.",
      },
      devices: {
        title: "Thiết bị đăng nhập",
        desc: "Quản lý và kiểm soát các phiên đăng nhập đang hoạt động.",
      },
      billing: {
        title: "Gói học & Thanh toán",
        desc: "Quản lý các gói đăng ký và theo dõi lịch sử giao dịch.",
      },
      settings: {
        title: "Cài đặt tài khoản",
        desc: "Tùy chỉnh trải nghiệm DEMIF theo ý bạn.",
      },
    };
    return meta[activeTab] || meta.account;
  };

  const { title, desc } = getTabMetadata();

  return (
    <div className="min-h-screen bg-card/50 pt-24 pb-20 font-mono">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <header className="mb-10 space-y-2 px-1">
          <motion.h1
            key={`title-${activeTab}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black tracking-tight text-slate-900"
          >
            {title}
          </motion.h1>
          <motion.p
            key={`desc-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-500 font-medium"
          >
            {desc}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
          {/* Sidebar Area - Sticky để luôn thấy khi cuộn */}
          <aside className="sticky top-28 z-20">
            <Card className="p-2 border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem] bg-white/80 backdrop-blur-md">
              <ProfileSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </Card>
          </aside>

          {/* Main Content Area */}
          <main className="relative min-h-[600px]">
            <Card className="p-8 md:p-12 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[3rem] bg-white overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {activeTab === "account" && <AccountInfo />}
                  {activeTab === "password" && <PasswordSettings />}
                  {activeTab === "mfa" && <SecurityMFA />}
                  {activeTab === "devices" && <DeviceManagement />}
                  {activeTab === "billing" && <BillingSubscription />}
                  {activeTab === "settings" && (
                    <RedirectToPage href="/user/profile/settings" />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Trang trí góc Card - Subtle Decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
