// src/components/admin/lesson/dictation-preview-tab.tsx
"use client";

import { useLessonPreview, useRegenerateTemplates } from "@/hooks/use-lesson";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Info,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DictationPreviewTabProps {
  lessonId: string;
}

export function DictationPreviewTab({ lessonId }: DictationPreviewTabProps) {
  const {
    data: preview,
    isLoading,
    isError,
    refetch,
  } = useLessonPreview(lessonId);

  // Khởi tạo hook
  const regenerateMutation = useRegenerateTemplates();

  const handleRegenerate = () => {
    regenerateMutation.mutate(lessonId);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-mono">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500 mb-4" />
        <p className="text-xs uppercase tracking-widest">
          Đang kiểm tra dữ liệu...
        </p>
      </div>
    );
  }

  if (isError || !preview) {
    return (
      <div className="py-10 text-center flex flex-col items-center font-mono">
        <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />
        <p className="text-sm text-gray-600 font-medium">
          Không thể tải dữ liệu xem trước.
        </p>
        <button
          onClick={() => refetch()}
          className="text-orange-500 text-xs font-bold uppercase mt-2 hover:underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-mono py-2">
      {/* KHU VỰC TRẠNG THÁI KIỂM ĐỊNH */}
      {preview.readyToPublish ? (
        <Alert className="bg-emerald-50 border-emerald-200 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <AlertTitle className="text-emerald-800 font-bold uppercase tracking-wider text-sm">
            Sẵn sàng xuất bản
          </AlertTitle>
          <AlertDescription className="text-emerald-600 text-xs">
            Dữ liệu Transcript hợp lệ. Bài học đã sẵn sàng để công khai cho học
            viên.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-red-50 border-red-200 shadow-sm">
          <XCircle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800 font-bold uppercase tracking-wider text-sm">
            Chưa thể xuất bản
          </AlertTitle>
          <AlertDescription className="text-red-600 text-xs mt-2">
            <ul className="list-disc list-inside space-y-1">
              {preview.publishBlockers?.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* HEADER THỐNG KÊ & NÚT ACTION TÁI TẠO */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mt-8">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">
            Thống kê & Đồng bộ
          </h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[280px] bg-gray-900 text-white border-none shadow-xl rounded-xl p-3 font-mono text-xs">
                <p>
                  Hệ thống tự động cắt câu và tạo khoảng trống (blank spaces)
                  dựa trên JSON.
                  <br />
                  <br />
                  <span className="text-orange-400 font-bold">
                    Khi nào cần tái tạo?
                  </span>{" "}
                  Khi bạn vừa sửa đổi Transcript gốc hoặc phát hiện hệ thống cắt
                  câu bị lỗi, hãy bấm nút này để làm mới toàn bộ.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          disabled={regenerateMutation.isPending || !preview.readyToPublish} // Thêm check: chỉ cho tạo lại khi JSON đã chuẩn
          className="h-8 bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 hover:text-orange-700 font-bold text-[11px] rounded-lg shadow-sm disabled:opacity-50 disabled:grayscale"
        >
          {regenerateMutation.isPending ? (
            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          )}
          {regenerateMutation.isPending ? "Đang xử lý..." : "Tái tạo Templates"}
        </Button>
      </div>

      {/* THỐNG KÊ NHANH */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-gray-900">
            {preview.totalSegments}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            Tổng số câu
          </span>
        </div>
        <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-gray-900">
            {preview.totalWords}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            Tổng số từ
          </span>
        </div>
      </div>

      {/* PREVIEW CÁC CÂU THOẠI (SEGMENTS) */}
      <div className="space-y-3 mt-6">
        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">
          Chi tiết Transcript
        </h4>

        {preview.segments?.length === 0 ? (
          <p className="text-xs text-gray-500 italic text-center py-4">
            Chưa có dữ liệu segment nào hợp lệ để hiển thị.
          </p>
        ) : (
          <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {preview.segments.map((seg) => (
              <div
                key={seg.index}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:border-orange-300 transition-colors group shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                      Câu {seg.index + 1}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                      {seg.wordCount} từ
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-gray-400 font-sans">
                    {seg.startTime}s - {seg.endTime}s
                  </span>
                </div>
                <p className="text-sm text-gray-800 font-medium leading-relaxed">
                  {seg.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
