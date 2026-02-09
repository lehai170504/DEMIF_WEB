// app/admin/layout.tsx
"use client";

import AdminNavbar from "../../components/admin/navbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminFooter from "../../components/admin/AdminFooter";
import AdminGuard from "@/components/auth/admin-guard";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#050505] overflow-hidden">
        <AdminSidebar />

        <div className="flex flex-col flex-1 md:pl-[78px] transition-all duration-300 h-full">
          <AdminNavbar />

          <main className="flex-1 overflow-y-auto no-scrollbar relative z-10 p-4 md:p-6">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>

          <footer className="shrink-0 p-4 border-t border-white/5 bg-[#050505]/80 backdrop-blur-md text-center text-xs text-zinc-500 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-20">
            <AdminFooter />
          </footer>
        </div>
      </div>
    </AdminGuard>
  );
}
