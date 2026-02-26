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
import { Loader2, Plus, BookPlus } from "lucide-react";
import { useLessonActions } from "@/hooks/use-lesson";
import { LessonSchema, LessonFormValues } from "@/schemas/lesson.schema";

interface CreateLessonDialogProps {
  children?: React.ReactNode;
}

export default function CreateLessonDialog({
  children,
}: CreateLessonDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { createLesson, isCreating } = useLessonActions();

  // Khởi tạo Form với chuỗi mặc định
  const form = useForm<LessonFormValues>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      title: "",
      description: "",
      lessonType: "Dictation", // <-- Đổi thành chuỗi
      level: "Beginner", // <-- Đổi thành chuỗi
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
    // Xử lý chuỗi tags thành array dạng string: '["tag1", "tag2"]'
    const formattedTags = values.tags
      ? JSON.stringify(values.tags.split(",").map((t) => t.trim()))
      : null;

    const payload = {
      ...values,
      tags: formattedTags,
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

      <DialogContent className="sm:max-w-[700px] bg-[#18181b] border-white/10 text-white font-mono max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase">
            <BookPlus className="h-5 w-5 text-orange-500" /> Tạo Bài Học Mới
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
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
                        className="bg-black/20 border-white/10"
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-black/20 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* <-- Dùng trực tiếp String --> */}
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Trạng thái
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-black/20 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Nháp</SelectItem>
                          <SelectItem value="published">Công khai</SelectItem>
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
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Cấp độ
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-black/20 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* <-- Dùng trực tiếp String --> */}
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
                      <FormMessage />
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
                    <FormMessage />
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
                      <FormMessage />
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
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Thumbnail URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black/20 border-white/10"
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
                      <FormLabel className="text-xs font-bold text-zinc-500">
                        Loại Media (mediaType)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-black/20 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                name="timedTranscript"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-zinc-500">
                      Timed Transcript / Dictation Template
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
                      <FormMessage />
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
                      <FormMessage />
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

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={isCreating}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
              >
                {isCreating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}{" "}
                {isCreating ? "Đang tạo..." : "Tạo bài học"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
