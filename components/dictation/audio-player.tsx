"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Volume2, Maximize, Lock } from "lucide-react" // Thêm icon
import { motion } from "framer-motion" // Thêm Framer Motion

interface AudioPlayerProps {
  audioUrl: string
  duration: number
  maxPlays: number
  onPlayCountChange: (count: number) => void
}

export function AudioPlayer({ audioUrl, duration, maxPlays, onPlayCountChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playCount, setPlayCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const playsRemaining = maxPlays - playCount
  const isLimitReached = playsRemaining <= 0

  // Quản lý sự kiện Audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      const newCount = playCount + 1
      setPlayCount(newCount)
      onPlayCountChange(newCount)
      // Đặt lại thời gian về 0 sau khi kết thúc để lượt nghe tiếp theo bắt đầu lại
      audio.currentTime = 0
      setCurrentTime(0)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [playCount, onPlayCountChange])

  // Hiển thị Sóng âm (Waveform Visualization)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      const width = canvas.width
      const height = canvas.height
      const barCount = 70 
      const barWidth = width / barCount
      const progress = currentTime / duration

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < barCount; i++) {
        // Tạo hiệu ứng sóng âm dựa trên hàm sin và thời gian hiện tại
        const barHeight = Math.sin(i * 0.3 + currentTime) * height * 0.3 + height * 0.4 
        const x = i * barWidth
        const isPast = i / barCount < progress

        // Màu sắc theo chủ đề cam
        ctx.fillStyle = isPast ? "#FF7A00" : "#FFE5C4" 
        ctx.fillRect(x, (height - barHeight) / 2, barWidth - 1.5, barHeight)
      }
    }

    draw()
    // Cập nhật sóng âm nhanh hơn để mượt mà hơn
    const interval = isPlaying ? setInterval(draw, 50) : null 

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentTime, duration, isPlaying])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (!isLimitReached) {
        audio.play()
        setIsPlaying(true)
      }
    }
  }

  const resetAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-orange-200/50 border border-orange-100">

        {/* Canvas Sóng âm */}
        <canvas ref={canvasRef} width={800} height={100} className="w-full h-[100px] rounded-xl mb-6 shadow-inner bg-orange-50/50" />

        {/* Thông tin thời gian và số lượt nghe */}
        <div className="flex items-center justify-between mb-6 text-sm">
          
          {/* Lượt nghe còn lại */}
          <div className={`flex items-center gap-1 font-semibold ${isLimitReached ? 'text-red-500' : 'text-slate-700'}`}>
            {isLimitReached ? (
                <>
                    <Lock className="h-4 w-4" />
                    Đã hết lượt nghe
                </>
            ) : (
                <>
                    <Maximize className="h-4 w-4 text-orange-600" />
                    Lượt nghe còn lại: <span className="text-[#FF7A00] text-base">{playsRemaining}</span>
                </>
            )}
          </div>
          
          {/* Thời gian */}
          <div className="text-slate-600 font-mono">
            **{Math.floor(currentTime)}s** / {duration}s
          </div>
        </div>

        {/* Khu vực nút điều khiển */}
        <div className="flex items-center justify-center gap-6">
          
          {/* Nút Phát lại (Reset) */}
          <Button
            variant="outline"
            size="icon"
            onClick={resetAudio}
            className="rounded-full border-2 border-orange-300/50 hover:bg-orange-100/50 bg-white transition-all duration-200 shadow-md"
          >
            <RotateCcw className="h-5 w-5 text-orange-600" />
          </Button>
          
          {/* Nút Play/Pause chính */}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={togglePlay}
              disabled={isLimitReached && !isPlaying}
              className={`
                w-48 h-14 
                font-bold 
                rounded-2xl 
                transition-all duration-300
                ${isLimitReached && !isPlaying 
                    ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-inner" 
                    : "bg-[#FF7A00] hover:bg-[#FF8A1C] text-white shadow-2xl shadow-orange-300/60"
                }
              `}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-6 w-6 mr-2" />
                  Tạm Dừng
                </>
              ) : isLimitReached ? (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  Hết Lượt
                </>
              ) : (
                <>
                  <Play className="h-6 w-6 mr-2" />
                  Nghe Âm Thanh
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} />
    </div>
  )
}