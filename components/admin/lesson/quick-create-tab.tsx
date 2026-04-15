"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  CheckCircle2,
  Type,
  FileText,
  Globe,
  Layers,
  Signal,
  Hash,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLessonActions } from "@/hooks/use-lesson";
import {
  CreateLessonSchema,
  CreateLessonFormValues,
} from "@/schemas/lesson.schema";
import {
  LESSON_TYPES,
  LESSON_LEVELS,
} from "@/components/admin/lesson/lesson.constants";

interface QuickCreateTabProps {
  onSuccess: (id?: string) => void;
}

export function QuickCreateTab({ onSuccess }: QuickCreateTabProps) {
  const { createLesson, isCreating } = useLessonActions();

  const form = useForm<CreateLessonFormValues>({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      title: "",
      description: "",
      transcript: "",
      format: "srt", // Để mặc định là srt cho phổ biến
      mediaUrl: "",
      level: "0",
      lessonType: "0",
      tags: "",
    },
  });

  const onSubmit = (values: CreateLessonFormValues) => {
    const payload = {
      title: values.title,
      description: values.description,
      transcript: values.transcript,
      format: values.format,
      mediaUrl: values.mediaUrl,
      level: Number(values.level),
      lessonType: Number(values.lessonType),
      tags: values.tags?.trim() || "",
    };

    createLesson(payload, {
      onSuccess: (data: any) => {
        toast.success("Tạo bài học thành công!");
        form.reset();
        onSuccess(data?.lessonId);
      },
      onError: (err: any) => {
        // Hiện lỗi chi tiết từ BE nếu có
        const errorMsg =
          err?.response?.data?.error || "Có lỗi xảy ra khi tạo bài học.";
        toast.error(errorMsg);
      },
    });
  };

  return (
    <div className="space-y-6 font-mono text-left">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* HÀNG 1: TIÊU ĐỀ */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2 text-left">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                  <Type className="w-3 h-3 text-orange-500" /> Tiêu đề bài học
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="VD: Daily Conversation - Ordering Coffee"
                    className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs shadow-inner"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold text-red-500" />
              </FormItem>
            )}
          />

          {/* HÀNG 2: MÔ TẢ */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2 text-left">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                  <FileText className="w-3 h-3 text-blue-500" /> Mô tả ngắn
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mô tả cho bài học này..."
                    className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs shadow-inner"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold text-red-500" />
              </FormItem>
            )}
          />

          {/* HÀNG 3: MEDIA URL & TAGS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="mediaUrl"
              render={({ field }) => (
                <FormItem className="space-y-2 text-left">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                    <Globe className="w-3 h-3 text-emerald-500" /> Media URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://storage.demif.com/audio.mp3"
                      className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs shadow-inner"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="space-y-2 text-left">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                    <Hash className="w-3 h-3 text-purple-500" /> Thẻ (Tags)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="daily, conversation, news..."
                      className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs shadow-inner"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* HÀNG 4: TYPE & LEVEL */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="lessonType"
              render={({ field }) => (
                <FormItem className="space-y-2 text-left">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                    <Layers className="w-3 h-3 text-orange-500" /> Phân loại
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs uppercase shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-mono">
                      {LESSON_TYPES.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={String(type.value)}
                          className="text-[11px] font-bold uppercase"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-2 text-left">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                    <Signal className="w-3 h-3 text-emerald-500" /> Cấp độ
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs uppercase shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-mono">
                      {LESSON_LEVELS.map((lvl) => (
                        <SelectItem
                          key={lvl.value}
                          value={String(lvl.value)}
                          className="text-[11px] font-bold uppercase"
                        >
                          {lvl.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          {/* HÀNG 5: FORMAT (MỚI THÊM) */}
          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem className="space-y-2 text-left">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                  <Settings2 className="w-3 h-3 text-pink-500" /> Định dạng
                  Transcript
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs uppercase shadow-inner">
                      <SelectValue placeholder="Chọn định dạng" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-mono">
                    <SelectItem
                      value="srt"
                      className="text-[11px] font-bold uppercase"
                    >
                      SRT (Có thời gian)
                    </SelectItem>
                    <SelectItem
                      value="vtt"
                      className="text-[11px] font-bold uppercase"
                    >
                      VTT (YouTube format)
                    </SelectItem>
                    <SelectItem
                      value="plain"
                      className="text-[11px] font-bold uppercase"
                    >
                      PLAIN (Văn bản thuần)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* HÀNG 6: TRANSCRIPT AREA */}
          <FormField
            control={form.control}
            name="transcript"
            render={({ field }) => (
              <FormItem className="space-y-2 text-left">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                  <FileText className="w-3 h-3 text-pink-500" /> Nội dung
                  Transcript
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dán nội dung transcript vào đây (Nhớ chọn đúng định dạng bên trên)..."
                    className="min-h-[160px] rounded-2xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs p-4 leading-relaxed shadow-inner"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold text-red-500" />
              </FormItem>
            )}
          />

          <DialogFooter className="pt-6 border-t border-slate-100 dark:border-white/5">
            <Button
              type="submit"
              disabled={isCreating}
              className="w-full h-14 bg-[#FF7A00] hover:bg-orange-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-95"
            >
              {isCreating ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 h-5 w-5" />
              )}
              Tạo bài học nhanh
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
