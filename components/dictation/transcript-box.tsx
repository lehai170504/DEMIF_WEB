"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TranscriptBoxProps {
  correctTranscript: string;
  onSubmit: (userInput: string) => void;
}

export function TranscriptBox({
  correctTranscript,
  onSubmit,
}: TranscriptBoxProps) {
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<
    { word: string; isCorrect: boolean; userWord?: string }[]
  >([]);

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const userWords = userInput.trim().split(/\s+/);
    const correctWords = correctTranscript.trim().split(/\s+/);

    const wordFeedback = correctWords.map((word, i) => ({
      word,
      userWord: userWords[i] || "...",
      isCorrect:
        word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") ===
        userWords[i]?.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ""),
    }));

    setFeedback(wordFeedback);
    setSubmitted(true);
    onSubmit(userInput);
  };

  const reset = () => {
    setSubmitted(false);
    setUserInput("");
    setFeedback([]);
  };

  const accuracyScore = submitted
    ? Math.round(
        (feedback.filter((f) => f.isCorrect).length / feedback.length) * 100,
      )
    : 0;

  return (
    <Card className="border border-white/10 bg-[#18181b] rounded-[2.5rem] overflow-hidden shadow-2xl">
      <CardContent className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="input-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/20">
                  <Send className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white">
                  Nội dung nghe được
                </h3>
              </div>

              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Nhập chính xác những gì bạn vừa nghe..."
                className="min-h-[180px] text-lg bg-black/20 border-white/5 focus-visible:ring-2 focus-visible:ring-orange-500/50 rounded-3xl p-6 transition-all text-white placeholder:text-zinc-600 resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && userInput.trim()) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />

              <Button
                onClick={handleSubmit}
                disabled={!userInput.trim()}
                className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-2xl font-black text-lg uppercase tracking-widest shadow-lg transition-all active:scale-[0.98]"
              >
                Kiểm tra đáp án
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="result-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              {/* Score Circular Progress */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-white/5"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364}
                      strokeDashoffset={364 - (364 * accuracyScore) / 100}
                      className={cn(
                        "transition-all duration-1000 ease-out",
                        accuracyScore > 70
                          ? "text-emerald-500"
                          : "text-orange-500",
                      )}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-3xl font-black text-white">
                    {accuracyScore}%
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold italic flex items-center gap-2 justify-center text-white">
                    {accuracyScore >= 80 ? (
                      <>
                        <Sparkles className="text-yellow-500 fill-current" />{" "}
                        Tuyệt vời!
                      </>
                    ) : (
                      "Cố gắng lên!"
                    )}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Độ chính xác của bài làm
                  </p>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">
                  <AlertCircle className="h-3 w-3" /> Chi tiết từng từ
                </div>
                <div className="flex flex-wrap gap-3 p-6 bg-black/20 rounded-[2rem] border border-white/5">
                  {feedback.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex flex-col items-center"
                    >
                      <span
                        className={cn(
                          "px-3 py-1 rounded-lg text-sm font-bold border transition-all",
                          item.isCorrect
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/10 border-rose-500/20 text-rose-400",
                        )}
                      >
                        {item.word}
                      </span>
                      {!item.isCorrect && (
                        <span className="text-[10px] mt-1 font-medium text-zinc-500 line-through decoration-zinc-500/50">
                          {item.userWord}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={reset}
                  className="flex-1 h-14 rounded-2xl font-bold border-white/10 bg-transparent text-white hover:bg-white/5 transition-all"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> LÀM LẠI
                </Button>
                <Button
                  asChild
                  className="flex-[2] h-14 rounded-2xl font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 uppercase tracking-wide"
                >
                  <a href="#next-lesson">Bài tiếp theo</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
