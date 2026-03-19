"use client"

import { motion } from "framer-motion"
import { Zap, GitBranch, BarChart2, TrendingUp, User, Lock } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Zap,
    title: "60-Second Persona Setup",
    description:
      "Paste your call notes and a LinkedIn URL. Prepitch builds your buyer's personality, objection style, and communication patterns — instantly.",
    image: "/images/feature-1.png",
  },
  {
    icon: GitBranch,
    title: "Deal-Stage Aware Roleplay",
    description:
      "Cold intro. Champion gone quiet. Procurement stall. Renewal. Each stage has different psychology — your AI buyer plays it authentically.",
    image: "/images/feature-2.png",
  },
  {
    icon: BarChart2,
    title: "Objection Scoring That Actually Helps",
    description:
      "After each session: where you caved, where you recovered, and what you should have said instead. Specific feedback, not generic coaching tips.",
    image: "/images/feature-3.png",
  },
  {
    icon: TrendingUp,
    title: "Improve Over Time",
    description:
      "Track your objection handling score across sessions. See exactly which objection categories you consistently lose — and practice those.",
  },
  {
    icon: User,
    title: "Rep-Initiated (Not Manager-Assigned)",
    description:
      "Opens when you're prepping for a call you're nervous about. Not when IT sends you a training module.",
  },
  {
    icon: Lock,
    title: "Fast. Private. Professional.",
    description:
      "Text-based (no awkward video avatars). Works in a browser. No plugin, no download, no setup week with a CSM.",
  },
]

export function Features() {
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
          <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-3">Features</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F9FAFB] leading-tight mb-4">
            Built for reps who take
            <br />
            their craft seriously.
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            Not gamified. Not avatar-based. Not a 2-week setup.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-6 rounded-xl border border-[#1F2937] bg-[#111318] hover:border-[#F59E0B]/25 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1F2937] flex items-center justify-center mb-4 group-hover:bg-[#F59E0B]/10 transition-colors">
                <feature.icon className="w-4.5 h-4.5 text-[#F59E0B]" size={18} />
              </div>
              <h3 className="font-semibold text-[#F9FAFB] text-sm mb-2">{feature.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
