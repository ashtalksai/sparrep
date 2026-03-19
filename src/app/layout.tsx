import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans, DM_Mono } from "next/font/google"
import "./globals.css"

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SparrRep — Practice the call before it matters",
  description:
    "AI sparring partner for B2B sales reps. Practice tomorrow's call today. Build your specific buyer in 60 seconds, spar before the call, win more.",
  keywords: "sales training, AI sales simulation, B2B sales, pre-call prep, objection handling",
  openGraph: {
    title: "SparrRep — Practice the call before it matters",
    description: "AI sparring partner for B2B sales reps. Practice tomorrow's call today.",
    url: "https://sparrep.ashketing.com",
    siteName: "SparrRep",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${dmSerifDisplay.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className={`${dmSans.className} antialiased bg-[#0D0D0F] text-[#F9FAFB]`}>
        {children}
      </body>
    </html>
  )
}
