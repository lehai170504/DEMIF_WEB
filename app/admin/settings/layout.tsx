// src/app/settings/layout.tsx
import { SidebarNav } from "@/components/admin/sidebar-nav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fffcf9] font-mono">
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900">
            Cấu hình Hệ thống
          </h1>
          <p className="text-slate-500">
            Quản lý định danh, bảo mật và các tùy chọn tài khoản.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar cố định */}
          <aside className="lg:col-span-3">
            <SidebarNav />
          </aside>

          {/* Nội dung thay đổi theo từng Page */}
          <main className="lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
