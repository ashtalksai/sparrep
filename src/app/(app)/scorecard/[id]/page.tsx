import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle, ChevronDown } from "lucide-react"
import { ScorecardClient } from "@/components/session/scorecard-client"

export default async function ScorecardPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { id } = await params
  const sparringSession = await prisma.sparringSession.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!sparringSession) notFound()
  if (sparringSession.status !== "completed") {
    redirect(`/session/${id}`)
  }

  const persona = sparringSession.buyerPersona as Record<string, string>
  const scores = sparringSession.scores as Record<string, unknown>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#F9FAFB] text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <p className="text-xs text-[#F59E0B] font-semibold uppercase tracking-widest mb-2">Scorecard</p>
        <h1 className="font-display text-3xl text-[#F9FAFB] mb-1">
          {persona.prospectName}, {persona.companyName}
        </h1>
        <p className="text-[#6B7280] text-sm">{sparringSession.dealStage} · {new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(sparringSession.createdAt)}</p>
      </div>

      <ScorecardClient
        session={{
          id: sparringSession.id,
          scores,
          transcript: sparringSession.transcript as Array<{ role: string; content: string }>,
          persona,
          dealStage: sparringSession.dealStage,
          userNote: sparringSession.userNote,
        }}
      />

      <div className="mt-8 flex items-center gap-3">
        <Link href="/session/new" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-[#1F2937] text-[#6B7280] hover:text-[#F9FAFB]"
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            Try again (same buyer)
          </Button>
        </Link>
        <Link href="/session/new" className="flex-1">
          <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold">
            New Session
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
