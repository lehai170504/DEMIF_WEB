// app/(user)/layout.tsx
import { HeaderUser } from "@/components/layouts/User/HeaderUser";
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding";
import { Suspense } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-zinc-100 transition-colors duration-300">
      <HeaderUser />
      <main>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
      <FooterLanding />
    </div>
  );
}
