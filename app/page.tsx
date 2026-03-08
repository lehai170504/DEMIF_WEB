"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import { HeaderLanding } from "@/components/layouts/Landing/HeaderLanding";
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding";
import { HeroLanding } from "@/components/layouts/Landing/HeroLanding";
import { FeaturesLanding } from "@/components/layouts/Landing/FeaturesLanding";
import { CtaLanding } from "@/components/layouts/Landing/CtaLanding";
import { TestimonialsLanding } from "@/components/layouts/Landing/TestimonialsLanding";
import { HowItWorksLanding } from "@/components/layouts/Landing/HowItWorksLanding";
import { Pricing } from "@/components/layouts/Pricing/Pricing";
import { AppleStyleSection } from "@/components/ui/AppleStyleSection";

export default function LandingPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // State mới để giữ màn hình loading không bị giật
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Kiểm tra quyền Admin an toàn
  const isAdmin = user?.roles?.some(
    (role: string) => role.toLowerCase() === "admin",
  );

  // LOGIC PHÂN LUỒNG TỰ ĐỘNG CÓ DELAY
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setIsRedirecting(true); // Kích hoạt trạng thái đang chuyển trang

      const timer = setTimeout(() => {
        if (isAdmin) {
          router.replace("/admin");
        } else {
          router.replace("/home");
        }
      }, 600);

      // Dọn dẹp timer nếu component unmount
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  // NẾU ĐANG CALL API HOẶC ĐANG TRONG QUÁ TRÌNH CHUYỂN TRANG: Hiển thị
  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
          <p className="text-sm text-gray-400 font-mono animate-pulse">
            Đang vào hệ thống...
          </p>
        </div>
      </div>
    );
  }

  // NẾU CHƯA ĐĂNG NHẬP: Render toàn bộ giao diện giới thiệu bình thường
  return (
    <div className="animate-in fade-in duration-700">
      {" "}
      <HeaderLanding />
      <main className="flex flex-col gap-0 w-full">
        <HeroLanding />

        <AppleStyleSection id="features" className="scroll-mt-20">
          <FeaturesLanding />
        </AppleStyleSection>

        <AppleStyleSection id="how-it-works" className="scroll-mt-20">
          <HowItWorksLanding />
        </AppleStyleSection>

        <AppleStyleSection id="pricing" className="scroll-mt-20">
          <Pricing />
        </AppleStyleSection>

        <AppleStyleSection id="testimonials" className="scroll-mt-20">
          <TestimonialsLanding />
        </AppleStyleSection>

        <AppleStyleSection>
          <CtaLanding />
        </AppleStyleSection>
      </main>
      <FooterLanding />
    </div>
  );
}
