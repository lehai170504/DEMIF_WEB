"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CreditCard, User, Settings2 } from "lucide-react";

// Import các component con
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { AccountInfo } from "@/components/profile/account-info";
import { PasswordSettings } from "@/components/profile/password-settings";
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

  // Helper để lấy metadata và icon động
  const getTabMetadata = () => {
    const meta: Record<string, { title: string; desc: string; icon: any }> = {
      account: {
        title: "Thông tin cá nhân",
        desc: "Cập nhật thông tin cơ bản để cá nhân hóa trải nghiệm học tập của bạn.",
        icon: User,
      },
      password: {
        title: "Bảo mật tài khoản",
        desc: "Thay đổi mật khẩu định kỳ để giữ tài khoản của bạn luôn an toàn.",
        icon: Lock,
      },
      billing: {
        title: "Gói học & Thanh toán",
        desc: "Quản lý quyền lợi Premium và theo dõi lịch sử giao dịch của bạn.",
        icon: CreditCard,
      },
    };
    return meta[activeTab] || meta.account;
  };

  const { title, desc, icon: Icon } = getTabMetadata();

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30 pb-24 relative overflow-x-hidden">
      {/* ── BACKGROUND DECOR ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 max-w-7xl relative z-10 pt-12 md:pt-16">
        {/* ── HEADER SECTION ── */}
        <header className="mb-12 space-y-4 px-2 max-w-4xl">
          <motion.div
            key={`header-${activeTab}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 shadow-inner">
                <Settings2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">
                Thiết lập tài khoản
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-3">
              {title}
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 font-medium text-sm md:text-base leading-relaxed">
              {desc}
            </p>
          </motion.div>
        </header>

        {/* ── MAIN CONTENT LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* SIDEBAR AREA (Cột trái 3/12) */}
          <aside className="lg:col-span-3 sticky top-28 z-20">
            <div className="p-2 border border-gray-100 dark:border-white/5 rounded-[2.5rem] bg-white/50 dark:bg-[#0D0D0D]/50 backdrop-blur-xl shadow-2xl">
              <ProfileSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </aside>

          {/* CONTENT AREA (Cột phải 9/12) */}
          <main className="lg:col-span-9 relative min-h-[600px]">
            <div className="p-8 md:p-12 lg:p-14 border border-gray-100 dark:border-white/5 rounded-[3rem] bg-white dark:bg-[#0D0D0D] shadow-2xl shadow-gray-200/50 dark:shadow-black/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/[0.02] rounded-full blur-[80px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 p-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none transform rotate-12">
                    <Icon className="w-32 h-32 md:w-48 md:h-48 text-gray-900 dark:text-white" />
                  </div>

                  {/* Render Tab Content */}
                  <div className="relative">
                    {activeTab === "account" && <AccountInfo />}
                    {activeTab === "password" && <PasswordSettings />}
                    {activeTab === "billing" && <BillingSubscription />}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
