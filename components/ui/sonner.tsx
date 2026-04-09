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
      className="toaster group font-mono"
      icons={{
        success: (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-in zoom-in-50 duration-300" />
        ),
        error: (
          <AlertCircle className="w-5 h-5 text-rose-500 animate-in zoom-in-50 duration-300" />
        ),
        info: (
          <Info className="w-5 h-5 text-blue-500 animate-in zoom-in-50 duration-300" />
        ),
        warning: (
          <TriangleAlert className="w-5 h-5 text-amber-500 animate-in zoom-in-50 duration-300" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast font-mono p-5 rounded-[2rem] border-2 shadow-2xl backdrop-blur-xl w-[calc(100vw-32px)] sm:w-full sm:min-w-[420px] transition-all flex items-start gap-4 overflow-hidden relative border-slate-200 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90",

          title:
            "text-[12px] sm:text-[13px] font-black uppercase tracking-[0.25em] leading-none mt-1 text-slate-900 dark:text-white",

          description:
            "text-[11px] sm:text-[12px] font-bold normal-case opacity-80 mt-1.5 leading-relaxed text-slate-600 dark:text-zinc-400",

          actionButton:
            "group-[.toast]:bg-slate-900 dark:group-[.toast]:bg-white group-[.toast]:text-white dark:group-[.toast]:text-black font-black uppercase text-[10px] tracking-[0.1em] rounded-xl px-4 py-2 transition-all active:scale-95",
          cancelButton:
            "group-[.toast]:bg-slate-100 dark:group-[.toast]:bg-zinc-800 group-[.toast]:text-slate-500 font-black uppercase text-[10px] tracking-[0.1em] rounded-xl px-4 py-2 transition-all",
          closeButton:
            "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm text-slate-500 hover:text-slate-900 dark:hover:text-white !rounded-full !p-2 !-top-2 !-right-2 transition-transform hover:scale-110",

          success:
            "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-emerald-500",
          error:
            "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-rose-500",
          warning:
            "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-amber-500",
          info: "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-blue-500",
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
