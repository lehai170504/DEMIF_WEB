// src/app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import QueryProvider from "./providers";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton"; // <--- 1. Import component

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
  variable: "--font-mono", // Ghi đè biến font-mono mặc định
});

export const metadata: Metadata = {
  title: "DEMIF - Nền tảng luyện nói tiếng Anh cùng AI",
  description:
    "Làm chủ tiếng Anh thông qua các bài tập chính tả và Shadowing thông minh.",
  generator: "v0.app",
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
        className={`
          font-sans ${jetbrainsMono.variable} ${poppins.variable} ${inter.variable} antialiased
          bg-[#050505] text-zinc-100 min-h-screen selection:bg-[#FF7A00]/30 selection:text-white
        `}
      >
        <AmbientBackground />

        {/* 2. Đặt nút ở đây để nó hiện trên TẤT CẢ các trang */}
        <ScrollToTopButton />

        <div className="relative z-10 flex flex-col min-h-screen">
          <QueryProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </QueryProvider>
        </div>

        <Analytics />
      </body>
    </html>
  );
}
