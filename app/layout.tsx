// src/app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import QueryProvider from "./providers";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DEMIF - Nền tảng luyện nói tiếng Anh cùng AI",
  description:
    "Làm chủ tiếng Anh thông qua các bài tập chính tả và Shadowing thông minh.",
  icons: {
    icon: "/DemifLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jetbrainsMono.variable} ${poppins.variable} ${inter.variable} antialiased bg-[#050505] text-zinc-100`}
      >
        <AmbientBackground />
        <ScrollToTopButton />

        <div className="relative z-10 flex flex-col min-h-screen">
          <QueryProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </QueryProvider>
        </div>

        {/* --- FIX LỖI --- */}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          closeButton
          className="fixed"
          style={{
            position: "fixed", // Bắt buộc cố định
            top: 20, // Cách đỉnh 20px
            right: 20, // Cách phải 20px
            zIndex: 99999, // Luôn nằm trên cùng
          }}
        />

        <Analytics />
      </body>
    </html>
  );
}
