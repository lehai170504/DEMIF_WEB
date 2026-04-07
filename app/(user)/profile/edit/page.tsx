"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Settings,
  Shield,
  Lock,
  Smartphone,
  CreditCard,
  User,
} from "lucide-react";

// Import các component con
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { AccountInfo } from "@/components/profile/account-info";
import { PasswordSettings } from "@/components/profile/password-settings";
import { SecurityMFA } from "@/components/profile/security-mfa";
import { DeviceManagement } from "@/components/profile/device-management";
import { BillingSubscription } from "@/components/profile/billing-subscription";

export default function EditProfilePage() {
  const [activeTab, setActiveTab] = useState("account");
  
  // Lấy parameter `tab` từ URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);
  const RedirectToPage = ({ href }: { href: string }) => {
    const router = useRouter();
    useEffect(() => {
      router.push(href);
    }, [href, router]);
    return null;
  };

  // Helper để lấy metadata và icon động
  const getTabMetadata = () => {
    const meta: Record<string, { title: string; desc: string; icon: any }> = {
      account: {
        title: "Thông tin cá nhân",
        desc: "Cập nhật đầy đủ thông tin để DEMIF hỗ trợ bạn tốt nhất.",
        icon: User,
      },
      password: {
        title: "Thay đổi mật khẩu",
        desc: "Cập nhật mật khẩu định kỳ để bảo vệ tài khoản an toàn hơn.",
        icon: Lock,
      },
      mfa: {
        title: "Xác thực hai yếu tố",
        desc: "Thiết lập lớp bảo mật bổ sung (2FA) cho tài khoản.",
        icon: Shield,
      },
      devices: {
        title: "Thiết bị đăng nhập",
        desc: "Quản lý và kiểm soát các phiên đăng nhập đang hoạt động.",
        icon: Smartphone,
      },
      billing: {
        title: "Gói học & Thanh toán",
        desc: "Quản lý các gói đăng ký và theo dõi lịch sử giao dịch.",
        icon: CreditCard,
      },
      settings: {
        title: "Cài đặt tài khoản",
        desc: "Tùy chỉnh trải nghiệm DEMIF theo ý bạn.",
        icon: Settings,
      },
    };
    return meta[activeTab] || meta.account;
  };

  const { title, desc, icon: Icon } = getTabMetadata();

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10 pt-12">
        {/* Header Section */}
        <header className="mb-12 space-y-4 px-2">
          <motion.div
            key={`header-${activeTab}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2 text-orange-500">
              <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                Settings
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-zinc-400 font-medium max-w-2xl text-lg">
              {desc}
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
          {/* Sidebar Area */}
          <aside className="hidden lg:block sticky top-28 z-20">
            <div className="p-2 border border-gray-200 dark:border-white/10 rounded-[2rem] bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-md shadow-xl">
              <ProfileSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="relative min-h-[600px]">
            <div className="p-8 md:p-12 border border-gray-200 dark:border-white/10 rounded-[3rem] bg-white dark:bg-[#18181b] shadow-2xl overflow-hidden relative">
              {/* Glow Effect inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {activeTab === "account" && <AccountInfo />}
                  {activeTab === "password" && <PasswordSettings />}
                  {activeTab === "mfa" && <SecurityMFA />}
                  {activeTab === "devices" && <DeviceManagement />}
                  {activeTab === "billing" && <BillingSubscription />}
                  {activeTab === "settings" && (
                    <RedirectToPage href="/profile/settings" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
