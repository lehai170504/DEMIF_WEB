"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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
import { LESSON_TYPES, LESSON_LEVELS } from "./lesson.constants";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Sparkles,
  FileText,
  Settings2,
  FolderTree,
  Database,
  Tag,
  Image as ImageIcon,
  PlayCircle,
  Music,
  Layout,
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
    <div className="space-y-12 font-mono text-left">
      {/* SECTION 1: THÔNG TIN ĐỊNH DANH */}
      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-orange-600 dark:text-orange-500 border-b border-orange-100 dark:border-orange-500/20 pb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
          <Settings2 className="w-4 h-4" /> 1. Định danh & Phân loại
        </h4>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Tiêu đề bài học *
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/10 h-14 rounded-2xl font-bold text-base shadow-inner transition-all"
                  placeholder="Nhập tiêu đề..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="lessonType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Layout className="w-3 h-3" /> Loại bài học (lessonType)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={
                    field.value !== undefined ? String(field.value) : undefined
                  }
                >
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 shadow-inner font-bold">
                      <SelectValue placeholder="Chọn loại..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-mono">
                    {LESSON_TYPES.map((t) => (
                      <SelectItem
                        key={t.value}
                        value={String(t.value)}
                        className="text-xs font-bold uppercase"
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
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Cấp độ (level)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={
                    field.value !== undefined ? String(field.value) : undefined
                  }
                >
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 shadow-inner font-bold">
                      <SelectValue placeholder="Chọn level..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-mono">
                    {LESSON_LEVELS.map((l) => (
                      <SelectItem
                        key={l.value}
                        value={String(l.value)}
                        className="text-xs font-bold uppercase"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Danh mục (category)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900 h-12 rounded-xl font-bold text-sm shadow-inner"
                    placeholder="General, Business..."
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
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Thẻ (tags)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900 h-12 rounded-xl font-bold text-sm shadow-inner"
                    placeholder="tag1, tag2..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SECTION 2: MEDIA SOURCES */}
      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-500 border-b border-blue-100 dark:border-blue-500/20 pb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
          <FolderTree className="w-4 h-4" /> 2. Media & Thumbnail
        </h4>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Mô tả bài học
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-slate-50 dark:bg-zinc-900 min-h-[80px] rounded-2xl p-4 shadow-inner leading-relaxed"
                  placeholder="Tóm tắt nội dung..."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2">
            <FormField
              control={form.control}
              name="mediaUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <PlayCircle className="w-3 h-3 text-blue-500" /> Media URL
                    (mediaUrl)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-50 dark:bg-zinc-900 h-12 rounded-xl font-bold text-xs text-blue-600 shadow-inner"
                      placeholder="https://..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="mediaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Loại Media
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || "audio"}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 shadow-inner font-bold">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-mono">
                    <SelectItem
                      value="audio"
                      className="text-xs font-bold uppercase"
                    >
                      AUDIO
                    </SelectItem>
                    <SelectItem
                      value="video"
                      className="text-xs font-bold uppercase"
                    >
                      VIDEO
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="audioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Music className="w-3 h-3 text-emerald-500" /> Audio Ghi đè
                  (audioUrl)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900 h-12 rounded-xl font-bold text-xs text-emerald-600 shadow-inner"
                    placeholder="Để trống nếu dùng mediaUrl"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <ImageIcon className="w-3 h-3 text-purple-500" /> Ảnh bìa
                  (thumbnailUrl)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-50 dark:bg-zinc-900 h-12 rounded-xl font-bold text-xs shadow-inner"
                    placeholder="https://..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* SECTION 3: SYSTEM */}
      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-slate-400 border-b border-slate-200 dark:border-white/10 pb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
          <Database className="w-4 h-4" /> 3. Quản trị & Hệ thống
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Thứ tự hiển thị
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-slate-50 dark:bg-zinc-900 h-12 rounded-xl font-bold shadow-inner"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPremiumOnly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-orange-200 bg-orange-50/30 p-5 mt-1 sm:mt-6">
                <FormLabel className="text-[11px] font-black uppercase tracking-widest text-orange-600">
                  Nội dung Premium
                </FormLabel>
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

      {/* SECTION 4: TRANSCRIPT (EDIT MODE ONLY) */}
      {isEditMode && (
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-purple-600 dark:text-purple-400 border-b border-purple-100 dark:border-purple-500/20 pb-3 flex items-center gap-2 uppercase tracking-[0.2em]">
            <FileText className="w-4 h-4" /> 4. Toàn văn bản (fullTranscript)
          </h4>
          <FormField
            control={form.control}
            name="fullTranscript"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-3">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Nội dung Transcript Gốc
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <TranscriptImportDialog lessonId={lessonId} />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => regenerateMutation.mutate(lessonId)}
                      disabled={regenerateMutation.isPending || !field.value}
                      className="h-9 px-4 text-[10px] font-black text-purple-600 border-purple-200 rounded-xl uppercase tracking-widest hover:bg-purple-50"
                    >
                      {regenerateMutation.isPending ? (
                        <Loader2 className="h-3 w-3 animate-spin mr-2" />
                      ) : (
                        <Sparkles className="h-3 w-3 mr-2" />
                      )}
                      Đồng bộ Templates
                    </Button>
                  </div>
                </div>
                <FormControl>
                  <Textarea
                    className="bg-slate-900 border-slate-800 shadow-inner min-h-[250px] rounded-2xl font-mono text-[11px] text-emerald-400 p-6 leading-relaxed custom-scrollbar"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
