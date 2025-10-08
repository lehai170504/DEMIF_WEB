import { HeaderLanding } from "@/components/layouts/Landing/HeaderLanding"
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding"
import { HeroLanding } from "@/components/layouts/Landing/HeroLanding"
import { FeaturesLanding } from "@/components/layouts/Landing/FeaturesLanding"
import { CtaLanding } from "@/components/layouts/Landing/CtaLanding"
import { TestimonialsLanding } from "@/components/layouts/Landing/TestimonialsLanding"
import { HowItWorksLanding } from "@/components/layouts/Landing/HowItWorksLanding"
import { Pricing } from "@/components/layouts/Pricing/Pricing"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-orange-50/30">
      <HeaderLanding />

      {/* Hero Section */}
      <HeroLanding />

      {/* Features Grid */}
      <FeaturesLanding />

      {/* Pricing Section */}
      <Pricing />

      {/* How It Works */}
      <HowItWorksLanding />

      {/* Testimonials */}
      <TestimonialsLanding />

      {/* CTA Section */}
      <CtaLanding />

      <FooterLanding />
    </div>
  )
}
