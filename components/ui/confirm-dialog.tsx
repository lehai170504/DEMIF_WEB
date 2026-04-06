"use client";

import * as React from "react";
import { createPortal } from "react-dom"; // Import thêm cái này
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
  isLoading = false,
  isDestructive = true,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 font-mono">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6"
          >
            {/* Hiệu ứng Glow nền góc trên */}
            <div
              className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[50px] opacity-20 pointer-events-none ${
                isDestructive ? "bg-red-500" : "bg-[#FF7A00]"
              }`}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                  isDestructive
                    ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                    : "bg-orange-50 dark:bg-orange-500/10 text-[#FF7A00]"
                }`}
              >
                <AlertTriangle className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                {title}
              </h3>

              <div className="text-sm font-medium text-slate-500 dark:text-zinc-400 mb-8 leading-relaxed">
                {description}
              </div>

              <div className="flex items-center w-full gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 h-12 rounded-xl border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-300 font-bold uppercase tracking-wider text-xs hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  {cancelText}
                </Button>

                <Button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 h-12 rounded-xl font-bold uppercase tracking-wider text-xs text-white ${
                    isDestructive
                      ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                      : "bg-[#FF7A00] hover:bg-[#FF9E2C] shadow-orange-500/20"
                  } shadow-lg transition-all active:scale-95`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    confirmText
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
