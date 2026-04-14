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
import { LESSON_TYPES } from "./lesson.constants";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Sparkles,
  FileText,
  Settings2,
  FolderTree,
  Database,
} from "lucide-react";
import { useRegenerateTemplates } from "@/hooks/use-lesson";
import { useParams } from "next/navigation";
import { TranscriptImportDialog } from "./transcript-import-dialog";

interface LessonFormFieldsProps {
  form: UseFormReturn<any>;
  isEditMode?: boolean;
}

export function LessonFormFields({
  form,
  isEditMode = false,
}: LessonFormFieldsProps) {
  const params = useParams();
  const lessonId = params.id as string;
  const regenerateMutation = useRegenerateTemplates();

  return (
    <div className="space-y-12">
      {/* SECTION 1: CƠ BẢN */}
      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-orange-600 dark:text-orange-500 border-b border-orange-100 dark:border-orange-500/20 pb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
          <Settings2 className="w-4 h-4" /> 1. Định danh hiển thị
        </h4>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Tiêu đề bài học <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-14 rounded-2xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-900 dark:text-white font-bold text-base shadow-inner transition-all"
                  placeholder="Nhập tiêu đề..."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage className="text-[10px] uppercase font-bold" />
            </FormItem>
          )}
        />

        {/* Hàng 1: Loại bài học & Cấp độ (Level) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="lessonType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Loại bài học <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={String(field.value ?? "Dictation")}
                >
                  <FormControl>
                    <SelectTrigger className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-slate-900 dark:text-white font-bold shadow-inner focus:ring-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl font-bold">
                    {LESSON_TYPES.map((t) => (
                      <SelectItem
                        key={t.value}
                        value={t.value}
                        className="text-xs uppercase tracking-wider"
                      >
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Cấp độ (Level) <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={String(field.value ?? "Beginner")}
                >
                  <FormControl>
                    <SelectTrigger className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-slate-900 dark:text-white font-bold shadow-inner focus:ring-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl font-bold">
                    <SelectItem
                      value="Beginner"
                      className="text-xs uppercase tracking-wider"
                    >
                      Cơ bản (Beginner)
                    </SelectItem>
                    <SelectItem
                      value="Intermediate"
                      className="text-xs uppercase tracking-wider"
                    >
                      Trung bình (Intermediate)
                    </SelectItem>
                    <SelectItem
                      value="Advanced"
                      className="text-xs uppercase tracking-wider"
                    >
                      Nâng cao (Advanced)
                    </SelectItem>
                    <SelectItem
                      value="Expert"
                      className="text-xs uppercase tracking-wider"
                    >
                      Chuyên gia (Expert)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />
        </div>

        {/* Hàng 2: Danh mục & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Danh mục phân loại <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-900 dark:text-white font-bold text-sm shadow-inner transition-all"
                    placeholder="Ví dụ: Giao tiếp, IT..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Từ khóa (Tags)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-900 dark:text-white font-bold text-sm shadow-inner transition-all"
                    placeholder="Cách nhau bởi dấu phẩy (travel, daily...)"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Mô tả khái quát
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 min-h-[100px] rounded-2xl resize-none text-slate-700 dark:text-slate-300 font-medium leading-relaxed focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-inner p-4"
                  placeholder="Mô tả nội dung bài học..."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage className="text-[10px] uppercase font-bold" />
            </FormItem>
          )}
        />
      </div>

      {/* SECTION 2: TÀI NGUYÊN (MEDIA) */}
      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-500 border-b border-blue-100 dark:border-blue-500/20 pb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
          <FolderTree className="w-4 h-4" /> 2. Nguồn dữ liệu (Media)
        </h4>

        {isEditMode && (
          <FormField
            control={form.control}
            name="audioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Đường dẫn Audio (Ghi đè Video)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-blue-600 dark:text-blue-400 font-bold text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner"
                    placeholder="https://..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="mediaUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Media Source URL <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-blue-600 dark:text-blue-400 font-bold text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner"
                    placeholder="https://youtube.com/..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mediaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Định dạng <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? "audio"}
                >
                  <FormControl>
                    <SelectTrigger className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-slate-900 dark:text-white font-bold shadow-inner focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl font-bold">
                    <SelectItem
                      value="audio"
                      className="text-xs uppercase tracking-wider"
                    >
                      Audio / Podcast
                    </SelectItem>
                    <SelectItem
                      value="video"
                      className="text-xs uppercase tracking-wider"
                    >
                      Video / YouTube
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Ảnh bìa (Thumbnail URL)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-slate-900 dark:text-white font-bold text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner"
                    placeholder="https://..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />

          {!isEditMode && (
            <FormField
              control={form.control}
              name="durationSeconds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Thời lượng dự kiến (Giây){" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-slate-900 dark:text-white font-bold text-sm focus:border-blue-500 shadow-inner"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        field.onChange(isNaN(val) || val <= 0 ? 1 : val);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold" />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>

      {/* SECTION 3: TRANSCRIPT */}
      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-purple-600 dark:text-purple-400 border-b border-purple-100 dark:border-purple-500/20 pb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
          <FileText className="w-4 h-4" /> 3. Dữ liệu văn bản (Transcript)
        </h4>

        {!isEditMode && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Cấu trúc văn bản <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? "srt"}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-slate-900 dark:text-white font-bold shadow-inner focus:ring-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl font-bold">
                      <SelectItem
                        value="srt"
                        className="text-xs uppercase tracking-wider"
                      >
                        SRT (Khuyên dùng)
                      </SelectItem>
                      <SelectItem
                        value="vtt"
                        className="text-xs uppercase tracking-wider"
                      >
                        VTT
                      </SelectItem>
                      <SelectItem
                        value="plain"
                        className="text-xs uppercase tracking-wider"
                      >
                        Plain Text (Văn bản thuần)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[10px] uppercase font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transcript"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Dữ liệu thô (Raw Content){" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-slate-900 dark:bg-black border-slate-800 shadow-inner min-h-[300px] rounded-2xl font-mono text-[11px] text-emerald-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-6 leading-relaxed custom-scrollbar"
                      placeholder="Dán nội dung .srt, .vtt hoặc văn bản vào đây..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription className="text-[10px] font-bold text-slate-400 mt-2">
                    <Sparkles className="w-3 h-3 inline mr-1 text-purple-500" />
                    Hệ thống AI sẽ phân tích và đồng bộ hóa timestamps tự động.
                  </FormDescription>
                  <FormMessage className="text-[10px] uppercase font-bold" />
                </FormItem>
              )}
            />
          </div>
        )}

        {isEditMode && (
          <FormField
            control={form.control}
            name="fullTranscript"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-3">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Văn bản gốc (Full Transcript){" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    {lessonId && <TranscriptImportDialog lessonId={lessonId} />}
                    {lessonId && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => regenerateMutation.mutate(lessonId)}
                        disabled={regenerateMutation.isPending || !field.value}
                        className="h-9 px-4 text-[10px] uppercase tracking-widest font-black text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 rounded-xl"
                      >
                        {regenerateMutation.isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin mr-2" />
                        ) : (
                          <Sparkles className="h-3 w-3 mr-2" />
                        )}
                        Đồng bộ Templates
                      </Button>
                    )}
                  </div>
                </div>

                <FormControl>
                  <Textarea
                    className="bg-slate-900 dark:bg-black border-slate-800 shadow-inner min-h-[300px] rounded-2xl font-mono text-[11px] text-emerald-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-6 leading-relaxed custom-scrollbar"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription className="text-[10px] font-bold text-slate-400 mt-2">
                  Chú ý: Sửa đổi nội dung này sẽ kích hoạt cơ chế đục lỗ lại từ
                  đầu.
                </FormDescription>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />
        )}
      </div>

      {/* SECTION 4: HỆ THỐNG */}
      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-slate-400 border-b border-slate-200 dark:border-white/10 pb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
          <Database className="w-4 h-4" /> 4. Phân quyền truy cập
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Thứ tự sắp xếp
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-12 rounded-xl text-slate-900 dark:text-white font-bold text-sm shadow-inner"
                    {...field}
                    value={field.value ?? 0}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      field.onChange(isNaN(val) || val < 0 ? 0 : val);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPremiumOnly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-orange-200 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/5 p-5 shadow-sm mt-1 sm:mt-6">
                <div className="space-y-1">
                  <FormLabel className="text-[11px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-500">
                    Bật khóa Premium
                  </FormLabel>
                  <FormDescription className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    Yêu cầu trả phí để xem bài này
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-orange-500 scale-110"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
