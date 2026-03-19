import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Solution } from "@/components/landing/solution"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { SocialProof } from "@/components/landing/social-proof"
import { PricingSection } from "@/components/landing/pricing-section"
import { FAQ } from "@/components/landing/faq"
import { CTASection } from "@/components/landing/cta-section"
import { auth } from "@/lib/auth"

export default async function LandingPage() {
  const session = await auth()

  return (
    <>
      <Navbar user={session?.user} />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <SocialProof />
        <PricingSection />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
