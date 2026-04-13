"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, UploadCloud, FileAudio } from "lucide-react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useLessonActions, useUploadAudio } from "@/hooks/use-lesson";
import {
  CreateLessonSchema,
  CreateLessonFormValues,
} from "@/schemas/lesson.schema";
import { LessonFormFields } from "./lesson-form-fields";

interface QuickCreateTabProps {
  onSuccess: (id?: string) => void;
}

export function QuickCreateTab({ onSuccess }: QuickCreateTabProps) {
  const { createLesson, isCreating } = useLessonActions();

  const { mutateAsync: uploadAudioFile, isPending: isUploading } =
    useUploadAudio();

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = React.useState<string | null>(
    null,
  );

  const manualForm = useForm<CreateLessonFormValues>({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      title: "",
      description: "",
      transcript: "",
      format: "srt",
      mediaUrl: "",
      mediaType: "audio",
      durationSeconds: 0,
      level: "Beginner",
      lessonType: "Dictation",
      category: "General",
      isPremiumOnly: false,
      displayOrder: 0,
    },
  });

  // --- HÀM XỬ LÝ UPLOAD FILE ---
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("audio/") && !file.name.endsWith(".mp3")) {
      toast.error("Vui lòng chọn file Audio (MP3)!");
      return;
    }

    setUploadedFileName(file.name);

    try {
      // 3. Gọi API thông qua hook
      const response = await uploadAudioFile(file);

      // 4. Fill data vào form tự động
      manualForm.setValue("mediaUrl", response.mediaUrl, {
        shouldValidate: true,
      });
      manualForm.setValue("mediaType", "audio");

      toast.success("Upload Audio thành công!");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(
        error.response?.data?.error || "Lỗi khi upload file âm thanh",
      );
      setUploadedFileName(null);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onManualSubmit = (values: CreateLessonFormValues) => {
    if (!values.mediaUrl) {
      toast.error("Vui lòng upload file Audio hoặc nhập Media URL trước!");
      return;
    }

    createLesson(
      {
        ...values,
        durationSeconds: Number(values.durationSeconds),
        displayOrder: Number(values.displayOrder),
        tags: values.tags?.trim() || null,
        thumbnailUrl: values.thumbnailUrl || null,
      },
      {
        onSuccess: (data: any) => {
          manualForm.reset();
          setUploadedFileName(null);
          onSuccess(data?.id);
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      {/* ================= KHU VỰC UPLOAD AUDIO ================= */}
      <div
        className="relative overflow-hidden rounded-3xl border-2 border-dashed border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10 transition-colors duration-300 p-8 text-center cursor-pointer group"
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          accept="audio/mpeg, audio/mp3, audio/wav"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-[#FF7A00] animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00]">
              Đang tải {uploadedFileName} lên mây...
            </span>
          </div>
        ) : uploadedFileName || manualForm.watch("mediaUrl") ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-2">
              <FileAudio className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {uploadedFileName || "Đã liên kết Audio URL"}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Đã sẵn sàng
            </span>
            <span className="text-[10px] text-gray-500 mt-2 group-hover:underline">
              (Bấm vào để đổi file khác)
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#FF7A00] shadow-sm group-hover:scale-110 transition-transform mb-2">
              <UploadCloud className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Tải lên file Audio (MP3)
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Nhấn vào đây để chọn file
            </span>
          </div>
        )}
      </div>

      {/* ================= KHU VỰC FORM THÔNG TIN ================= */}
      <Form {...manualForm}>
        <form onSubmit={manualForm.handleSubmit(onManualSubmit)}>
          <LessonFormFields form={manualForm as any} isEditMode={false} />

          <DialogFooter className="pt-8 mt-10 border-t border-slate-100 dark:border-white/5">
            <Button
              type="submit"
              disabled={isCreating || isUploading}
              className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl transition-all active:scale-95"
            >
              {isCreating ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 h-5 w-5" />
              )}
              Tạo Bài Học Mới (Draft)
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
