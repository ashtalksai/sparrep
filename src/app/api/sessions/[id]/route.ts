import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const sparringSession = await prisma.sparringSession.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!sparringSession) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(sparringSession)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const sparringSession = await prisma.sparringSession.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!sparringSession) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const updated = await prisma.sparringSession.update({
    where: { id },
    data: {
      ...(body.transcript !== undefined && { transcript: body.transcript }),
      ...(body.scores !== undefined && { scores: body.scores }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.userNote !== undefined && { userNote: body.userNote }),
    },
  })

  return NextResponse.json(updated)
}
