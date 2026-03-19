import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { auth } from "@/lib/auth"

export const metadata = {
  title: "Privacy Policy — SparrRep",
}

export default async function PrivacyPage() {
  const session = await auth()
  return (
    <>
      <Navbar user={session?.user} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-4">Legal</p>
        <h1 className="font-display text-4xl text-[#F9FAFB] mb-2">Privacy Policy</h1>
        <p className="text-[#6B7280] mb-10 text-sm">Last updated: March 19, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-[#6B7280] text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">1. Introduction</h2>
            <p>
              SparrRep (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the SparrRep / Prepitch
              service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
              you use our AI-powered sales simulation platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">2. Information We Collect</h2>
            <p><strong className="text-[#F9FAFB]">Account information:</strong> Name, email address, and password (hashed) when you create an account.</p>
            <p className="mt-3"><strong className="text-[#F9FAFB]">Session data:</strong> Call notes you paste into the persona builder, prospect information you provide, session transcripts, and scoring data.</p>
            <p className="mt-3"><strong className="text-[#F9FAFB]">Usage data:</strong> Pages visited, features used, session duration, and error logs for service improvement.</p>
            <p className="mt-3"><strong className="text-[#F9FAFB]">Payment data:</strong> Processed by Stripe. We do not store full payment card numbers.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and operate the SparrRep service</li>
              <li>To generate AI buyer simulations based on your input</li>
              <li>To store and display your session history and scores</li>
              <li>To process payments and manage subscriptions</li>
              <li>To send transactional emails (account creation, billing receipts)</li>
              <li>To improve and debug the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal data. We share data only with:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="text-[#F9FAFB]">OpenAI:</strong> Session transcripts are sent to OpenAI to generate AI buyer responses and scoring. OpenAI&apos;s privacy policy applies to their data processing.</li>
              <li><strong className="text-[#F9FAFB]">Stripe:</strong> Payment processing. Stripe&apos;s privacy policy applies.</li>
              <li><strong className="text-[#F9FAFB]">Your manager (Team plan only):</strong> If your organization uses the Team plan, managers can see your session scores and trends. Transcript access is not granted to managers.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">5. Data Training</h2>
            <p>
              <strong className="text-[#F9FAFB]">We do not use your session data to train AI models.</strong> Your
              conversations with AI buyers, your call notes, and your prospect information are private and used only
              to operate your sessions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">6. Data Security</h2>
            <p>
              All data is encrypted in transit (TLS 1.2+) and at rest. We use industry-standard security practices
              including hashed passwords, JWT session tokens, and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">7. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:privacy@sparrep.com" className="text-[#F59E0B] hover:underline">privacy@sparrep.com</a>. Account deletion removes all associated data within 30 days.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-[#F9FAFB] mb-3">8. Contact</h2>
            <p>For privacy-related questions: <a href="mailto:privacy@sparrep.com" className="text-[#F59E0B] hover:underline">privacy@sparrep.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
