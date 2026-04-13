"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Loader2,
  SpellCheck,
  ListTodo,
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickAddVocabDialog } from "./quick-add-vocab-dialog";

interface DictationWorkoutProps {
  currentIdx: number;
  totalSegments: number;
  currentSegment: any;
  answers: Record<string, string>;
  showHints: boolean;
  isChecking: boolean;
  isSubmitting: boolean;
  isAddingVocab?: boolean;
  filledBlanks: number;
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  onToggleHints: () => void;
  onInputChange: (currentIdx: number, position: number, value: string) => void;
  onKeyDown: (e: React.KeyboardEvent, key: string) => void;
  onCheckSegment: (idx: number) => void;
  onSelectSegment: (idx: number) => void;
  onSubmit: () => void;
  onAddVocab?: (data: any) => void;
  lessonId: string;
  lessonCategory: string;
}

export function DictationWorkout({
  currentIdx,
  totalSegments,
  currentSegment,
  answers,
  showHints,
  isChecking,
  isSubmitting,
  isAddingVocab = false,
  filledBlanks,
  inputRefs,
  onToggleHints,
  onInputChange,
  onKeyDown,
  onCheckSegment,
  onSelectSegment,
  onSubmit,
  onAddVocab,
  lessonId,
  lessonCategory,
}: DictationWorkoutProps) {
  const [selectedWord, setSelectedWord] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!currentSegment) return null;

  const handleOpenDialog = (word: any) => {
    const safeWord = (
      typeof word === "string" ? word : String(word || "")
    ).trim();
    if (!safeWord) return;
    setSelectedWord(safeWord);
    setIsDialogOpen(true);
  };

  // Logic lấy ngữ cảnh câu
  const getContextSentence = () => {
    return currentSegment.words
      .map((w: any) => {
        const val = w.isBlank
          ? answers[`${currentIdx}-${w.position}`] || w.text
          : w.text;
        return val + (w.punctuation || "");
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <motion.div
      key={currentIdx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col bg-white dark:bg-card border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-6 pb-8 shadow-xl relative transition-all"
    >
      {/* 1. Progress Indicator */}
      <div className="absolute top-0 left-0 p-8 flex items-center gap-3 opacity-10 pointer-events-none">
        <span className="text-4xl font-black text-gray-900 dark:text-white">
          #{currentIdx + 1}
        </span>
        <div className="h-1 w-20 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 dark:bg-white transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / totalSegments) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. Metadata */}
      <div className="flex flex-col items-center mb-4 text-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">
          Đang lắng nghe
        </h3>
        <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">
          {currentSegment.startTime.toFixed(1)}s —{" "}
          {currentSegment.endTime.toFixed(1)}s
        </p>
      </div>

      {/* 3. Main content: Text & Inputs */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-6 leading-[1.6] text-lg font-black max-w-4xl">
          {currentSegment.words.map((word: any, wordIndex: number) => {
            const isBlank = word.isBlank;
            const inputKey = `${currentIdx}-${word.position}`;
            const wordText = isBlank
              ? answers[inputKey] || word.text
              : word.text;

            return (
              <div key={wordIndex} className="relative group inline-block pr-1">
                {isBlank ? (
                  <div className="relative inline-block">
                    <input
                      ref={(el) => {
                        inputRefs.current[inputKey] = el;
                      }}
                      type="text"
                      spellCheck={false}
                      autoComplete="off"
                      disabled={isChecking}
                      placeholder={
                        showHints
                          ? (word.hint ?? "•".repeat(word.length || 4))
                          : "•".repeat(word.length || 4)
                      }
                      value={answers[inputKey] || ""}
                      onKeyDown={(e) => onKeyDown(e, inputKey)}
                      onChange={(e) =>
                        onInputChange(currentIdx, word.position, e.target.value)
                      }
                      className={cn(
                        "px-0 pt-2 pb-3 border-b-4 bg-transparent outline-none transition-all text-gray-900 dark:text-white font-black text-center tracking-widest",
                        answers[inputKey]
                          ? "border-orange-500/50 focus:border-orange-500"
                          : "border-gray-200 dark:border-white/10 focus:border-gray-300 dark:focus:border-white/30",
                      )}
                      style={{
                        width: `${Math.max(word.length || 4, 3) * 22}px`,
                      }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-gray-400 dark:text-white/20 tracking-widest pointer-events-none group-hover:text-orange-500/40 transition-colors uppercase">
                      {word.length || 4} ký tự
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-900/40 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors cursor-help mb-1">
                    {word.text}
                    {word.punctuation}
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenDialog(wordText);
                  }}
                  className="absolute -top-4 -right-1 opacity-0 group-hover:opacity-100 text-[#FF7A00] hover:scale-125 transition-all bg-white dark:bg-zinc-800 rounded-full shadow-md p-[2px] z-10"
                  title="Thêm vào từ vựng"
                >
                  <BookmarkPlus size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Action Bar */}
      <div className="mt-4 pt-4 font-mono border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-400 dark:text-zinc-500">
            <kbd className="px-1.5 py-0.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-[9px] font-sans">
              Enter
            </kbd>
            <span className="text-[9px] font-bold uppercase tracking-widest">
              Tiếp theo
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 dark:text-zinc-500">
            <kbd className="px-1.5 py-0.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-[9px] font-sans">
              Ctrl
            </kbd>
            <span className="text-[9px] font-bold uppercase tracking-widest">
              Nghe lại
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleHints}
            className="h-10 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-widest"
          >
            {showHints ? "Ẩn gợi ý" : "Hiện gợi ý"}
          </Button>
          <Button
            onClick={() => onCheckSegment(currentIdx)}
            disabled={isChecking}
            className="h-10 px-8 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20"
          >
            {isChecking ? (
              <Loader2 className="w-3 h-3 animate-spin mr-2" />
            ) : (
              <SpellCheck className="w-3 h-3 mr-2" />
            )}
            Kiểm tra nhanh
          </Button>
        </div>
      </div>

      {/* 5. Footer Navigation */}
      <div className="mt-6 pt-4 font-mono border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => onSelectSegment(Math.max(0, currentIdx - 1))}
          disabled={currentIdx === 0}
          className="px-4 h-10 rounded-xl text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 font-black uppercase text-[10px] tracking-widest transition-all"
        >
          <ChevronLeft className="w-3 h-3 mr-1" /> Câu trước
        </Button>

        {currentIdx < totalSegments - 1 ? (
          <Button
            onClick={() => onSelectSegment(currentIdx + 1)}
            className="font-mono px-8 h-10 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl"
          >
            Câu tiếp theo <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || filledBlanks === 0}
            className="px-8 h-10 rounded-xl bg-orange-600 text-white hover:bg-orange-500 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-orange-500/20"
          >
            {isSubmitting ? (
              <Loader2 className="w-3 h-3 animate-spin mr-2" />
            ) : (
              <ListTodo className="w-3 h-3 mr-2" />
            )}
            Nộp bài tập
          </Button>
        )}
      </div>

      <QuickAddVocabDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        word={selectedWord}
        lessonId={lessonId}
        topic={lessonCategory || "General"}
        contextSentence={getContextSentence()}
        isAdding={isAddingVocab}
        onSave={(data) => {
          if (onAddVocab) onAddVocab(data);
          setIsDialogOpen(false);
        }}
      />
    </motion.div>
  );
}
