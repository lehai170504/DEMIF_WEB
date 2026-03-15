"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import { HeaderLanding } from "@/components/layouts/Landing/HeaderLanding";
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding";
import { CinematicJourney } from "@/components/layouts/Landing/CinematicJourney";

// Các Section tĩnh
import { StatsLanding } from "@/components/layouts/Landing/StatsLanding";
import { TestimonialsLanding } from "@/components/layouts/Landing/TestimonialsLanding";
import { Pricing } from "@/components/layouts/Pricing/Pricing";
import { AboutLanding } from "@/components/layouts/Landing/AboutLanding";
import { FaqLanding } from "@/components/layouts/Landing/FaqLanding";
import { CtaLanding } from "@/components/layouts/Landing/CtaLanding";
import { AppleStyleSection } from "@/components/ui/AppleStyleSection";
import { RunningMascot } from "@/components/layouts/Landing/RunningMascot";

export default function LandingPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setIsRedirecting(true);
      const isAdmin = user?.roles?.some(
        (role: string) => role.toLowerCase() === "admin",
      );
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

      <RunningMascot />

      <main className="w-full relative z-0 no-scrollbar">
        {/* ============================================== */}
        {/* BLOCK 1: CINEMATIC JOURNEY (500vh)             */}
        {/* ============================================== */}
        <div className="relative z-20 w-full bg-white dark:bg-[#050505]">
          <CinematicJourney />
        </div>

        {/* ============================================== */}
        {/* BLOCK 2: 3D STACKED SECTIONS (PHẦN ĐẦU)        */}
        {/* ============================================== */}
        <div className="relative w-full z-10 perspective-[1500px]">
          <StackedSection isFirst bgClass="bg-white dark:bg-[#050505]">
            <AppleStyleSection id="stats" className="w-full">
              <StatsLanding />
            </AppleStyleSection>
          </StackedSection>

          <StackedSection bgClass="bg-gray-50 dark:bg-[#0a0a0a]">
            <AppleStyleSection id="testimonials" className="w-full">
              <TestimonialsLanding />
            </AppleStyleSection>
          </StackedSection>
        </div>

        {/* ============================================== */}
        {/* BLOCK 3: BREAKOUT SECTION (THOÁT KHỎI STACK 3D)*/}
        {/* Đoạn này cuộn tự do bình thường để trải nghiệm  */}
        {/* kéo ngang của Pricing được tối ưu nhất         */}
        {/* ============================================== */}
        <div className="relative w-full z-30 bg-white dark:bg-[#050505] rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-30px_100px_rgba(0,0,0,0.5)] border-t border-white/10">
          <Pricing />
        </div>

        {/* ============================================== */}
        {/* BLOCK 4: TÁI THIẾT LẬP 3D STACKED SECTIONS     */}
        {/* ============================================== */}
        <div className="relative w-full z-40 perspective-[1500px]">
          <StackedSection isFirst bgClass="bg-gray-50 dark:bg-[#0a0a0a]">
            <AppleStyleSection id="about" className="w-full">
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

      {/* FOOTER */}
      <div className="relative z-[60] bg-white dark:bg-[#050505] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.9)] border-t border-gray-200 dark:border-white/5 rounded-t-[3rem]">
        <FooterLanding />
      </div>
    </div>
  );
}

// =========================================================================
// COMPONENT: STACKED SECTION (HIỆU ỨNG TÁCH BIỆT CHIỀU SÂU 3D)
// =========================================================================
interface StackedSectionProps {
  children: React.ReactNode;
  bgClass: string;
  isFirst?: boolean;
}

function StackedSection({
  children,
  bgClass,
  isFirst = false,
}: StackedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Tinh chỉnh độ mượt cho các biến đổi 3D
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  // 1. Hiệu ứng Scale & Lùi về sau (Z-axis)
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.85]);

  // 2. Hiệu ứng nghiêng 3D (Rotation)
  const rotateX = useTransform(smoothProgress, [0, 1], [0, -10]);

  // 3. Hiệu ứng làm mờ và đổi màu bề mặt
  const opacity = useTransform(smoothProgress, [0, 1], [1, 0.3]);
  const filter = useTransform(
    smoothProgress,
    [0, 1],
    ["blur(0px) contrast(100%)", "blur(4px) contrast(80%)"],
  );

  // 4. Hiệu ứng Parallax cho nội dung bên trong
  const contentY = useTransform(smoothProgress, [0, 1], [0, -150]);

  // 5. Lớp màn phản chiếu Glass lướt qua
  const glassX = useTransform(smoothProgress, [0, 1], ["-100%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full perspective-[1500px]"
    >
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          filter,
          transformOrigin: "center top",
          z: useTransform(smoothProgress, [0, 1], [0, -500]), // Lùi hẳn vào không không gian 3D
        }}
        className={`sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden no-scrollbar will-change-transform ${
          isFirst
            ? bgClass
            : `${bgClass} rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-30px_100px_rgba(0,0,0,0.2)] dark:shadow-[0_-50px_150px_rgba(0,0,0,1)] border-t border-white/20`
        }`}
      >
        {/* Lớp màn sáng phản chiếu hiệu ứng Glass */}
        <motion.div
          style={{ x: glassX }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-50"
        />

        {/* Container nội dung với hiệu ứng Parallax nội bộ */}
        <motion.div
          style={{ y: contentY }}
          className="w-full h-full flex flex-col justify-center"
        >
          {children}
        </motion.div>

        {/* Lớp Vignette làm tối các cạnh khi thẻ lùi xa */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 1], [0, 0.6]) }}
          className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.8)_100%)] pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
