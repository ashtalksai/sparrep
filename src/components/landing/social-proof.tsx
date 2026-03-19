"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "I had a call with a skeptical CFO at a 200-person fintech. Used Prepitch the night before to practice budget objections. She raised every objection I'd already handled in the sim. Closed the deal.",
    name: "Marcus T.",
    title: "Account Executive, Series B SaaS",
  },
  {
    quote:
      "We used to have Hyperbound but the setup took two weeks and reps needed manager approval for every scenario. Prepitch: rep opens it, pastes their notes, and they're in a session in a minute. My team uses it before every big call now.",
    name: "Rachel K.",
    title: "VP of Sales, HR Tech startup",
  },
  {
    quote:
      "The scoring is the best part. Not just 'you did well.' It pulls actual moments from the transcript and says 'here, when she said X and you said Y — that's where you lost her.' That's the coaching I couldn't get anywhere else.",
    name: "Devon O.",
    title: "Senior SDR, Enterprise SaaS",
  },
]

const stats = [
  { value: "500+", label: "reps in beta" },
  { value: "3.8×", label: "higher objection handling scores after 10 sessions" },
  { value: "60s", label: "average setup time per session" },
]

export function SocialProof() {
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
          <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-3">Social Proof</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#F9FAFB] leading-tight">
            Reps who practice, win.
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-6 rounded-xl border border-[#1F2937] bg-[#111318]"
            >
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#F59E0B] mb-2">{stat.value}</div>
              <div className="text-[#6B7280] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-[#1F2937] bg-[#111318]"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-[#F59E0B] text-sm">★</span>
                ))}
              </div>
              <p className="text-[#F9FAFB] text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-[#F9FAFB] text-sm font-semibold">{t.name}</p>
                <p className="text-[#6B7280] text-xs mt-0.5">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
