"use client";

export default function AdminFooter() {
  return (
    <div className="flex items-center justify-between w-full font-mono">
      <div className="flex items-center gap-4 pl-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          © {new Date().getFullYear()}{" "}
          <span className="text-slate-400 dark:text-slate-600">
            Demif Engine
          </span>
        </p>
        <div className="h-3 w-px bg-slate-200 dark:bg-white/10" />
        <p className="text-[9px] font-black text-[#FF7A00] uppercase italic tracking-tighter bg-[#FF7A00]/10 px-2 py-0.5 rounded-md shadow-sm">
          Pro Edition
        </p>
      </div>

      <div className="flex items-center gap-6 pr-2">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          Hệ thống trực tuyến
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
          Phiên bản{" "}
          <span className="text-slate-400 dark:text-slate-600">
            2.4.0-Stable
          </span>
        </p>
      </div>
    </div>
  );
}
