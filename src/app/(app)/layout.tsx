import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/layout/navbar"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      <Navbar user={session.user} />
      <main>{children}</main>
    </div>
  )
}
