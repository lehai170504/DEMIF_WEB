"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckVoice } from "@/hooks/use-lesson";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DictationVoiceCardProps {
  lessonId: string;
  segmentIndex: number;
  level: string;
  onSuccess?: () => void;
}

export function DictationVoiceCard({
  lessonId,
  segmentIndex,
  level,
  onSuccess,
}: DictationVoiceCardProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const checkVoiceMutation = useCheckVoice(lessonId, segmentIndex);

  // Khởi tạo Speech Recognition
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Mặc định học tiếng Anh
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const result = event.results[0][0];
      const text = result.transcript;
      const confidence = result.confidence;

      setTranscript(text);

      // Gửi lên server ngay sau khi có kết quả từ trình duyệt
      checkVoiceMutation.mutate(
        {
          level,
          spokenText: text,
          speechConfidence: confidence,
          timeSpentSeconds: 5, // Giả định thời gian thực hiện
        },
        {
          onSuccess: (data) => {
            if (data.isPassed) {
              toast.success("Phát âm chính xác!");
              onSuccess?.();
            } else {
              toast.error("Chưa chính xác, hãy thử lại.");
            }
          },
        },
      );
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="p-6 rounded-[2rem] bg-white dark:bg-[#111113] border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-1 rounded-md">
          SEGMENT {segmentIndex + 1}
        </span>

        <Button
          onClick={startListening}
          disabled={checkVoiceMutation.isPending}
          className={cn(
            "rounded-full w-12 h-12 transition-all",
            isListening
              ? "bg-red-500 animate-pulse"
              : "bg-blue-600 hover:bg-blue-700",
          )}
        >
          {checkVoiceMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : isListening ? (
            <MicOff size={20} />
          ) : (
            <Mic size={20} />
          )}
        </Button>
      </div>

      {transcript && (
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200">
          <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-tighter">
            Bạn đã nói:
          </p>
          <p className="text-lg font-medium italic text-blue-500">
            "{transcript}"
          </p>
        </div>
      )}

      {checkVoiceMutation.data && (
        <div
          className={cn(
            "flex items-center gap-2 p-3 rounded-xl font-bold text-sm",
            checkVoiceMutation.data.isPassed
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-red-500/10 text-red-500",
          )}
        >
          {checkVoiceMutation.data.isPassed ? (
            <CheckCircle2 size={16} />
          ) : (
            <XCircle size={16} />
          )}
          {checkVoiceMutation.data.isPassed ? "Chính xác" : "Cố gắng hơn nữa"}
          <span className="ml-auto">
            Score: {checkVoiceMutation.data.accuracy}%
          </span>
        </div>
      )}
    </div>
  );
}
