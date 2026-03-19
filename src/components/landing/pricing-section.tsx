"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Minus } from "lucide-react"

const plans = [
  {
    name: "Starter",
    subtitle: "Free",
    price: { monthly: 0, annual: 0 },
    description: "See if it works before you commit.",
    cta: "Start for free",
    ctaHref: "/signup",
    highlight: false,
    features: [
      { text: "3 practice sessions/month", included: true },
      { text: "Persona builder (full access)", included: true },
      { text: "Basic scoring (overall score only)", included: true },
      { text: "Session history (last 3)", included: true },
      { text: "Text-based roleplay", included: true },
      { text: "Full scoring breakdown", included: false },
      { text: "Progress tracking", included: false },
      { text: "Unlimited session history", included: false },
      { text: "Session notes", included: false },
    ],
  },
  {
    name: "Sparring Pro",
    subtitle: "Most Popular",
    price: { monthly: 49, annual: 39 },
    description: "For reps who take every call seriously.",
    cta: "Start Pro",
    ctaHref: "/signup?plan=pro",
    highlight: true,
    features: [
      { text: "Unlimited sessions", included: true },
      { text: "Persona builder (full access)", included: true },
      { text: "Full scoring breakdown (all 5 categories)", included: true },
      { text: "Transcript annotations", included: true },
      { text: "Progress tracking (score trends)", included: true },
      { text: "Unlimited session history", included: true },
      { text: "Try again with same buyer", included: true },
      { text: "Session notes", included: true },
      { text: "Voice mode (coming soon)", included: true },
    ],
  },
  {
    name: "Team",
    subtitle: "Custom pricing",
    price: { monthly: null, annual: null },
    description: "For sales teams that want to win together.",
    cta: "Contact us",
    ctaHref: "/contact",
    highlight: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Manager dashboard", included: true },
      { text: "Team leaderboard", included: true },
      { text: "Assign scenarios to reps", included: true },
      { text: "Bulk onboarding", included: true },
      { text: "Priority Slack support", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated CSM", included: true },
      { text: "SLA", included: true },
    ],
  },
]

export function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="py-20 sm:py-28 border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F9FAFB] leading-tight mb-4">
            Pay for what you actually use.
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto mb-8">
            Three free sessions to see if it works. Pro unlocks everything.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-lg bg-[#111318] border border-[#1F2937]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                !annual ? "bg-[#1F2937] text-[#F9FAFB]" : "text-[#6B7280] hover:text-[#F9FAFB]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                annual ? "bg-[#1F2937] text-[#F9FAFB]" : "text-[#6B7280] hover:text-[#F9FAFB]"
              }`}
            >
              Annual
              <span className="ml-2 text-xs text-[#F59E0B]">2 months free</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-6 rounded-xl border flex flex-col ${
                plan.highlight
                  ? "border-[#F59E0B]/50 bg-[#F59E0B]/5 glow-amber"
                  : "border-[#1F2937] bg-[#111318]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[#F59E0B] text-[#0D0D0F] text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider mb-1">{plan.subtitle}</p>
                <h3 className="font-display text-xl text-[#F9FAFB] mb-2">{plan.name}</h3>
                <div className="mb-3">
                  {plan.price.monthly !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-4xl font-semibold text-[#F9FAFB]">
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-[#6B7280] text-sm">/user/month</span>
                      )}
                    </div>
                  ) : (
                    <span className="font-mono text-2xl text-[#6B7280]">Custom</span>
                  )}
                  {annual && plan.price.monthly !== null && plan.price.monthly > 0 && (
                    <p className="text-xs text-[#F59E0B] mt-1">
                      Billed ${(plan.price.annual! * 12).toLocaleString()}/year
                    </p>
                  )}
                </div>
                <p className="text-[#6B7280] text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    ) : (
                      <Minus className="w-4 h-4 text-[#6B7280]/40 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-[#F9FAFB]" : "text-[#6B7280]/50"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.ctaHref}>
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? "bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold"
                      : "bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB]"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
