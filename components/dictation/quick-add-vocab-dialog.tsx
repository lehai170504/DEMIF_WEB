"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BookmarkPlus,
  BookOpen,
  PenLine,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useVocabularySuggestions } from "@/hooks/use-vocabulary";
import { motion } from "framer-motion";
import { VocabularySuggestionsResponse } from "@/types/vocabulary.type";

interface QuickAddVocabDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  word: string;
  lessonId: string;
  topic: string;
  contextSentence: string;
  isAdding: boolean;
  onSave: (data: {
    lessonId: string;
    word: string;
    topic: string;
    meaning: string;
    contextSentence: string;
    note: string;
  }) => void;
}

export function QuickAddVocabDialog({
  isOpen,
  onOpenChange,
  word,
  lessonId,
  topic,
  contextSentence,
  isAdding,
  onSave,
}: QuickAddVocabDialogProps) {
  const [meaning, setMeaning] = useState("");
  const [note, setNote] = useState("");

  const { data: suggestions, isLoading: isLoadingSuggestions } =
    useVocabularySuggestions(lessonId);

  const suggestedMeaning = useMemo(() => {
    const response = suggestions as VocabularySuggestionsResponse;
    if (!response?.items || !word) return null;

    const found = response.items.find(
      (item) => item.word.toLowerCase() === word.toLowerCase(),
    );

    return (found as any)?.meaning || null;
  }, [suggestions, word]);

  // Reset form mỗi khi mở dialog
  useEffect(() => {
    if (isOpen) {
      setMeaning("");
      setNote("");
    }
  }, [isOpen, word]);

  const handleSave = () => {
    onSave({
      lessonId,
      word: word.trim(),
      topic: topic.trim(),
      meaning: meaning.trim(),
      contextSentence,
      note: note.trim(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] border-none bg-white dark:bg-[#0D0D0D] font-mono p-8 shadow-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
            <div className="p-2 rounded-xl bg-orange-500/10 text-[#FF7A00]">
              <BookOpen size={20} />
            </div>
            Thêm vào sổ tay
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
              Từ vựng đã chọn
            </Label>
            <Input
              value={word}
              readOnly
              className="h-12 rounded-2xl bg-gray-50 dark:bg-white/5 font-black border-none text-orange-500 focus-visible:ring-0"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Nghĩa tiếng Việt *
              </Label>
              {/* Hiệu ứng loading nhẹ khi đang tìm gợi ý */}
              {isLoadingSuggestions && (
                <Loader2 size={10} className="animate-spin text-orange-500" />
              )}
            </div>

            <div className="relative group">
              <PenLine className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
              <Input
                autoFocus
                placeholder="Nhập nghĩa để dễ nhớ..."
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                className="h-12 pl-12 rounded-2xl border-gray-100 dark:border-white/5 bg-transparent focus-visible:ring-orange-500/50 text-gray-900 dark:text-white"
              />
            </div>

            {/* PHẦN GỢI Ý THÔNG MINH NẰM Ở ĐÂY */}
            {suggestedMeaning && (
              <motion.button
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                type="button"
                onClick={() => setMeaning(suggestedMeaning)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[10px] text-orange-600 dark:text-orange-400 font-bold hover:bg-orange-500/20 transition-all cursor-pointer group"
              >
                <Sparkles size={12} className="group-hover:animate-pulse" />
                Gợi ý:{" "}
                <span className="underline italic">{suggestedMeaning}</span>
              </motion.button>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
              Ghi chú (Note)
            </Label>
            <Textarea
              placeholder="Ví dụ: collocation, từ trái nghĩa..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="rounded-2xl border-gray-100 dark:border-white/5 bg-transparent min-h-[100px] focus-visible:ring-orange-500/50 p-4 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSave}
            disabled={!meaning.trim() || isAdding}
            className="w-full h-14 rounded-2xl bg-[#FF7A00] hover:bg-orange-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-500/20 transition-all active:scale-95"
          >
            {isAdding ? (
              <Loader2 className="animate-spin mr-2 w-5 h-5" />
            ) : (
              <BookmarkPlus className="mr-2 w-5 h-5" />
            )}
            Xác nhận hệ thống
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
