"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, BookPlus } from "lucide-react";
import { useLessonActions } from "@/hooks/use-lesson";
import { LessonSchema, LessonFormValues } from "@/schemas/lesson.schema";
import { LessonFormFields } from "./lesson-form-fields"; // Tái sử dụng component Form Fields

interface CreateLessonDialogProps {
  children?: React.ReactNode;
}

export default function CreateLessonDialog({
  children,
}: CreateLessonDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { createLesson, isCreating } = useLessonActions();

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

  const onSubmit = (values: LessonFormValues) => {
    const formattedTags = values.tags
      ? JSON.stringify(values.tags.split(",").map((t) => t.trim()))
      : null;

    const payload = {
      ...values,
      lessonType: String(values.lessonType),
      level: String(values.level),
      status: String(values.status),
      tags: formattedTags,
      durationSeconds: Number(values.durationSeconds),
      displayOrder: Number(values.displayOrder),
    };

    createLesson(payload as any, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="h-9 gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20">
            <Plus className="h-4 w-4" /> Thêm bài học
          </Button>
        )}
      </DialogTrigger>

      {/* Sửa nền dialog thành trắng, nới rộng 900px */}
      <DialogContent className="sm:max-w-[900px] bg-white border-gray-200 text-gray-900 font-mono max-h-[90vh] overflow-y-auto no-scrollbar p-0 rounded-[2rem]">
        <DialogHeader className="px-8 py-6 border-b border-gray-100 bg-gray-50 sticky top-0 z-20">
          <DialogTitle className="flex items-center gap-2 text-2xl font-black uppercase text-gray-900">
            <BookPlus className="h-6 w-6 text-orange-500" /> Tạo Bài Học Mới
          </DialogTitle>
        </DialogHeader>

        <div className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Tái sử dụng luôn FormFields đã làm đẹp bên Drawer */}
              <LessonFormFields form={form} />

              <DialogFooter className="pt-8 mt-8 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98]"
                >
                  {isCreating ? (
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-6 w-6" />
                  )}
                  {isCreating ? "Đang tạo hệ thống..." : "Xác nhận tạo bài học"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
