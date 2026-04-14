"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useLessonActions } from "@/hooks/use-lesson";
import {
  CreateLessonSchema,
  CreateLessonFormValues,
} from "@/schemas/lesson.schema";
import { LessonFormFields } from "./lesson-form-fields";

interface QuickCreateTabProps {
  onSuccess: (id?: string) => void;
}

const LEVEL_MAP: Record<string, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
  Expert: 3,
};

const LESSON_TYPE_MAP: Record<string, number> = {
  Dictation: 0,
  Shadowing: 1,
};

export function QuickCreateTab({ onSuccess }: QuickCreateTabProps) {
  const { createLesson, isCreating } = useLessonActions();

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

  const onManualSubmit = (values: CreateLessonFormValues) => {
    if (!values.mediaUrl) {
      toast.error("Vui lòng nhập Media URL trước khi tạo bài học!");
      return;
    }

    createLesson(
      {
        ...values,
        level: LEVEL_MAP[values.level] ?? 0,
        lessonType: LESSON_TYPE_MAP[values.lessonType] ?? 0,
        durationSeconds: Number(values.durationSeconds) || 0,
        displayOrder: Number(values.displayOrder) || 0,
        tags: values.tags?.trim() || "",
        thumbnailUrl: values.thumbnailUrl || null,
      },
      {
        onSuccess: (data: any) => {
          manualForm.reset();
          onSuccess(data?.id);
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      <Form {...manualForm}>
        <form onSubmit={manualForm.handleSubmit(onManualSubmit)}>
          <LessonFormFields form={manualForm as any} isEditMode={false} />

          <DialogFooter className="pt-8 mt-10 border-t border-slate-100 dark:border-white/5">
            <Button
              type="submit"
              disabled={isCreating}
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
