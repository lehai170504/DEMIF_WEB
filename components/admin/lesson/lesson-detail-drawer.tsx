"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Trash2, X } from "lucide-react";
import { useLessonActions } from "@/hooks/use-lesson";
import { LessonSchema, LessonFormValues } from "@/schemas/lesson.schema";
import { LessonDto } from "@/types/lesson.type";
import {
  normalizeStatus,
  normalizeType,
  normalizeLevel,
} from "./table-columns";

interface LessonDetailDrawerProps {
  lesson: LessonDto | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const parseTags = (tagsRaw?: string | null) => {
  if (!tagsRaw) return "";
  try {
    const parsed = JSON.parse(tagsRaw);
    if (Array.isArray(parsed)) return parsed.join(", ");
    return tagsRaw;
  } catch (e) {
    return tagsRaw;
  }
};

export default function LessonDetailDrawer({
  lesson,
  open,
  onOpenChange,
}: LessonDetailDrawerProps) {
  const { updateLesson, deleteLesson, isUpdating, isDeleting } =
    useLessonActions();

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      title: "",
      description: "",
      lessonType: "Dictation", // Mặc định là chuỗi
      level: "Beginner", // Mặc định là chuỗi
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

  // Reset form khi mở drawer và có dữ liệu lesson
  React.useEffect(() => {
    if (open && lesson) {
      form.reset({
        title: lesson.title || "",
        description: lesson.description || "",
        // Lấy dữ liệu dưới dạng chuỗi
        lessonType: normalizeType(lesson.lessonType),
        level: normalizeLevel(lesson.level),
        category: lesson.category || "",
        status: normalizeStatus(lesson.status).toLowerCase(),
        isPremiumOnly: lesson.isPremiumOnly || false,
        durationSeconds: lesson.durationSeconds || 0,
        displayOrder: lesson.displayOrder || 0,
        audioUrl: lesson.audioUrl || "",
        mediaUrl: lesson.mediaUrl || "",
        mediaType: lesson.mediaType || "audio",
        thumbnailUrl: lesson.thumbnailUrl || "",
        fullTranscript: lesson.fullTranscript || "",
        timedTranscript: lesson.timedTranscript || "",
        tags: parseTags(lesson.tags),
      });
    }
  }, [open, lesson, form]);

  const onSubmit = (values: LessonFormValues) => {
    if (!lesson) return;

    // Chuyển đổi tags từ chuỗi thành JSON string array trước khi gửi
    const payload = {
      ...values,
      tags: values.tags
        ? JSON.stringify(values.tags.split(",").map((t) => t.trim()))
        : null,
    };

    updateLesson(
      { id: lesson.id, data: payload as any },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const handleDelete = () => {
    if (!lesson) return;
    if (confirm("Bạn có chắc chắn muốn xóa bài học này?")) {
      deleteLesson(lesson.id, { onSuccess: () => onOpenChange(false) });
    }
  };

  if (!lesson) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="bg-[#18181b] border-l border-white/10 text-white font-mono h-full max-w-[700px] ml-auto rounded-l-[2rem] flex flex-col shadow-2xl focus:outline-none">
        <DrawerHeader className="border-b border-white/5 pb-4 px-6">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-black uppercase tracking-tighter">
              Chi tiết bài học
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10 text-zinc-400"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          <p className="text-[10px] text-zinc-500 font-bold mt-1 uppercase tracking-widest">
            UID: {lesson.id}
          </p>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <Form {...form}>
            <form
              id="update-lesson-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* --- SECTION 1: BASIC INFO --- */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                  Thông tin cơ bản
                </h4>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                        Tiêu đề
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black/20 border-white/10 font-bold focus:border-orange-500/50 transition-all text-zinc-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                        Mô tả ngắn
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-black/20 border-white/10 min-h-[80px] resize-none text-zinc-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lessonType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Loại bài
                        </FormLabel>
                        {/* Sử dụng onChange truyền thẳng chuỗi */}
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/20 border-white/10 text-zinc-200">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1c1c1f] border-white/10 text-white">
                            <SelectItem value="Dictation">Dictation</SelectItem>
                            <SelectItem value="Shadowing">Shadowing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Cấp độ
                        </FormLabel>
                        {/* Sử dụng onChange truyền thẳng chuỗi */}
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/20 border-white/10 text-zinc-200">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1c1c1f] border-white/10 text-white">
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Danh mục
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-black/20 border-white/10 text-zinc-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Tags
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-black/20 border-white/10 text-zinc-200"
                            placeholder="coffee, daily..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* --- SECTION 2: MEDIA --- */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                  Media & Tài nguyên
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="audioUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Audio URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-black/20 border-white/10 text-xs text-blue-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mediaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Video URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-black/20 border-white/10 text-xs text-blue-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Thumbnail URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-black/20 border-white/10 text-xs text-zinc-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mediaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Loại Media
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/20 border-white/10 text-zinc-200">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1c1c1f] border-white/10 text-white">
                            <SelectItem value="audio">Audio</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* --- SECTION 3: TRANSCRIPTS --- */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-purple-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                  Nội dung luyện tập
                </h4>
                <FormField
                  control={form.control}
                  name="fullTranscript"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                        Full Transcript
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-black/20 border-white/10 h-32 font-mono text-[11px] leading-relaxed text-zinc-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timedTranscript"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                        Timed JSON / Subtitles
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-black/20 border-white/10 h-32 font-mono text-[11px] text-blue-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- SECTION 4: SETTINGS --- */}
              <div className="space-y-4 pb-10">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] border-b border-white/5 pb-2">
                  Cấu hình & Trạng thái
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Trạng thái
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/20 border-white/10 text-zinc-200">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1c1c1f] border-white/10 text-white">
                            <SelectItem value="draft">Nháp (Draft)</SelectItem>
                            <SelectItem value="published">
                              Công khai (Published)
                            </SelectItem>
                            <SelectItem value="review">
                              Đang chờ (Review)
                            </SelectItem>
                            <SelectItem value="archived">
                              Lưu trữ (Archived)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="displayOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Thứ tự hiển thị
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="bg-black/20 border-white/10 text-zinc-200"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="durationSeconds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase">
                          Thời lượng (s)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="bg-black/20 border-white/10 text-zinc-200"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isPremiumOnly"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/[0.08]">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-bold text-zinc-200">
                          Gói Premium
                        </FormLabel>
                        <FormDescription className="text-[10px] text-zinc-500">
                          Chỉ người dùng trả phí mới có thể truy cập.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <DrawerFooter className="border-t border-white/5 bg-[#1c1c1f] p-6">
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              className="border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Xóa bài học
            </Button>
            <Button
              type="submit"
              form="update-lesson-form"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Lưu thay đổi
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
