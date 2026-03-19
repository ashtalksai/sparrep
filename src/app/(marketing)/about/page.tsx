import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "About — SparrRep",
  description: "No profession treats live performance as the training environment. We fixed that.",
}

export default async function AboutPage() {
  const session = await auth()

  return (
    <>
      <Navbar user={session?.user} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-4">About</p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F9FAFB] leading-tight mb-6">
            No profession treats live performance
            <br />
            as the training environment.
            <br />
            <span className="text-[#F59E0B]">We fixed that.</span>
          </h1>
        </div>

        <div className="mb-12 rounded-xl overflow-hidden border border-[#1F2937]">
          <Image
            src="/images/about-visual.png"
            alt="SparrRep about"
            width={900}
            height={480}
            className="w-full"
          />
        </div>

        <div className="space-y-8 text-[#6B7280] text-base leading-relaxed mb-16">
          <p>
            Pilots log 1,500 hours before touching a commercial aircraft. Surgeons train on cadavers. Athletes run
            plays before game day. Sales reps? They face their first CFO objection in a live deal with $50K on the
            line — and figure it out in real time.
          </p>
          <p>
            That&apos;s not training. That&apos;s practicing on customers.
          </p>
          <p>
            SparrRep (Prepitch) exists to change that. We built AI-powered pre-call simulation so that every rep —
            from the new SDR to the seasoned AE — can walk into every call having already practiced that exact
            conversation.
          </p>
        </div>

        <div className="mb-16 p-6 rounded-xl border border-[#1F2937] bg-[#111318]">
          <h2 className="font-display text-2xl text-[#F9FAFB] mb-3">Our mission</h2>
          <p className="text-[#6B7280] text-lg leading-relaxed italic">
            &ldquo;Make pre-call simulation standard practice for every B2B sales team.&rdquo;
          </p>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-2xl text-[#F9FAFB] mb-6">What makes this different</h2>
          <div className="space-y-4">
            {[
              {
                n: "01",
                t: "Specific, not generic",
                d: "Built from YOUR prospect's data, not a random persona. The buyer you practice against is the buyer you're actually calling.",
              },
              {
                n: "02",
                t: "Rep-initiated, not manager-assigned",
                d: "You open it when you're prepping for a call you're nervous about. Not when IT sends you a training module at 9am on Monday.",
              },
              {
                n: "03",
                t: "60-second setup",
                d: "No admin config, no 2-week onboarding, no CSM call. Paste your notes and you're sparring in under a minute.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 p-5 rounded-lg border border-[#1F2937] bg-[#111318]">
                <span className="font-mono text-[#F59E0B]/50 text-lg font-semibold shrink-0">{item.n}</span>
                <div>
                  <h3 className="text-[#F9FAFB] font-semibold mb-1">{item.t}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 text-[#6B7280] leading-relaxed">
          <p>
            We built SparrRep because we watched too many deals die because the rep had already heard that objection —
            and still didn&apos;t know what to say. Not because they were bad at sales. Because they&apos;d never had
            a safe place to practice.
          </p>
        </div>

        <div className="text-center p-10 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5">
          <h2 className="font-display text-3xl text-[#F9FAFB] mb-3">Try it yourself</h2>
          <p className="text-[#6B7280] mb-6">First 3 sessions are free. No credit card required.</p>
          <Link href="/signup">
            <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold">
              Start Sparring Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
