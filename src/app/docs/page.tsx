"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Zap, Search, TrendingUp, Megaphone, Palette, PresentationIcon, ExternalLink, Menu, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Types ─────────────────────────────────────────────────────────────────────

type SectionId = "research" | "gtm" | "marketing" | "brand" | "pitch"

interface Section {
  id: SectionId
  icon: React.ElementType
  label: string
  docUrl: string
}

// ─── Sections Config ───────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  {
    id: "research",
    icon: Search,
    label: "Research",
    docUrl: "https://docs.google.com/document/d/1U9SLKBnDN7lNTw_6Xs58nOjGjoRw26XXn53V5__UVFg/edit",
  },
  {
    id: "gtm",
    icon: TrendingUp,
    label: "GTM Plan",
    docUrl: "https://docs.google.com/document/d/1DpmBnBoyuTaBcQ-kcS1NVUkd0A9X-dMA4E9CVwZGpAU/edit",
  },
  {
    id: "marketing",
    icon: Megaphone,
    label: "Marketing",
    docUrl: "https://docs.google.com/document/d/1KyIRn9vmWQGmREf-hPIrX5_jDJkbhXkCJoN5XWwXbnc/edit",
  },
  {
    id: "brand",
    icon: Palette,
    label: "Brand",
    docUrl: "https://docs.google.com/document/d/1cYrrL7Q7sCzOHcYB4gngMfDmGr-xitoqcYfn8IkPmfQ/edit",
  },
  {
    id: "pitch",
    icon: PresentationIcon,
    label: "Pitch Deck",
    docUrl: "https://docs.google.com/document/d/1wBgv2lQX0HZPonxmjFFkdZTADAO8JQc5BOFfh4xfU5U/edit",
  },
]

// ─── Shared Components ─────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-3xl md:text-4xl text-[#FAFAFA] mb-6">{children}</h2>
}

function SectionSubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-[#FAFAFA] text-lg mb-3">{children}</h3>
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-[#F59E0B] uppercase tracking-[0.2em] font-mono mb-2">{children}</p>
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#111114] border border-[#2A2A30] rounded-xl p-5 ${className}`}>
      {children}
    </div>
  )
}

function DocLink({ url, label = "Open in Google Docs" }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[#F59E0B] text-xs font-mono hover:underline mt-2"
    >
      <ExternalLink className="w-3 h-3" />
      {label}
    </a>
  )
}

function Divider() {
  return <div className="h-px bg-[#2A2A30] my-8" />
}

// ─── Section Content Components ────────────────────────────────────────────────

