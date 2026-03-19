"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F9FAFB 1px, transparent 1px), linear-gradient(to bottom, #F9FAFB 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Amber glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              Now in beta — 500+ reps practicing
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal text-[#F9FAFB] leading-[1.1] tracking-tight mb-6"
          >
            Practice the call
            <br />
            <span className="text-[#F59E0B]">before it matters.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Every other profession uses simulators. Sales reps practice on real prospects — and lose real deals.
            Prepitch changes that. Build your specific buyer in 60 seconds. Walk in ready.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold text-base px-8 h-12 glow-amber"
              >
                Start Sparring Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                variant="ghost"
                size="lg"
                className="text-[#6B7280] hover:text-[#F9FAFB] text-base h-12"
              >
                See how it works
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-xs text-[#6B7280]"
          >
            3 free sessions included. No credit card required.
          </motion.p>
        </div>

        {/* Product Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-xl border border-[#1F2937] overflow-hidden shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111318] border-b border-[#1F2937]">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]/70" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]/70" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]/70" />
                <span className="ml-2 text-xs text-[#6B7280] font-mono">sparrep.ashketing.com/session</span>
              </div>
              <Image
                src="/images/hero-illustration.png"
                alt="SparrRep session interface"
                width={1200}
                height={700}
                className="w-full"
                priority
              />
            </div>
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D0D0F] to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
