"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ email: "", password: "" })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password.")
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#F59E0B] text-[#0D0D0F]">
            <Zap className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold text-[#F9FAFB]">SparrRep</span>
        </Link>

        <div className="p-6 rounded-xl border border-[#1F2937] bg-[#111318]">
          <h1 className="font-display text-2xl text-[#F9FAFB] mb-1">Welcome back</h1>
          <p className="text-[#6B7280] text-sm mb-6">Sign in to your account</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#6B7280] text-xs">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
                required
                className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/40 focus:border-[#F59E0B]/50 focus-visible:ring-0"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#6B7280] text-xs">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Your password"
                required
                className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/40 focus:border-[#F59E0B]/50 focus-visible:ring-0"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold h-10"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1F2937]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#111318] text-[#6B7280]">or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full mt-4 border-[#1F2937] text-[#F9FAFB] hover:bg-[#1F2937] bg-transparent"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
        </div>

        <p className="mt-5 text-center text-sm text-[#6B7280]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#F59E0B] hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
