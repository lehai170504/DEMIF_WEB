"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, BookOpen, Sparkles, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VocabItem {
  word: string;
  meaning: string;
}

export function VocabularyPanel({ lessonVocab }: { lessonVocab: string[] }) {
  const [vocabList, setVocabList] = useState<VocabItem[]>(
    lessonVocab.map((word) => ({ word, meaning: "" }))
  );
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");

  const addVocab = () => {
    if (newWord.trim()) {
      setVocabList([
        { word: newWord.trim(), meaning: newMeaning.trim() },
        ...vocabList,
      ]);
      setNewWord("");
      setNewMeaning("");
    }
  };

  const removeVocab = (index: number) => {
    setVocabList(vocabList.filter((_, i) => i !== index));
  };

  return (
    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white dark:bg-slate-900 rounded-[2rem] sticky top-24 overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
      <CardContent className="p-0 flex flex-col h-full">
        {/* HEADER */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-50 dark:bg-orange-500/10 rounded-2xl">
              <BookOpen className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Học thuật
              </h3>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Sổ tay từ vựng
              </p>
            </div>
          </div>
          <Sparkles className="h-4 w-4 text-orange-300 animate-pulse" />
        </div>

        {/* VOCAB LIST AREA - Cố định chiều cao có scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-hide min-h-[200px]">
          <AnimatePresence initial={false}>
            {vocabList.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                  <PlusCircle className="text-slate-200" />
                </div>
                <p className="text-xs font-medium text-slate-400 italic px-4">
                  Chưa có từ vựng nào. Hãy thêm từ mới bên dưới!
                </p>
              </motion.div>
            ) : (
              vocabList.map((item, index) => (
                <motion.div
                  key={item.word + index}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 border border-transparent hover:border-orange-100 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 pr-6">
                      <p className="font-bold text-slate-900 dark:text-slate-100 leading-none">
                        {item.word}
                      </p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 italic">
                        {item.meaning || "Chưa có định nghĩa"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeVocab(index)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* INPUT FORM - Luôn nằm cố định ở chân card */}
        <div className="p-6 bg-slate-50/80 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-3">
            <div className="space-y-2">
              <Input
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Từ mới..."
                className="h-10 rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm focus-visible:ring-orange-500/20"
              />
              <Input
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                placeholder="Định nghĩa (nếu có)..."
                className="h-10 rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm focus-visible:ring-orange-500/20"
              />
            </div>
            <Button
              onClick={addVocab}
              disabled={!newWord.trim()}
              className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 mr-2" />
              THÊM TỪ VỰNG
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
