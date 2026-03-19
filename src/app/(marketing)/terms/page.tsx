import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { auth } from "@/lib/auth"

export const metadata = {
  title: "Terms of Service — SparrRep",
}

export default async function TermsPage() {
  const session = await auth()
  return (
    <>
      <Navbar user={session?.user} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-4">Legal</p>
        <h1 className="font-display text-4xl text-[#F9FAFB] mb-2">Terms of Service</h1>
        <p className="text-[#6B7280] mb-10 text-sm">Last updated: March 19, 2026</p>

        <div className="space-y-8 text-[#6B7280] text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using SparrRep (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">2. Description of Service</h2>
            <p>SparrRep provides AI-powered pre-call simulation for B2B sales professionals. The Service allows users to build AI buyer personas from prospect notes and practice sales conversations through text-based roleplay.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">3. Account Terms</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You must be 18 or older to use the Service</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You may not share accounts or allow multiple users to access a single account (Team plans have per-seat pricing)</li>
              <li>You must provide accurate account information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">4. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Use the Service to simulate real individuals without appropriate authorization</li>
              <li>Attempt to extract training data or reverse-engineer the AI systems</li>
              <li>Use the Service to generate harmful, harassing, or illegal content</li>
              <li>Attempt to circumvent session limits or access restrictions</li>
              <li>Resell or sublicense access to the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">5. Free Tier & Paid Plans</h2>
            <p>The Free tier includes 3 practice sessions per calendar month. Pro and Team plans are subscription-based. All payments are processed by Stripe. Subscriptions renew automatically unless canceled before the renewal date.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">6. Refund Policy</h2>
            <p>We offer a 7-day refund on first-time Pro purchases if you have not used more than 5 sessions. Contact <a href="mailto:billing@sparrep.com" className="text-[#F59E0B] hover:underline">billing@sparrep.com</a>. Annual plans are refundable within 30 days of purchase.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">7. Intellectual Property</h2>
            <p>You retain ownership of the notes and content you input. SparrRep retains ownership of the platform, AI systems, and all related intellectual property.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">8. Disclaimer of Warranties</h2>
            <p>The Service is provided &ldquo;as is.&rdquo; SparrRep makes no warranties that the AI simulations will be accurate representations of specific real individuals or that using the Service will improve sales outcomes.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">9. Limitation of Liability</h2>
            <p>SparrRep shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service. Our total liability is limited to the amount you paid us in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">10. Contact</h2>
            <p>Legal questions: <a href="mailto:legal@sparrep.com" className="text-[#F59E0B] hover:underline">legal@sparrep.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
