// src/app/page.tsx
import { HeaderLanding } from "@/components/layouts/Landing/HeaderLanding";
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding";
import { HeroLanding } from "@/components/layouts/Landing/HeroLanding";
import { FeaturesLanding } from "@/components/layouts/Landing/FeaturesLanding";
import { CtaLanding } from "@/components/layouts/Landing/CtaLanding";
import { TestimonialsLanding } from "@/components/layouts/Landing/TestimonialsLanding";
import { HowItWorksLanding } from "@/components/layouts/Landing/HowItWorksLanding";
import { Pricing } from "@/components/layouts/Pricing/Pricing";
import { ParallaxBackground } from "@/components/layouts/Landing/ParallaxBackground";
import { AppleStyleSection } from "@/components/ui/AppleStyleSection";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 selection:bg-orange-500/30 font-sans w-full overflow-x-hidden">
      {/* 1. Background động */}
      <ParallaxBackground />

      <div className="relative z-10">
        <HeaderLanding />

        <main className="flex flex-col gap-0 w-full overflow-hidden">
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
    </div>
  );
}
