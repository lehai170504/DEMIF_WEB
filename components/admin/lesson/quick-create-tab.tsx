import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
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
          onSuccess(data?.id);
        },
      },
    );
  };

  return (
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
  );
}
