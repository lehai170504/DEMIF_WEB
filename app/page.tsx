"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

// Những thứ ở màn hình đầu tiên (Above the fold) nên giữ import tĩnh để tránh bị giật (Flash)
import { HeaderLanding } from "@/components/layouts/Landing/HeaderLanding";
import { CinematicJourney } from "@/components/layouts/Landing/CinematicJourney";

// Lazy load những thứ ở dưới (Below the fold)
const StatsLanding = dynamic(() => import("@/components/layouts/Landing/StatsLanding"), { ssr: false });
const TestimonialsLanding = dynamic(() => import("@/components/layouts/Landing/TestimonialsLanding"), { ssr: false });
const Pricing = dynamic(() => import("@/components/layouts/Pricing/Pricing"), {
  ssr: false,
  loading: () => <div className="h-[50vh] flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" /></div>,
});
const AboutLanding = dynamic(() => import("@/components/layouts/Landing/AboutLanding"), { ssr: false });
const FaqLanding = dynamic(() => import("@/components/layouts/Landing/FaqLanding"), { ssr: false });
const CtaLanding = dynamic(() => import("@/components/layouts/Landing/CtaLanding"), { ssr: false });

// Giữ các component UI nhẹ
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding";
import { AppleStyleSection } from "@/components/ui/AppleStyleSection";

interface StackedSectionProps {
  children: React.ReactNode;
  bgClass: string;
  isFirst?: boolean;
}

export default function LandingPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setIsRedirecting(true);
      const isAdmin = user?.roles?.some((role: string) => role.toLowerCase() === "admin");
      const timer = setTimeout(() => {
        router.replace(isAdmin ? "/admin" : "/home");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-[#050505]">
        <Loader2 className="h-10 w-10 animate-spin text-[#FF7A00] mb-4" />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 dark:bg-[#020202] min-h-screen selection:bg-[#FF7A00] selection:text-white">
      <HeaderLanding />

      <main className="w-full relative z-0 no-scrollbar bg-white dark:bg-[#050505]">
        <div className="relative z-10 w-full">
          <CinematicJourney />
        </div>

        {/* Cải thiện logic render: Chỉ render StackedSection khi cần */}
        <div className="relative w-full z-20 perspective-[2000px] -mt-10">
          <StackedSection isFirst bgClass="bg-white dark:bg-[#050505]">
            <AppleStyleSection id="stats" className="w-full pt-10">
              <StatsLanding />
            </AppleStyleSection>
          </StackedSection>
        </div>

        <div className="relative w-full z-30 bg-gray-50 dark:bg-[#0a0a0a] rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-50px_100px_rgba(0,0,0,0.8)] border-t border-white/10">
          <TestimonialsLanding />
        </div>

        <div className="relative w-full z-40 bg-white dark:bg-[#050505] rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-50px_100px_rgba(0,0,0,0.8)] border-t border-white/10 pb-20">
          <Pricing />
        </div>

        <div className="relative w-full z-50 perspective-[2000px] -mt-[3rem] md:-mt-[5rem]">
          <StackedSection bgClass="bg-gray-50 dark:bg-[#0a0a0a]">
            <AppleStyleSection id="about" className="w-full pt-20">
              <AboutLanding />
            </AppleStyleSection>
          </StackedSection>

          <StackedSection bgClass="bg-white dark:bg-[#050505]">
            <AppleStyleSection id="faq" className="w-full">
              <FaqLanding />
            </AppleStyleSection>
          </StackedSection>

          <StackedSection bgClass="bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#050505]">
            <AppleStyleSection className="w-full">
              <CtaLanding />
            </AppleStyleSection>
          </StackedSection>
        </div>
      </main>

      <div className="relative z-60 bg-white dark:bg-[#050505] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.9)] border-t border-gray-200 dark:border-white/5 rounded-t-[3rem]">
        <FooterLanding />
      </div>
    </div>
  );
}


export function StackedSection({ 
  children, 
  bgClass, 
  isFirst = false 
}: StackedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lấy tiến trình cuộn của section hiện tại
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });

  // Tối ưu restDelta 0.01 để mượt mà và nhẹ CPU
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.01, 
  });

  // Các hiệu ứng biến đổi khi cuộn
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.88]);
  const rotateX = useTransform(smoothProgress, [0, 1], [0, -8]);
  const zOffset = useTransform(smoothProgress, [0, 1], [0, -400]);
  const opacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.4, 0.2]);

  // Thêm hiệu ứng tối dần (Overlay) khi bị đè lên
  const filter = useTransform(
    smoothProgress, 
    [0, 1], 
    ["blur(0px) brightness(100%)", "blur(4px) brightness(50%)"]
  );

  return (
    <div 
      ref={containerRef} 
      className={`relative h-screen w-full perspective-[2000px] ${isFirst ? 'z-10' : ''}`}
    >
      <motion.div
        style={{ 
          scale, 
          opacity, 
          rotateX, 
          filter, // Thêm filter để nhìn thật hơn khi bị đè
          transformOrigin: "center top", 
          z: zOffset 
        }}
        className={`sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden no-scrollbar will-change-transform ${bgClass} rounded-t-[3rem] md:rounded-t-[5rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]`}
      >
        {/* Lớp kính phản chiếu (Glass effect) lướt qua khi cuộn */}
        <motion.div 
           style={{ opacity: smoothProgress }}
           className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20" 
        />

        <div className="w-full h-full flex flex-col justify-center relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}