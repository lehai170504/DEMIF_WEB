"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, Mic, Square, Volume2, Check, RotateCcw } from "lucide-react"
import type { Lesson } from "@/lib/data/lessons"
import { resetAudio, togglePlay, stopRecording, startRecording } from "@/lib/audio-utils" // Import audio utility functions

interface ShadowingExerciseProps {
  lesson: Lesson
}

type ExerciseStep = "listen" | "record" | "review" | "score"

export function ShadowingExercise({ lesson }: ShadowingExerciseProps) {
  const [step, setStep] = useState<ExerciseStep>("listen")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [recordingTime, setRecordingTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [scores] = useState({
    pronunciation: 85,
    fluency: 78,
    intonation: 82,
    rhythm: 80,
    overall: 81,
  })

  const handleContinue = () => {
    if (step === "listen") {
      setStep("record")
    } else if (step === "record") {
      setStep("review")
    } else if (step === "review") {
      setStep("score")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-orange-100/50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-orange-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/shadowing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-800">{lesson.title}</h1>
              <p className="text-xs text-slate-600">{lesson.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-orange-200/50 bg-white/80">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm font-medium text-slate-700">
              Bước {step === "listen" ? 1 : step === "record" ? 2 : step === "review" ? 3 : 4} / 4
            </span>
            <Progress
              value={step === "listen" ? 25 : step === "record" ? 50 : step === "review" ? 75 : 100}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Listen Step */}
          {step === "listen" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3">
              <Card className="p-5 border border-orange-200/70 bg-white shadow-sm rounded-xl">
                <div className="text-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                    <Volume2 className="h-7 w-7 text-[#FF7A00]" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 mb-1">Nghe người bản xứ</h2>
                  <p className="text-xs text-slate-600">Chú ý đến cách phát âm và ngữ điệu</p>
                </div>

                <div className="space-y-3">
                  <Card className="p-3 bg-orange-50/50 border border-orange-200/70 rounded-xl">
                    <div className="flex items-center justify-between mb-2 text-xs">
                      <span className="text-slate-600">Âm thanh gốc</span>
                      <span className="text-slate-600">
                        {Math.floor(currentTime)}s / {lesson.duration}s
                      </span>
                    </div>
                    <Progress value={(currentTime / lesson.duration) * 100} className="mb-2" />
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={resetAudio}
                        className="border-orange-200 bg-transparent h-8 w-8"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button size="sm" onClick={togglePlay} className="w-28">
                        {isPlaying ? (
                          <>
                            <Pause className="h-3 w-3 mr-1" />
                            Tạm dừng
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Phát
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-3 bg-white border border-orange-200/70 rounded-xl">
                    <h3 className="font-semibold text-xs mb-2 text-slate-800">Bản ghi âm:</h3>
                    <p className="text-xs leading-relaxed text-slate-700">{lesson.transcript}</p>
                  </Card>

                  <Button onClick={handleContinue} className="w-full" size="sm">
                    Sẵn sàng ghi âm
                  </Button>
                </div>

                <audio ref={audioRef} src={lesson.audioUrl} />
              </Card>

              <div className="space-y-3">
                <Card className="p-3 border border-orange-200/70 bg-white shadow-sm rounded-xl">
                  <h3 className="font-bold text-slate-800 mb-2 text-xs">Thông tin bài học</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Thời lượng:</span>
                      <span className="font-semibold">{lesson.duration}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cấp độ:</span>
                      <span className="font-semibold text-[#FF7A00]">{lesson.level}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 border border-orange-200/70 bg-white shadow-sm rounded-xl">
                  <h3 className="font-bold text-slate-800 mb-2 text-xs">Mẹo</h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF7A00]">•</span>
                      <span>Nghe nhiều lần</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF7A00]">•</span>
                      <span>Tập trung vào ngữ điệu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF7A00]">•</span>
                      <span>Bắt chước nhịp điệu</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          )}

          {/* Record Step */}
          {step === "record" && (
            <Card className="p-6 border border-orange-200/70 bg-white shadow-sm rounded-xl max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    isRecording ? "bg-red-500/20 animate-pulse" : "bg-orange-100"
                  }`}
                >
                  <Mic className={`h-8 w-8 ${isRecording ? "text-red-500" : "text-[#FF7A00]"}`} />
                </div>
                <h2 className="text-xl font-bold mb-2">Ghi âm giọng nói của bạn</h2>
                <p className="text-sm text-slate-600">Nói rõ ràng và cố gắng bắt chước phong cách của người bản xứ</p>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50/50 border border-orange-200/70 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 text-sm">Bản ghi âm:</h3>
                  <p className="text-sm leading-relaxed mb-5">{lesson.transcript}</p>

                  <div className="text-center">
                    {isRecording ? (
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-red-500">{recordingTime}s</div>
                        <Button size="sm" variant="destructive" onClick={stopRecording} className="w-40">
                          <Square className="h-4 w-4 mr-2" />
                          Dừng ghi âm
                        </Button>
                      </div>
                    ) : hasRecording ? (
                      <div className="space-y-3">
                        <div className="text-sm text-slate-600">Đã lưu ghi âm ({recordingTime}s)</div>
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setHasRecording(false)
                              setRecordingTime(0)
                            }}
                          >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Ghi lại
                          </Button>
                          <Button size="sm" onClick={handleContinue} className="w-40">
                            Tiếp tục
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button size="sm" onClick={startRecording} className="w-40">
                        <Mic className="h-4 w-4 mr-2" />
                        Bắt đầu ghi âm
                      </Button>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-xs text-blue-700">
                    <strong>Mẹo:</strong> Nghe lại âm thanh gốc nếu cần trước khi ghi âm
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Review Step */}
          {step === "review" && (
            <Card className="p-6 border border-orange-200/70 bg-white shadow-sm rounded-xl max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">Xem lại bản ghi âm của bạn</h2>
                <p className="text-sm text-slate-600">So sánh bản ghi âm của bạn với bản gốc</p>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50/50 border border-orange-200/70 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 text-sm">Âm thanh gốc:</h3>
                  <div className="flex items-center gap-3 mb-5">
                    <Button variant="outline" size="icon" onClick={togglePlay} className="h-8 w-8 bg-transparent">
                      {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Progress value={(currentTime / lesson.duration) * 100} className="flex-1" />
                    <span className="text-xs text-slate-600">
                      {Math.floor(currentTime)}s / {lesson.duration}s
                    </span>
                  </div>

                  <h3 className="font-semibold mb-2 text-sm">Bản ghi âm của bạn:</h3>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                      <Play className="h-3 w-3" />
                    </Button>
                    <Progress value={0} className="flex-1" />
                    <span className="text-xs text-slate-600">0s / {recordingTime}s</span>
                  </div>
                </div>

                <div className="bg-white border border-orange-200/70 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 text-sm">Bản ghi âm:</h3>
                  <p className="text-sm leading-relaxed">{lesson.transcript}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("record")}
                    className="flex-1 bg-transparent"
                    size="sm"
                  >
                    Ghi lại
                  </Button>
                  <Button onClick={handleContinue} className="flex-1" size="sm">
                    Nhận điểm AI
                  </Button>
                </div>
              </div>

              <audio ref={audioRef} src={lesson.audioUrl} />
            </Card>
          )}

          {/* Score Step */}
          {step === "score" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3">
              <Card className="p-5 border border-orange-200/70 bg-white shadow-sm rounded-xl">
                <div className="text-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                    <Check className="h-7 w-7 text-green-500" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 mb-1">Phân tích AI hoàn tất!</h2>
                  <p className="text-xs text-slate-600">Đánh giá chi tiết về cách phát âm của bạn</p>
                </div>

                <div className="space-y-3">
                  <Card className="p-5 bg-gradient-to-br from-orange-50 to-white border border-orange-200/70 text-center rounded-xl">
                    <div className="text-4xl font-bold text-[#FF7A00] mb-1">{scores.overall}%</div>
                    <div className="text-xs text-slate-600">Điểm tổng thể</div>
                  </Card>

                  <div className="grid grid-cols-2 gap-2">
                    <Card className="p-3 bg-orange-50/50 border border-orange-200/70 rounded-xl">
                      <div className="text-xl font-bold text-[#FF7A00] mb-0.5">{scores.pronunciation}%</div>
                      <div className="text-xs text-slate-600">Phát âm</div>
                      <Progress value={scores.pronunciation} className="mt-1.5 h-1.5" />
                    </Card>
                    <Card className="p-3 bg-orange-50/50 border border-orange-200/70 rounded-xl">
                      <div className="text-xl font-bold text-[#FF7A00] mb-0.5">{scores.fluency}%</div>
                      <div className="text-xs text-slate-600">Trôi chảy</div>
                      <Progress value={scores.fluency} className="mt-1.5 h-1.5" />
                    </Card>
                    <Card className="p-3 bg-orange-50/50 border border-orange-200/70 rounded-xl">
                      <div className="text-xl font-bold text-[#FF7A00] mb-0.5">{scores.intonation}%</div>
                      <div className="text-xs text-slate-600">Ngữ điệu</div>
                      <Progress value={scores.intonation} className="mt-1.5 h-1.5" />
                    </Card>
                    <Card className="p-3 bg-orange-50/50 border border-orange-200/70 rounded-xl">
                      <div className="text-xl font-bold text-[#FF7A00] mb-0.5">{scores.rhythm}%</div>
                      <div className="text-xs text-slate-600">Nhịp điệu</div>
                      <Progress value={scores.rhythm} className="mt-1.5 h-1.5" />
                    </Card>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" asChild className="flex-1 border-orange-200 bg-transparent" size="sm">
                      <Link href="/shadowing">Quay lại bài học</Link>
                    </Button>
                    <Button asChild className="flex-1" size="sm">
                      <Link href="/dashboard">Xem bảng điều khiển</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                <Card className="p-3 bg-white border border-orange-200/70 shadow-sm rounded-xl">
                  <h3 className="font-semibold text-xs mb-2 text-slate-800">Phản hồi AI:</h3>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Phát âm xuất sắc</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Nhịp điệu tốt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 flex-shrink-0 mt-0.5">⚠</span>
                      <span>Cải thiện ngữ điệu</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-3 bg-white border border-orange-200/70 shadow-sm rounded-xl">
                  <h3 className="font-semibold text-xs mb-2 text-slate-800">Từ vựng:</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {lesson.vocabulary.slice(0, 5).map((word) => (
                      <span
                        key={word}
                        className="px-2 py-0.5 rounded text-xs bg-orange-100 text-[#FF7A00] border border-orange-200"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
