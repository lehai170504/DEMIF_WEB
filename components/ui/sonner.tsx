"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { CheckCircle2, AlertCircle, Info, TriangleAlert } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Hệ thống Icon Edutech đồng bộ
      icons={{
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        error: <AlertCircle className="w-5 h-5 text-rose-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
        warning: <TriangleAlert className="w-5 h-5 text-amber-500" />,
      }}
      toastOptions={{
        classNames: {
          // BỘ KHUNG GỐC: Responsive linh hoạt cho Mobile (full width) và Desktop (min-width)
          toast:
            "group toast font-mono p-4 sm:p-5 rounded-[1.8rem] sm:rounded-[2.2rem] border-2 shadow-2xl backdrop-blur-xl w-[calc(100vw-32px)] sm:w-full sm:min-w-[400px] transition-all flex items-start gap-4 overflow-hidden relative",

          // NỘI DUNG: Tiêu đề in hoa, description đậm chất học thuật
          title:
            "text-[11px] sm:text-[12px] font-black uppercase tracking-[0.1em] leading-tight mt-0.5",
          description:
            "text-[10px] sm:text-[11px] font-bold opacity-90 mt-1 leading-relaxed",

          // NÚT THAO TÁC: Bo tròn và in đậm phong cách Admin Dashboard
          actionButton:
            "group-[.toast]:bg-slate-900 dark:group-[.toast]:bg-white group-[.toast]:text-white dark:group-[.toast]:text-black font-black uppercase text-[9px] sm:text-[10px] tracking-widest rounded-2xl px-5 py-2.5 transition-all active:scale-95 hover:opacity-90",
          cancelButton:
            "group-[.toast]:bg-slate-100 dark:group-[.toast]:bg-zinc-800 group-[.toast]:text-slate-500 font-black uppercase text-[9px] sm:text-[10px] tracking-widest rounded-2xl px-5 py-2.5 transition-all",
          closeButton:
            "bg-white dark:bg-zinc-900 border shadow-sm text-slate-500 hover:text-slate-900 dark:hover:text-white !rounded-full !p-2 !-top-2 !-right-2 transition-transform hover:scale-110",

          // --- PHỐI MÀU EDUTECH VIBRANT ---

          // Mặc định
          default:
            "bg-white dark:bg-zinc-950 text-slate-900 dark:text-white border-slate-200 dark:border-white/10",

          // Thành công: Thanh trạng thái xanh lá
          success:
            "bg-emerald-50/95 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-emerald-500",

          // Lỗi: Thanh trạng thái đỏ Rose
          error:
            "bg-rose-50/95 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-rose-500",

          // Cảnh báo: Thanh trạng thái cam Amber
          warning:
            "bg-amber-50/95 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-amber-500",

          // Thông tin: Thanh trạng thái xanh Blue
          info: "bg-blue-50/95 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-blue-500",
        },
        style: {
          zIndex: 99999,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
