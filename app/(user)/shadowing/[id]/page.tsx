"use client";

import { useState } from "react";
import { lessons } from "@/lib/data/lessons";
import { notFound } from "next/navigation";
import { ShadowingHeader } from "@/components/shadowing/shadowing-header";
import { ShadowingPlayer } from "@/components/shadowing/shadowing-player";
import { ShadowingRecorder } from "@/components/shadowing/shadowing-recorder";
import { ShadowingResult } from "@/components/shadowing/shadowing-result";

export default function ShadowingPracticePage({
  params,
}: {
  params: { id: string };
}) {
  const lesson = lessons.find((l) => l.id === params.id);

  if (!lesson) {
    notFound();
  }

  // Mock data - Trong thực tế có thể lấy từ lesson.sentences
  const sentences = [
    {
      id: 1,
      original: "Hello, how are you today?",
      translation: "Xin chào, bạn hôm nay thế nào?",
      duration: 3.2,
    },
    {
      id: 2,
      original: "I would like to order a coffee, please.",
      translation: "Tôi muốn gọi một ly cà phê, làm ơn.",
      duration: 4.1,
    },
    {
      id: 3,
      original: "The weather is beautiful this morning.",
      translation: "Thời tiết đẹp vào buổi sáng nay.",
      duration: 3.8,
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scores, setScores] = useState<
    { pronunciation: number; timing: number; tone: number }[]
  >([]);
  const [currentScore, setCurrentScore] = useState({
    pronunciation: 0,
    timing: 0,
    tone: 0,
  });

  const currentSentence = sentences[currentIdx];
  const overallProgress =
    ((currentIdx + (isCompleted ? 1 : 0)) / sentences.length) * 100;

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), currentSentence.duration * 1000);
    }
  };

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setCurrentScore({ pronunciation: 0, timing: 0, tone: 0 });
      setTimeout(() => {
        setIsRecording(false);
        const mockScore = {
          pronunciation: Math.floor(Math.random() * 40) + 60,
          timing: Math.floor(Math.random() * 30) + 70,
          tone: Math.floor(Math.random() * 35) + 65,
        };
        setCurrentScore(mockScore);
        const newScores = [...scores];
        newScores[currentIdx] = mockScore;
        setScores(newScores);
      }, 3000);
    }
  };

  const handleNext = () => {
    if (currentIdx < sentences.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowTranslation(false);
      setCurrentScore({ pronunciation: 0, timing: 0, tone: 0 });
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setIsCompleted(false);
    setScores([]);
    setCurrentScore({ pronunciation: 0, timing: 0, tone: 0 });
    setShowTranslation(false);
  };

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (sum, score) =>
              sum + score.pronunciation + score.timing + score.tone,
            0,
          ) /
            (scores.length * 3),
        )
      : 0;

  if (isCompleted) {
    return (
      <ShadowingResult
        score={averageScore}
        onRestart={handleRestart}
        details={[
          {
            label: "Phát âm",
            value:
              Math.round(
                scores.reduce((s, x) => s + x.pronunciation, 0) / scores.length,
              ) || 0,
            color: "text-emerald-400",
          },
          {
            label: "Nhịp điệu",
            value:
              Math.round(
                scores.reduce((s, x) => s + x.timing, 0) / scores.length,
              ) || 0,
            color: "text-blue-400",
          },
          {
            label: "Ngữ điệu",
            value:
              Math.round(
                scores.reduce((s, x) => s + x.tone, 0) / scores.length,
              ) || 0,
            color: "text-purple-400",
          },
        ]}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono text-gray-900 dark:text-zinc-100 selection:bg-orange-500/30">
      <ShadowingHeader
        title={lesson.title}
        current={currentIdx + 1}
        total={sentences.length}
        progress={overallProgress}
      />

      <main className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ShadowingPlayer
            isPlaying={isPlaying}
            onPlayPause={handlePlayAudio}
            onNext={() =>
              setCurrentIdx(Math.min(sentences.length - 1, currentIdx + 1))
            }
            onPrev={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            canNext={currentIdx < sentences.length - 1}
            canPrev={currentIdx > 0}
            sentence={currentSentence}
            showTranslation={showTranslation}
            onToggleTranslation={() => setShowTranslation(!showTranslation)}
          />

          <ShadowingRecorder
            isRecording={isRecording}
            onRecord={handleRecord}
            scores={currentScore}
            onNext={handleNext}
            onRetry={handleRecord}
          />
        </div>
      </main>
    </div>
  );
}
