"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Send,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from "lucide-react";
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
      word, // Từ đúng
      userWord: userWords[i] || "...", // Từ người dùng gõ
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
        (feedback.filter((f) => f.isCorrect).length / feedback.length) * 100
      )
    : 0;

  return (
    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
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
                <div className="p-2 bg-orange-50 rounded-xl text-orange-600">
                  <Send className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold tracking-tight">
                  Nội dung nghe được
                </h3>
              </div>

              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Nhập chính xác những gì bạn vừa nghe..."
                className="min-h-[180px] text-lg bg-slate-50/50 border-none focus-visible:ring-2 focus-visible:ring-orange-500/20 rounded-3xl p-6 transition-all"
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
                className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
              >
                KIỂM TRA ĐÁP ÁN
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="result-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              {/* Score Header */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative flex items-center justify-center">
                  {/* Progress Circle giả lập */}
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-100"
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
                          : "text-orange-500"
                      )}
                    />
                  </svg>
                  <span className="absolute text-3xl font-black">
                    {accuracyScore}%
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold italic flex items-center gap-2 justify-center">
                    {accuracyScore >= 80 ? (
                      <>
                        <Sparkles className="text-yellow-500" /> Tuyệt vời!
                      </>
                    ) : (
                      "Cố gắng lên!"
                    )}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Độ chính xác của đoạn hội thoại
                  </p>
                </div>
              </div>

              {/* Detailed Feedback List */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 px-2">
                  <AlertCircle className="h-3 w-3" /> Chi tiết từng từ
                </div>
                <div className="flex flex-wrap gap-3 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
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
                          "px-3 py-1 rounded-full text-sm font-bold border-2 transition-all",
                          item.isCorrect
                            ? "bg-white border-emerald-100 text-emerald-600 shadow-sm"
                            : "bg-rose-50 border-rose-100 text-rose-500"
                        )}
                      >
                        {item.word}
                      </span>
                      {!item.isCorrect && (
                        <span className="text-[10px] mt-1 font-medium text-slate-400 line-through">
                          {item.userWord}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={reset}
                  className="flex-1 h-14 rounded-2xl font-bold border-2 border-slate-100 hover:bg-slate-50 transition-all"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> LÀM LẠI
                </Button>
                <Button
                  asChild
                  className="flex-[2] h-14 rounded-2xl font-bold bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-200"
                >
                  <a href="#next-lesson">BÀI TIẾP THEO</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
