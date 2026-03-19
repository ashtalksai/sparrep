"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
]

export function Navbar({ user }: { user?: { name?: string | null; email?: string | null } | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F2937] bg-[#0D0D0F]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#F59E0B] text-[#0D0D0F]">
              <Zap className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-[#F9FAFB] group-hover:text-[#F59E0B] transition-colors">
              SparrRep
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  pathname === link.href
                    ? "text-[#F9FAFB] bg-[#1F2937]"
                    : "text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-[#6B7280] hover:text-[#F9FAFB]">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/api/auth/signout">
                  <Button variant="outline" size="sm" className="border-[#1F2937] text-[#6B7280] hover:text-[#F9FAFB]">
                    Sign out
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-[#6B7280] hover:text-[#F9FAFB]">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold">
                    Start Sparring Free →
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md h-8 w-8 text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#1F2937] transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0D0D0F] border-[#1F2937] w-72">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#F59E0B] text-[#0D0D0F]">
                    <Zap className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <span className="font-display text-lg font-semibold text-[#F9FAFB]">SparrRep</span>
                </Link>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        pathname === link.href
                          ? "text-[#F9FAFB] bg-[#1F2937]"
                          : "text-[#6B7280] hover:text-[#F9FAFB]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {user && (
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-[#6B7280] hover:text-[#F9FAFB] rounded-md">
                      Dashboard
                    </Link>
                  )}
                </nav>
                <div className="flex flex-col gap-2 pt-2 border-t border-[#1F2937]">
                  {user ? (
                    <Link href="/api/auth/signout">
                      <Button variant="outline" className="w-full border-[#1F2937] text-[#6B7280]">
                        Sign out
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <Button variant="ghost" className="w-full text-[#6B7280]">Sign in</Button>
                      </Link>
                      <Link href="/signup" onClick={() => setOpen(false)}>
                        <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold">
                          Start Sparring Free →
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
