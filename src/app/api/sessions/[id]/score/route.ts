import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

interface Message {
  role: "user" | "assistant"
  content: string
}

async function scoreSession(transcript: Message[], persona: Record<string, unknown>): Promise<Record<string, unknown>> {
  const transcriptText = transcript
    .map((m) => `${m.role === "user" ? "REP" : "BUYER"}: ${m.content}`)
    .join("\n")

  const prompt = `You are a senior B2B sales coach. Analyze this sales conversation transcript and score the rep's performance.

Buyer: ${persona.prospectName} at ${persona.companyName}
Deal stage: ${persona.dealStage || "Unknown"}

TRANSCRIPT:
${transcriptText}

Score each category 1.0-5.0 (one decimal place) and provide specific 1-sentence feedback:

Respond in JSON format only:
{
  "discovery": { "score": 3.5, "feedback": "..." },
  "objectionHandling": { "score": 4.0, "feedback": "..." },
  "urgencyCreation": { "score": 2.5, "feedback": "..." },
  "nextSteps": { "score": 3.0, "feedback": "..." },
  "adaptability": { "score": 4.5, "feedback": "..." },
  "overall": 3.5,
  "wentWell": ["specific moment 1", "specific moment 2"],
  "lostGround": [
    { "moment": "When the buyer said X...", "betterResponse": "You could have said..." },
    { "moment": "When you said Y...", "betterResponse": "Instead try..." }
  ]
}`

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    }),
  })

  if (!response.ok) {
    // Return fallback scores if OpenAI fails
    return {
      discovery: { score: 3.0, feedback: "Review your discovery approach." },
      objectionHandling: { score: 3.0, feedback: "Work on reframing objections." },
      urgencyCreation: { score: 3.0, feedback: "Create clearer next-step urgency." },
      nextSteps: { score: 3.0, feedback: "Always secure a concrete next action." },
      adaptability: { score: 3.0, feedback: "Listen and adapt to buyer signals." },
      overall: 3.0,
      wentWell: ["You engaged the buyer", "You stayed professional"],
      lostGround: [{ moment: "Review the transcript for key moments", betterResponse: "Practice the key objection categories again" }],
    }
  }

  const data = await response.json()
  return JSON.parse(data.choices[0]?.message?.content || "{}")
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const sparringSession = await prisma.sparringSession.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!sparringSession) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const transcript = (sparringSession.transcript as unknown as Message[]) || []
  if (transcript.length < 2) {
    return NextResponse.json({ error: "Not enough conversation to score" }, { status: 400 })
  }

  const scores = await scoreSession(transcript, sparringSession.buyerPersona as Record<string, unknown>)

  const updated = await prisma.sparringSession.update({
    where: { id },
    data: { scores: JSON.parse(JSON.stringify(scores)), status: "completed" },
  })

  return NextResponse.json(updated)
}
