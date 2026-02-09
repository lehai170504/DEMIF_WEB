import { Activity, CreditCard } from "lucide-react";

export function SubscriptionHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[#FF7A00] mb-2">
          <CreditCard className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Quản lý doanh thu
          </span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-white">
          Subscription{" "}
          <span className="text-zinc-700 font-normal">Command</span>
        </h1>
        <p className="text-zinc-500 text-xs font-medium italic mt-2">
          Quản lý các gói dịch vụ Premium và theo dõi hiệu suất đăng ký.
        </p>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 px-4 py-2.5 rounded-2xl uppercase italic shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <Activity className="h-3.5 w-3.5" />
        Hệ thống thanh toán: Online
      </div>
    </header>
  );
}
