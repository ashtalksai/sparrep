import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PricingSection } from "@/components/landing/pricing-section"
import { FAQ } from "@/components/landing/faq"
import { auth } from "@/lib/auth"

export const metadata = {
  title: "Pricing — SparrRep",
  description: "Start free with 3 sessions. Upgrade to Pro for unlimited sparring.",
}

export default async function PricingPage() {
  const session = await auth()
  return (
    <>
      <Navbar user={session?.user} />
      <main className="pt-10">
        <PricingSection />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
