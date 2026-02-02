// app/admin/layout.tsx

import { ReactNode } from "react";
import AdminNavbar from "../../components/admin/navbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminFooter from "../../components/admin/AdminFooter";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex flex-col flex-1 md:pl-[78px] transition-all duration-300">
        <AdminNavbar />

        <main className="flex-1 p-4 md:p-6">
          <div className="animate-in fade-in duration-500">{children}</div>
        </main>

        <footer className="sticky bottom-0 z-20 p-4 border-t bg-background/95 backdrop-blur text-center text-xs text-muted-foreground shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
          <AdminFooter />
        </footer>
      </div>
    </div>
  );
}
