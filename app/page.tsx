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
  return (
    <>
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
    </>
  );
}
