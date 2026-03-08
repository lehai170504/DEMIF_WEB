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
import { Loader2, Sparkles } from "lucide-react";
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
        <h4 className="text-sm font-bold text-orange-600 border-b border-orange-100 pb-2">
          1. Thông tin hiển thị
        </h4>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold text-slate-600">
                Tiêu đề bài học
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-white border-slate-200 shadow-sm h-12 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-900 font-medium"
                  {...field}
                  value={field.value ?? ""} // Chống lỗi undefined
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="lessonType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Loại bài học
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={String(field.value ?? "Dictation")} // Nhận giá trị chuẩn từ BE
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border-slate-200 shadow-sm h-11 rounded-lg text-slate-900 focus:ring-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-xl">
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
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Trình độ
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || "Beginner"}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border-slate-200 shadow-sm h-11 rounded-lg text-slate-900 focus:ring-orange-500">
                      <SelectValue placeholder="Chọn trình độ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-xl">
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
              <FormLabel className="text-xs font-semibold text-slate-600">
                Mô tả bài học
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white border-slate-200 shadow-sm min-h-[100px] rounded-xl resize-none text-slate-700 leading-relaxed focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Danh mục
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-slate-200 shadow-sm h-11 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-900"
                    placeholder="Ví dụ: Giao tiếp, Kinh doanh..."
                    {...field}
                    value={field.value ?? ""}
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
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Thẻ phân loại (Tags)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-slate-200 shadow-sm h-11 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-900"
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
        <h4 className="text-sm font-bold text-blue-600 border-b border-blue-100 pb-2">
          2. Tài nguyên đa phương tiện
        </h4>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="audioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Đường dẫn Audio
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-slate-200 shadow-sm h-11 rounded-lg text-blue-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Đường dẫn Video
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-slate-200 shadow-sm h-11 rounded-lg text-blue-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Ảnh bìa (Thumbnail URL)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-slate-200 shadow-sm h-11 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Loại Media chính hiển thị
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? "audio"}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border-slate-200 shadow-sm h-11 rounded-lg text-slate-900 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-xl">
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
        <h4 className="text-sm font-bold text-purple-600 border-b border-purple-100 pb-2">
          3. Nội dung và Phụ đề
        </h4>
        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="fullTranscript"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Văn bản gốc (Full Transcript)
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-slate-50/50 border-slate-200 shadow-inner min-h-[150px] rounded-xl font-mono text-sm text-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    {...field}
                    value={field.value ?? ""}
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
                  <FormLabel className="text-xs font-semibold text-slate-600">
                    Cấu trúc thời gian (JSON)
                  </FormLabel>

                  <div className="flex items-center gap-2">
                    {lessonId && <TranscriptImportDialog lessonId={lessonId} />}

                    {lessonId && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => regenerateMutation.mutate(lessonId)}
                        disabled={regenerateMutation.isPending || !field.value}
                        className="h-8 text-xs font-semibold text-purple-600 hover:text-purple-700 hover:bg-purple-50 gap-1.5 border border-purple-100 rounded-lg"
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
                    className="bg-slate-50/50 border-slate-200 shadow-inner min-h-[150px] rounded-xl font-mono text-xs text-emerald-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
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
        <h4 className="text-sm font-bold text-slate-500 border-b border-slate-200 pb-2">
          4. Cài đặt hệ thống
        </h4>
        <div className="grid grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Trạng thái
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? "draft"}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border-slate-200 shadow-sm h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-slate-200 text-slate-900 shadow-xl">
                    {LESSON_STATUSES.map((s) => (
                      <SelectItem
                        key={s.value}
                        value={s.value}
                        className="focus:bg-slate-100"
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
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Thứ tự hiển thị
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-white border-slate-200 shadow-sm h-11 rounded-lg text-slate-900"
                    {...field}
                    value={field.value ?? 0} // Fix để hiển thị đúng số 0 hoặc số thứ tự từ BE
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
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
                <FormLabel className="text-xs font-semibold text-slate-600">
                  Thời lượng (Giây)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-white border-slate-200 shadow-sm h-11 rounded-lg text-slate-900"
                    {...field}
                    value={field.value ?? 0} // Fix để nhận đúng số nguyên từ BE
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
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
            <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-sm font-bold text-slate-900">
                  Gói nội dung Premium
                </FormLabel>
                <FormDescription className="text-xs text-slate-500">
                  Bật để chỉ cho phép thành viên đã nâng cấp truy cập bài học
                  này.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={!!field.value}
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
