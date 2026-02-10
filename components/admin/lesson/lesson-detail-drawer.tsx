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

interface LessonDetailDrawerProps {
  lesson: LessonDto | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
      lessonType: "",
      level: "",
      category: "",
      status: "",
      isPremiumOnly: false,
      durationSeconds: 0,
      displayOrder: 0,
      audioUrl: "",
      mediaUrl: "",
      thumbnailUrl: "",
      fullTranscript: "",
      dictationTemplate: "",
      tags: "",
    },
  });

  // Reset form khi lesson thay đổi
  React.useEffect(() => {
    if (open && lesson) {
      form.reset({
        title: lesson.title,
        description: lesson.description || "",
        lessonType: lesson.lessonType,
        level: lesson.level,
        category: lesson.category,
        status: lesson.status,
        isPremiumOnly: lesson.isPremiumOnly,
        durationSeconds: lesson.durationSeconds,
        displayOrder: lesson.displayOrder,
        audioUrl: lesson.audioUrl || "",
        mediaUrl: lesson.mediaUrl || "",
        thumbnailUrl: lesson.thumbnailUrl || "",
        fullTranscript: lesson.fullTranscript || "",
        dictationTemplate: lesson.dictationTemplate || "",
        tags: lesson.tags || "",
      });
    }
  }, [open, lesson, form]);

  const onSubmit = (values: LessonFormValues) => {
    if (!lesson) return;
    updateLesson(
      { id: lesson.id, data: values as any },
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
        <DrawerHeader className="border-b border-white/5 pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-black uppercase text-white">
              Chi tiết bài học
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          <p className="text-xs text-zinc-500 truncate">ID: {lesson.id}</p>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <Form {...form}>
            <form
              id="update-lesson-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* --- SECTION 1: BASIC INFO --- */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-orange-500 uppercase tracking-widest border-b border-white/5 pb-2">
                  Thông tin cơ bản
                </h4>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Tiêu đề
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black/20 border-white/10 font-bold text-lg"
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
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Mô tả ngắn
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-black/20 border-white/10 h-20 resize-none"
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
                        <FormLabel className="text-xs font-bold text-zinc-500">
                          Loại bài
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/20 border-white/10">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Dictation">Dictation</SelectItem>
                            <SelectItem value="Shadowing">Shadowing</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-zinc-500">
                          Trạng thái
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/20 border-white/10">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Published">Công khai</SelectItem>
                            <SelectItem value="Draft">Nháp</SelectItem>
                            <SelectItem value="Review">Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-zinc-500">
                          Cấp độ
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black/20 border-white/10">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-zinc-500">
                          Danh mục
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-black/20 border-white/10"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Tags (cách nhau bởi dấu phẩy)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black/20 border-white/10"
                          placeholder="vd: coffee, conversation"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* --- SECTION 2: MEDIA & URLS --- */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest border-b border-white/5 pb-2">
                  Media & Tài nguyên
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="audioUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-zinc-500">
                          Audio URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-black/20 border-white/10"
                            {...field}
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
                        <FormLabel className="text-xs font-bold text-zinc-500">
                          Video URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-black/20 border-white/10"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Thumbnail URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black/20 border-white/10"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* --- SECTION 3: CONTENT & TRANSCRIPT --- */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-purple-500 uppercase tracking-widest border-b border-white/5 pb-2">
                  Nội dung bài học
                </h4>

                <FormField
                  control={form.control}
                  name="fullTranscript"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Full Transcript
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-black/20 border-white/10 h-32 font-mono text-xs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dictationTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Dictation Template (Dùng [...] cho từ cần điền)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-black/20 border-white/10 h-32 font-mono text-xs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- SECTION 4: SETTINGS --- */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2">
                  Cấu hình khác
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="durationSeconds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-zinc-500">
                          Thời lượng (giây)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="bg-black/20 border-white/10"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="displayOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-zinc-500">
                          Thứ tự hiển thị
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="bg-black/20 border-white/10"
                            {...field}
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-bold text-white">
                          Yêu cầu Premium
                        </FormLabel>
                        <FormDescription className="text-xs text-zinc-500">
                          Chỉ học viên Premium mới xem được bài này.
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

        <DrawerFooter className="border-t border-white/5 bg-[#18181b] p-6">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              type="button"
              variant="destructive"
              className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}{" "}
              Xóa
            </Button>
            <Button
              type="submit"
              form="update-lesson-form"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}{" "}
              Lưu thay đổi
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
