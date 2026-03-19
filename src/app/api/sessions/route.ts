import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const sessions = await prisma.sparringSession.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return NextResponse.json(sessions)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  // Free tier limit check
  if (user.plan === "free" && user.sessionsUsedThisMonth >= 3) {
    return NextResponse.json(
      { error: "Session limit reached. Upgrade to Pro for unlimited sessions." },
      { status: 403 }
    )
  }

  const body = await req.json()
  const {
    prospectName,
    companyName,
    linkedinUrl,
    dealStage,
    objectionCategory,
    sessionLength,
    notes,
  } = body

  // Build buyer persona with AI context
  const buyerPersona = {
    prospectName,
    companyName,
    linkedinUrl,
    dealStage,
    rawNotes: notes,
    generatedAt: new Date().toISOString(),
  }

  const sparringSession = await prisma.sparringSession.create({
    data: {
      userId: session.user.id,
      buyerPersona,
      dealStage,
      objectionCategory: objectionCategory || [],
      sessionLength: sessionLength || 15,
      transcript: [],
      status: "active",
    },
  })

  // Increment sessions used
  await prisma.user.update({
    where: { id: session.user.id },
    data: { sessionsUsedThisMonth: { increment: 1 } },
  })

  return NextResponse.json(sparringSession)
}
