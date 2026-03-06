import { Activity, CreditCard } from "lucide-react";

export function SubscriptionHeader() {
  return (
    <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 font-mono">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-orange-600 mb-3">
          <div className="p-1.5 rounded-lg bg-orange-100 border border-orange-200 shadow-sm">
            <CreditCard className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Quản lý dịch vụ</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900">
          Gói thanh toán{" "}
          <span className="text-slate-400 font-medium">hệ thống</span>
        </h1>

        <p className="text-slate-500 text-sm font-medium border-l-4 border-orange-500 pl-4 mt-2 max-w-lg">
          Thiết lập hạ tầng thanh toán và quản trị đặc quyền tài khoản của học
          viên.
        </p>
      </div>

      <div className="flex w-fit items-center gap-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl shadow-sm">
        <Activity className="h-4 w-4 animate-pulse text-emerald-500" />
        Hệ thống giao dịch đang hoạt động
      </div>
    </header>
  );
}