function ResearchContent() {
  return (
    <div>
      <SectionLabel>Stage 1 — Research</SectionLabel>
      <SectionHeading>Market Research & Validation</SectionHeading>
      <p className="text-[#A1A1AA] mb-8">IdeaBrowser Score: 89/100. Research conducted March 19, 2026.</p>

      {/* Executive Summary */}
      <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl p-6 mb-6">
        <SectionLabel>Executive Summary</SectionLabel>
        <p className="text-[#FAFAFA] text-sm leading-relaxed mb-4">
          SparrRep addresses a critical gap in sales enablement: <strong className="text-[#F59E0B]">no tool exists for pre-call simulation</strong> against a specific upcoming prospect. All competitors (Gong, Hyperbound, Second Nature) do post-call analysis or generic training. SparrRep builds your specific buyer from your call notes in 60 seconds.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Opportunity", val: "9/10", sub: "Exceptional" },
            { label: "Problem", val: "9/10", sub: "Severe Pain" },
            { label: "Feasibility", val: "9/10", sub: "Very Easy" },
            { label: "Why Now", val: "9/10", sub: "Perfect Timing" },
          ].map(m => (
            <div key={m.label} className="text-center">
              <p className="font-mono text-2xl text-[#F59E0B] font-bold">{m.val}</p>
              <p className="text-[#FAFAFA] text-xs font-semibold">{m.label}</p>
              <p className="text-[#6B6B75] text-xs">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Size */}
      <SectionSubHeading>Market Size</SectionSubHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "TAM", size: "$7B", desc: "Global sales enablement SaaS", detail: "5.8M B2B sales reps × $49/month potential", bg: "bg-[#F59E0B]", textColor: "text-[#0D0D0F]" },
          { label: "SAM", size: "$900M", desc: "AI-first SMB/mid-market tools", detail: "150K teams × 10 avg seats × $49/mo", bg: "bg-[#111114] border border-[#2A2A30]", textColor: "text-[#FAFAFA]" },
          { label: "SOM", size: "$1-3M ARR", desc: "Year 1-2 realistic target", detail: "500 teams via PLG + cold outreach", bg: "bg-[#111114] border border-[#2A2A30]", textColor: "text-[#FAFAFA]" },
        ].map(m => (
          <div key={m.label} className={`${m.bg} rounded-xl p-5`}>
            <p className={`text-xs font-mono uppercase tracking-widest mb-1 ${m.textColor === "text-[#0D0D0F]" ? "text-[#0D0D0F]/60" : "text-[#6B6B75]"}`}>{m.label}</p>
            <p className={`font-mono text-3xl font-bold mb-1 ${m.textColor === "text-[#0D0D0F]" ? "text-[#0D0D0F]" : "text-[#F59E0B]"}`}>{m.size}</p>
            <p className={`text-sm font-semibold mb-1 ${m.textColor}`}>{m.desc}</p>
            <p className={`text-xs ${m.textColor === "text-[#0D0D0F]" ? "text-[#0D0D0F]/70" : "text-[#6B6B75]"}`}>{m.detail}</p>
          </div>
        ))}
      </div>
      <Card className="mb-6">
        <p className="text-[#A1A1AA] text-sm">
          <span className="text-[#F59E0B] font-mono font-bold">$12.8B</span> projected market size by 2028 · 15% CAGR · AI training/simulation market: $14.71B (broader category)
        </p>
      </Card>

      <Divider />

      {/* Competitive Analysis */}
      <SectionSubHeading>Competitive Analysis</SectionSubHeading>
      <div className="space-y-4 mb-6">
        {[
          {
            name: "Hyperbound",
            positioning: "AI buyer bots for cold call roleplay",
            price: "$24-69/user/mo",
            customers: "IBM, LinkedIn, Bloomberg, Vanta",
            weakness: "Setup complexity (2 weeks avg), cold call only, no pre-call simulation for pipeline deals",
            color: "border-l-[#EF4444]"
          },
          {
            name: "Second Nature",
            positioning: "AI avatar-based roleplay with training modules",
            price: "Enterprise pricing",
            customers: "Oracle NetSuite, GoHealth",
            weakness: "Avatar-based UX feels gimmicky, generic scenarios, 'pricing is ridiculous'",
            color: "border-l-[#EF4444]"
          },
          {
            name: "Gong / Chorus",
            positioning: "Post-call analysis, conversation intelligence",
            price: "Enterprise",
            customers: "Broad enterprise adoption",
            weakness: "Post-call only — shows what went wrong AFTER the deal is lost. Zero pre-call capability.",
            color: "border-l-[#EF4444]"
          },
        ].map(c => (
          <Card key={c.name} className={`border-l-4 ${c.color}`}>
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-[#FAFAFA]">{c.name}</h4>
              <span className="font-mono text-xs text-[#6B6B75]">{c.price}</span>
            </div>
            <p className="text-[#A1A1AA] text-xs mb-2">{c.positioning}</p>
            <p className="text-xs text-[#6B6B75]"><span className="text-[#EF4444]">Gap: </span>{c.weakness}</p>
          </Card>
        ))}
      </div>

      <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl p-5 mb-6">
        <SectionLabel>Critical Insight — The Market Gap</SectionLabel>
        <p className="text-[#FAFAFA] text-sm leading-relaxed">
          All three competitors share the same fundamental positioning: <strong>general sales training</strong>. They help reps get better at generic objections. SparrRep's unique angle: <strong className="text-[#F59E0B]">pre-call simulation for a SPECIFIC upcoming deal</strong>. Not "practice cold calls generally" — "I have a call with TechCorp's VP of Procurement tomorrow. Build me that buyer."
        </p>
      </div>

      <Divider />

      {/* Community Signals */}
      <SectionSubHeading>Community Signals</SectionSubHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { source: "r/sales (2.1M members)", quote: '"My manager watches my Gong calls and tells me what I did wrong. But there\'s no way to practice the call BEFORE it happens."' },
          { source: "r/sales", quote: '"We have Hyperbound but it\'s cold call specific — doesn\'t help me prep for my 2pm discovery with a skeptical CFO."' },
          { source: "LinkedIn — VPs of Sales", quote: '"New reps at my company go live after a 3-day boot camp and immediately lose deals they shouldn\'t lose."' },
          { source: "r/sales", quote: '"Ramp time is killing us — takes 4-6 months for a new rep to hit quota."' },
        ].map((s, i) => (
          <Card key={i}>
            <p className="text-[#6B6B75] text-xs mb-2">{s.source}</p>
            <p className="text-[#A1A1AA] text-sm italic">"{s.quote}"</p>
          </Card>
        ))}
      </div>

      {/* Idea Score */}
      <Card>
        <SectionLabel>Idea Score — 89/100</SectionLabel>
        <div className="space-y-2">
          {[
            { label: "Problem severity", score: "22/25" },
            { label: "Buildable in 48h (MVP)", score: "22/25" },
            { label: "Clear monetization path", score: "19/20" },
            { label: "Low competition / unique angle", score: "13/15" },
            { label: "Distribution path exists", score: "13/15" },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-[#A1A1AA] text-xs">{r.label}</span>
              <span className="font-mono text-xs text-[#F59E0B]">{r.score}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-[#2A2A30] flex items-center justify-between">
            <span className="text-[#FAFAFA] text-sm font-semibold">Total Score</span>
            <span className="font-mono text-[#F59E0B] font-bold">89/100</span>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <DocLink url="https://docs.google.com/document/d/1U9SLKBnDN7lNTw_6Xs58nOjGjoRw26XXn53V5__UVFg/edit" label="Full Research Document →" />
      </div>
    </div>
  )
}

function GTMContent() {
  return (
    <div>
      <SectionLabel>Stage 8 — Go-to-Market</SectionLabel>
      <SectionHeading>Go-to-Market Plan</SectionHeading>
      <p className="text-[#A1A1AA] mb-8">Launch strategy, channel mix, and 90-day timeline. March 2026.</p>

      {/* Target Audience */}
      <SectionSubHeading>Target Audience</SectionSubHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <SectionLabel>Primary — "The Hungry AE"</SectionLabel>
          <p className="text-[#FAFAFA] font-semibold mb-2">Account Executive</p>
          <ul className="space-y-1 text-xs text-[#A1A1AA]">
            <li>25-35 years old · 1-4 years B2B SaaS sales</li>
            <li>Series A–C companies · 10-200 employees</li>
            <li>$60K-$120K OTE</li>
            <li>Uses: Salesforce, HubSpot, Gong/Chorus</li>
            <li className="text-[#F59E0B] mt-2">Will pay $49/month personally if it helps close</li>
          </ul>
        </Card>
        <Card>
          <SectionLabel>Secondary — Economic Buyer</SectionLabel>
          <p className="text-[#FAFAFA] font-semibold mb-2">VP of Sales</p>
          <ul className="space-y-1 text-xs text-[#A1A1AA]">
            <li>35-50 years old · manages 5-30 reps</li>
            <li>Pain: 4-6 month ramp time</li>
            <li>Wants: quota attainment, rep productivity</li>
            <li className="text-[#F59E0B] mt-2">Buys Team plan: $39/user/mo × N seats</li>
          </ul>
        </Card>
      </div>

      <Divider />

      {/* Channels */}
      <SectionSubHeading>Launch Channels</SectionSubHeading>
      <div className="space-y-3 mb-6">
        {[
          {
            name: "Reddit — Organic Seeding",
            why: "r/sales has 2.1M members. Sales reps openly discuss tools and pain points.",
            tactic: "Value posts, problem-focused threads, authentic tool mentions",
            outcome: "100-500 visits/post · 10-50 signups/round"
          },
          {
            name: "LinkedIn — Personal Brand",
            why: "VPs of Sales are on LinkedIn. High organic reach for founder content.",
            tactic: "3 posts/week: problem-focused + data posts + demo clips",
            outcome: "500-2K views/post · 2-10 signups/post"
          },
          {
            name: "Product Hunt Launch",
            why: "PLG validation. Gets on tech media radar. AI + productivity tools loved.",
            tactic: "12:01am PT launch · founder story first comment · coordinate upvotes",
            outcome: "500-1,500 visitors · 50-200 signups on launch day"
          },
          {
            name: "Cold LinkedIn DMs — VP Sales",
            why: "Team plan buyers don't self-discover on Reddit. Direct outreach required.",
            tactic: "20/day · 3-message sequence (connect → value → soft pitch)",
            outcome: "2-5 team demos/week → 1-2 closed/month"
          },
          {
            name: "Slack Communities",
            why: "Revenue Collective, Modern Sales Pros · 1-5K active members · buyers + influencers",
            tactic: "Post in #tools: '3 free sessions if you want to try it'",
            outcome: "20-100 signups/community post · direct feedback loop"
          },
        ].map(c => (
          <Card key={c.name} className="border-l-4 border-l-[#F59E0B]">
            <h4 className="text-[#FAFAFA] font-semibold text-sm mb-1">{c.name}</h4>
            <p className="text-[#A1A1AA] text-xs mb-1">{c.tactic}</p>
            <p className="text-[#F59E0B] text-xs font-mono">{c.outcome}</p>
          </Card>
        ))}
      </div>

      <Divider />

      {/* 90-Day Timeline */}
      <SectionSubHeading>90-Day Launch Timeline</SectionSubHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            period: "Month 1",
            title: "Foundation",
            items: [
              "Confirm product live & functional",
              "Set up free tier (3 sessions gate)",
              "Create founder LinkedIn profile",
              "Join r/sales, Revenue Collective",
              "First Reddit value post",
              "Start 20/day VP Sales outreach",
            ],
            goal: "50 free signups · 2 pro conversions",
          },
          {
            period: "Month 2",
            title: "Momentum",
            items: [
              "Product Hunt launch prep (find hunter)",
              "LinkedIn: 3 posts/week problem-focused",
              "Reddit: 5 threads/week genuine replies",
              "100 total VPs contacted",
              "3-5 team demos",
              "Email nurture sequence live",
            ],
            goal: "200 free users · 10 pro · 1 team plan",
          },
          {
            period: "Month 3",
            title: "Launch",
            items: [
              "Product Hunt launch (Tuesday)",
              "Sales Hacker, Pavilion outreach",
              "Beehiiv newsletter placements",
              "$500 LinkedIn paid experiment",
              "Sales content creator collabs",
            ],
            goal: "500 free users · 25 pro · 3 teams → $1.5K+ MRR",
          },
        ].map(p => (
          <Card key={p.period} className="border-t-2 border-t-[#F59E0B]">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[#F59E0B]">{p.period}</span>
            </div>
            <h4 className="font-semibold text-[#FAFAFA] mb-3">{p.title}</h4>
            <ul className="space-y-1 mb-4">
              {p.items.map(item => (
                <li key={item} className="text-[#A1A1AA] text-xs flex items-start gap-1.5">
                  <span className="text-[#F59E0B] mt-0.5 flex-shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-[#2A2A30]">
              <p className="text-[#6B6B75] text-xs">Goal: <span className="text-[#F59E0B]">{p.goal}</span></p>
            </div>
          </Card>
        ))}
      </div>

      <Divider />

      {/* Revenue Projections */}
      <SectionSubHeading>Revenue Projections</SectionSubHeading>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#F59E0B]/30">
              <th className="text-left text-[#F59E0B] font-mono py-2 px-3">Month</th>
              <th className="text-right text-[#F59E0B] font-mono py-2 px-3">Free Users</th>
              <th className="text-right text-[#F59E0B] font-mono py-2 px-3">Pro Users</th>
              <th className="text-right text-[#F59E0B] font-mono py-2 px-3">Team Seats</th>
              <th className="text-right text-[#F59E0B] font-mono py-2 px-3">MRR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A30]/50">
            {[
              ["Month 1", "100", "5", "0", "$245"],
              ["Month 3", "500", "25", "20", "$2,005"],
              ["Month 6", "1,500", "80", "100", "$7,820"],
              ["Month 12", "5,000", "200", "500", "$29,300"],
            ].map(row => (
              <tr key={row[0]} className="hover:bg-[#111114]/50">
                <td className="py-2 px-3 text-[#A1A1AA]">{row[0]}</td>
                <td className="py-2 px-3 text-right text-[#A1A1AA]">{row[1]}</td>
                <td className="py-2 px-3 text-right text-[#A1A1AA]">{row[2]}</td>
                <td className="py-2 px-3 text-right text-[#A1A1AA]">{row[3]}</td>
                <td className="py-2 px-3 text-right font-mono text-[#F59E0B] font-bold">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <DocLink url="https://docs.google.com/document/d/1DpmBnBoyuTaBcQ-kcS1NVUkd0A9X-dMA4E9CVwZGpAU/edit" label="Full GTM Plan →" />
      </div>
    </div>
  )
}

function MarketingContent() {
  return (
    <div>
      <SectionLabel>Stage 8 — Marketing</SectionLabel>
      <SectionHeading>Marketing Plan</SectionHeading>
      <p className="text-[#A1A1AA] mb-8">Positioning, brand voice, content strategy, and email sequences.</p>

      {/* Positioning */}
      <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl p-6 mb-6">
        <SectionLabel>Positioning Statement</SectionLabel>
        <div className="space-y-1 text-sm">
          {[
            { label: "For", text: "Sales managers and their reps at B2B SaaS companies (5-200 person sales teams)" },
            { label: "Who", text: "Lose deals because reps face objections they've never rehearsed, and ramp new hires for 4-6 months" },
            { label: "SparrRep is", text: "An AI sparring partner that simulates the specific buyer you're about to call" },
            { label: "Unlike", text: "Gong (post-call only), Hyperbound/Second Nature (generic training scenarios)" },
            { label: "Because", text: "It builds that buyer from YOUR call notes and prospect data — you practice tomorrow's call, not a generic one" },
          ].map(p => (
            <div key={p.label} className="flex gap-3">
              <span className="text-[#F59E0B] font-mono text-xs w-20 flex-shrink-0 pt-0.5">{p.label}</span>
              <span className="text-[#A1A1AA]">{p.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Voice */}
      <SectionSubHeading>Brand Voice</SectionSubHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <SectionLabel>Personality Pillars</SectionLabel>
          <ul className="space-y-2">
            {[
              { title: "Respects the pro", desc: "Talks to reps like professionals. No 'Great job!' No confetti. Honest scoring." },
              { title: "Category-creating", desc: "Unapologetic about inventing 'pre-call simulation' as a category." },
              { title: "Sparse on words", desc: "Every sentence earns its place. No filler copy." },
              { title: "Wry, not gimmicky", desc: "Dry wit that acknowledges the absurdity. Not a comedy account." },
            ].map(p => (
              <li key={p.title}>
                <span className="text-[#F59E0B] text-xs font-semibold">{p.title}:</span>
                <span className="text-[#A1A1AA] text-xs ml-1">{p.desc}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <SectionLabel>Key Phrases (use repeatedly)</SectionLabel>
          <ul className="space-y-1">
            {[
              '"Practice on AI. Close on humans."',
              '"The flight simulator for sales reps."',
              '"Your buyer. Before the call."',
              '"Build your buyer in 60 seconds."',
              '"Pre-call simulation" (own this SEO term)',
              '"Stop losing deals to objections you\'ve heard before."',
            ].map(phrase => (
              <li key={phrase} className="text-[#A1A1AA] text-xs font-mono">{phrase}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Divider />

      {/* Content Strategy */}
      <SectionSubHeading>SEO Content Plan</SectionSubHeading>
      <div className="space-y-3 mb-6">
        {[
          { title: "Why Sales Reps Are the Only Professionals Who Practice on Live Customers", kw: "sales training software", len: "1,200 words" },
          { title: "Hyperbound vs. SparrRep: Pre-Call vs. Generic Training", kw: "Hyperbound alternative", len: "1,000 words" },
          { title: "How to Handle the 5 Objections That Kill B2B SaaS Deals", kw: "how to handle objections in sales", len: "2,000 words" },
          { title: "The Real Cost of a 5-Month Sales Ramp", kw: "sales ramp time / sales onboarding", len: "1,500 words" },
          { title: "What Gong Can't Tell You (And What Happens Before the Call)", kw: "Gong alternative / pre-call sales tool", len: "1,000 words" },
          { title: "Building the AI Version of Your Worst Prospect", kw: "AI sales roleplay / sales simulation software", len: "1,200 words" },
        ].map((a, i) => (
          <div key={i} className="flex items-start gap-3 bg-[#111114] border border-[#2A2A30] rounded-lg p-4">
            <span className="font-mono text-[#6B6B75] text-xs w-4 flex-shrink-0">0{i + 1}</span>
            <div className="flex-1">
              <p className="text-[#FAFAFA] text-sm mb-1">{a.title}</p>
              <p className="text-[#6B6B75] text-xs">Keyword: <span className="text-[#F59E0B]">{a.kw}</span> · {a.len}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* Email Sequences */}
      <SectionSubHeading>Email Welcome Sequence</SectionSubHeading>
      <div className="space-y-4 mb-6">
        {[
          {
            day: "Day 0",
            subject: "Your 3 free sparring sessions are ready",
            preview: "Here's the fastest way to use your first one: Click 'Start New Session', paste any notes you have, select the deal stage, click Start..."
          },
          {
            day: "Day 3",
            subject: "Did the AI beat you?",
            preview: "Most first-time users score 2.8-3.2 out of 5 on their first session. The reps who improve fastest practice the same objection 3 sessions in a row..."
          },
          {
            day: "Day 7",
            subject: "One thing the top reps do differently",
            preview: "Reps with scores 4.0+/5.0 consistently all do one thing differently: they practice the call BEFORE they build their deck..."
          },
          {
            day: "Day 14",
            subject: "You've used 2 of 3 sessions",
            preview: "Here's what your data says so far: [DYNAMIC avg score, strongest category, area to work on]. Pro unlocks unlimited sessions..."
          },
        ].map(e => (
          <Card key={e.day} className="border-l-4 border-l-[#F59E0B]">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[#F59E0B]">{e.day}</span>
              <span className="text-[#6B6B75] text-xs">·</span>
              <span className="text-[#A1A1AA] text-xs font-semibold">{e.subject}</span>
            </div>
            <p className="text-[#6B6B75] text-xs">{e.preview}</p>
          </Card>
        ))}
      </div>

      {/* KPIs */}
      <SectionSubHeading>KPIs & Measurement</SectionSubHeading>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#F59E0B]/30">
              <th className="text-left text-[#F59E0B] font-mono py-2 px-3">Metric</th>
              <th className="text-right text-[#F59E0B] font-mono py-2 px-3">Month 1</th>
              <th className="text-right text-[#F59E0B] font-mono py-2 px-3">Month 3</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A30]/50">
            {[
              ["Free signups", "50/mo", "200/mo"],
              ["Session completion rate", "60%", "70%"],
              ["Email open rate", "40%+", "45%+"],
              ["Free → Pro conversion", "3%", "5%"],
              ["LinkedIn post reach", "500+ avg", "2K+ avg"],
              ["Team demo calls booked", "1/week", "3/week"],
            ].map(row => (
              <tr key={row[0]} className="hover:bg-[#111114]/50">
                <td className="py-2 px-3 text-[#A1A1AA]">{row[0]}</td>
                <td className="py-2 px-3 text-right font-mono text-[#A1A1AA]">{row[1]}</td>
                <td className="py-2 px-3 text-right font-mono text-[#F59E0B]">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <DocLink url="https://docs.google.com/document/d/1KyIRn9vmWQGmREf-hPIrX5_jDJkbhXkCJoN5XWwXbnc/edit" label="Full Marketing Plan →" />
      </div>
    </div>
  )
}

function BrandContent() {
  return (
    <div>
      <SectionLabel>Stage 3 — Design</SectionLabel>
      <SectionHeading>Brand & Design Spec</SectionHeading>
      <p className="text-[#A1A1AA] mb-8">Design system, visual identity, and component tokens for SparrRep.</p>

      {/* Design Identity */}
      <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl p-6 mb-6">
        <SectionLabel>Design Identity</SectionLabel>
        <p className="text-[#FAFAFA] text-sm mb-2">
          <span className="text-[#F59E0B]">Bloomberg terminal meets Linear.</span> Industrial/Utilitarian meets Premium Dark Tool.
        </p>
        <p className="text-[#A1A1AA] text-sm">
          Serious, focused, professional. NOT gamified, NOT avatar-based. The amber/gold monospace score display ("3.8/5.0" in large DM Mono on pure dark) creates an immediate "this is a serious tool" impression.
        </p>
      </div>

      {/* Colors */}
      <SectionSubHeading>Color Palette</SectionSubHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { name: "Background", hex: "#0D0D0F", var: "--background" },
          { name: "Surface", hex: "#111114", var: "--surface" },
          { name: "Border", hex: "#2A2A30", var: "--border" },
          { name: "Accent", hex: "#F59E0B", var: "--accent" },
          { name: "Text Primary", hex: "#FAFAFA", var: "--text-primary" },
          { name: "Text Secondary", hex: "#A1A1AA", var: "--text-secondary" },
          { name: "Text Muted", hex: "#6B6B75", var: "--text-muted" },
          { name: "Score High", hex: "#22C55E", var: "--score-high" },
        ].map(c => (
          <div key={c.hex} className="rounded-lg overflow-hidden border border-[#2A2A30]">
            <div className="h-12" style={{ backgroundColor: c.hex }} />
            <div className="p-2 bg-[#111114]">
              <p className="text-[#FAFAFA] text-xs font-semibold">{c.name}</p>
              <p className="text-[#6B6B75] font-mono text-xs">{c.hex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Semantic colors */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { name: "Destructive", hex: "#EF4444" },
          { name: "Success", hex: "#22C55E" },
          { name: "Warning/Accent", hex: "#F59E0B" },
        ].map(c => (
          <div key={c.hex} className="flex items-center gap-2 bg-[#111114] border border-[#2A2A30] rounded-lg p-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: c.hex }} />
            <span className="text-[#A1A1AA] text-xs">{c.name}</span>
            <span className="text-[#6B6B75] font-mono text-xs ml-auto">{c.hex}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Typography */}
      <SectionSubHeading>Typography</SectionSubHeading>
      <div className="space-y-4 mb-6">
        <Card>
          <div className="flex items-start justify-between mb-3">
            <div>
              <SectionLabel>Display Font</SectionLabel>
              <p className="text-[#FAFAFA] font-semibold">DM Serif Display</p>
              <p className="text-[#6B6B75] text-xs">Headlines, hero text, pitch deck titles</p>
            </div>
          </div>
          <p className="text-4xl text-[#FAFAFA]" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            Practice on AI.
          </p>
        </Card>
        <Card>
          <div className="flex items-start justify-between mb-3">
            <div>
              <SectionLabel>Body Font</SectionLabel>
              <p className="text-[#FAFAFA] font-semibold">DM Sans</p>
              <p className="text-[#6B6B75] text-xs">UI copy, paragraphs, buttons</p>
            </div>
          </div>
          <p className="text-[#FAFAFA] text-base">
            AI pre-call simulation for B2B sales reps. Build your specific buyer from your call notes in 60 seconds.
          </p>
        </Card>
        <Card>
          <div className="flex items-start justify-between mb-3">
            <div>
              <SectionLabel>Mono Font</SectionLabel>
              <p className="text-[#FAFAFA] font-semibold">DM Mono</p>
              <p className="text-[#6B6B75] text-xs">Scores, stats, data, code snippets</p>
            </div>
          </div>
          <p className="text-[#F59E0B] text-4xl font-mono font-bold">3.8/5.0</p>
          <p className="text-[#6B6B75] font-mono text-sm mt-1">$29,300 MRR · Month 12</p>
        </Card>
      </div>

      <Divider />

      {/* Type Scale */}
      <SectionSubHeading>Type Scale</SectionSubHeading>
      <div className="space-y-2 mb-6">
        {[
          { size: "80px", label: "Hero Headline (landing page)", class: "text-5xl" },
          { size: "48px", label: "Section Headlines", class: "text-4xl" },
          { size: "32px", label: "Page Subheadings", class: "text-2xl" },
          { size: "20px", label: "Section Sublines", class: "text-xl" },
          { size: "16px", label: "Primary Body", class: "text-base" },
          { size: "14px", label: "Secondary Body, Labels", class: "text-sm" },
          { size: "12px", label: "Micro Labels, Captions", class: "text-xs" },
        ].map(t => (
          <div key={t.size} className="flex items-center gap-4 bg-[#111114] border border-[#2A2A30] rounded-lg p-3">
            <span className="font-mono text-[#6B6B75] text-xs w-12 flex-shrink-0">{t.size}</span>
            <span className={`text-[#FAFAFA] flex-1 ${t.class}`} style={{ fontFamily: t.size === "80px" ? '"DM Serif Display"' : undefined }}>
              SparrRep
            </span>
            <span className="text-[#6B6B75] text-xs hidden md:block">{t.label}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Spacing */}
      <SectionSubHeading>Spacing & Layout</SectionSubHeading>
      <Card className="mb-6">
        <div className="grid grid-cols-2 gap-4 text-xs text-[#A1A1AA]">
          {[
            { label: "Base unit", val: "4px" },
            { label: "Section padding", val: "80px (desktop) · 48px (mobile)" },
            { label: "Container max-width", val: "1200px" },
            { label: "Container padding", val: "0 24px (desktop) · 0 16px (mobile)" },
            { label: "Card padding", val: "24px (desktop) · 16px (mobile)" },
            { label: "Card gap", val: "16px" },
            { label: "Border radius (small)", val: "6px — inputs, badges" },
            { label: "Border radius (medium)", val: "10px — cards, buttons" },
            { label: "Border radius (large)", val: "16px — modal, large cards" },
          ].map(s => (
            <div key={s.label}>
              <span className="text-[#6B6B75]">{s.label}: </span>
              <span className="text-[#F59E0B] font-mono">{s.val}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6">
        <DocLink url="https://docs.google.com/document/d/1cYrrL7Q7sCzOHcYB4gngMfDmGr-xitoqcYfn8IkPmfQ/edit" label="Full Brand Spec →" />
      </div>
    </div>
  )
}

function PitchContent() {
  const slides = [
    { num: "01", title: "Title", desc: "SparrRep · 'Practice on AI. Close on humans.' · AI pre-call simulation for B2B sales reps" },
    { num: "02", title: "Problem", desc: "The only profession that trains on live customers. 4-6 month ramp times. $40K deals lost to preventable objections." },
    { num: "03", title: "The Gap", desc: "Gong tells you what went wrong. After the deal is gone. Nobody does pre-call. SparrRep does." },
    { num: "04", title: "Solution", desc: "The flight simulator for sales. Paste notes → Meet your buyer → Spar → 60 seconds to first session." },
    { num: "05", title: "Product", desc: "Full-width UI demo. Buyer summary built from notes. Real-time score badge. Text-based conversation." },
    { num: "06", title: "Traction", desc: "Search signals: 5,400 monthly searches for sales coaching software. +116% growth in sales enablement platform keyword." },
    { num: "07", title: "Market", desc: "$7B TAM · $900M SAM · $1-3M ARR SOM (Year 1-2). $12.8B projected by 2028." },
    { num: "08", title: "Business Model", desc: "Free ($0/3 sessions) → Pro ($49/user/mo) → Team ($39/user/mo min 5). LTV:CAC ~12x." },
    { num: "09", title: "Competition", desc: "Pre-call simulation ✅ · Specific prospect mode ✅ · 60-second setup ✅ · Rep-initiated ✅ · Free tier ✅" },
    { num: "10", title: "GTM", desc: "Phase 1: Reddit seeding. Phase 2: Momentum + Product Hunt prep. Phase 3: PH Launch → Top 5." },
    { num: "11", title: "The Ask", desc: "Looking for: Early adopters · Team pilots · Distribution partners · Pre-seed ($200K-$500K)" },
    { num: "12", title: "Closing", desc: '"Practice on AI. Close on humans." — sparrep.ashketing.com' },
  ]
  return (
    <div>
      <SectionLabel>Stage 8b — Pitch Deck</SectionLabel>
      <SectionHeading>Pitch Deck</SectionHeading>
      <p className="text-[#A1A1AA] mb-8">12-slide investor pitch deck. Interactive HTML version available at /pitch.</p>

      <div className="mb-6">
        <Link
          href="/pitch"
          className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#0D0D0F] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#FBBF24] transition-colors"
        >
          <PresentationIcon className="w-4 h-4" />
          View Interactive Pitch Deck
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <Divider />

      <SectionSubHeading>Slide Summary</SectionSubHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {slides.map(s => (
          <div key={s.num} className="flex gap-3 bg-[#111114] border border-[#2A2A30] rounded-lg p-4">
            <span className="font-mono text-[#F59E0B] text-xs w-6 flex-shrink-0">{s.num}</span>
            <div>
              <p className="text-[#FAFAFA] text-sm font-semibold mb-1">{s.title}</p>
              <p className="text-[#6B6B75] text-xs leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <DocLink url="https://docs.google.com/document/d/1wBgv2lQX0HZPonxmjFFkdZTADAO8JQc5BOFfh4xfU5U/edit" label="Pitch Deck Content Doc →" />
      </div>
    </div>
  )
}

// ─── Section Content Map ───────────────────────────────────────────────────────

const CONTENT_MAP: Record<SectionId, React.ReactNode> = {
  research: <ResearchContent />,
  gtm: <GTMContent />,
  marketing: <MarketingContent />,
  brand: <BrandContent />,
  pitch: <PitchContent />,
}

// ─── Main Docs Component ───────────────────────────────────────────────────────

export default function DocsPage() {
  const [active, setActive] = useState<SectionId>("research")
  const [mobileOpen, setMobileOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  function navigate(id: SectionId) {
    setActive(id)
    setMobileOpen(false)
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="h-screen flex flex-col bg-[#0D0D0F] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-[#2A2A30] flex-shrink-0 bg-[#0D0D0F]/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#6B6B75] hover:text-[#FAFAFA] mr-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center justify-center w-6 h-6 rounded bg-[#F59E0B] text-[#0D0D0F]">
            <Zap className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-[#FAFAFA] font-semibold text-sm">SparrRep</span>
            <span className="text-[#6B6B75] text-xs ml-2">Documentation Hub</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#6B6B75] hover:text-[#F59E0B] text-xs font-mono transition-colors flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">Live Site</span>
          </Link>
          <Link href="/pitch" className="text-[#6B6B75] hover:text-[#F59E0B] text-xs font-mono transition-colors flex items-center gap-1">
            <PresentationIcon className="w-3 h-3" />
            <span className="hidden sm:inline">Pitch Deck</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden fixed inset-0 z-50 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
              <motion.div
                className="relative w-64 bg-[#111114] border-r border-[#2A2A30] h-full z-10"
                initial={{ x: -64 }}
                animate={{ x: 0 }}
                exit={{ x: -64 }}
              >
                <SidebarContent active={active} onNavigate={navigate} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-56 flex-col border-r border-[#2A2A30] bg-[#111114] flex-shrink-0">
          <SidebarContent active={active} onNavigate={navigate} />
        </aside>

        {/* Content area */}
        <main ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                {CONTENT_MAP[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ active, onNavigate }: { active: SectionId; onNavigate: (id: SectionId) => void }) {
  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 mb-4">
        <p className="text-xs text-[#6B6B75] uppercase tracking-widest font-mono">Documentation</p>
      </div>
      <nav className="flex-1 px-2">
        {SECTIONS.map(s => {
          const Icon = s.icon
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all mb-0.5 ${
                isActive
                  ? "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
                  : "text-[#6B6B75] hover:text-[#A1A1AA] hover:bg-[#0D0D0F]/50"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{s.label}</span>
            </button>
          )
        })}
      </nav>
      <div className="px-4 pt-4 border-t border-[#2A2A30] space-y-2">
        <a
          href="https://sparrep.ashketing.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-[#6B6B75] hover:text-[#F59E0B] transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Live Site
        </a>
        <Link href="/pitch" className="flex items-center gap-2 text-xs text-[#6B6B75] hover:text-[#F59E0B] transition-colors">
          <PresentationIcon className="w-3 h-3" />
          Pitch Deck (/pitch)
        </Link>
      </div>
    </div>
  )
}
