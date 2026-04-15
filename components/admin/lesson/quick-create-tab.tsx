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
  CreateLessonFormValues,
  CreateLessonSchema,
} from "@/schemas/lesson.schema";

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
      format: "auto", // Backend khuyến khích dùng auto
      mediaUrl: "",
      mediaType: "youtube",
      durationSeconds: 0,
      level: "Intermediate",
      lessonType: "Dictation",
      category: "academic",
      tags: "youtube,transcript",
      thumbnailUrl: "",
    },
  });

  const onSubmit = (values: CreateLessonFormValues) => {
    createLesson(values, {
      onSuccess: (data: any) => {
        toast.success(data?.message || "Tạo bài học thành công!");
        form.reset();
        onSuccess(data?.lessonId);
      },
      onError: (err: any) => {
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
          {/* TIÊU ĐỀ & MÔ TẢ GIỮ NGUYÊN */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                  <Type className="w-3 h-3 text-orange-500" /> Tiêu đề bài học
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="VD: Cassie School Starts Later"
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
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                  <FileText className="w-3 h-3 text-blue-500" /> Mô tả ngắn
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mô tả..."
                    className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs shadow-inner"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold text-red-500" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="mediaUrl"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                    <Globe className="w-3 h-3 text-emerald-500" /> URL
                    (Youtube/Media)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=..."
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
              name="durationSeconds"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                    <Settings2 className="w-3 h-3 text-pink-500" /> Thời lượng
                    (giây)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs shadow-inner"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="lessonType"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                    <Layers className="w-3 h-3 text-orange-500" /> Loại bài
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs uppercase shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-mono">
                      <SelectItem
                        value="Dictation"
                        className="text-[11px] font-bold uppercase"
                      >
                        Dictation
                      </SelectItem>
                      <SelectItem
                        value="Shadowing"
                        className="text-[11px] font-bold uppercase"
                      >
                        Shadowing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                    <Signal className="w-3 h-3 text-emerald-500" /> Cấp độ
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs uppercase shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-mono">
                      {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                        (lvl) => (
                          <SelectItem
                            key={lvl}
                            value={lvl}
                            className="text-[11px] font-bold uppercase"
                          >
                            {lvl}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                    <Settings2 className="w-3 h-3 text-pink-500" /> Định dạng
                    Transcript
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs uppercase shadow-inner">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-mono">
                      <SelectItem
                        value="auto"
                        className="text-[11px] font-bold uppercase"
                      >
                        Auto Detect (Recommend)
                      </SelectItem>
                      <SelectItem
                        value="vtt"
                        className="text-[11px] font-bold uppercase"
                      >
                        VTT (Tactiq/YouTube)
                      </SelectItem>
                      <SelectItem
                        value="srt"
                        className="text-[11px] font-bold uppercase"
                      >
                        SRT
                      </SelectItem>
                      <SelectItem
                        value="plain"
                        className="text-[11px] font-bold uppercase"
                      >
                        Plain Text
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                    <Hash className="w-3 h-3 text-purple-500" /> Thẻ (Tags)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tag1, tag2..."
                      className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border-none font-bold text-xs shadow-inner"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="transcript"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                  <FileText className="w-3 h-3 text-pink-500" /> Nội dung
                  Transcript
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Dán nội dung từ Tactiq.io hoặc YouTube vào đây..."
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
