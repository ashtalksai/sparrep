import Link from "next/link"
import { Zap, Twitter } from "lucide-react"

const footerLinks = {
  product: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#0D0D0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#F59E0B] text-[#0D0D0F]">
                <Zap className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-semibold text-[#F9FAFB]">SparrRep</span>
            </Link>
            <p className="mt-3 text-sm text-[#6B7280] max-w-xs leading-relaxed">
              AI sparring partner for B2B sales reps. Practice tomorrow&apos;s call today.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://twitter.com/sparrrep"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] hover:text-[#F59E0B] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#6B7280] hover:text-[#F9FAFB] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#6B7280] hover:text-[#F9FAFB] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6B7280]">
            © 2026 SparrRep / Prepitch. All rights reserved.
          </p>
          <p className="text-xs text-[#6B7280]">
            Built for reps who take their craft seriously.
          </p>
        </div>
      </div>
    </footer>
  )
}
