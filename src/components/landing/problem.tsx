"use client"

import { motion } from "framer-motion"
import { Clock, TrendingDown, RotateCcw } from "lucide-react"

const problems = [
  {
    icon: Clock,
    title: "Every new objection is live training",
    description:
      "When a prospect says 'we're going with your competitor' for the first time, a rep's only option is to figure it out in the moment — while the deal slips away.",
  },
  {
    icon: TrendingDown,
    title: "Ramp time is killing your revenue",
    description:
      "It takes 4-6 months for a new B2B sales rep to hit quota. Most of that time is spent learning what NOT to say on calls they've already had.",
  },
  {
    icon: RotateCcw,
    title: "Post-call review is too late",
    description:
      "Gong tells you what went wrong. Coaching tells you in hindsight. Neither gives you 30 minutes to practice the same call before it actually happens.",
  },
]

export function Problem() {
  return (
    <section className="py-20 sm:py-28 border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F9FAFB] leading-tight mb-4">
            You&apos;re rehearsing on real deals.
            <br />
            That&apos;s the problem.
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-lg leading-relaxed">
            Pilots log 1,500 hours before touching a commercial aircraft. Surgeons train on cadavers. Athletes run plays
            before game day. And your reps? They face their first CFO objection in a live deal with 50K on the line.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-xl border border-[#1F2937] bg-[#0D0D0F] hover:border-[#F59E0B]/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1F2937] flex items-center justify-center mb-4 group-hover:bg-[#F59E0B]/10 transition-colors">
                <problem.icon className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <h3 className="font-semibold text-[#F9FAFB] mb-2 text-base">{problem.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
