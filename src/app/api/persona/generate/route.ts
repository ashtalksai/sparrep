import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { prospectName, companyName, linkedinUrl, notes, dealStage, objectionCategories } = await req.json()

  const prompt = `Generate a concise buyer persona profile for a B2B sales simulation.

Prospect: ${prospectName}
Company: ${companyName}
Deal stage: ${dealStage}
LinkedIn URL: ${linkedinUrl || "Not provided"}
Notes from rep: ${notes || "No notes provided"}
Objections to practice: ${objectionCategories?.join(", ") || "General"}

Generate a realistic buyer summary in JSON:
{
  "personality": "2-3 sentences describing their communication style and decision-making approach",
  "buyingStyle": "How they evaluate and make purchase decisions",
  "topObjections": ["Objection 1", "Objection 2", "Objection 3"],
  "redFlags": "1-2 specific behavioral patterns to watch for",
  "openingMood": "How they'll start the call (warm/neutral/skeptical/rushed)"
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
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" },
    }),
  })

  if (!response.ok) {
    // Return fallback persona
    return NextResponse.json({
      personality: `${prospectName} is a data-driven decision maker who values clarity and ROI. They're direct but fair — if you earn their trust, they move quickly.`,
      buyingStyle: "Committee-driven. Needs clear ROI justification and risk mitigation before advancing.",
      topObjections: ["Budget timing needs to be right", "Need to see proof from similar companies", "Concerned about switching costs"],
      redFlags: "Goes quiet when overwhelmed. Will say 'let me think about it' instead of raising objections directly.",
      openingMood: "neutral",
    })
  }

  const data = await response.json()
  const persona = JSON.parse(data.choices[0]?.message?.content || "{}")

  return NextResponse.json(persona)
}
