"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Trash2, X } from "lucide-react";
import { useLessonActions } from "@/hooks/use-lesson";
import { LessonSchema, LessonFormValues } from "@/schemas/lesson.schema";
import { LessonDto, UpdateLessonRequest } from "@/types/lesson.type";
import {
  normalizeStatus,
  normalizeType,
  normalizeLevel,
} from "./table-columns";
import { LessonFormFields } from "./lesson-form-fields";

interface LessonDetailDrawerProps {
  lesson: LessonDto | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const parseTagsForInput = (tagsRaw?: string | null) => {
  if (!tagsRaw) return "";
  try {
    const parsed = JSON.parse(tagsRaw);
    return Array.isArray(parsed) ? parsed.join(", ") : tagsRaw;
  } catch {
    return tagsRaw || "";
  }
};

export default function LessonDetailDrawer({
  lesson,
  open,
  onOpenChange,
}: LessonDetailDrawerProps) {
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

  React.useEffect(() => {
    if (open && lesson) {
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
  }, [open, lesson, form]);

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
          onOpenChange(false);
          form.reset();
        },
      },
    );
  };

  if (!lesson) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="bg-white border-l border-gray-200 text-gray-900 font-mono h-full max-w-[900px] ml-auto rounded-l-[2rem] flex flex-col shadow-2xl focus:outline-none">
        <DrawerHeader className="border-b border-gray-100 py-6 px-8">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-black uppercase tracking-tighter text-gray-900">
              Chi tiết bài học
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 text-gray-500 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-[0.2em] bg-gray-100 w-fit px-2 py-1 rounded-md">
            UID: {lesson.id}
          </p>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <Form {...form}>
            <form
              id="update-lesson-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <LessonFormFields form={form} />

              {Object.keys(formErrors).length > 0 && (
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <p className="text-red-600 text-xs font-black uppercase mb-2 tracking-widest">
                    Cần sửa các lỗi sau:
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-red-500 font-bold">
                    {Object.entries(formErrors).map(([key, err]) => (
                      <li key={key}>
                        • {key}: {err?.message as string}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </Form>
        </div>

        <DrawerFooter className="border-t border-gray-100 bg-gray-50 p-8">
          <div className="grid grid-cols-2 gap-6 w-full">
            <Button
              variant="outline"
              className="bg-white border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 h-14 rounded-2xl transition-all"
              onClick={() =>
                confirm("Xác nhận xóa bài học?") &&
                deleteLesson(lesson.id, {
                  onSuccess: () => onOpenChange(false),
                })
              }
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 className="h-5 w-5 mr-2" />
              )}
              <span className="font-bold uppercase tracking-wider text-xs">
                Xóa bài học
              </span>
            </Button>
            <Button
              type="submit"
              form="update-lesson-form"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              <span className="font-bold uppercase tracking-wider text-xs">
                Lưu thay đổi
              </span>
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
