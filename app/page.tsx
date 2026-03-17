"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

import { HeaderLanding } from "@/components/layouts/Landing/HeaderLanding";
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding";
import { CinematicJourney } from "@/components/layouts/Landing/CinematicJourney";

import { StatsLanding } from "@/components/layouts/Landing/StatsLanding";
const TestimonialsLanding = dynamic(
  () => import("@/components/layouts/Landing/TestimonialsLanding"),
  { ssr: false },
);
const Pricing = dynamic(() => import("@/components/layouts/Pricing/Pricing"), {
  ssr: false,
  loading: () => <div className="h-screen bg-black/5 animate-pulse" />,
});
const AboutLanding = dynamic(
  () => import("@/components/layouts/Landing/AboutLanding"),
  { ssr: false },
);
const FaqLanding = dynamic(
  () => import("@/components/layouts/Landing/FaqLanding"),
  { ssr: false },
);
import { CtaLanding } from "@/components/layouts/Landing/CtaLanding";
import { AppleStyleSection } from "@/components/ui/AppleStyleSection";

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

      <main className="w-full relative z-0 no-scrollbar bg-white dark:bg-[#050505]">
        {/* ============================================== */}
        {/* BLOCK 1: CINEMATIC JOURNEY (500vh)             */}
        {/* ============================================== */}
        <div className="relative z-10 w-full">
          <CinematicJourney />
        </div>

        {/* ============================================== */}
        {/* BLOCK 2: 3D STACKED SECTION (CHỈ CÒN LẠI STATS)*/}
        {/* ============================================== */}
        <div className="relative w-full z-20 perspective-[2000px] -mt-10">
          <StackedSection isFirst bgClass="bg-white dark:bg-[#050505]">
            <AppleStyleSection id="stats" className="w-full pt-10">
              <StatsLanding />
            </AppleStyleSection>
          </StackedSection>
        </div>

        {/* ============================================== */}
        {/* BLOCK 3: TESTIMONIALS SPLIT-SCREEN (400vh)     */}
        {/* Đã đưa ra ngoài để cuộn tự do, z-30 để đè lên Block 2 */}
        {/* ============================================== */}
        <div className="relative w-full z-30 bg-gray-50 dark:bg-[#0a0a0a] rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-50px_100px_rgba(0,0,0,0.8)] border-t border-white/10">
          <TestimonialsLanding />
        </div>

        {/* ============================================== */}
        {/* BLOCK 4: BREAKOUT SECTION (PRICING)            */}
        {/* Đẩy lên z-40 để đè lên Testimonials            */}
        {/* ============================================== */}
        <div className="relative w-full z-40 bg-white dark:bg-[#050505] rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-50px_100px_rgba(0,0,0,0.8)] border-t border-white/10 pb-20">
          <Pricing />
        </div>

        {/* ============================================== */}
        {/* BLOCK 5: TÁI THIẾT LẬP 3D STACKED SECTIONS     */}
        {/* z-50 tiếp tục đè lên Pricing                   */}
        {/* ============================================== */}
        <div className="relative w-full z-50 perspective-[2000px] -mt-[3rem] md:-mt-[5rem]">
          <StackedSection isFirst bgClass="bg-gray-50 dark:bg-[#0a0a0a]">
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

      {/* FOOTER (z-60) */}
      <div className="relative z-60 bg-white dark:bg-[#050505] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_-40px_80px_rgba(0,0,0,0.9)] border-t border-gray-200 dark:border-white/5 rounded-t-[3rem]">
        <FooterLanding />
      </div>
    </div>
  );
}

// =========================================================================
// COMPONENT: STACKED SECTION
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [1, 0.88]);
  const rotateX = useTransform(smoothProgress, [0, 1], [0, -8]);
  const zOffset = useTransform(smoothProgress, [0, 1], [0, -400]);

  const borderColor = useTransform(
    smoothProgress,
    [0, 0.1, 1],
    [
      "rgba(255,255,255,0.1)",
      "rgba(255, 122, 0, 0.6)",
      "rgba(255,255,255,0.02)",
    ],
  );

  const boxShadow = useTransform(
    smoothProgress,
    [0, 0.1, 1],
    [
      "0 -30px 100px rgba(0,0,0,0.4)",
      "0 -30px 100px rgba(255, 122, 0, 0.15)",
      "0 -50px 150px rgba(0,0,0,0.8)",
    ],
  );

  const opacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.4, 0.2]);
  const filter = useTransform(
    smoothProgress,
    [0, 1],
    ["blur(0px) brightness(100%)", "blur(5px) brightness(70%)"],
  );

  const contentY = useTransform(smoothProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  const glassX = useTransform(smoothProgress, [0, 1], ["-100%", "200%"]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full perspective-[2000px]"
    >
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          filter,
          transformOrigin: "center top",
          z: zOffset,
          borderColor,
          boxShadow,
        }}
        className={`sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden no-scrollbar will-change-transform ${bgClass} rounded-t-[3rem] md:rounded-t-[5rem] border-t-2`}
      >
        <motion.div
          style={{ x: glassX }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none z-50 mix-blend-overlay"
        />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="w-full h-full flex flex-col justify-center relative z-10"
        >
          {children}
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 1], [0, 1]) }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_30%,rgba(255,122,0,0.05)_70%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-20"
        />
      </motion.div>
    </div>
  );
}
