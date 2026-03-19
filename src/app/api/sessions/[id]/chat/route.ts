import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string
}

function buildSystemPrompt(persona: Record<string, unknown>, dealStage: string, objectionCategories: string[]): string {
  const { prospectName, companyName, rawNotes } = persona

  return `You are ${prospectName}, a buyer at ${companyName}. You are in a B2B sales roleplay simulation.

Deal stage: ${dealStage}
Objections to practice: ${objectionCategories.join(", ")}

Context about you: ${rawNotes || "A typical B2B buyer"}

Your behavior:
- Stay fully in character as this specific buyer
- Be realistic — not a pushover, not impossible
- Start with small talk / setting the agenda, then get to business
- Raise objections naturally (not all at once) — warm up first, then push back
- Use industry-appropriate language for your company/role
- Don't cave immediately on objections — require 2-3 solid attempts to handle them
- If the rep builds good rapport, soften slightly; if they push too hard, get defensive
- Respond conversationally — 2-4 sentences typically, sometimes shorter
- DO NOT reveal you are an AI or that this is a simulation
- When the rep tries to close or advance, raise realistic stall objections based on the deal stage

Keep responses brief and natural. You are a busy executive.`
}

async function callOpenAI(messages: Message[]): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.8,
      max_tokens: 300,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI API error: ${err}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || "I see. Can you elaborate on that?"
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const { message } = await req.json()

  const sparringSession = await prisma.sparringSession.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!sparringSession) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (sparringSession.status === "completed") {
    return NextResponse.json({ error: "Session is complete" }, { status: 400 })
  }

  const persona = sparringSession.buyerPersona as Record<string, unknown>
  const transcript = (sparringSession.transcript as unknown as Message[]) || []

  // Build messages for OpenAI
  const systemPrompt = buildSystemPrompt(
    persona,
    sparringSession.dealStage,
    sparringSession.objectionCategory
  )

  const messages: Message[] = [
    { role: "system", content: systemPrompt },
    ...transcript.filter((m) => m.role !== "system"),
    { role: "user", content: message },
  ]

  const aiResponse = await callOpenAI(messages)

  // Update transcript
  const updatedTranscript: Message[] = [
    ...transcript,
    { role: "user", content: message, timestamp: new Date().toISOString() },
    { role: "assistant", content: aiResponse, timestamp: new Date().toISOString() },
  ]

  await prisma.sparringSession.update({
    where: { id },
    data: { transcript: JSON.parse(JSON.stringify(updatedTranscript)) },
  })

  return NextResponse.json({ response: aiResponse, transcript: updatedTranscript })
}
