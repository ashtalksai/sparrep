"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

// ─── Slide Components ──────────────────────────────────────────────────────────

function SlideWrapper({ children, bg = "bg-[#0D0D0F]" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className={`h-full w-full flex items-center justify-center p-8 md:p-16 ${bg}`}>
      <div className="max-w-5xl w-full">{children}</div>
    </div>
  )
}

function SlideLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="w-1 h-4 bg-[#F59E0B] rounded-full inline-block" />
      <span className="text-xs text-[#F59E0B] uppercase tracking-[0.2em] font-mono font-medium">{text}</span>
    </div>
  )
}

// Slide 1: Title
function TitleSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center p-8 md:p-16 bg-[#0D0D0F] overflow-hidden">
      {/* Watermark score */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-mono text-[20vw] font-bold text-[#F59E0B]/[0.04] leading-none">3.8/5.0</span>
      </div>
      {/* Animated amber bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        style={{ width: "100%", transformOrigin: "left" }}
      />
      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-7xl md:text-9xl text-[#FAFAFA] mb-6 leading-none tracking-tight">
            SparrRep
          </h1>
        </motion.div>
        <motion.p
          className="text-2xl md:text-3xl text-[#F59E0B] font-display mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          "Practice on AI. Close on humans."
        </motion.p>
        <motion.p
          className="text-lg text-[#A1A1AA] font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          AI pre-call simulation for B2B sales reps
        </motion.p>
        <motion.p
          className="text-sm text-[#6B6B75] font-mono mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          sparrep.ashketing.com
        </motion.p>
      </div>
    </div>
  )
}

// Slide 2: Problem
function ProblemSlide() {
  const cards = [
    { icon: "✈️", stat: "1,500 hrs", label: "Pilots log in simulators before touching a commercial aircraft" },
    { icon: "🔬", stat: "Years", label: "Surgeons train on cadavers before their first live operation" },
    { icon: "🏃", stat: "Every play", label: "Athletes rehearse before game day. Every time." },
  ]
  return (
    <SlideWrapper bg="bg-[#0D0D0F]">
      <SlideLabel text="The Problem" />
      <h2 className="font-display text-4xl md:text-6xl text-[#FAFAFA] mb-4 leading-tight">
        "The only profession that trains on live customers."
      </h2>
      <p className="text-[#A1A1AA] text-lg mb-10 max-w-2xl">
        Pilots. Surgeons. Athletes. They all use simulators. Sales reps hear "we don't have budget for this" for the first time — and have to respond — while $40,000 is on the line.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.stat} className="bg-[#111114] border border-[#2A2A30] rounded-xl p-6 border-t-2 border-t-[#F59E0B]">
            <div className="text-2xl mb-3">{c.icon}</div>
            <div className="font-mono text-xl text-[#F59E0B] mb-1">{c.stat}</div>
            <p className="text-[#A1A1AA] text-sm">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { stat: "📉 4-6 months", body: "Average ramp time for a new B2B sales rep to hit quota. Most of it spent learning what NOT to say on live deals." },
          { stat: "💸 $40K", body: "Average value of a mid-market SaaS deal lost to a preventable objection. The objection the rep had seen before." },
          { stat: "🔄 0 tools", body: "Number of tools that help reps practice the specific call they have tomorrow. Until now." },
        ].map((c) => (
          <div key={c.stat} className="bg-[#111114] border border-[#2A2A30] rounded-xl p-5">
            <p className="text-[#FAFAFA] font-semibold mb-2">{c.stat}</p>
            <p className="text-[#6B6B75] text-xs leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  )
}

// Slide 3: The Gap
function GapSlide() {
  return (
    <SlideWrapper bg="bg-[#111114]">
      <SlideLabel text="The Gap" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-10 leading-tight">
        "Gong tells you what went wrong. <br className="hidden md:block" />After the deal is gone."
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-start">
        {/* Left: what exists */}
        <div className="bg-[#0D0D0F] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-xs text-[#6B6B75] uppercase tracking-widest mb-4">What exists today</p>
          <ul className="space-y-3">
            {[
              "Gong / Chorus — post-call analysis",
              "Hyperbound — generic cold call practice",
              "Second Nature — training module avatars",
              "Sales coaching — hindsight feedback",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[#A1A1AA] text-sm">
                <span className="text-[#EF4444] mt-0.5">❌</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Center: THE GAP */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-px h-16 bg-[#2A2A30] hidden md:block" />
          <div className="px-3 py-2 border border-[#F59E0B]/40 rounded-lg text-[#F59E0B] font-mono text-xs font-bold text-center">
            THE<br />GAP
          </div>
          <div className="w-px h-16 bg-[#2A2A30] hidden md:block" />
        </div>
        {/* Right: what's missing */}
        <div className="bg-[#0D0D0F] border border-[#F59E0B]/30 rounded-xl p-6">
          <p className="text-xs text-[#6B6B75] uppercase tracking-widest mb-4">What's missing</p>
          <p className="text-[#FAFAFA] text-sm leading-relaxed mb-4">
            Pre-call simulation for your <span className="text-[#F59E0B] font-semibold">SPECIFIC upcoming deal</span>. Built from your actual notes. In 60 seconds.
          </p>
          <div className="mt-4 pt-4 border-t border-[#2A2A30]">
            <p className="text-[#F59E0B] font-display text-xl">"Nobody does pre-call. SparrRep does."</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}

// Slide 4: Solution
function SolutionSlide() {
  const steps = [
    {
      num: "01",
      title: "PASTE YOUR NOTES",
      body: "Who you're meeting. Their company. Your last 3 emails. The deal stage. Takes 30 seconds.",
      icon: "📝",
    },
    {
      num: "02",
      title: "MEET YOUR BUYER",
      body: 'AI builds a simulation of YOUR specific prospect. Their buying style, objections, personality. Not a generic CFO. Sarah Chen, VP Finance, TechCorp.',
      icon: "🤖",
    },
    {
      num: "03",
      title: "SPAR",
      body: "Text-based conversation. AI buyer pushes back the way real prospects do. You practice until you stop folding.",
      icon: "⚔️",
    },
  ]
  return (
    <SlideWrapper bg="bg-[#0D0D0F]">
      <SlideLabel text="Solution" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-4">The flight simulator. For sales.</h2>
      <p className="text-[#A1A1AA] mb-10">Build your specific buyer from your notes. Practice. Get scored. Walk in ready.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {steps.map((s, i) => (
          <div key={s.num} className="relative bg-[#111114] border border-[#2A2A30] rounded-xl p-6">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 z-10 text-[#F59E0B] text-lg">→</div>
            )}
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="font-mono text-xs text-[#F59E0B] mb-1">{s.num}</div>
            <h3 className="font-mono text-sm font-bold text-[#FAFAFA] mb-2">{s.title}</h3>
            <p className="text-[#A1A1AA] text-xs leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg px-6 py-3">
          <span className="font-mono text-[#F59E0B] text-lg font-bold">60 seconds</span>
          <span className="text-[#A1A1AA] text-sm ml-2">to your first session.</span>
        </div>
      </div>
    </SlideWrapper>
  )
}

// Slide 5: Product Demo
function ProductSlide() {
  const annotations = [
    { pos: "top-4 left-4", text: "Buyer summary — built from your notes" },
    { pos: "top-4 right-4", text: "Score badge — updates in real-time" },
    { pos: "bottom-16 left-4", text: "AI responses — pushes back, doesn't fold easily" },
    { pos: "bottom-4 right-4", text: "Session timer — configurable 10-30 min" },
  ]
  return (
    <SlideWrapper bg="bg-[#111114]">
      <SlideLabel text="Product" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-8">See it.</h2>
      <div className="relative bg-[#0D0D0F] border border-[#2A2A30] rounded-2xl overflow-hidden">
        {/* Simulated product UI */}
        <div className="flex border-b border-[#2A2A30]">
          {/* Left panel: buyer summary */}
          <div className="w-64 border-r border-[#2A2A30] p-4 hidden md:block">
            <p className="text-xs text-[#6B6B75] uppercase tracking-widest mb-3">Buyer Profile</p>
            <div className="bg-[#111114] rounded-lg p-3 mb-3">
              <p className="text-[#FAFAFA] text-sm font-semibold">Sarah Chen</p>
              <p className="text-[#A1A1AA] text-xs">VP Finance · TechCorp</p>
            </div>
            <div className="space-y-1">
              {["Budget authority: ✅", "Decision timeline: Q2", "Main objection: ROI", "Style: Data-driven"].map(item => (
                <p key={item} className="text-xs text-[#6B6B75]">{item}</p>
              ))}
            </div>
          </div>
          {/* Right panel: chat */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-[#2A2A30]">
              <span className="text-xs text-[#A1A1AA] font-mono">Session #4 · Discovery Call</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#6B6B75]">12:34</span>
                <div className="bg-[#F59E0B] text-[#0D0D0F] rounded-md px-2 py-0.5 font-mono text-xs font-bold">
                  3.8/5.0
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 space-y-3 min-h-[200px]">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#2A2A30] flex items-center justify-center text-xs flex-shrink-0">SC</div>
                <div className="bg-[#111114] rounded-xl rounded-tl-sm p-3 max-w-sm">
                  <p className="text-[#FAFAFA] text-xs">I appreciate the demo, but honestly I've seen three tools like this in the past year. What makes this different enough to justify the budget?</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl rounded-tr-sm p-3 max-w-sm">
                  <p className="text-[#FAFAFA] text-xs">The key difference is specificity. Most tools train you against generic CFOs. SparrRep builds Sarah Chen from YOUR actual notes...</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-xs flex-shrink-0 text-[#F59E0B]">U</div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#2A2A30] flex items-center justify-center text-xs flex-shrink-0">SC</div>
                <div className="bg-[#111114] rounded-xl rounded-tl-sm p-3 max-w-sm">
                  <p className="text-[#FAFAFA] text-xs">Show me the ROI data. What do reps actually improve and by how much?</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-[#2A2A30]">
              <div className="bg-[#111114] border border-[#2A2A30] rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="text-[#6B6B75] text-xs flex-1">Type your response...</span>
                <span className="text-[#F59E0B] text-xs font-mono">↵ Send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-[#A1A1AA] text-xs font-mono">
          Try it live: <Link href="/" className="text-[#F59E0B] hover:underline">sparrep.ashketing.com</Link> → Start New Session (no account required)
        </p>
      </div>
    </SlideWrapper>
  )
}

// Slide 6: Traction / Proof
function TractionSlide() {
  return (
    <SlideWrapper bg="bg-[#0D0D0F]">
      <SlideLabel text="Traction & Proof" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-10">The market already knows this problem.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Search signals */}
        <div className="bg-[#111114] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-xs text-[#6B6B75] uppercase tracking-widest mb-4">Search Signals</p>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#F59E0B]/30">
                <th className="text-left text-[#F59E0B] font-mono pb-2">Keyword</th>
                <th className="text-right text-[#F59E0B] font-mono pb-2">Vol/mo</th>
                <th className="text-right text-[#F59E0B] font-mono pb-2">Trend</th>
              </tr>
            </thead>
            <tbody className="text-[#A1A1AA] divide-y divide-[#2A2A30]/50">
              {[
                ["sales coaching software", "5,400", "Stable"],
                ["sales enablement platform", "2,400", "+116%"],
                ["AI sales training", "1,200", "+89%"],
                ["sales roleplay software", "600", "Growing"],
              ].map(([kw, vol, trend]) => (
                <tr key={kw}>
                  <td className="py-2">{kw}</td>
                  <td className="text-right font-mono">{vol}</td>
                  <td className={`text-right font-mono ${trend.startsWith("+") ? "text-[#22C55E]" : "text-[#A1A1AA]"}`}>{trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Right: Community signals */}
        <div className="bg-[#111114] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-xs text-[#6B6B75] uppercase tracking-widest mb-4">Community Signals</p>
          <ul className="space-y-3 text-sm text-[#A1A1AA]">
            {[
              "Reddit: 8 active subreddits discussing the pain — r/sales (2.1M members)",
              "LinkedIn: VPs of Sales consistently post ramp time as #1 pain",
              "Revenue Collective, Modern Sales Pros actively searching for pre-call tools",
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#F59E0B] mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[#2A2A30]">
            <p className="text-[#6B6B75] text-xs italic">"The closest tool requires 2 weeks admin setup. Zero rep-initiated options exist." — r/sales</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}

// Slide 7: Market
function MarketSlide() {
  return (
    <SlideWrapper bg="bg-[#111114]">
      <SlideLabel text="Market Size" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-10">A $7B market with zero pre-call tools.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "TAM", size: "$7B", desc: "Global sales enablement SaaS", sub: "5.8M B2B sales reps × $49/month" },
          { label: "SAM", size: "$900M", desc: "AI-first tools, SMB/mid-market", sub: "150K teams × 10 avg seats × $49/mo" },
          { label: "SOM", size: "$1-3M ARR", desc: "Year 1-2 target", sub: "500 teams via PLG + cold outreach" },
        ].map((m, i) => (
          <div key={m.label} className={`rounded-xl p-6 ${i === 0 ? "bg-[#F59E0B] text-[#0D0D0F]" : "bg-[#0D0D0F] border border-[#2A2A30] text-[#FAFAFA]"}`}>
            <p className={`text-xs uppercase tracking-widest font-mono mb-1 ${i === 0 ? "text-[#0D0D0F]/60" : "text-[#6B6B75]"}`}>{m.label}</p>
            <p className={`font-mono text-3xl font-bold mb-1 ${i === 0 ? "text-[#0D0D0F]" : "text-[#F59E0B]"}`}>{m.size}</p>
            <p className={`text-sm font-semibold mb-1 ${i === 0 ? "text-[#0D0D0F]" : "text-[#FAFAFA]"}`}>{m.desc}</p>
            <p className={`text-xs ${i === 0 ? "text-[#0D0D0F]/70" : "text-[#6B6B75]"}`}>{m.sub}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg px-8 py-4 text-center">
          <p className="font-mono text-3xl text-[#F59E0B] font-bold">$12.8B</p>
          <p className="text-[#A1A1AA] text-sm mt-1">Projected market size by 2028 · 15% CAGR</p>
        </div>
      </div>
    </SlideWrapper>
  )
}

// Slide 8: Business Model
function BusinessModelSlide() {
  const tiers = [
    { name: "Free", price: "$0", sub: "/month", features: ["3 sessions/month", "Basic scoring", "Try before you buy"], featured: false },
    { name: "Pro", price: "$49", sub: "/user/mo", features: ["Unlimited sessions", "Full scoring breakdown", "Export + share", "Session history"], featured: true },
    { name: "Team", price: "$39", sub: "/user/mo (5+ seats)", features: ["Everything in Pro", "Manager dashboard", "Team analytics", "Rep progress reports"], featured: false },
  ]
  return (
    <SlideWrapper bg="bg-[#0D0D0F]">
      <SlideLabel text="Business Model" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-10">Simple pricing. High retention.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tiers.map((t) => (
          <div key={t.name} className={`rounded-xl p-6 relative ${t.featured ? "bg-[#F59E0B] text-[#0D0D0F]" : "bg-[#111114] border border-[#2A2A30] text-[#FAFAFA]"}`}>
            {t.featured && (
              <span className="absolute -top-3 left-6 bg-[#0D0D0F] text-[#F59E0B] text-xs font-mono font-bold px-3 py-1 rounded-full border border-[#F59E0B]/30">
                MOST POPULAR
              </span>
            )}
            <h3 className={`font-semibold mb-1 ${t.featured ? "text-[#0D0D0F]" : "text-[#FAFAFA]"}`}>{t.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className={`font-mono text-3xl font-bold ${t.featured ? "text-[#0D0D0F]" : "text-[#F59E0B]"}`}>{t.price}</span>
              <span className={`text-xs ${t.featured ? "text-[#0D0D0F]/70" : "text-[#6B6B75]"}`}>{t.sub}</span>
            </div>
            <ul className="space-y-1.5">
              {t.features.map(f => (
                <li key={f} className={`flex items-center gap-2 text-xs ${t.featured ? "text-[#0D0D0F]/80" : "text-[#A1A1AA]"}`}>
                  <span className={t.featured ? "text-[#0D0D0F]" : "text-[#F59E0B]"}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { val: "$392", label: "LTV — Pro (8-month retention)" },
          { val: "$4,680", label: "LTV — Team (10 seats, 12 months)" },
          { val: "12×", label: "LTV:CAC ratio" },
        ].map(m => (
          <div key={m.val} className="bg-[#111114] border border-[#2A2A30] rounded-lg p-4">
            <p className="font-mono text-2xl text-[#F59E0B] font-bold">{m.val}</p>
            <p className="text-[#6B6B75] text-xs mt-1">{m.label}</p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  )
}

// Slide 9: Competition
function CompetitionSlide() {
  const rows = [
    { feature: "Pre-call simulation", sparrep: true, hyperbound: false, secondnature: false, gong: false },
    { feature: "Specific prospect mode", sparrep: true, hyperbound: false, secondnature: false, gong: false },
    { feature: "60-second setup", sparrep: true, hyperbound: false, secondnature: false, gong: null },
    { feature: "Rep-initiated (no admin)", sparrep: true, hyperbound: false, secondnature: false, gong: null },
    { feature: "Free tier", sparrep: true, hyperbound: false, secondnature: false, gong: null },
  ]

  function Cell({ val }: { val: boolean | null }) {
    if (val === null) return <td className="py-2 px-3 text-center text-[#6B6B75] text-sm">N/A</td>
    return <td className={`py-2 px-3 text-center text-sm ${val ? "text-[#22C55E]" : "text-[#EF4444]"}`}>{val ? "✅" : "❌"}</td>
  }

  return (
    <SlideWrapper bg="bg-[#111114]">
      <SlideLabel text="Competition" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-8">They analyze the past. We prepare for the future.</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2A2A30]">
              <th className="text-left text-[#6B6B75] font-mono text-xs py-2 px-3">Feature</th>
              <th className="text-center text-[#F59E0B] font-mono text-xs py-2 px-3 bg-[#F59E0B]/5 rounded-t-lg">SparrRep</th>
              <th className="text-center text-[#6B6B75] font-mono text-xs py-2 px-3">Hyperbound</th>
              <th className="text-center text-[#6B6B75] font-mono text-xs py-2 px-3">Second Nature</th>
              <th className="text-center text-[#6B6B75] font-mono text-xs py-2 px-3">Gong</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A30]/50">
            {rows.map(r => (
              <tr key={r.feature} className="hover:bg-[#0D0D0F]/50 transition-colors">
                <td className="py-2 px-3 text-[#A1A1AA] text-xs">{r.feature}</td>
                <Cell val={r.sparrep} />
                <Cell val={r.hyperbound} />
                <Cell val={r.secondnature} />
                <Cell val={r.gong} />
              </tr>
            ))}
            <tr className="border-t border-[#2A2A30]">
              <td className="py-2 px-3 text-[#6B6B75] text-xs">Price</td>
              <td className="py-2 px-3 text-center text-[#F59E0B] font-mono text-xs font-bold">$49/user</td>
              <td className="py-2 px-3 text-center text-[#A1A1AA] font-mono text-xs">$24-69/user</td>
              <td className="py-2 px-3 text-center text-[#A1A1AA] font-mono text-xs">Enterprise</td>
              <td className="py-2 px-3 text-center text-[#A1A1AA] font-mono text-xs">Enterprise</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 bg-[#0D0D0F] border border-[#F59E0B]/30 rounded-xl p-4">
        <p className="text-[#FAFAFA] text-sm">"We're not competing with Gong or Hyperbound. <span className="text-[#F59E0B]">We're the tool you use BEFORE you need them.</span>"</p>
      </div>
    </SlideWrapper>
  )
}

// Slide 10: GTM
function GTMSlide() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Foundation",
      period: "Month 1",
      items: ["Reddit seeding — r/sales value posts", "LinkedIn founder content — 3 posts/week", "Revenue Collective, Modern Sales Pros outreach", "Cold LinkedIn DMs to VP Sales — 20/day"],
      goal: "50 free users, 2 Pro"
    },
    {
      phase: "Phase 2",
      title: "Momentum",
      period: "Month 2",
      items: ["LinkedIn outreach — 100 VPs contacted", "Product Hunt preparation", "First team plan demos", "Email nurture sequence live"],
      goal: "200 free users, 10 Pro, 1 Team plan"
    },
    {
      phase: "Phase 3",
      title: "Launch",
      period: "Month 3",
      items: ["Product Hunt launch — target Top 5", "Sales Hacker, Pavilion press outreach", "First $500 LinkedIn paid experiment", "Beehiiv newsletter placements"],
      goal: "500 free users, 25 Pro, 3 Team → $1.5K+ MRR"
    },
  ]
  return (
    <SlideWrapper bg="bg-[#0D0D0F]">
      <SlideLabel text="Go-to-Market" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-10">First 90 days.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {phases.map((p, i) => (
          <div key={p.phase} className="bg-[#111114] border border-[#2A2A30] rounded-xl p-5 border-l-2 border-l-[#F59E0B]">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[#F59E0B]">{p.phase}</span>
              <span className="text-[#6B6B75] text-xs">·</span>
              <span className="text-[#6B6B75] text-xs">{p.period}</span>
            </div>
            <h3 className="font-semibold text-[#FAFAFA] mb-3">{p.title}</h3>
            <ul className="space-y-1.5 mb-4">
              {p.items.map(item => (
                <li key={item} className="text-[#A1A1AA] text-xs flex items-start gap-1.5">
                  <span className="text-[#F59E0B] mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-[#2A2A30]">
              <p className="text-[#6B6B75] text-xs">Goal: <span className="text-[#F59E0B]">{p.goal}</span></p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { val: "~$25", label: "CAC self-serve" },
          { val: "12×", label: "LTV:CAC" },
          { val: "<1 mo", label: "Payback period" },
        ].map(m => (
          <div key={m.val} className="bg-[#111114] border border-[#2A2A30] rounded-lg p-3">
            <p className="font-mono text-xl text-[#F59E0B] font-bold">{m.val}</p>
            <p className="text-[#6B6B75] text-xs mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  )
}

// Slide 11: The Ask
function AskSlide() {
  return (
    <SlideWrapper bg="bg-[#111114]">
      <SlideLabel text="The Ask" />
      <h2 className="font-display text-4xl md:text-5xl text-[#FAFAFA] mb-10">What we're building.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0D0D0F] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-xs text-[#6B6B75] uppercase tracking-widest mb-3">ChimeStream — the company</p>
          <p className="text-[#A1A1AA] text-sm leading-relaxed">
            Building category-creating SaaS tools on 1-2 week cycles. SparrRep is the latest product in the portfolio. Founder-led, product-first, PLG distribution.
          </p>
        </div>
        <div className="bg-[#0D0D0F] border border-[#2A2A30] rounded-xl p-6">
          <p className="text-xs text-[#6B6B75] uppercase tracking-widest mb-3">Current Status</p>
          <ul className="space-y-2 text-sm">
            {[
              { icon: "✅", text: "Product live: sparrep.ashketing.com" },
              { icon: "✅", text: "Freemium tier active (3 free sessions)" },
              { icon: "✅", text: "Pro tier ($49/user/month)" },
              { icon: "🔄", text: "Team plan (in progress)" },
              { icon: "🔄", text: "Distribution launching" },
            ].map(item => (
              <li key={item.text} className="flex items-center gap-2 text-[#A1A1AA]">
                <span>{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl p-6">
        <p className="text-xs text-[#6B6B75] uppercase tracking-widest mb-3">What we're looking for</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "Early Adopters", desc: "Sales reps — 3 free sessions, honest feedback" },
            { title: "Team Pilots", desc: "VP Sales — 30-min demo, 30-day team trial" },
            { title: "Distribution", desc: "Newsletter/community co-marketing partners" },
            { title: "Pre-Seed Investors", desc: "$200K-$500K to fund growth to $100K MRR" },
          ].map(item => (
            <div key={item.title}>
              <p className="text-[#F59E0B] text-sm font-semibold mb-1">{item.title}</p>
              <p className="text-[#6B6B75] text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

// Slide 12: Closing
function ClosingSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center p-8 bg-[#0D0D0F] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-mono text-[20vw] font-bold text-[#F59E0B]/[0.03] leading-none">5.0</span>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        style={{ width: "100%", transformOrigin: "left" }}
      />
      <div className="max-w-3xl w-full text-center relative z-10">
        <h2 className="font-display text-5xl md:text-7xl text-[#FAFAFA] mb-6 leading-tight">
          "Practice on AI.
          <br />
          Close on humans."
        </h2>
        <p className="font-mono text-[#F59E0B] text-xl mb-8">sparrep.ashketing.com</p>
        <p className="text-[#6B6B75] text-sm font-mono">SparrRep by ChimeStream · 2026</p>
      </div>
    </div>
  )
}

// ─── Slide Registry ────────────────────────────────────────────────────────────

const SLIDES = [
  { id: "title",        label: "Title",          component: TitleSlide },
  { id: "problem",      label: "Problem",        component: ProblemSlide },
  { id: "gap",          label: "The Gap",        component: GapSlide },
  { id: "solution",     label: "Solution",       component: SolutionSlide },
  { id: "product",      label: "Product",        component: ProductSlide },
  { id: "traction",     label: "Traction",       component: TractionSlide },
  { id: "market",       label: "Market",         component: MarketSlide },
  { id: "business",     label: "Business Model", component: BusinessModelSlide },
  { id: "competition",  label: "Competition",    component: CompetitionSlide },
  { id: "gtm",          label: "GTM",            component: GTMSlide },
  { id: "ask",          label: "The Ask",        component: AskSlide },
  { id: "closing",      label: "Closing",        component: ClosingSlide },
]

// ─── Main Deck Component ───────────────────────────────────────────────────────

export default function PitchPage() {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent(c => Math.min(SLIDES.length - 1, c + 1)), [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next() }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev() }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [next, prev])

  // Touch/swipe support
  useEffect(() => {
    let startX = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX
      if (diff > 50) next()
      if (diff < -50) prev()
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [next, prev])

  const Slide = SLIDES[current].component

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#0D0D0F]">
      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Slide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-6 md:px-10 py-3 border-t border-[#2A2A30] bg-[#0D0D0F]/90 backdrop-blur-sm flex-shrink-0">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-1.5 text-[#6B6B75] hover:text-[#FAFAFA] disabled:opacity-20 transition-colors text-xs"
        >
          <ChevronLeft className="w-3 h-3" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              title={s.label}
              className={`transition-all duration-200 rounded-full ${
                i === current
                  ? "w-5 h-1.5 bg-[#F59E0B]"
                  : "w-1.5 h-1.5 bg-[#2A2A30] hover:bg-[#6B6B75]"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[#6B6B75] text-xs hidden sm:inline">
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <button
            onClick={next}
            disabled={current === SLIDES.length - 1}
            className="flex items-center gap-1.5 text-[#6B6B75] hover:text-[#FAFAFA] disabled:opacity-20 transition-colors text-xs"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Slide title tooltip */}
      <div className="text-center pb-1 text-[10px] text-[#2A2A30] font-mono">
        {SLIDES[current].label} · ← → to navigate · swipe on mobile
      </div>

      {/* Live site link */}
      <Link
        href="/"
        className="fixed top-4 right-4 flex items-center gap-1.5 text-[#6B6B75] hover:text-[#F59E0B] transition-colors text-xs font-mono bg-[#111114] border border-[#2A2A30] px-3 py-1.5 rounded-lg"
      >
        <ExternalLink className="w-3 h-3" />
        sparrep.ashketing.com
      </Link>
    </div>
  )
}
