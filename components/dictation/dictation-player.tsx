import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Info,
  Loader2,
  SpellCheck,
  CheckCircle2,
  ListTodo,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  useSubmitDictation,
  useCheckDictationSegment,
  useSyncLessonProgress,
} from "@/hooks/use-lesson";
import { useQuery } from "@tanstack/react-query";
import { lessonService } from "@/services/lesson.service";
import { LessonDto, DictationAnswer } from "@/types/lesson.type";
import { useYoutubePlayer } from "@/hooks/use-youtube-player";

import { DictationHeader } from "@/components/dictation/dictation-header";
import { DictationMedia } from "@/components/dictation/dictation-media";
import { DictationResult } from "@/components/dictation/dictation-result";
import { DictationPlaylist } from "@/components/dictation/dictation-playlist";

// Helper Functions
function getYoutubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url || url === "string" || url.trim() === "") return null;
  if (url.includes("/embed/"))
    return `${url.split("?")[0]}?autoplay=0&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?rel=0&enablejsapi=1`
    : null;
}

const getCleanMediaUrl = (url: string | null | undefined) => {
  if (!url || url === "string" || url.trim() === "") return undefined;
  if (url.startsWith("storage.")) return `https://${url}`;
  return url;
};

interface DictationPlayerProps {
  lesson: LessonDto;
}

