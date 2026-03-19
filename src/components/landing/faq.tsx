"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Is this like Hyperbound or Second Nature?",
    a: "Not really. Hyperbound is built for cold call drills, configured by your team admin. Second Nature uses video avatars and generic templates. Prepitch is for you — the rep — who has a SPECIFIC call tomorrow and wants to practice THAT buyer, not a random archetype. You set it up yourself in 60 seconds. No admin. No avatars.",
  },
  {
    q: "Will the AI buyer actually sound like my prospect?",
    a: "Close enough to train on. The more context you give (notes, emails, LinkedIn), the sharper the simulation. The AI won't know their exact life story, but it will model their communication style, deal stage psychology, and the types of objections a buyer in their role and situation typically raises. Reps consistently say \"it was harder than the real call\" — which is exactly what you want from a simulator.",
  },
  {
    q: "What if my prospect is unusual or in a niche industry?",
    a: "The persona builder lets you describe anything — industry-specific context, unusual buying dynamics, cultural communication style. The more you describe, the more accurate the buyer. The AI adapts to what you feed it, not a fixed template library.",
  },
  {
    q: "I'm a manager — can I use this for my whole team?",
    a: "Yes. The Team plan gives you a manager dashboard where you can see your reps' session scores and trends. You can also assign scenarios to reps (coming soon in Phase 2). Most managers start by having each rep use Prepitch individually (Pro plan) and upgrade to Team when they see the data.",
  },
  {
    q: "What data do you store from my sessions?",
    a: "Your session transcripts and scores are stored securely and are only accessible to you (and your manager, on Team plans). We don't use your session data to train models — your conversations with AI buyers are private. Full details in our Privacy Policy.",
  },
  {
    q: "Does it work for voice calls, not just text?",
    a: "Text-based in the MVP — which reps actually prefer because it forces you to think through exactly what you're saying. Voice mode is on the roadmap (coming in Phase 2). When it launches, Pro users get it automatically.",
  },
  {
    q: "What if I have a call in 20 minutes and need to prep fast?",
    a: "That's exactly who Prepitch is for. Paste your most recent email thread, select the call stage, and you can be in a session in under 2 minutes. A 10-minute sprint with your AI buyer is worth more than 10 minutes of pacing.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 sm:py-28 border-t border-[#1F2937]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F9FAFB] leading-tight">
            Common questions
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border border-[#1F2937] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#111318] transition-colors"
              >
                <span className="text-[#F9FAFB] text-sm font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7280] shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-[#6B7280] text-sm leading-relaxed border-t border-[#1F2937] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
