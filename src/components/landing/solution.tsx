"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const steps = [
  { label: "Your Notes", desc: "Paste anything you know about the prospect" },
  { label: "AI Buyer", desc: "Specific simulation built from your data" },
  { label: "Sparring Session", desc: "Roleplay the call in real time" },
  { label: "Scorecard", desc: "Specific feedback on every exchange" },
]

export function Solution() {
  return (
    <section className="py-20 sm:py-28 border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-3">The Solution</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F9FAFB] leading-tight mb-6">
              The flight simulator.
              <br />
              <span className="text-[#F59E0B]">For sales.</span>
            </h2>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
              Prepitch builds an AI simulation of your specific upcoming prospect — from your call notes, emails, and
              their LinkedIn profile. Then you practice the 30-minute call until you stop folding.
            </p>
            <p className="text-[#F9FAFB] text-base font-medium leading-relaxed">
              Not generic. Not a training module. Not a random sales persona someone else configured.
              <span className="text-[#F59E0B]"> YOUR buyer. Before YOUR call.</span>
            </p>
          </motion.div>

          {/* Flow visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg border border-[#F59E0B]/40 bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] font-mono text-sm font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-8 bg-gradient-to-b from-[#F59E0B]/20 to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="p-4 rounded-lg border border-[#1F2937] bg-[#111318] hover:border-[#F59E0B]/20 transition-colors">
                      <p className="font-semibold text-[#F9FAFB] text-sm mb-1">{step.label}</p>
                      <p className="text-[#6B7280] text-xs">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
