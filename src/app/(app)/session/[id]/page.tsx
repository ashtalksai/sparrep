"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, StopCircle, ChevronDown, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

interface SparringSession {
  id: string
  buyerPersona: Record<string, string>
  transcript: Message[]
  dealStage: string
  objectionCategory: string[]
  sessionLength: number
  status: string
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

export default function SessionPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [session, setSession] = useState<SparringSession | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [ending, setEnding] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [showPersona, setShowPersona] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/sessions/${id}`)
      const data = await res.json()
      setSession(data)
      setMessages((data.transcript as Message[]) || [])
    }
    load()
  }, [id])

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleSend() {
    if (!input.trim() || sending) return
    const msg = input.trim()
    setInput("")
    setSending(true)

    setMessages((prev) => [...prev, { role: "user", content: msg, timestamp: new Date().toISOString() }])

    const res = await fetch(`/api/sessions/${id}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    })
    const data = await res.json()
    setMessages(data.transcript || [])
    setSending(false)
    textareaRef.current?.focus()
  }

  async function handleEnd() {
    if (!confirm("End this session and get your scorecard?")) return
    setEnding(true)
    const res = await fetch(`/api/sessions/${id}/score`, {
      method: "POST",
    })
    if (res.ok) {
      router.push(`/scorecard/${id}`)
    } else {
      setEnding(false)
      alert("Need at least a few exchanges to score. Keep going!")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-6 h-6 text-[#F59E0B] animate-spin" />
      </div>
    )
  }

  const persona = session.buyerPersona

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#1F2937] bg-[#0D0D0F] shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-semibold text-[#F9FAFB]">{persona.prospectName}</p>
            <p className="text-xs text-[#6B7280]">{persona.companyName} · {session.dealStage}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-[#6B7280]">{formatTime(elapsed)}</span>
          <button
            onClick={() => setShowPersona(!showPersona)}
            className="text-xs text-[#6B7280] hover:text-[#F9FAFB] px-2 py-1 rounded border border-[#1F2937] hover:border-[#374151] transition-colors"
          >
            Context {showPersona ? "↑" : "↓"}
          </button>
          <Button
            onClick={handleEnd}
            disabled={ending || messages.length < 4}
            size="sm"
            variant="outline"
            className="border-[#1F2937] text-[#6B7280] hover:text-red-400 hover:border-red-500/30"
          >
            {ending ? <Loader2 className="w-3 h-3 animate-spin" /> : <StopCircle className="w-3 h-3" />}
            <span className="ml-1.5 text-xs">End Session</span>
          </Button>
        </div>
      </div>

      {/* Collapsible persona panel */}
      {showPersona && (
        <div className="px-4 sm:px-6 py-3 bg-[#111318] border-b border-[#1F2937] text-xs text-[#6B7280] space-y-1">
          <p><span className="text-[#F9FAFB]">Deal stage:</span> {session.dealStage}</p>
          <p><span className="text-[#F9FAFB]">Practicing:</span> {session.objectionCategory.join(", ") || "General objections"}</p>
          {persona.rawNotes && <p className="truncate"><span className="text-[#F9FAFB]">Notes:</span> {persona.rawNotes.slice(0, 120)}...</p>}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B7280] text-sm mb-2">Your AI buyer is ready.</p>
            <p className="text-[#6B7280]/60 text-xs">Start the conversation — introduce yourself and set the agenda.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] sm:max-w-[65%]`}>
              {msg.role === "assistant" && (
                <p className="text-xs text-[#6B7280] mb-1.5">{persona.prospectName}, {persona.companyName}</p>
              )}
              <div
                className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#F59E0B] text-[#0D0D0F] font-medium rounded-br-sm"
                    : "bg-[#1F2937] text-[#F9FAFB] rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <p className="text-xs text-[#6B7280] mb-1.5">{persona.prospectName}</p>
              <div className="px-4 py-3 rounded-xl bg-[#1F2937] rounded-bl-sm">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#6B7280] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-[#1F2937] bg-[#0D0D0F] px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your response... (Enter to send, Shift+Enter for new line)"
            rows={2}
            className="flex-1 bg-[#111318] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/40 focus:border-[#F59E0B]/50 focus-visible:ring-0 resize-none text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] h-[4.5rem] px-4 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-[#6B7280]/40 text-center mt-2">Enter to send · Shift+Enter for new line · End session when ready for scoring</p>
      </div>
    </div>
  )
}
