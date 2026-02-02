// src/app/(auth)/layout.tsx
import { ParallaxBackground } from "@/components/layouts/Landing/ParallaxBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden font-mono text-zinc-100 selection:bg-orange-500/30">
      {/* 1. Tái sử dụng nền động 3D */}
      <ParallaxBackground />

      {/* 2. Container chính */}
      <div className="relative z-10 w-full max-w-md p-4">
        {/* Hiệu ứng Glow nền phía sau form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/10 blur-[80px] rounded-full -z-10 pointer-events-none" />

        {children}
      </div>
    </div>
  );
}
