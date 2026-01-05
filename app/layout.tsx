import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { HeaderUser } from "@/components/layouts/User/HeaderUser"
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "DEMIF - AI-Powered Language Learning",
  description: "Master languages through AI-powered dictation and shadowing exercises",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${poppins.variable} ${inter.variable} antialiased`}>
        <HeaderUser />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <FooterLanding /> 
      </body>
    </html>
  )
}
