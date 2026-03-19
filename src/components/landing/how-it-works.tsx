"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Build Your Buyer",
    description:
      "Paste your call notes, emails, or any context you have on the prospect. Add their LinkedIn URL for a sharper simulation. Choose the deal stage and the objections you want to practice. Takes 60 seconds.",
    image: "/images/feature-1.png",
  },
  {
    number: "02",
    title: "Start the Session",
    description:
      "Prepitch shows you a buyer summary — personality, buying style, objection triggers. When you're ready, click Start Sparring. Your AI buyer is in character immediately.",
    image: "/images/feature-2.png",
  },
  {
    number: "03",
    title: "Get Your Scorecard",
    description:
      "End the session and get a full breakdown: discovery quality, objection handling, urgency creation, next steps secured. Specific moments from the transcript where you won — and lost — the deal.",
    image: "/images/feature-3.png",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F9FAFB] leading-tight mb-4">
            Three steps. One better call.
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            No setup week. No admin configuration. Just paste your notes and spar.
          </p>
        </motion.div>

        <div className="space-y-16 sm:space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-3xl font-semibold text-[#F59E0B]/40">{step.number}</span>
                  <div className="h-px flex-1 bg-[#1F2937]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#F9FAFB] mb-4">{step.title}</h3>
                <p className="text-[#6B7280] text-base leading-relaxed">{step.description}</p>
              </div>

              <div className={`rounded-xl border border-[#1F2937] overflow-hidden bg-[#111318] ${i % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
