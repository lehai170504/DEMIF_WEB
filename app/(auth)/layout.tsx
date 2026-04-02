// src/app/(auth)/layout.tsx
import { ParallaxBackground } from "@/components/layouts/Landing/ParallaxBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fcfcfc] dark:bg-[#050505] overflow-hidden font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30">
      {/* Background động */}
      <ParallaxBackground />

      {/* Grid Pattern mượt mà */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #FF7A00 1.5px, transparent 0)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center, black 20%, transparent 85%)",
        }}
      />

      {/* Vignette tạo độ sâu 4 góc */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Container chính - Xóa padding dư để children tự căn giữa */}
      <main className="relative z-10 w-full flex items-center justify-center">
        {children}
      </main>

      {/* Footer System Branding */}
      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-gray-400 dark:text-zinc-700 uppercase tracking-[0.5em] pointer-events-none whitespace-nowrap">
        Secure Access <span className="mx-2 text-orange-500/30">•</span> Demif AI Engine v3.0
      </footer>

      {/* Ambient Light */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}