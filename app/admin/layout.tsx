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
      <div className="flex h-screen bg-slate-50 dark:bg-[#050505] overflow-hidden font-mono text-slate-900 dark:text-slate-100 transition-colors duration-500">
        <AdminSidebar />

        <div className="flex flex-col flex-1 md:pl-[312px] transition-all duration-500 h-full w-full relative">
          <header className="shrink-0 pt-4 pr-4 pl-4 md:pl-0 z-40">
            <AdminNavbar />
          </header>

          <main className="flex-1 overflow-y-auto no-scrollbar relative z-10 p-4 md:p-6 md:pt-4">
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 max-w-[1600px] mx-auto min-h-full">
              {children}
            </div>
          </main>

          <footer className="shrink-0 pb-4 pr-4 pl-4 md:pl-0 z-20">
            <div className="p-4 border border-slate-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl text-center shadow-sm rounded-[2rem] transition-colors">
              <AdminFooter />
            </div>
          </footer>
        </div>
      </div>
    </AdminGuard>
  );
}
