"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, BookOpen, Sparkles, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VocabItem {
  word: string;
  meaning: string;
}

export function VocabularyPanel({ lessonVocab }: { lessonVocab: string[] }) {
  const [vocabList, setVocabList] = useState<VocabItem[]>(
    lessonVocab.map((word) => ({ word, meaning: "" })),
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
    <Card className="border border-gray-200 dark:border-white/10 bg-white dark:bg-[#18181b] rounded-[2rem] shadow-xl overflow-hidden flex flex-col max-h-[calc(100vh-120px)] sticky top-24">
      <CardContent className="p-0 flex flex-col h-full">
        {/* HEADER */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
              <BookOpen className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-zinc-500">
                Học thuật
              </h3>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Sổ tay từ vựng</p>
            </div>
          </div>
          <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 scrollbar-none min-h-[200px]">
          <AnimatePresence initial={false}>
            {vocabList.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <PlusCircle className="w-10 h-10 text-gray-400 dark:text-zinc-700 mb-3" />
                <p className="text-xs text-gray-500 dark:text-zinc-500 px-4">
                  Chưa có từ vựng nào.
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
                  className="group relative p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5 pr-6">
                      <p className="font-bold text-gray-900 dark:text-white text-sm">
                        {item.word}
                      </p>
                      <p className="text-xs font-medium text-gray-600 dark:text-zinc-500 italic">
                        {item.meaning || "Chưa có định nghĩa"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeVocab(index)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 dark:text-zinc-500 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* INPUT */}
        <div className="p-4 bg-black/20 border-t border-white/5">
          <div className="space-y-2">
            <Input
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="Từ mới..."
              className="h-9 rounded-lg border-white/10 bg-black/20 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500/50"
            />
            <Input
              value={newMeaning}
              onChange={(e) => setNewMeaning(e.target.value)}
              placeholder="Định nghĩa..."
              className="h-9 rounded-lg border-white/10 bg-black/20 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500/50"
            />
            <Button
              onClick={addVocab}
              disabled={!newWord.trim()}
              className="w-full h-10 bg-white text-black hover:bg-zinc-200 rounded-lg font-bold text-xs uppercase tracking-widest mt-2"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Thêm từ
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
