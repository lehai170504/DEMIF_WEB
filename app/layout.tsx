// src/app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import QueryProvider from "./providers";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jetbrainsMono.variable} ${poppins.variable} ${inter.variable} antialiased bg-white dark:bg-[#050505] text-gray-900 dark:text-zinc-100 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="demif-user-theme"
        >
          <AmbientBackground />

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
              position: "fixed",
              top: 20,
              right: 20,
              zIndex: 99999,
            }}
          />

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
