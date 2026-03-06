// src/app/admin/lessons/[id]/page.tsx
"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Trash2, ArrowLeft, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";

import { useLesson, useLessonActions } from "@/hooks/use-lesson";
import { LessonSchema, LessonFormValues } from "@/schemas/lesson.schema";
import { UpdateLessonRequest } from "@/types/lesson.type";

import { LessonFormFields } from "@/components/admin/lesson/lesson-form-fields";
import { DictationPreviewTab } from "@/components/admin/lesson/dictation-preview-tab";
import {
  normalizeStatus,
  normalizeType,
  normalizeLevel,
} from "@/components/admin/lesson/table-columns";

const parseTagsForInput = (tagsRaw?: string | null) => {
  if (!tagsRaw) return "";
  try {
    const parsed = JSON.parse(tagsRaw);
    return Array.isArray(parsed) ? parsed.join(", ") : tagsRaw;
  } catch {
    return tagsRaw || "";
  }
};

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  // Lấy dữ liệu bài học
  const { data: lesson, isLoading: isFetching } = useLesson(lessonId);
  const { updateLesson, deleteLesson, isUpdating, isDeleting } =
    useLessonActions();

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      title: "",
      description: "",
      lessonType: "Dictation",
      level: "Beginner",
      category: "",
      status: "draft",
      isPremiumOnly: false,
      durationSeconds: 0,
      displayOrder: 0,
      audioUrl: "",
      mediaUrl: "",
      mediaType: "audio",
      thumbnailUrl: "",
      fullTranscript: "",
      timedTranscript: "",
      tags: "",
    },
  });

  const formErrors = form.formState.errors;

  // Cập nhật form khi fetch xong data
  React.useEffect(() => {
    if (lesson) {
      form.reset({
        title: lesson.title || "",
        description: lesson.description || "",
        lessonType: String(normalizeType(lesson.lessonType)),
        level: String(normalizeLevel(lesson.level)),
        category: lesson.category || "",
        status: String(normalizeStatus(lesson.status)).toLowerCase(),
        isPremiumOnly: !!lesson.isPremiumOnly,
        durationSeconds: Number(lesson.durationSeconds) || 0,
        displayOrder: Number(lesson.displayOrder) || 0,
        audioUrl: lesson.audioUrl || "",
        mediaUrl: lesson.mediaUrl || "",
        mediaType: lesson.mediaType || "audio",
        thumbnailUrl: lesson.thumbnailUrl || "",
        fullTranscript: lesson.fullTranscript || "",
        timedTranscript: lesson.timedTranscript || "",
        tags: parseTagsForInput(lesson.tags),
      });
    }
  }, [lesson, form]);

  const onSubmit = (values: LessonFormValues) => {
    if (!lesson) return;

    const payload: UpdateLessonRequest = {
      title: values.title,
      description: values.description,
      lessonType: values.lessonType,
      level: values.level,
      category: values.category,
      audioUrl: values.audioUrl || null,
      mediaUrl: values.mediaUrl || null,
      mediaType: values.mediaType || "audio",
      durationSeconds: Number(values.durationSeconds),
      thumbnailUrl: values.thumbnailUrl || null,
      fullTranscript: values.fullTranscript,
      timedTranscript: values.timedTranscript || null,
      isPremiumOnly: values.isPremiumOnly,
      displayOrder: Number(values.displayOrder),
      tags: values.tags || null,
      status: values.status,
    };

    updateLesson(
      { id: lesson.id, data: payload },
      {
        onSuccess: () => {
          toast.success("Đã cập nhật thông tin bài học thành công!");
          // Không redirect, ở lại trang để người dùng có thể test Preview
        },
      },
    );
  };

  const handleDelete = () => {
    if (confirm("Bạn có chắc chắn muốn xóa bài học này vĩnh viễn không?")) {
      deleteLesson(lessonId, {
        onSuccess: () => {
          toast.success("Đã xóa bài học!");
          router.push("/admin/lessons"); // Xóa xong thì quay về danh sách
        },
      });
    }
  };

  if (isFetching) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-gray-500 font-mono">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500 mb-4" />
        <p className="text-xs uppercase tracking-widest">
          Đang tải dữ liệu bài học...
        </p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-gray-500 font-mono">
        <p>Không tìm thấy bài học.</p>
        <Button variant="link" onClick={() => router.push("/admin/lessons")}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 font-mono">
      {/* Nút Quay Lại */}
      <button
        onClick={() => router.push("/admin/lessons")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-2"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </button>

      {/* Header Trang */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-xl border border-orange-100">
              <LayoutTemplate className="h-5 w-5 text-orange-500" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
              Chi tiết bài học
            </h1>
          </div>
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] bg-gray-100 w-fit px-2 py-1 rounded-md ml-12">
            UID: {lessonId}
          </p>
        </div>

        {/* Action Buttons (Top) */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-white border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            <span className="font-bold text-xs uppercase tracking-wider">
              Xóa
            </span>
          </Button>
          <Button
            type="submit"
            form="update-lesson-form"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            <span className="font-bold text-xs uppercase tracking-wider">
              Lưu thay đổi
            </span>
          </Button>
        </div>
      </div>

      {/* Vùng Tabs Content */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm min-h-[500px]">
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="w-full bg-gray-100 p-1.5 rounded-2xl mb-8 grid grid-cols-2 h-14">
            <TabsTrigger
              value="edit"
              className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
            >
              Chỉnh sửa nội dung
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
            >
              Xem trước & Kiểm định
            </TabsTrigger>
          </TabsList>

          {/* TAB CHỈNH SỬA */}
          <TabsContent value="edit" className="mt-0 outline-none">
            <Form {...form}>
              <form
                id="update-lesson-form"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <LessonFormFields form={form} />

                {Object.keys(formErrors).length > 0 && (
                  <div className="mt-8 p-5 bg-red-50 border border-red-200 rounded-2xl">
                    <p className="text-red-600 text-xs font-black uppercase mb-3 tracking-widest">
                      Vui lòng sửa các lỗi sau để lưu:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-red-500 font-bold">
                      {Object.entries(formErrors).map(([key, err]) => (
                        <li key={key} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          <span className="uppercase text-[10px] bg-white px-1 rounded text-red-400">
                            {key}
                          </span>
                          {err?.message as string}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </Form>
          </TabsContent>

          {/* TAB XEM TRƯỚC */}
          <TabsContent value="preview" className="mt-0 outline-none">
            {/* Đảm bảo component DictationPreviewTab này đã được bạn lưu đúng đường dẫn */}
            <DictationPreviewTab lessonId={lessonId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
