"use client";

import * as React from "react";
import {
  useLessonPreview,
  useRegenerateTemplates,
  useUpdateDictationTemplates,
} from "@/hooks/use-lesson";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Info,
  Save,
  FileText,
  Type,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { RegenerateConfirmDialog } from "./regenerate-confirm-dialog";
import { DictationSegmentPreview } from "@/types/lesson.type";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function DictationPreviewTab({ lessonId }: { lessonId: string }) {
  const [currentLevel, setCurrentLevel] = React.useState("Beginner");

  const {
    data: preview,
    isLoading,
    isError,
    refetch,
  } = useLessonPreview(lessonId);

  // Ép kiểu rõ ràng mảng segments theo type mới
  const [localSegments, setLocalSegments] = React.useState<
    DictationSegmentPreview[]
  >([]);
  const [hasChanges, setHasChanges] = React.useState(false);
  const [isRegenerateDialogOpen, setIsRegenerateDialogOpen] =
    React.useState(false);

  const regenerateMutation = useRegenerateTemplates();
  const updateTemplatesMutation = useUpdateDictationTemplates();

  React.useEffect(() => {
    const templatesDictionary = preview?.dictationTemplates || {};

    const matchedKey = Object.keys(templatesDictionary).find(
      (k) => k.toLowerCase() === currentLevel.toLowerCase(),
    );
    const currentLevelData = matchedKey
      ? templatesDictionary[matchedKey]
      : null;

    if (
      currentLevelData?.segments &&
      Array.isArray(currentLevelData.segments)
    ) {
      const deepCopiedSegments = currentLevelData.segments.map((seg: any) => ({
        ...seg,
        words: seg.words ? seg.words.map((w: any) => ({ ...w })) : [],
      }));

      setLocalSegments(deepCopiedSegments);
      setHasChanges(false);
      return;
    }

    // NẾU CHƯA CÓ DATA:
    if (preview?.segments && Array.isArray(preview.segments)) {
      const initialized = preview.segments.map((seg: any) => {
        if (seg.words && Array.isArray(seg.words) && seg.words.length > 0) {
          return { ...seg, words: seg.words.map((w: any) => ({ ...w })) };
        }

        const words = (seg.text || "")
          .split(/\s+/)
          .filter(Boolean)
          .map((w: string, idx: number) => ({
            text: w,
            isBlank: false,
            position: idx,
          }));

        return { ...seg, words };
      });

      setLocalSegments(initialized);
      setHasChanges(false);
    }
  }, [preview, currentLevel]);

  const toggleWordBlank = (segIndex: number, wordIndex: number) => {
    const updated = [...localSegments];
    if (updated[segIndex]?.words[wordIndex]) {
      updated[segIndex].words[wordIndex].isBlank =
        !updated[segIndex].words[wordIndex].isBlank;
      setLocalSegments(updated);
      setHasChanges(true);
    }
  };

  const handleSaveTemplates = () => {
    const levelKey = currentLevel.toLowerCase();
    const existingTemplates = preview?.dictationTemplates || {};

    // Data mới CỦA LEVEL ĐANG CHỌN
    const currentLevelData = {
      level: currentLevel,
      blankPercentage: existingTemplates[levelKey]?.blankPercentage || 0,
      segments: localSegments,
    };

    // Gộp lại thành Dictionary
    const payload = {
      ...existingTemplates,
      [levelKey]: currentLevelData,
    };

    const jsonString = JSON.stringify(payload);

    updateTemplatesMutation.mutate(
      {
        id: lessonId,
        data: { dictationTemplatesJson: jsonString },
      },
      {
        onSuccess: () => {
          setHasChanges(false);
          refetch();
        },
      },
    );
  };

  const handleConfirmRegenerate = () => {
    regenerateMutation.mutate(lessonId, {
      onSuccess: () => {
        setIsRegenerateDialogOpen(false);
        refetch();
      },
    });
  };

  if (isLoading)
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-purple-500 w-10 h-10 mb-4" />
        <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] animate-pulse">
          Đang tải dữ liệu Đục lỗ...
        </p>
      </div>
    );

  if (isError || !preview)
    return (
      <div className="py-20 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-[10px] uppercase font-black text-red-500 tracking-[0.2em]">
          Lỗi truy xuất dữ liệu Đục lỗ
        </p>
      </div>
    );

  return (
    <div className="space-y-6 font-mono py-2">
      {/* BỘ LỌC LEVEL */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-zinc-900/50 rounded-[1.5rem] w-fit">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setCurrentLevel(lvl)}
            className={cn(
              "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
              currentLevel === lvl
                ? "bg-white dark:bg-zinc-800 text-purple-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* THỐNG KÊ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-[2rem] bg-slate-950 dark:bg-black text-white flex items-center justify-around shadow-xl border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <span className="text-2xl font-black text-purple-400 block">
                {preview.totalSegments || 0}
              </span>
              <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                Tổng số câu
              </span>
            </div>
          </div>
          <div className="w-px h-12 bg-slate-800" />
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <Type className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <span className="text-2xl font-black text-blue-400 block">
                {preview.totalWords || 0}
              </span>
              <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                Tổng số từ
              </span>
            </div>
          </div>
        </div>

        <div className="h-full">
          {preview.readyToPublish ? (
            <Alert className="bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 rounded-[2rem] p-6 h-full flex flex-col justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mb-2" />
              <AlertTitle className="text-sm font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                Sẵn sàng Publish
              </AlertTitle>
              <AlertDescription className="text-[11px] font-bold text-emerald-600/80 dark:text-emerald-500/80 mt-1">
                Cấu hình đục lỗ đã hợp lệ.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 rounded-[2rem] p-6 h-full flex flex-col justify-center">
              <XCircle className="h-5 w-5 text-red-600 mb-2" />
              <AlertTitle className="text-sm font-black uppercase tracking-widest text-red-800 dark:text-red-400">
                Lỗi Cấu Hình
              </AlertTitle>
              <AlertDescription className="text-[11px] font-bold text-red-600/80 dark:text-red-500/80 mt-1">
                {preview.publishBlockers?.[0] || "Thiếu dữ liệu đục lỗ."}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-[2rem] border border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-2">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
            Biên tập: {currentLevel}
          </h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-1.5 bg-white dark:bg-zinc-800 rounded-lg border border-slate-200 dark:border-white/10 cursor-help">
                  <Info className="w-3 h-3 text-slate-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900 text-[10px] font-bold p-3 rounded-xl max-w-[200px]">
                Bấm vào từng chữ để ẩn/hiện từ đục lỗ cho cấp độ {currentLevel}.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsRegenerateDialogOpen(true)}
            disabled={regenerateMutation.isPending}
            className="h-11 bg-white dark:bg-zinc-950 border-orange-200 text-orange-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-orange-50 transition-all"
          >
            <RefreshCw
              className={cn(
                "w-3.5 h-3.5 mr-2",
                regenerateMutation.isPending && "animate-spin",
              )}
            />
            AI Sinh lại
          </Button>

          <Button
            onClick={handleSaveTemplates}
            disabled={updateTemplatesMutation.isPending || !hasChanges}
            className="h-11 px-6 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg active:scale-95 transition-all"
          >
            {updateTemplatesMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Lưu {currentLevel}
          </Button>
        </div>
      </div>

      {/* EDITOR AREA */}
      <div className="flex flex-col gap-5 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
        {localSegments.length === 0 ? (
          <div className="p-16 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem]">
            <p className="text-xs font-bold text-slate-400">
              Chưa có dữ liệu để biên tập.
            </p>
          </div>
        ) : (
          localSegments.map((seg, sIdx) => (
            <div
              key={`seg-${sIdx}`}
              className="p-7 bg-white dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 rounded-[2.5rem] shadow-sm hover:border-purple-200 transition-all"
            >
              <div className="flex justify-between mb-6 border-b border-slate-50 dark:border-white/5 pb-4">
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] bg-purple-50 dark:bg-purple-500/10 px-4 py-2 rounded-xl">
                  Câu #{(seg.index ?? sIdx) + 1}
                </span>
                <span className="text-[10px] font-bold text-slate-400 px-4 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800">
                  {seg.startTime}s → {seg.endTime}s
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 leading-[2.5]">
                {seg.words?.map((wordObj: any, wIdx: number) => {
                  const displayText = wordObj.answer || wordObj.text;

                  return (
                    <button
                      key={`word-${sIdx}-${wIdx}`}
                      onClick={() => toggleWordBlank(sIdx, wIdx)}
                      className={cn(
                        "px-4 py-2 rounded-2xl text-sm font-bold transition-all border outline-none",
                        wordObj.isBlank
                          ? "bg-purple-500 text-white border-purple-600 shadow-md scale-105"
                          : "bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-purple-300",
                      )}
                    >
                      {displayText}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <RegenerateConfirmDialog
        open={isRegenerateDialogOpen}
        onOpenChange={setIsRegenerateDialogOpen}
        onConfirm={handleConfirmRegenerate}
        isPending={regenerateMutation.isPending}
      />
    </div>
  );
}
