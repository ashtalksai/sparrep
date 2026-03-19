"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react"

interface ScoreCategory {
  score: number
  feedback: string
}

interface Scores {
  discovery?: ScoreCategory
  objectionHandling?: ScoreCategory
  urgencyCreation?: ScoreCategory
  nextSteps?: ScoreCategory
  adaptability?: ScoreCategory
  overall?: number
  wentWell?: string[]
  lostGround?: Array<{ moment: string; betterResponse: string }>
}

interface Message {
  role: string
  content: string
}

interface SessionData {
  id: string
  scores: Record<string, unknown>
  transcript: Message[]
  persona: Record<string, string>
  dealStage: string
  userNote: string | null
}

function ScoreBar({ score, label, feedback }: { score: number; label: string; feedback: string }) {
  const pct = (score / 5) * 100
  const color = score >= 4 ? "#22c55e" : score >= 3 ? "#eab308" : "#ef4444"

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#F9FAFB] font-medium">{label}</span>
        <span className="font-mono text-sm font-semibold" style={{ color }}>
          {score.toFixed(1)}/5.0
        </span>
      </div>
      <div className="h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-[#6B7280] leading-relaxed">{feedback}</p>
    </div>
  )
}

function getOverallColor(score: number): string {
  if (score >= 4) return "text-green-400"
  if (score >= 3) return "text-yellow-400"
  return "text-red-400"
}

export function ScorecardClient({ session }: { session: SessionData }) {
  const [showTranscript, setShowTranscript] = useState(false)
  const [note, setNote] = useState(session.userNote || "")
  const [noteSaved, setNoteSaved] = useState(false)

  const scores = session.scores as Scores
  const overall = scores.overall || 0

  const categories = [
    { key: "discovery", label: "Discovery" },
    { key: "objectionHandling", label: "Objection Handling" },
    { key: "urgencyCreation", label: "Urgency Creation" },
    { key: "nextSteps", label: "Next Steps" },
    { key: "adaptability", label: "Adaptability" },
  ] as const

  async function saveNote() {
    await fetch(`/api/sessions/${session.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userNote: note }),
    })
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Overall score */}
      <div className="p-6 rounded-xl border border-[#1F2937] bg-[#111318] text-center">
        <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">Overall Score</p>
        <p className={`font-mono text-6xl font-semibold ${getOverallColor(overall)}`}>
          {overall.toFixed(1)}
        </p>
        <p className="text-[#6B7280] text-sm mt-1">out of 5.0</p>
      </div>

      {/* Category scores */}
      <div className="p-6 rounded-xl border border-[#1F2937] bg-[#111318] space-y-5">
        <h2 className="text-sm font-semibold text-[#F9FAFB] mb-4">Breakdown</h2>
        {categories.map(({ key, label }) => {
          const cat = scores[key]
          if (!cat) return null
          return (
            <ScoreBar
              key={key}
              label={label}
              score={cat.score}
              feedback={cat.feedback}
            />
          )
        })}
      </div>

      {/* What went well */}
      {scores.wentWell && scores.wentWell.length > 0 && (
        <div className="p-6 rounded-xl border border-green-500/20 bg-green-500/5">
          <h2 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            What went well
          </h2>
          <ul className="space-y-2">
            {scores.wentWell.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#F9FAFB]">
                <span className="text-green-400 shrink-0 mt-0.5">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Where you lost ground */}
      {scores.lostGround && scores.lostGround.length > 0 && (
        <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
          <h2 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Where you lost ground
          </h2>
          <div className="space-y-4">
            {scores.lostGround.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <p className="text-sm text-[#F9FAFB]">{item.moment}</p>
                <div className="pl-3 border-l border-[#F59E0B]/40">
                  <p className="text-xs text-[#F59E0B]">Better response:</p>
                  <p className="text-sm text-[#6B7280]">{item.betterResponse}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note */}
      <div className="p-5 rounded-xl border border-[#1F2937] bg-[#111318]">
        <h2 className="text-sm font-semibold text-[#F9FAFB] mb-2">Personal note</h2>
        <p className="text-xs text-[#6B7280] mb-3">What did you feel went well? What will you do differently next time?</p>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Felt confident on budget, but need to work on creating urgency at pricing stage..."
          rows={3}
          className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/40 focus:border-[#F59E0B]/50 focus-visible:ring-0 resize-none text-sm"
        />
        <Button
          onClick={saveNote}
          size="sm"
          variant="outline"
          className="mt-2 border-[#1F2937] text-[#6B7280] hover:text-[#F9FAFB]"
        >
          {noteSaved ? "Saved ✓" : "Save note"}
        </Button>
      </div>

      {/* Transcript */}
      {session.transcript.length > 0 && (
        <div className="rounded-xl border border-[#1F2937] overflow-hidden">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full flex items-center justify-between px-5 py-4 bg-[#111318] hover:bg-[#111318]/80 transition-colors"
          >
            <span className="text-sm font-semibold text-[#F9FAFB]">Full Transcript</span>
            {showTranscript ? (
              <ChevronUp className="w-4 h-4 text-[#6B7280]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            )}
          </button>
          {showTranscript && (
            <div className="p-5 space-y-3 max-h-96 overflow-y-auto">
              {session.transcript.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#F59E0B]/20 text-[#F9FAFB]"
                        : "bg-[#1F2937] text-[#6B7280]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
