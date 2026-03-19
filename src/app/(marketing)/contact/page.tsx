import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare } from "lucide-react"

export const metadata = {
  title: "Contact — SparrRep",
  description: "Get in touch with the SparrRep team.",
}

export default async function ContactPage() {
  const session = await auth()
  return (
    <>
      <Navbar user={session?.user} />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
        <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-widest mb-4">Contact</p>
        <h1 className="font-display text-4xl text-[#F9FAFB] mb-4">Get in touch</h1>
        <p className="text-[#6B7280] mb-10 leading-relaxed">
          Questions about pricing, team plans, or integrations? We respond within one business day.
        </p>

        <div className="space-y-5 mb-10">
          <div className="flex items-center gap-3 p-4 rounded-lg border border-[#1F2937] bg-[#111318]">
            <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <div>
              <p className="text-xs text-[#6B7280] mb-0.5">Email</p>
              <a href="mailto:hello@sparrep.com" className="text-[#F9FAFB] text-sm hover:text-[#F59E0B] transition-colors">
                hello@sparrep.com
              </a>
            </div>
          </div>
        </div>

        <form className="space-y-5 p-6 rounded-xl border border-[#1F2937] bg-[#111318]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[#6B7280] text-xs">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/50 focus:border-[#F59E0B]/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#6B7280] text-xs">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/50 focus:border-[#F59E0B]/50"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-[#6B7280] text-xs">Subject</Label>
            <Input
              id="subject"
              placeholder="How can we help?"
              className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/50 focus:border-[#F59E0B]/50"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-[#6B7280] text-xs">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us what you're looking for..."
              rows={5}
              className="bg-[#0D0D0F] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]/50 focus:border-[#F59E0B]/50 resize-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0D0D0F] font-semibold"
          >
            Send message
          </Button>
        </form>
      </main>
      <Footer />
    </>
  )
}
