import Link from "next/link"
import { Zap, FileText, TrendingUp, Megaphone, Palette, PresentationIcon } from "lucide-react"

export const metadata = {
  title: "Docs — SparrRep",
}

const sections = [
  {
    id: "research",
    icon: FileText,
    label: "Research",
    desc: "Market analysis, ICP research, competitive landscape",
    href: "https://docs.google.com/document/d/1U9SLKBnDN7lNTw_6Xs58nOjGjoRw26XXn53V5__UVFg/edit",
  },
  {
    id: "gtm",
    icon: TrendingUp,
    label: "GTM Plan",
    desc: "Go-to-market strategy, channels, launch sequence",
    href: "#",
  },
  {
    id: "marketing",
    icon: Megaphone,
    label: "Marketing Plan",
    desc: "Content strategy, paid acquisition, SEO, social",
    href: "#",
  },
  {
    id: "brand",
    icon: Palette,
    label: "Brand Spec",
    desc: "Design system, typography, colors, component library",
    href: "https://docs.google.com/document/d/1cYrrL7Q7sCzOHcYB4gngMfDmGr-xitoqcYfn8IkPmfQ/edit",
  },
  {
    id: "pitch",
    icon: PresentationIcon,
    label: "Pitch Deck",
    desc: "Investor presentation, key slides, supporting data",
    href: "/deck",
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#F59E0B] text-[#0D0D0F]">
            <Zap className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-display text-2xl text-[#F9FAFB]">SparrRep Docs</h1>
            <p className="text-[#6B7280] text-xs">Product documentation hub</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={section.href}
              target={section.href.startsWith("http") ? "_blank" : undefined}
              rel={section.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group p-5 rounded-xl border border-[#1F2937] bg-[#111318] hover:border-[#F59E0B]/25 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1F2937] flex items-center justify-center mb-4 group-hover:bg-[#F59E0B]/10 transition-colors">
                <section.icon className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <h2 className="font-semibold text-[#F9FAFB] text-sm mb-1">{section.label}</h2>
              <p className="text-[#6B7280] text-xs leading-relaxed">{section.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
          <h2 className="font-semibold text-[#F9FAFB] text-sm mb-2">Product Enrichment</h2>
          <p className="text-[#6B7280] text-xs mb-3">Full copy, page specs, and product definition from @strategist</p>
          <a
            href="https://docs.google.com/document/d/1zuIfNjJijgnUEezZg2x4p92o-9oQ4OWFam8MNr-sf-o/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F59E0B] text-xs hover:underline"
          >
            Open in Google Docs →
          </a>
        </div>
      </div>
    </div>
  )
}
