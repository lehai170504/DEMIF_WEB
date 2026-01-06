"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Loader2, Check, Edit3, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function NotesPanel() {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Load notes từ localStorage khi mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("dictation-notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleSave = () => {
    if (status === "saving" || notes.trim() === "") return;

    setStatus("saving");
    // Giả lập lưu vào DB/Local
    setTimeout(() => {
      localStorage.setItem("dictation-notes", notes);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    }, 800);
  };

  const clearNotes = () => {
    if (confirm("Bạn có chắc chắn muốn xóa tất cả ghi chú?")) {
      setNotes("");
      localStorage.removeItem("dictation-notes");
    }
  };

  return (
    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white dark:bg-slate-900 rounded-[2rem] sticky top-24 overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-xl">
              <Edit3 className="h-4 w-4 text-orange-600" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
              Ghi chú
            </h3>
          </div>

          {notes.length > 0 && (
            <button
              onClick={clearNotes}
              className="text-slate-300 hover:text-red-500 transition-colors"
              title="Xóa ghi chú"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Textarea Area */}
        <div className="relative group">
          <Textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (status === "saved") setStatus("idle");
            }}
            placeholder="Lưu lại từ vựng hoặc cấu trúc hay..."
            className="min-h-[200px] w-full resize-none border-none bg-slate-50/50 dark:bg-slate-800/50 focus-visible:ring-0 rounded-2xl p-4 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300 placeholder:text-slate-400 transition-all"
          />
          {/* Một đường line trang trí tinh tế dưới textarea khi focus */}
          <div className="absolute bottom-2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex flex-col gap-3">
          <Button
            onClick={handleSave}
            disabled={status === "saving" || notes.trim() === ""}
            className={cn(
              "w-full h-11 rounded-2xl font-bold transition-all duration-300 shadow-lg",
              status === "saved"
                ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200"
                : "bg-slate-900 hover:bg-slate-800 shadow-slate-200"
            )}
          >
            <AnimatePresence mode="wait">
              {status === "saving" ? (
                <motion.div
                  key="saving"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" /> ĐANG LƯU...
                </motion.div>
              ) : status === "saved" ? (
                <motion.div
                  key="saved"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Check className="h-4 w-4" /> ĐÃ LƯU XONG
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  LƯU GHI CHÚ
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <p className="text-[11px] text-center text-slate-400 font-medium italic">
            * Dữ liệu được lưu cục bộ trên trình duyệt này
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
