// src/app/(auth)/layout.tsx
import { ParallaxBackground } from "@/components/layouts/Landing/ParallaxBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#050505] overflow-hidden font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30">
      <ParallaxBackground />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FF7A00 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 90%)",
        }}
      />

      {/* Container chính - Mở rộng lên max-w-5xl để chứa 2 cột */}
      <div className="relative z-10 w-full max-w-5xl p-6">{children}</div>

      <div className="absolute bottom-6 text-[10px] text-gray-400 dark:text-zinc-600 uppercase tracking-[0.4em] pointer-events-none">
        Secure Access • Demif AI Engine v3.0
      </div>
    </div>
  );
}
