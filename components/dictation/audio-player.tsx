"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Lock, Info, Headset } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  audioUrl: string;
  duration: number;
  maxPlays: number;
  onPlayCountChange: (count: number) => void;
}

export function AudioPlayer({
  audioUrl,
  duration,
  maxPlays,
  onPlayCountChange,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playsRemaining = maxPlays - playCount;
  const isLimitReached = playsRemaining <= 0;

  // Tạo dữ liệu sóng âm cố định (Static Waveform data) để không bị nhảy lung tung
  const barsData = useMemo(() => {
    return Array.from({ length: 60 }, () => Math.random() * 0.6 + 0.2);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      const newCount = playCount + 1;
      setPlayCount(newCount);
      onPlayCountChange(newCount);
      audio.currentTime = 0;
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playCount, onPlayCountChange]);

  // Canvas Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      const barWidth = 4;
      const gap = 3;
      const progress = currentTime / duration;

      ctx.clearRect(0, 0, width, height);

      barsData.forEach((val, i) => {
        const x = i * (barWidth + gap);
        // Hiệu ứng "nhảy" nhẹ khi đang phát
        const bounce = isPlaying ? Math.sin(Date.now() / 150 + i) * 5 : 0;
        const barHeight = val * height + bounce;

        const isPast = i / barsData.length < progress;

        ctx.fillStyle = isPast ? "#FF7A00" : "#E2E8F0"; // Orange if past, Slate-200 if future

        // Vẽ bo góc cho các thanh bar
        const radius = 2;
        const y = (height - barHeight) / 2;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, radius);
        ctx.fill();
      });
    };

    let animationId: number;
    const render = () => {
      draw();
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationId);
  }, [currentTime, duration, isPlaying, barsData]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || (isLimitReached && !isPlaying)) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-800">
        {/* Lượt nghe - Badge Design */}
        <div className="flex justify-between items-center mb-8">
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors",
              isLimitReached
                ? "bg-red-50 text-red-600"
                : "bg-orange-50 text-orange-600"
            )}
          >
            {isLimitReached ? (
              <Lock className="h-3.5 w-3.5" />
            ) : (
              <Headset className="h-3.5 w-3.5" />
            )}
            {isLimitReached
              ? "Hết lượt nghe"
              : `Còn ${playsRemaining} lượt nghe`}
          </div>

          <div className="text-xs font-bold font-mono text-slate-400">
            {Math.floor(currentTime)}s / {duration}s
          </div>
        </div>

        {/* Waveform Display */}
        <div className="relative h-24 mb-10 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={420}
            height={80}
            className="w-full h-full cursor-pointer"
            onClick={(e) => {
              // Logic tua nhanh nếu cần (tùy chọn)
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = 0;
              setCurrentTime(0);
            }}
            className="rounded-full w-12 h-12 hover:bg-slate-100 text-slate-400"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={togglePlay}
              disabled={isLimitReached && !isPlaying}
              className={cn(
                "w-56 h-16 rounded-[2rem] text-base font-heavy shadow-xl transition-all duration-500",
                isPlaying
                  ? "bg-slate-900 hover:bg-slate-800 shadow-slate-200"
                  : "bg-[#FF7A00] hover:bg-[#FF8A1C] shadow-orange-200"
              )}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Pause className="h-6 w-6 fill-current" /> TẠM DỪNG
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {isLimitReached ? (
                      <Lock className="h-5 w-5" />
                    ) : (
                      <Play className="h-6 w-6 fill-current" />
                    )}
                    {isLimitReached ? "HẾT LƯỢT" : "NGHE NGAY"}
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <div className="w-12 h-12 flex items-center justify-center text-slate-300">
            <Info className="h-5 w-5 cursor-help" />
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="auto" />
    </div>
  );
}
