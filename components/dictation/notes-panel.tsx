"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, Trash2, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function NotesPanel() {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    const savedNotes = localStorage.getItem("dictation-notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleSave = () => {
    if (status === "saving" || notes.trim() === "") return;
    setStatus("saving");
    setTimeout(() => {
      localStorage.setItem("dictation-notes", notes);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    }, 800);
  };

  const clearNotes = () => {
    if (confirm("Xóa ghi chú?")) {
      setNotes("");
      localStorage.removeItem("dictation-notes");
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] rounded-[2rem] shadow-xl overflow-hidden sticky top-24">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <Edit3 className="h-4 w-4 text-orange-500" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
              Ghi chú
            </h3>
          </div>
          {notes.length > 0 && (
            <button
              onClick={clearNotes}
              className="text-gray-400 dark:text-zinc-600 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="relative group">
          <Textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (status === "saved") setStatus("idle");
            }}
            placeholder="Ghi chú nhanh..."
            className="min-h-[150px] w-full resize-none border-none bg-gray-50 dark:bg-black/20 focus-visible:ring-0 rounded-2xl p-4 text-sm leading-relaxed text-gray-900 dark:text-zinc-300 placeholder:text-gray-400 dark:placeholder:text-zinc-700 transition-all"
          />
          <div className="absolute bottom-2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
        </div>

        <div className="mt-4">
          <Button
            onClick={handleSave}
            disabled={status === "saving" || notes.trim() === ""}
            className={cn(
              "w-full h-10 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
              status === "saved"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-orange-500 dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-zinc-200",
            )}
          >
            <AnimatePresence mode="wait">
              {status === "saving" ? (
                <motion.div
                  key="saving"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Loader2 className="h-3 w-3 animate-spin" /> Đang lưu...
                </motion.div>
              ) : status === "saved" ? (
                <motion.div
                  key="saved"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Check className="h-3 w-3" /> Đã lưu
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Lưu ghi chú
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
