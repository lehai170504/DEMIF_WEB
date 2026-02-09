// src/app/admin/settings/layout.tsx
import { SidebarNav } from "@/components/admin/sidebar-nav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-mono text-foreground">
      <div className="max-w-[1600px] mx-auto p-6 md:p-12 space-y-10">
        <header className="space-y-2 border-b border-border pb-6">
          <h1 className="text-4xl font-black tracking-tight">
            Cấu hình Hệ thống
          </h1>
          <p className="text-muted-foreground font-medium text-lg">
            Quản lý định danh, bảo mật và các tùy chọn tài khoản.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar cố định */}
          <aside className="lg:col-span-3 lg:sticky lg:top-10 h-fit">
            <SidebarNav />
          </aside>

          {/* Nội dung thay đổi theo từng Page */}
          <main className="lg:col-span-9 min-h-[500px]">{children}</main>
        </div>
      </div>
    </div>
  );
}
