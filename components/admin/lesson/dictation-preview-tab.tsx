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

export function DictationPreviewTab({ lessonId }: { lessonId: string }) {
  const {
    data: preview,
    isLoading,
    isError,
    refetch,
  } = useLessonPreview(lessonId);

  const [localSegments, setLocalSegments] = React.useState<any[]>([]);
  const [hasChanges, setHasChanges] = React.useState(false);

  // STATE ĐIỀU KHIỂN MODAL
  const [isRegenerateDialogOpen, setIsRegenerateDialogOpen] =
    React.useState(false);

  const regenerateMutation = useRegenerateTemplates();
  const updateTemplatesMutation = useUpdateDictationTemplates();

  React.useEffect(() => {
    if (preview?.segments && Array.isArray(preview.segments)) {
      const initialized = preview.segments.map((seg: any) => {
        if (seg.words && Array.isArray(seg.words) && seg.words.length > 0) {
          return { ...seg };
        }

        const words = (seg.text || "")
          .split(/\s+/)
          .filter(Boolean)
          .map((w: string) => ({
            text: w,
            isBlank: false,
          }));

        return { ...seg, words };
      });

      setLocalSegments(initialized);
      setHasChanges(false);
    }
  }, [preview]);

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
    // SỬA Ở ĐÂY: Ép nguyên mảng phẳng (localSegments) thành chuỗi luôn!
    const jsonString = JSON.stringify(localSegments);

    updateTemplatesMutation.mutate({
      id: lessonId,
      data: { dictationTemplatesJson: jsonString },
    });
  };

  // HÀM XỬ LÝ KHI BẤM XÁC NHẬN TRONG MODAL
  const handleConfirmRegenerate = () => {
    regenerateMutation.mutate(lessonId, {
      onSuccess: () => {
        setIsRegenerateDialogOpen(false);
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
    <div className="space-y-8 font-mono py-2">
      {/* 1. THỐNG KÊ & TRẠNG THÁI */}
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
              <AlertDescription className="text-[11px] font-bold text-emerald-600/80 dark:text-emerald-500/80 leading-relaxed mt-1">
                Tất cả template đều hợp lệ. Bạn có thể tinh chỉnh các từ bị
                khuyết bên dưới.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 rounded-[2rem] p-6 h-full flex flex-col justify-center">
              <XCircle className="h-5 w-5 text-red-600 mb-2" />
              <AlertTitle className="text-sm font-black uppercase tracking-widest text-red-800 dark:text-red-400">
                Lỗi Cấu Hình
              </AlertTitle>
              <AlertDescription className="text-[11px] font-bold text-red-600/80 dark:text-red-500/80 leading-relaxed mt-1">
                {preview.publishBlockers?.join(", ") ||
                  "Dữ liệu đục lỗ bị thiếu hoặc bị lỗi."}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* 2. TOOLBAR ĐIỀU KHIỂN */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-[2rem] border border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-2">
          <h4 className="text-[11px] font-black uppercase text-slate-900 dark:text-white tracking-widest">
            Biên tập đục lỗ (Blanks)
          </h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center justify-center w-5 h-5 bg-white dark:bg-zinc-800 rounded-md border border-slate-200 dark:border-white/10 ml-2">
                  <Info className="w-3 h-3 text-slate-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900 text-white text-[10px] font-bold rounded-lg p-2 max-w-[250px] leading-relaxed">
                Hệ thống AI sẽ tự động tính toán từ nào nên bị đục lỗ. Tuy nhiên
                bạn có thể bấm trực tiếp vào từng chữ bên dưới để chỉnh sửa lại
                theo ý mình.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-3">
          {/* NÚT MỞ DIALOG REGENERATE */}
          <Button
            variant="outline"
            onClick={() => setIsRegenerateDialogOpen(true)}
            disabled={regenerateMutation.isPending}
            className="h-10 bg-white dark:bg-zinc-950 border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-500 hover:bg-orange-50 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-sm transition-all"
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
            className="h-10 px-6 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-95"
          >
            {updateTemplatesMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Lưu Blanks
          </Button>
        </div>
      </div>

      {/* 3. EDITOR AREA */}
      <div className="flex flex-col gap-5 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
        {localSegments.length === 0 ? (
          <div className="p-10 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem]">
            <p className="text-xs font-bold text-slate-400">
              Chưa có dữ liệu Transcript để xử lý.
            </p>
          </div>
        ) : (
          localSegments.map((seg: any, sIdx: number) => (
            <div
              key={`seg-${sIdx}`}
              className="p-6 bg-white dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 rounded-[2rem] shadow-sm hover:border-purple-200 dark:hover:border-purple-500/30 transition-all group"
            >
              <div className="flex justify-between mb-5 border-b border-slate-50 dark:border-white/5 pb-3">
                <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-[0.2em] bg-purple-50 dark:bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-500/20">
                  Câu #{seg.index + 1}
                </span>
                <span className="text-[10px] font-bold text-slate-400 font-sans tracking-widest bg-slate-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                  {seg.startTime}s → {seg.endTime}s
                </span>
              </div>

              <div className="flex flex-wrap gap-2 leading-loose">
                {seg.words?.map((wordObj: any, wIdx: number) => (
                  <button
                    key={`word-${sIdx}-${wIdx}`}
                    onClick={() => toggleWordBlank(sIdx, wIdx)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all border outline-none cursor-pointer",
                      wordObj.isBlank
                        ? "bg-purple-500 text-white border-purple-600 shadow-md scale-105"
                        : "bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-700 hover:border-purple-300 hover:text-purple-600",
                    )}
                  >
                    {wordObj.text}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* COMPONENT MODAL XÁC NHẬN NẰM Ở ĐÂY */}
      <RegenerateConfirmDialog
        open={isRegenerateDialogOpen}
        onOpenChange={setIsRegenerateDialogOpen}
        onConfirm={handleConfirmRegenerate}
        isPending={regenerateMutation.isPending}
      />
    </div>
  );
}
