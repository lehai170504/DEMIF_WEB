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
    <>
      <HeaderUser />
      <main>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
      <FooterLanding />
    </>
  );
}
