"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ArrowRight, ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"

const DEAL_STAGES = [
  "Cold intro",
  "Discovery",
  "Demo follow-up",
  "Pricing",
  "Procurement",
  "Champion gone quiet",
  "Renewal",
  "Other",
]

const OBJECTION_CATEGORIES = [
  "Budget",
  "Authority",
  "Timing",
  "Need",
  "Competition",
  "Champion gone quiet",
  "Procurement stall",
  "Other",
]

interface BuyerPersonaSummary {
  personality: string
  buyingStyle: string
  topObjections: string[]
  redFlags: string
  openingMood: string
}

export default function NewSessionPage() {
  const router = useRouter()
  const [step, setStep] = useState<"form" | "review">("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [personaSummary, setPersonaSummary] = useState<BuyerPersonaSummary | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  const [form, setForm] = useState({
    prospectName: "",
    companyName: "",
    linkedinUrl: "",
    dealStage: "Discovery",
    notes: "",
    objectionCategories: [] as string[],
    sessionLength: 15,
  })

  function toggleObjection(cat: string) {
    setForm((prev) => ({
      ...prev,
      objectionCategories: prev.objectionCategories.includes(cat)
        ? prev.objectionCategories.filter((c) => c !== cat)
        : [...prev.objectionCategories, cat],
    }))
  }

  async function handleGeneratePersona(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Generate buyer persona
      const personaRes = await fetch("/api/persona/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospectName: form.prospectName,
          companyName: form.companyName,
          linkedinUrl: form.linkedinUrl,
          notes: form.notes,
          dealStage: form.dealStage,
          objectionCategories: form.objectionCategories,
        }),
      })
      const persona = await personaRes.json()
      setPersonaSummary(persona)

      // Create session
      const sessionRes = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospectName: form.prospectName,
          companyName: form.companyName,
          linkedinUrl: form.linkedinUrl,
          dealStage: form.dealStage,
          objectionCategory: form.objectionCategories,
          sessionLength: form.sessionLength,
          notes: form.notes,
        }),
      })
      const sessionData = await sessionRes.json()

      if (!sessionRes.ok) {
        setError(sessionData.error || "Failed to create session")
        setLoading(false)
        return
      }

      setSessionId(sessionData.id)
      setStep("review")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (step === "review" && personaSummary && sessionId) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <p className="text-xs text-[#F59E0B] font-semibold uppercase tracking-widest mb-2">Buyer Summary</p>
          <h1 className="font-display text-3xl text-[#F9FAFB] mb-1">
            Your Buyer: {form.prospectName}
          </h1>
          <p className="text-[#6B7280] text-sm">{form.companyName} · {form.dealStage}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
            <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Personality</h3>
            <p className="text-[#F9FAFB] text-sm leading-relaxed">{personaSummary.personality}</p>
          </div>

          <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
            <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Buying Style</h3>
            <p className="text-[#F9FAFB] text-sm leading-relaxed">{personaSummary.buyingStyle}</p>
          </div>

          <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
            <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Top Objections She'll Raise</h3>
            <ul className="space-y-1.5">
              {personaSummary.topObjections?.map((obj: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#F9FAFB]">
                  <span className="text-[#F59E0B] shrink-0">·</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
            <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Red Flags to Watch</h3>
            <p className="text-[#F9FAFB] text-sm leading-relaxed">{personaSummary.redFlags}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => setStep("form")}
            className="text-[#6B7280] hover:text-[#F9FAFB]"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Edit
          </Button>
          <Button
            onClick={() => router.push(`/session/${sessionId}`)}
            className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold"
          >
            Start Sparring →
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#F9FAFB] text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <p className="text-xs text-[#F59E0B] font-semibold uppercase tracking-widest mb-2">New Session</p>
        <h1 className="font-display text-3xl text-[#F9FAFB] mb-2">Build your buyer</h1>
        <p className="text-[#6B7280] text-sm">
          Paste everything you know. The more context, the sharper the simulation.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleGeneratePersona} className="space-y-6">
        {/* Prospect info */}
        <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318] space-y-4">
          <h2 className="text-sm font-semibold text-[#F9FAFB]">Who are you meeting?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[#6B7280] text-xs">Prospect name</Label>
              <Input
                id="name"
                value={form.prospectName}
                onChange={(e) => setForm({ ...form, prospectName: e.target.value })}
                placeholder="Sarah Chen"
                required
                className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/40 focus:border-[#F59E0B]/50 focus-visible:ring-0"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-[#6B7280] text-xs">Company</Label>
              <Input
                id="company"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="TechCorp Inc."
                required
                className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/40 focus:border-[#F59E0B]/50 focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="linkedin" className="text-[#6B7280] text-xs">LinkedIn URL <span className="text-[#6B7280]/50">(optional — sharpens the simulation)</span></Label>
            <Input
              id="linkedin"
              value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/40 focus:border-[#F59E0B]/50 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Deal stage */}
        <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
          <h2 className="text-sm font-semibold text-[#F9FAFB] mb-3">What stage is this deal?</h2>
          <div className="flex flex-wrap gap-2">
            {DEAL_STAGES.map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setForm({ ...form, dealStage: stage })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  form.dealStage === stage
                    ? "bg-[#F59E0B] text-[#0D0D0F]"
                    : "bg-[#0D0D0F] border border-[#1F2937] text-[#6B7280] hover:text-[#F9FAFB] hover:border-[#374151]"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318] space-y-1.5">
          <Label htmlFor="notes" className="text-sm font-semibold text-[#F9FAFB]">Paste your notes</Label>
          <p className="text-[#6B7280] text-xs mb-2">Call notes, email threads, anything you know about this person. The more you paste, the better the simulation.</p>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="She's the VP of Finance at a 200-person SaaS company. In our last call she said budget was approved in principle but needed CFO sign-off. She went quiet after the demo..."
            rows={6}
            className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/40 focus:border-[#F59E0B]/50 focus-visible:ring-0 resize-none text-sm"
          />
        </div>

        {/* Objections */}
        <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
          <h2 className="text-sm font-semibold text-[#F9FAFB] mb-1">What objection do you most want to practice?</h2>
          <p className="text-xs text-[#6B7280] mb-3">Select all that apply</p>
          <div className="grid grid-cols-2 gap-2.5">
            {OBJECTION_CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                <Checkbox
                  checked={form.objectionCategories.includes(cat)}
                  onCheckedChange={() => toggleObjection(cat)}
                  className="border-[#374151] data-[state=checked]:bg-[#F59E0B] data-[state=checked]:border-[#F59E0B]"
                />
                <span className="text-sm text-[#6B7280] group-hover:text-[#F9FAFB] transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Session length */}
        <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
          <h2 className="text-sm font-semibold text-[#F9FAFB] mb-3">Session length</h2>
          <div className="flex gap-2">
            {[10, 15, 20, 30].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setForm({ ...form, sessionLength: mins })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  form.sessionLength === mins
                    ? "bg-[#F59E0B] text-[#0D0D0F]"
                    : "bg-[#0D0D0F] border border-[#1F2937] text-[#6B7280] hover:text-[#F9FAFB]"
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || !form.prospectName || !form.companyName}
          className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold h-11"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Building your buyer...
            </>
          ) : (
            <>
              Build Buyer & Continue
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