export function DictationPlayer({ lesson }: DictationPlayerProps) {
  const [level, setLevel] = useState("Beginner");
  const [currentIdx, setCurrentIdx] = useState(0); // Track current active segment
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);

  // State lưu kết quả check của từng segment
  const [segmentResults, setSegmentResults] = useState<Record<number, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  // Ref giữ segments mới nhất (tránh stale closure trong callback)
  const segmentsRef = useRef<any[]>([]);

  const { data: exercise, isLoading } = useQuery({
    queryKey: ["dictation", lesson.id, level],
    queryFn: () => lessonService.getDictationExercise(lesson.id, level),
    enabled: !!lesson.id && !!level,
  });
  const submitMutation = useSubmitDictation();
  const checkSegmentMutation = useCheckDictationSegment();
  const syncProgressMutation = useSyncLessonProgress();

  const segments = exercise?.template.segments || [];
  const currentSegment = segments[currentIdx];

  // Media URLs — khai báo sớm để dùng trong callbacks bên dưới
  const youtubeUrl = useMemo(() => {
    const url = exercise?.mediaUrl ?? lesson.mediaUrl;
    return getYoutubeEmbedUrl(url);
  }, [exercise?.mediaUrl, lesson.mediaUrl]);

  const isVideoType = (exercise?.mediaType ?? lesson.mediaType)?.toLowerCase() === "video";

  const finalMediaUrl = useMemo(() => {
    const url = exercise?.mediaUrl ?? exercise?.audioUrl ?? lesson.mediaUrl ?? lesson.audioUrl;
    return getCleanMediaUrl(url);
  }, [exercise, lesson]);

  // Sync segments ref
  useEffect(() => { segmentsRef.current = segments; }, [segments]);

  // Callback nhận currentTime từ YouTube (infoDelivery) → auto-sync playlist
  const handleYouTubeTimeUpdate = useCallback((time: number) => {
    const segs = segmentsRef.current;
    if (!segs.length) return;
    const segIdx = segs.findIndex(
      (seg: any) => time >= seg.startTime && time < seg.endTime,
    );
    if (segIdx !== -1) {
      setCurrentIdx((prev) => (prev === segIdx ? prev : segIdx));
    }
  }, []);

  // YouTube IFrame API (pure postMessage)
  const { setIframeRef, seekAndPlay } = useYoutubePlayer(
    youtubeUrl ? handleYouTubeTimeUpdate : undefined,
  );

  useEffect(() => {
    const timer = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.pause();
    if (videoRef.current) videoRef.current.pause();
    setSegmentResults({});
    setCurrentIdx(0);
    setIsCompleted(false);
  }, [level]);

  // Auto-sync playlist theo audio/video currentTime (nếu không phải YouTube)
  useEffect(() => {
    if (youtubeUrl) return; // YouTube được sync qua handleYouTubeTimeUpdate
    const interval = setInterval(() => {
      const media =
        (audioRef.current ?? videoRef.current) as HTMLMediaElement | null;
      if (!media || media.paused) return;
      const t = media.currentTime;
      const segs = segmentsRef.current;
      const segIdx = segs.findIndex(
        (seg: any) => t >= seg.startTime && t < seg.endTime,
      );
      if (segIdx !== -1) {
        setCurrentIdx((prev) => (prev === segIdx ? prev : segIdx));
      }
    }, 300);
    return () => clearInterval(interval);
  }, [youtubeUrl]);

  // Sync Progress to Backend whenever index changes
  useEffect(() => {
    if (!lesson.id || isCompleted) return;
    const timer = setTimeout(() => {
       syncProgressMutation.mutate({
         id: lesson.id,
         data: { segmentIndex: currentIdx, isCompleted: false },
       });
    }, 2000); // 2s debounce
    return () => clearTimeout(timer);
  }, [currentIdx, lesson.id, isCompleted]);


  // Seek + play media đến đầu segment — không tự dừng
  const seekAndPlaySegment = useCallback(
    (segIndex: number) => {
      const seg = segments[segIndex];
      if (!seg) return;

      if (youtubeUrl) {
        seekAndPlay(seg.startTime); // không truyền endTime → không tự pause
      } else {
        const media =
          audioRef.current ?? (videoRef.current as HTMLMediaElement | null);
        if (!media) return;
        media.currentTime = seg.startTime;
        media.play().catch(() => {});
        // Không setTimeout pause → cứ tiếp tục phát
      }
    },
    [segments, youtubeUrl, seekAndPlay],
  );

  // Khi click segment trong playlist → đổi index VÀ seek + play
  const handleSelectSegment = useCallback(
    (idx: number) => {
      setCurrentIdx(idx);
      seekAndPlaySegment(idx);
    },
    [seekAndPlaySegment],
  );


  const handleInputChange = useCallback(
    (segmentIndex: number, position: number, value: string) => {
      setAnswers((prev) => ({
        ...prev,
        [`${segmentIndex}-${position}`]: value,
      }));
    },
    [],
  );

  const handleKeyDown = (e: React.KeyboardEvent, currentKey: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Nếu user gõ Enter khi input đang trống thì có thể ko làm gì,
      // Khi đã nhập xong, Enter => Next input. 
      // Nếu là input cuối => có thể kiểm tra segment.
      const segmentKeys = Object.keys(inputRefs.current)
        .filter(k => k.startsWith(`${currentIdx}-`))
        .sort((a, b) => {
          const pA = Number(a.split("-")[1]);
          const pB = Number(b.split("-")[1]);
          return pA - pB;
        });

      const nextIdx = segmentKeys.indexOf(currentKey) + 1;
      if (nextIdx < segmentKeys.length) {
        inputRefs.current[segmentKeys[nextIdx]]?.focus();
      } else {
        // Đã gõ xong input cuối cùng, tự động check?
        handleCheckSegment(currentIdx, true);
      }
    }
  };

  const handleCheckSegment = (segIndex: number, autoNext?: boolean) => {
    if (!exercise) return;
    const segment = exercise.template.segments[segIndex];

    const userText = segment.words
      .map((w: any) => {
        const val = w.isBlank
          ? answers[`${segIndex}-${w.position}`]?.trim() || ""
          : w.text;
        return val + (w.punctuation || "");
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    checkSegmentMutation.mutate(
      {
        id: lesson.id,
        segmentIndex: segIndex,
        data: {
          level,
          userText,
          timeSpentSeconds: timeSpent,
        },
      },
      {
        onSuccess: (data) => {
          setSegmentResults((prev) => ({ ...prev, [segIndex]: data }));
          if (autoNext && segIndex < segments.length - 1) {
            setTimeout(() => setCurrentIdx(segIndex + 1), 1000); // Tự sang câu tiếp theo
          }
        },
      },
    );
  };

  const handleSubmit = () => {
    if (!exercise) return;
    const formattedAnswers: DictationAnswer[] = segments.flatMap((segment: any, segmentIndex: number) =>
      segment.words
        .filter((word: any) => word.isBlank)
        .map((word: any) => ({
          segmentIndex,
          position: word.position,
          userInput: answers[`${segmentIndex}-${word.position}`]?.trim() ?? "",
        })),
    );

    submitMutation.mutate({
      id: lesson.id,
      data: { level, answers: formattedAnswers, timeSpentSeconds: timeSpent },
    });
    
    // Final sync completion
    syncProgressMutation.mutate({
      id: lesson.id,
      data: { segmentIndex: currentIdx, isCompleted: true },
    });

    setIsCompleted(true);
  };

  const handleRevealWord = (position: number) => {
      // Mock logic for Hint (Xem từ) / since backend hides full text,
      // The frontend must get expected answer somehow, 
      // but without it, we can't reveal! 
      // Typically, Senglish has the hint in the API. We'll leave it as a visual button that triggers a toast or mock reveal.
  }


  const { totalBlanks, filledBlanks, progress } = useMemo(() => {
    const totalBlanks = exercise?.template.totalBlanks || 0;
    const filledBlanks = Object.values(answers).filter(v => v.trim() !== "").length;
    return {
      totalBlanks,
      filledBlanks,
      progress: totalBlanks > 0 ? (filledBlanks / totalBlanks) * 100 : 0,
    };
  }, [exercise, answers]);

  return (
    <div className="min-h-screen font-sans text-zinc-100 bg-[#050505] selection:bg-orange-500/30">
      <DictationHeader lesson={lesson} level={level} />

      <main className="container mx-auto max-w-[1700px] px-4 py-6">
        <div className="flex flex-col xl:flex-row gap-6 items-start h-[calc(100vh-120px)]">
          
          {/* LEFT AREA: Media + Workout (70%) */}
          <div className="flex-1 w-full xl:w-[70%] flex flex-col gap-6 h-full overflow-y-auto no-scrollbar pb-10">
            
            {/* Media Card */}
            <div className="w-full shrink-0">
               <DictationMedia
                 lessonTitle={lesson.title}
                 youtubeUrl={youtubeUrl}
                 isVideoType={isVideoType}
                 finalMediaUrl={finalMediaUrl}
                 audioRef={audioRef}
                 videoRef={videoRef}
                 iframeRef={youtubeUrl ? setIframeRef : undefined}
                 showHints={showHints}
                 onToggleHints={() => setShowHints(!showHints)}
                 thumbnailUrl={lesson.thumbnailUrl}
               />
            </div>

            {/* Workout Area (Focused) */}
            <div className="flex-1 flex flex-col min-h-[400px]">
              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
                </div>
              ) : !exercise || !currentSegment ? (
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] text-zinc-600 font-bold uppercase text-xs gap-4">
                   <div className="p-4 rounded-full bg-white/5"><ListTodo className="w-10 h-10" /></div>
                   Không có dữ liệu bài tập
                </div>
              ) : isCompleted ? (
                <div className="flex-1 flex items-center justify-center">
                  <AnimatePresence>
                    {submitMutation.data && (
                      <DictationResult
                        data={submitMutation.data}
                        onRetry={() => {
                            setIsCompleted(false);
                            setCurrentIdx(0);
                            setAnswers({});
                            setSegmentResults({});
                            submitMutation.reset();
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative"
                >
                  {/* Watermark/Progress Indicator */}
                  <div className="absolute top-0 left-0 p-8 flex items-center gap-3 opacity-20">
                     <span className="text-4xl font-black text-white">#{currentIdx + 1}</span>
                     <div className="h-1 w-20 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white transition-all duration-500" 
                          style={{ width: `${((currentIdx + 1) / segments.length) * 100}%` }}
                        />
                     </div>
                  </div>

                  {/* Header metadata */}
                  <div className="flex flex-col items-center mb-10 text-center">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">
                        Đang lắng nghe
                     </h3>
                     <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">
                        {currentSegment.startTime.toFixed(1)}s — {currentSegment.endTime.toFixed(1)}s
                     </p>
                  </div>

                  {/* Inputs Section (Centered) */}
                  <div className="flex-1 flex items-center justify-center py-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-8 leading-[1.8] text-3xl font-bold max-w-4xl">
                      {currentSegment.words.map((word: any, wordIndex: number) => {
                        if (!word.isBlank) {
                          return (
                            <span key={wordIndex} className="text-white/40 mb-1">
                              {word.text}{word.punctuation}
                            </span>
                          );
                        }

                        const dotsCount = word.length || 4;
                        const dots = "•".repeat(dotsCount);

                        return (
                          <div key={wordIndex} className="relative group inline-block">
                            <input
                              ref={(el) => { inputRefs.current[`${currentIdx}-${word.position}`] = el; }}
                              type="text"
                              spellCheck={false}
                              autoComplete="off"
                              disabled={checkSegmentMutation.isPending}
                              placeholder={showHints ? (word.hint ?? dots) : dots}
                              value={answers[`${currentIdx}-${word.position}`] || ""}
                              onKeyDown={(e) => handleKeyDown(e, `${currentIdx}-${word.position}`)}
                              onChange={(e) => handleInputChange(currentIdx, word.position, e.target.value)}
                              className={cn(
                                "px-0 py-2 border-b-4 bg-transparent outline-none transition-all text-white font-black text-center tracking-widest",
                                answers[`${currentIdx}-${word.position}`] 
                                  ? "border-orange-500/50 focus:border-orange-500" 
                                  : "border-white/10 focus:border-white/30"
                              )}
                              style={{ width: `${Math.max(dotsCount, 3) * 22}px` }}
                            />
                            {/* Length Indicator */}
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/20 tracking-widest pointer-events-none group-hover:text-orange-500/40 transition-colors uppercase">
                              {dotsCount} ký tự
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Shortcuts info */}
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2 text-zinc-500">
                          <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-sans">Enter</kbd>
                          <span className="text-[9px] font-bold uppercase tracking-widest">Tiếp theo</span>
                       </div>
                       <div className="flex items-center gap-2 text-zinc-500">
                          <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-sans">Ctrl</kbd>
                          <span className="text-[9px] font-bold uppercase tracking-widest">Nghe lại</span>
                       </div>
                    </div>

                    {/* Hint Buttons */}
                    <div className="flex items-center gap-3">
                       <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRevealWord(0)}
                          className="h-10 px-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest"
                       >
                          Xem từ
                       </Button>
                       <Button 
                          onClick={() => handleCheckSegment(currentIdx)}
                          disabled={checkSegmentMutation.isPending}
                          className="h-10 px-8 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20"
                       >
                          {checkSegmentMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <SpellCheck className="w-3 h-3 mr-2" />}
                          Kiểm tra nhanh
                       </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation (Prev/Next/Submit) */}
            {!isLoading && exercise && currentSegment && !isCompleted && (
               <div className="flex items-center justify-between py-2">
                  <Button
                      variant="ghost"
                      onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                      disabled={currentIdx === 0}
                      className="px-6 h-12 rounded-2xl text-zinc-500 hover:text-white hover:bg-white/5 font-black uppercase text-[10px] tracking-widest transition-all"
                  >
                      ← Câu trước
                  </Button>

                  {currentIdx < segments.length - 1 ? (
                      <Button
                          onClick={() => setCurrentIdx(currentIdx + 1)}
                          className="px-10 h-12 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl"
                      >
                          Câu tiếp theo →
                      </Button>
                  ) : (
                      <Button
                          onClick={handleSubmit}
                          disabled={submitMutation.isPending || filledBlanks === 0}
                          className="px-10 h-12 rounded-2xl bg-orange-600 text-white hover:bg-orange-500 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-orange-500/20"
                      >
                          {submitMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ListTodo className="w-4 h-4 mr-2" />}
                          TỔNG KẾT BÀI HỌC
                      </Button>
                  )}
               </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: Stats + Playlist (30%) */}
          <aside className="w-full xl:w-[30%] flex flex-col gap-6 h-full sticky top-0 overflow-hidden">
            
            {/* Level & Progress Sidebar Card */}
            <div className="shrink-0 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 p-8 flex flex-col gap-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Tiến độ bài học</h3>
                  <span className="text-xl font-black text-white">{progress.toFixed(0)}%</span>
               </div>
               
               <Progress value={progress} className="h-2 bg-white/5" />

               <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLevel(l);
                        setAnswers({});
                        setSegmentResults({});
                        submitMutation.reset();
                      }}
                      className={cn(
                        "h-10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border",
                        level === l
                          ? "bg-white text-black border-white shadow-xl"
                          : "bg-transparent text-zinc-600 border-white/5 hover:border-white/10 hover:text-zinc-400"
                      )}
                    >
                      {l}
                    </button>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Thời gian luyện tập</span>
                     <span className="text-xs font-black text-orange-500">
                        ⏱️ {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
                     </span>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Số từ hoàn thành</span>
                     <span className="text-xs font-black text-white">{filledBlanks} / {totalBlanks}</span>
                  </div>
               </div>
            </div>

            {/* Playlist Sidebar Card */}
            <div className="flex-1 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 overflow-hidden shadow-2xl min-h-0">
               <DictationPlaylist 
                   segments={segments}
                   currentIdx={currentIdx}
                   segmentResults={segmentResults}
                   onSelectSegment={handleSelectSegment}
               />
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
