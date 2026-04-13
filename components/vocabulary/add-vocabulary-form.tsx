"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Plus,
  Type,
  BookA,
  AlignLeft,
  FileText,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddVocabulary } from "@/hooks/use-vocabulary";
import { useUserLessons } from "@/hooks/use-lesson";
import {
  createVocabularySchema,
  CreateVocabularyFormValues,
} from "@/schemas/vocabulary.schema";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function AddVocabularyForm({ onSuccess }: { onSuccess?: () => void }) {
  const { mutate, isPending } = useAddVocabulary();
  const { data: lessonData, isLoading: isLoadingLessons } = useUserLessons({
    page: 1,
    pageSize: 100,
  });

  const lessons = lessonData?.items || [];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateVocabularyFormValues>({
    resolver: zodResolver(createVocabularySchema),
    defaultValues: {
      lessonId: "",
      word: "",
      topic: "",
      meaning: "",
      contextSentence: "",
      note: "",
    },
  });

  const onSubmit = (data: CreateVocabularyFormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Đã thêm từ vựng mới thành công!");
        reset();
        onSuccess?.();
      },
      onError: () => {
        toast.error("Không thể thêm từ vựng. Vui lòng kiểm tra lại!");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 pt-4 font-mono"
    >
      {/* Lesson ID Dropdown - Lấy từ useUserLessons */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">
          Chọn bài học nguồn
        </label>
        <Controller
          name="lessonId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className={cn(
                  "h-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 pl-11 relative",
                  errors.lessonId && "border-red-500",
                )}
              >
                <BookA className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <SelectValue
                  placeholder={
                    isLoadingLessons ? "Đang tải bài học..." : "Chọn bài học"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#0D0D0D] border-gray-200 dark:border-white/10 font-mono max-h-[300px]">
                {lessons.length > 0 ? (
                  lessons.map((lesson: any) => (
                    <SelectItem
                      key={lesson.id}
                      value={lesson.id}
                      className="text-xs uppercase font-bold"
                    >
                      {lesson.title}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-[10px] text-zinc-500 uppercase font-black">
                    Chưa có bài học nào
                  </div>
                )}
              </SelectContent>
            </Select>
          )}
        />
        {errors.lessonId && (
          <p className="text-[9px] text-red-500 font-bold uppercase ml-4">
            {errors.lessonId.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="relative group">
            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              {...register("word")}
              placeholder="Từ vựng"
              className={cn(
                "pl-11 h-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10",
                errors.word && "border-red-500",
              )}
            />
          </div>
          {errors.word && (
            <p className="text-[9px] text-red-500 font-bold uppercase ml-4">
              {errors.word.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <div className="relative group">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              {...register("topic")}
              placeholder="Chủ đề"
              className={cn(
                "pl-11 h-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10",
                errors.topic && "border-red-500",
              )}
            />
          </div>
          {errors.topic && (
            <p className="text-[9px] text-red-500 font-bold uppercase ml-4">
              {errors.topic.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <div className="relative group">
          <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            {...register("meaning")}
            placeholder="Ý nghĩa (Tiếng Việt)"
            className={cn(
              "pl-11 h-12 rounded-2xl bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10",
              errors.meaning && "border-red-500",
            )}
          />
        </div>
        {errors.meaning && (
          <p className="text-[9px] text-red-500 font-bold uppercase ml-4">
            {errors.meaning.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
          <Textarea
            {...register("contextSentence")}
            placeholder="Câu ví dụ trong ngữ cảnh"
            className="min-h-[80px] rounded-2xl bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 pl-11 pt-4"
          />
        </div>
        <Textarea
          {...register("note")}
          placeholder="Ghi chú thêm (từ loại, cấu trúc...)"
          className="min-h-[80px] rounded-2xl bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 px-5 pt-4"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending || isLoadingLessons}
        className="w-full h-14 rounded-2xl bg-[#FF7A00] hover:bg-orange-600 text-white font-black uppercase tracking-widest text-xs mt-2 shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> XÁC NHẬN HỆ THỐNG
          </div>
        )}
      </Button>
    </form>
  );
}
