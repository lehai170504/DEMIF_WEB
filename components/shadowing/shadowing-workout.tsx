"use client";

import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ShadowingRecorder } from "./shadowing-recorder";
import { ShadowingTextFallback } from "./shadowing-text-fallback";

interface ShadowingWorkoutProps {
  isLoading: boolean;
  segmentsLength: number;
  isRecording: boolean;
  handleStopRecording: () => void;
  handleRecord: () => void;
  checkResult: any;
  isChecking: boolean;
  handleNext: () => void;
  handleRetry: () => void;
  speechSupported: boolean;
  userText: string;
  setUserText: (val: string) => void;
  handleCheckText: () => void;
}

export function ShadowingWorkout({
  isLoading,
  segmentsLength,
  isRecording,
  handleStopRecording,
  handleRecord,
  checkResult,
  isChecking,
  handleNext,
  handleRetry,
  speechSupported,
  userText,
  setUserText,
  handleCheckText,
}: ShadowingWorkoutProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (segmentsLength === 0) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-500 text-sm font-mono">
        Bài học chưa có dữ liệu cho cấp độ này.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ShadowingRecorder
        isRecording={isRecording}
        onRecord={isRecording ? handleStopRecording : handleRecord}
        checkResult={checkResult}
        isChecking={isChecking}
        onNext={handleNext}
        onRetry={handleRetry}
        speechSupported={speechSupported}
      />

      <AnimatePresence>
        {!checkResult && !isRecording && (
          <ShadowingTextFallback
            userText={userText}
            isChecking={isChecking}
            onUserTextChange={setUserText}
            onCheckText={handleCheckText}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
