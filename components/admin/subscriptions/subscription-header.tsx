import { Activity, CreditCard } from "lucide-react";

export function SubscriptionHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono">
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-orange-600 mb-2">
          <div className="p-2 rounded-xl bg-orange-50 shadow-sm border border-orange-100">
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">
            Quản lý kinh doanh
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-gray-900">
          Plan <span className="text-gray-200 font-normal">Command</span>
        </h1>
        <p className="text-gray-500 text-[13px] font-medium italic border-l-4 border-orange-500 pl-4 mt-3">
          Thiết lập hạ tầng thanh toán và quản trị đặc quyền tài khoản học viên.
        </p>
      </div>

      <div className="flex items-center gap-3 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-5 py-3 rounded-2xl uppercase italic shadow-sm">
        <Activity className="h-4 w-4 animate-pulse" />
        Hệ thống giao dịch: Online
      </div>
    </header>
  );
}
