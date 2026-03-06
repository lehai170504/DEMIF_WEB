"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { LessonFormValues } from "@/schemas/lesson.schema";
import {
  LESSON_TYPES,
  LESSON_LEVELS,
  LESSON_STATUSES,
} from "./lesson.constants";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, Sparkles } from "lucide-react";
import { useRegenerateTemplates } from "@/hooks/use-lesson";
import { useParams } from "next/navigation";
import { TranscriptImportDialog } from "./transcript-import-dialog";

interface LessonFormFieldsProps {
  form: UseFormReturn<LessonFormValues>;
}

export function LessonFormFields({ form }: LessonFormFieldsProps) {
  const params = useParams();
  const lessonId = params.id as string;
  const regenerateMutation = useRegenerateTemplates();

  return (
    <div className="space-y-12">
      {/* SECTION 1: CƠ BẢN */}
      <div className="space-y-6">
        <h4 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] border-b border-orange-100 pb-4">
          01. Thông tin hiển thị
        </h4>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Tiêu đề
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-white border-gray-200 shadow-sm h-14 rounded-2xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900 font-bold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="lessonType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Loại bài
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-gray-900 focus:ring-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
                    {LESSON_TYPES.map((t) => (
                      <SelectItem
                        key={t.value}
                        value={t.value}
                        className="focus:bg-orange-50"
                      >
                        {t.label}
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
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Trình độ
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-gray-900 focus:ring-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
                    {LESSON_LEVELS.map((l) => (
                      <SelectItem
                        key={l.value}
                        value={l.value}
                        className="focus:bg-orange-50"
                      >
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                Mô tả bài học
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white border-gray-200 shadow-sm min-h-[100px] rounded-2xl resize-none text-gray-700 leading-relaxed focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Danh mục
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-200 shadow-sm h-12 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900"
                    placeholder="Giao tiếp..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Tags
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-200 shadow-sm h-12 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-900"
                    placeholder="travel, daily..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SECTION 2: MEDIA */}
      <div className="space-y-6">
        <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] border-b border-blue-100 pb-4">
          02. Tài nguyên đa phương tiện
        </h4>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="audioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Audio (URL)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-blue-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mediaUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Video (URL)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-blue-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Ảnh bìa (URL)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mediaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Loại Media chính
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-gray-900 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
                    <SelectItem value="audio">Audio (Podcast/MP3)</SelectItem>
                    <SelectItem value="video">Video (YouTube/MP4)</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SECTION 3: TRANSCRIPT */}
      <div className="space-y-6">
        <h4 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.3em] border-b border-purple-100 pb-4">
          03. Nội dung & Phụ đề
        </h4>
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="fullTranscript"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Văn bản gốc
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-gray-50 border-gray-200 shadow-inner min-h-[150px] rounded-2xl font-mono text-xs text-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timedTranscript"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-1">
                  <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                    Cấu trúc thời gian (JSON)
                  </FormLabel>

                  {/* CỤM NÚT ACTION NHANH CHO TRANSCRIPT */}
                  <div className="flex items-center gap-2">
                    {lessonId && <TranscriptImportDialog lessonId={lessonId} />}

                    {lessonId && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => regenerateMutation.mutate(lessonId)}
                        disabled={regenerateMutation.isPending || !field.value}
                        className="h-7 text-[9px] font-black uppercase text-purple-600 hover:text-purple-700 hover:bg-purple-50 gap-1.5 border border-purple-100"
                      >
                        {regenerateMutation.isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3" />
                        )}
                        Đồng bộ Templates
                      </Button>
                    )}
                  </div>
                </div>
                <FormControl>
                  <Textarea
                    className="bg-gray-50 border-gray-200 shadow-inner min-h-[150px] rounded-2xl font-mono text-[11px] text-emerald-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SECTION 4: HỆ THỐNG */}
      <div className="space-y-6">
        <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] border-b border-gray-200 pb-4">
          04. Cài đặt hệ thống
        </h4>
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Trạng thái
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 text-gray-900 shadow-xl">
                    {LESSON_STATUSES.map((s) => (
                      <SelectItem
                        key={s.value}
                        value={s.value}
                        className="focus:bg-gray-100"
                      >
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Thứ tự hiển thị
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-gray-900"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationSeconds"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold text-gray-500 uppercase">
                  Thời lượng (s)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-white border-gray-200 shadow-sm h-12 rounded-xl text-gray-900"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isPremiumOnly"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="space-y-1">
                <FormLabel className="text-sm font-black text-gray-900">
                  Gói nội dung Premium
                </FormLabel>
                <FormDescription className="text-xs text-gray-500 italic">
                  Bật để chỉ cho phép thành viên đã nâng cấp truy cập bài học
                  này.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-orange-500"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
