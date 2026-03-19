"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: "title",
    label: "Title",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F59E0B] text-[#0D0D0F] mb-6">
          <Zap className="w-8 h-8" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-5xl sm:text-7xl text-[#F9FAFB] mb-4">SparrRep</h1>
        <p className="text-2xl text-[#F59E0B] font-light mb-8">Practice the call before it matters.</p>
        <p className="text-[#6B7280] max-w-md text-lg">AI sparring partner for B2B sales reps. Build your specific buyer in 60 seconds.</p>
      </div>
    ),
  },
  {
    id: "problem",
    label: "Problem",
    content: (
      <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
        <p className="text-xs text-[#F59E0B] uppercase tracking-widest font-semibold mb-6">The Problem</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#F9FAFB] mb-10">
          Sales is the only profession that practices on live customers.
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { role: "Pilots", detail: "1,500 hours in simulators before first flight" },
            { role: "Surgeons", detail: "Years of cadaver training before live patients" },
            { role: "Sales reps", detail: "First CFO objection with $50K on the line" },
          ].map((item) => (
            <div key={item.role} className="p-4 rounded-xl border border-[#1F2937] bg-[#111318]">
              <p className="font-semibold text-[#F9FAFB] mb-2">{item.role}</p>
              <p className="text-[#6B7280] text-sm">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "solution",
    label: "Solution",
    content: (
      <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
        <p className="text-xs text-[#F59E0B] uppercase tracking-widest font-semibold mb-6">The Solution</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#F9FAFB] mb-6">
          AI simulation of your specific upcoming buyer.
        </h2>
        <p className="text-[#6B7280] text-xl mb-10">
          Not generic. Not a training module. YOUR buyer. Before YOUR call.
        </p>
        <div className="flex gap-6">
          {["Paste notes", "AI builds buyer", "Spar", "Get scored"].map((step, i) => (
            <div key={step} className="flex-1 text-center">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center mx-auto mb-2 font-mono text-sm font-bold">{i + 1}</div>
              <p className="text-[#F9FAFB] text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "market",
    label: "Market",
    content: (
      <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
        <p className="text-xs text-[#F59E0B] uppercase tracking-widest font-semibold mb-6">Market</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#F9FAFB] mb-10">
          $9.6B sales training market. Growing 12% YoY.
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { stat: "5M+", label: "B2B sales reps in the US alone" },
            { stat: "4-6mo", label: "Average ramp time for new AEs" },
            { stat: "$40K", label: "Average cost per failed hire" },
          ].map((item) => (
            <div key={item.stat} className="p-4 rounded-xl border border-[#1F2937] bg-[#111318] text-center">
              <p className="font-mono text-3xl font-semibold text-[#F59E0B] mb-1">{item.stat}</p>
              <p className="text-[#6B7280] text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "pricing",
    label: "Business Model",
    content: (
      <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
        <p className="text-xs text-[#F59E0B] uppercase tracking-widest font-semibold mb-6">Business Model</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#F9FAFB] mb-10">
          Freemium → $49/user/month → Enterprise
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { plan: "Free", price: "$0", detail: "3 sessions/month — hooks reps in self-serve motion" },
            { plan: "Pro", price: "$49/mo", detail: "Unlimited sessions + full scoring + history" },
            { plan: "Team", price: "Custom", detail: "Manager dashboard + team analytics + bulk onboarding" },
          ].map((item) => (
            <div key={item.plan} className="p-4 rounded-xl border border-[#1F2937] bg-[#111318]">
              <p className="text-[#F59E0B] font-semibold mb-1">{item.plan}</p>
              <p className="font-mono text-xl text-[#F9FAFB] mb-2">{item.price}</p>
              <p className="text-[#6B7280] text-xs">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "traction",
    label: "Traction",
    content: (
      <div className="flex flex-col justify-center h-full max-w-3xl mx-auto">
        <p className="text-xs text-[#F59E0B] uppercase tracking-widest font-semibold mb-6">Traction</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#F9FAFB] mb-10">
          500+ reps in beta. Reps say it&apos;s harder than the real call.
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { stat: "500+", label: "Beta users" },
            { stat: "3.8×", label: "Improvement in objection handling after 10 sessions" },
            { stat: "< 2min", label: "Average setup time per session" },
            { stat: "NPS: 71", label: "Net Promoter Score from beta cohort" },
          ].map((item) => (
            <div key={item.stat} className="p-4 rounded-xl border border-[#1F2937] bg-[#111318]">
              <p className="font-mono text-3xl font-semibold text-[#F59E0B] mb-1">{item.stat}</p>
              <p className="text-[#6B7280] text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "cta",
    label: "CTA",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F59E0B] text-[#0D0D0F] mb-6">
          <Zap className="w-8 h-8" strokeWidth={2.5} />
        </div>
        <h2 className="font-display text-5xl text-[#F9FAFB] mb-4">Let&apos;s talk.</h2>
        <p className="text-[#6B7280] text-xl mb-8">Practice the call before it matters.</p>
        <Link href="/signup" className="px-8 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold rounded-lg transition-colors inline-block">
          Start Sparring Free →
        </Link>
      </div>
    ),
  },
]

export default function DeckPage() {
  const [current, setCurrent] = useState(0)

  function prev() {
    setCurrent((c) => Math.max(0, c - 1))
  }
  function next() {
    setCurrent((c) => Math.min(slides.length - 1, c + 1))
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === " ") next()
    if (e.key === "ArrowLeft") prev()
  }

  return (
    <div
      className="min-h-screen bg-[#0D0D0F] flex flex-col"
      onKeyDown={handleKey}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 p-8 sm:p-16"
          >
            {slides[current].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-8 py-4 border-t border-[#1F2937]">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#F9FAFB] disabled:opacity-30 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        {/* Slide dots */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-200 rounded-full ${
                i === current
                  ? "w-4 h-2 bg-[#F59E0B]"
                  : "w-2 h-2 bg-[#1F2937] hover:bg-[#374151]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#F9FAFB] disabled:opacity-30 transition-colors text-sm"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center pb-2 text-xs text-[#6B7280]/40">
        {current + 1} / {slides.length} · Use arrow keys to navigate
      </div>
    </div>
  )
}
