"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

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
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [playCount, onPlayCountChange])

  // Simple waveform visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      const width = canvas.width
      const height = canvas.height
      const barCount = 60
      const barWidth = width / barCount
      const progress = currentTime / duration

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.random() * height * 0.6 + height * 0.2
        const x = i * barWidth
        const isPast = i / barCount < progress

        ctx.fillStyle = isPast ? "#FF7A00" : "#FFE5C4"
        ctx.fillRect(x, (height - barHeight) / 2, barWidth - 2, barHeight)
      }
    }

    draw()
    const interval = isPlaying ? setInterval(draw, 100) : null

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
      if (playCount < maxPlays) {
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
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg shadow-orange-100/40">
        <canvas ref={canvasRef} width={800} height={120} className="w-full h-[120px] rounded-lg mb-4" />

        <div className="flex items-center justify-between mb-4 text-sm text-slate-700">
          <span>Plays remaining: {maxPlays - playCount}</span>
          <span>
            {Math.floor(currentTime)}s / {duration}s
          </span>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={resetAudio}
            className="rounded-xl border-orange-200 hover:bg-orange-50 bg-transparent"
          >
            <RotateCcw className="h-4 w-4 text-orange-600" />
          </Button>
          <Button
            size="lg"
            onClick={togglePlay}
            disabled={playCount >= maxPlays && !isPlaying}
            className="w-40 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-semibold rounded-xl shadow-lg shadow-orange-200/50"
          >
            {isPlaying ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Play Audio
              </>
            )}
          </Button>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} />
    </div>
  )
}
