import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Zap, TrendingUp, Target, Clock, ChevronRight } from "lucide-react"
import { redirect } from "next/navigation"

function getScoreColor(score: number | null): string {
  if (!score) return "text-[#6B7280]"
  if (score >= 4) return "text-green-400"
  if (score >= 3) return "text-yellow-400"
  return "text-red-400"
}

function getScoreBg(score: number | null): string {
  if (!score) return "bg-[#6B7280]/10 text-[#6B7280]"
  if (score >= 4) return "bg-green-400/10 text-green-400"
  if (score >= 3) return "bg-yellow-400/10 text-yellow-400"
  return "bg-red-400/10 text-red-400"
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d)
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect("/login")

  const sessions = await prisma.sparringSession.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 6,
  })

  const completedSessions = sessions.filter((s) => s.status === "completed")
  const avgScore =
    completedSessions.length > 0
      ? completedSessions.reduce((acc, s) => {
          const sc = s.scores as Record<string, number> | null
          return acc + (sc?.overall || 0)
        }, 0) / completedSessions.length
      : null

  const sessionsLeft = user.plan === "free" ? Math.max(0, 3 - user.sessionsUsedThisMonth) : null

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl text-[#F9FAFB]">
            Hey, {user.name?.split(" ")[0] || "rep"}.
          </h1>
          <p className="text-[#6B7280] mt-1 text-sm">Ready for your next call?</p>
        </div>
        <Link href="/session/new">
          <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold">
            <Plus className="mr-2 w-4 h-4" />
            New Session
          </Button>
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs text-[#6B7280]">Sessions this month</span>
          </div>
          <p className="font-mono text-2xl font-semibold text-[#F9FAFB]">{user.sessionsUsedThisMonth}</p>
        </div>
        <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs text-[#6B7280]">Avg score</span>
          </div>
          <p className={`font-mono text-2xl font-semibold ${getScoreColor(avgScore)}`}>
            {avgScore ? `${avgScore.toFixed(1)}/5.0` : "—"}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs text-[#6B7280]">
              {user.plan === "free" ? "Sessions remaining" : "Plan"}
            </span>
          </div>
          <p className="font-mono text-2xl font-semibold text-[#F9FAFB]">
            {user.plan === "free" ? `${sessionsLeft}/3` : "Pro ∞"}
          </p>
        </div>
      </div>

      {/* Empty state or sessions */}
      {sessions.length === 0 ? (
        <div className="border border-dashed border-[#1F2937] rounded-xl p-16 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h2 className="font-display text-2xl text-[#F9FAFB] mb-2">Practice your first call</h2>
          <p className="text-[#6B7280] text-sm mb-6 max-w-sm mx-auto">
            Paste your call notes → Meet your buyer → Start the session. Takes 60 seconds.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-[#6B7280] mb-8">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center text-xs font-bold">1</span>
              Paste your notes
            </span>
            <span className="text-[#1F2937]">→</span>
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center text-xs font-bold">2</span>
              Meet your buyer
            </span>
            <span className="text-[#1F2937]">→</span>
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center text-xs font-bold">3</span>
              Start sparring
            </span>
          </div>
          <Link href="/session/new">
            <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold">
              Start Sparring →
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Recent Sessions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((s) => {
              const persona = s.buyerPersona as Record<string, string>
              const scores = s.scores as Record<string, number> | null
              const overall = scores?.overall || null

              return (
                <Link
                  key={s.id}
                  href={s.status === "completed" ? `/scorecard/${s.id}` : `/session/${s.id}`}
                  className="group p-5 rounded-xl border border-[#1F2937] bg-[#111318] hover:border-[#F59E0B]/25 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#F9FAFB] text-sm truncate">{persona.prospectName}</p>
                      <p className="text-[#6B7280] text-xs truncate">{persona.companyName}</p>
                    </div>
                    {overall !== null && (
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0 ${getScoreBg(overall)}`}>
                        {overall.toFixed(1)}
                      </span>
                    )}
                    {s.status === "active" && (
                      <span className="ml-2 px-2 py-0.5 rounded text-xs bg-[#F59E0B]/10 text-[#F59E0B] shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <Clock className="w-3 h-3" />
                      {formatDate(s.createdAt)}
                    </div>
                    <span className="text-xs text-[#6B7280] bg-[#1F2937] px-2 py-0.5 rounded">
                      {s.dealStage}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}

      {/* Free tier upgrade banner */}
      {user.plan === "free" && sessionsLeft !== null && sessionsLeft <= 1 && (
        <div className="mt-8 flex items-center justify-between p-4 rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5">
          <div>
            <p className="text-[#F9FAFB] text-sm font-medium">
              {sessionsLeft === 0 ? "You've used all 3 free sessions" : "1 session left this month"}
            </p>
            <p className="text-[#6B7280] text-xs mt-0.5">Upgrade to Pro for unlimited sessions</p>
          </div>
          <Link href="/pricing">
            <Button size="sm" className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold shrink-0">
              Upgrade to Pro
              <ChevronRight className="ml-1 w-3 h-3" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
