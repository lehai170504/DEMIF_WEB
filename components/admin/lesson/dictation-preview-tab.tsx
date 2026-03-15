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
  AlertTriangle,
  RefreshCw,
  Info,
  Save,
  MousePointerClick,
  FileText,
  Type,
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

export function DictationPreviewTab({ lessonId }: { lessonId: string }) {
  const {
    data: preview,
    isLoading,
    isError,
    refetch,
  } = useLessonPreview(lessonId);
  const [localSegments, setLocalSegments] = React.useState<any[]>([]);
  const [hasChanges, setHasChanges] = React.useState(false);

  const regenerateMutation = useRegenerateTemplates();
  const updateTemplatesMutation = useUpdateDictationTemplates();

  // Đồng bộ data khi Preview thay đổi (do refetch sau khi PUT thành công)
  React.useEffect(() => {
    if (preview?.segments) {
      const initialized = preview.segments.map((seg: any) => {
        // Nếu BE trả về segments đã có mảng words, dùng luôn để hiển thị isBlank đúng
        if (seg.words && Array.isArray(seg.words) && seg.words.length > 0) {
          return { ...seg };
        }
        // Nếu BE chưa có words, tự băm từ text
        const words = seg.text
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
      setLocalSegments([...updated]);
      setHasChanges(true);
    }
  };

  const handleSaveTemplates = () => {
    updateTemplatesMutation.mutate({
      id: lessonId,
      data: { dictationTemplatesJson: JSON.stringify(localSegments) },
    });
  };

  if (isLoading)
    return (
      <div className="py-20 text-center">
        <Loader2 className="animate-spin mx-auto text-orange-500 mb-2" />
        <p className="text-[10px] uppercase font-mono text-gray-400">
          Đang tải...
        </p>
      </div>
    );

  return (
    <div className="space-y-6 font-mono py-2">
      {/* 1. THỐNG KÊ (ĐƯA LÊN ĐẦU) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-[2rem] bg-gray-900 text-white flex items-center gap-4 shadow-xl border border-gray-800">
          <div className="p-3 bg-orange-500/10 rounded-2xl">
            <FileText className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <span className="text-2xl font-black text-orange-400 block">
              {preview?.totalSegments || 0}
            </span>
            <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
              Tổng số câu
            </span>
          </div>
        </div>
        <div className="p-5 rounded-[2rem] bg-gray-900 text-white flex items-center gap-4 shadow-xl border border-gray-800">
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <Type className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <span className="text-2xl font-black text-blue-400 block">
              {preview?.totalWords || 0}
            </span>
            <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
              Tổng số từ
            </span>
          </div>
        </div>
      </div>

      {/* 2. TRẠNG THÁI */}
      {preview?.readyToPublish ? (
        <Alert className="bg-emerald-50 border-emerald-200 rounded-[1.5rem] py-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <AlertTitle className="text-xs font-bold uppercase text-emerald-800">
            Cấu hình hợp lệ
          </AlertTitle>
          <AlertDescription className="text-[11px] text-emerald-600">
            Bài học đã sẵn sàng. Bạn có thể chỉnh sửa đục lỗ thủ công.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-red-50 border-red-200 rounded-[1.5rem] py-3">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-xs font-bold uppercase text-red-800">
            Chưa thể đăng bài
          </AlertTitle>
          <AlertDescription className="text-[11px] text-red-600">
            Lỗi: {preview?.publishBlockers?.join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {/* 3. TOOLBAR */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <h4 className="text-[11px] font-black uppercase text-gray-900">
            Biên tập đục lỗ
          </h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-3.5 h-3.5 text-gray-300" />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white text-[10px] rounded-lg">
                Bấm vào từ để chọn ẩn/hiện
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-2">
          {hasChanges && (
            <Button
              size="sm"
              onClick={handleSaveTemplates}
              disabled={updateTemplatesMutation.isPending}
              className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-xl shadow-lg"
            >
              {updateTemplatesMutation.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1.5" />
              ) : (
                <Save className="w-3 h-3 mr-1.5" />
              )}
              Lưu thay đổi
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.confirm("Reset dữ liệu?") &&
              regenerateMutation.mutate(lessonId)
            }
            disabled={regenerateMutation.isPending}
            className="h-9 bg-orange-50 border-orange-200 text-orange-600 font-bold text-[11px] rounded-xl"
          >
            <RefreshCw
              className={cn(
                "w-3 h-3 mr-1.5",
                regenerateMutation.isPending && "animate-spin",
              )}
            />
            Reset về Máy
          </Button>
        </div>
      </div>

      {/* 4. EDITOR AREA */}
      <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
        {localSegments.map((seg, sIdx) => (
          <div
            key={`seg-${sIdx}`}
            className="p-5 bg-white border border-gray-100 rounded-[1.8rem] shadow-sm hover:border-orange-200 transition-all"
          >
            <div className="flex justify-between mb-4 border-b border-gray-50 pb-2">
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-tighter bg-orange-50 px-2.5 py-1 rounded-lg">
                Câu #{sIdx + 1}
              </span>
              <span className="text-[10px] font-bold text-gray-300 font-sans tracking-widest">
                {seg.startTime}s → {seg.endTime}s
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {seg.words?.map((wordObj: any, wIdx: number) => (
                <button
                  key={`word-${sIdx}-${wIdx}`}
                  onClick={() => toggleWordBlank(sIdx, wIdx)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-bold transition-all border",
                    wordObj.isBlank
                      ? "bg-orange-500 text-white border-orange-600 shadow-md scale-105"
                      : "bg-gray-50 text-gray-700 border-transparent hover:bg-white hover:border-orange-300",
                  )}
                >
                  {wordObj.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
