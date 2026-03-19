"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 border-t border-[#1F2937]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-[#F59E0B]/10 rounded-full blur-3xl" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F9FAFB] leading-tight mb-6">
            Your next call just
            <br />
            <span className="text-[#F59E0B]">got easier.</span>
          </h2>

          <p className="text-[#6B7280] text-lg mb-10 max-w-xl mx-auto">
            Three free sessions. No credit card. Build your first buyer in 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold text-base px-8 h-12 glow-amber"
              >
                Start Sparring Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-xs text-[#6B7280]">
            3 free sessions included. Then $49/user/month. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
