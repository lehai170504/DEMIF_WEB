// app/admin/layout.tsx

import { ReactNode } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminFooter from "../../components/admin/AdminFooter";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function RootAdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-muted/40 font-mono">
      <AdminSidebar />

      <div className="flex flex-col flex-1 md:ml-64 overflow-hidden">
        <header className="z-10 border-b bg-background">
          <AdminNavbar />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-full mx-auto">{children}</div>
        </main>

        <footer className="z-10 border-t bg-background shrink-0">
          <AdminFooter />
        </footer>
      </div>
    </div>
  );
}
