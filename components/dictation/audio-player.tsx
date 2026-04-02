"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Lock, Info, Headset } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playsRemaining = maxPlays - playCount;
  const isLimitReached = playsRemaining <= 0;

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

  // Canvas Drawing (Neon Style)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      const barWidth = 6;
      const gap = 4;
      const progress = currentTime / duration;
      const isLightMode = theme === "light";

      ctx.clearRect(0, 0, width, height);

      barsData.forEach((val, i) => {
        const x = i * (barWidth + gap);
        const bounce = isPlaying ? Math.sin(Date.now() / 150 + i) * 10 : 0;
        const barHeight = val * height * 0.7 + bounce + 20;

        const isPast = i / barsData.length < progress;

        // Gradient & Glow
        if (isPast) {
          ctx.fillStyle = "#FF7A00";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(255, 122, 0, 0.5)";
        } else {
          ctx.fillStyle = isLightMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)";
          ctx.shadowBlur = 0;
        }

        const radius = 2;
        const y = (height - barHeight) / 2;

        // Vẽ Rounded Rect thủ công (hoặc dùng roundRect nếu browser support)
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, Math.max(barHeight, 2), radius);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, barWidth, Math.max(barHeight, 2));
        }
      });
    };

    let animationId: number;
    const render = () => {
      draw();
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationId);
  }, [currentTime, duration, isPlaying, barsData, theme]);

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
      <div className="relative bg-white dark:bg-[#18181b] rounded-[2.5rem] p-8 shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
        {/* Ambient Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-orange-500/5 blur-[60px] pointer-events-none" />

        {/* Info Bar */}
        <div className="relative z-10 flex justify-between items-center mb-8">
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors border",
              isLimitReached
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : "bg-orange-500/10 text-orange-400 border-orange-500/20",
            )}
          >
            {isLimitReached ? (
              <Lock className="h-3 w-3" />
            ) : (
              <Headset className="h-3 w-3" />
            )}
            {isLimitReached ? "Hết lượt nghe" : `Còn ${playsRemaining} lượt`}
          </div>

          <div className="text-xs font-bold font-mono text-gray-500 dark:text-zinc-500">
            {Math.floor(currentTime)}s <span className="text-zinc-700">/</span>{" "}
            {duration}s
          </div>
        </div>

        {/* Waveform */}
        <div className="relative z-10 h-24 mb-10 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={420}
            height={80}
            className="w-full h-full cursor-pointer"
            onClick={(e) => {
              // Add seek logic here if needed
            }}
          />
        </div>

        {/* Controls */}
        <div className="relative z-10 flex items-center justify-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = 0;
              setCurrentTime(0);
            }}
            className="rounded-full w-12 h-12 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={togglePlay}
              disabled={isLimitReached && !isPlaying}
              className={cn(
                "w-56 h-16 rounded-[2rem] text-base font-black shadow-lg transition-all duration-500 border border-white/5",
                isPlaying
                  ? "bg-zinc-800 hover:bg-zinc-700 text-white shadow-black/50"
                  : "bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] hover:shadow-orange-500/30 text-white",
              )}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Pause className="h-6 w-6 fill-current" /> TẠM DỪNG
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
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

          <div className="w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors">
            <Info className="h-5 w-5 cursor-help" />
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="auto" />
    </div>
  );
}
