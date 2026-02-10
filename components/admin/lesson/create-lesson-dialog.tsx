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

// 1. Thêm Interface Props
interface CreateLessonDialogProps {
  children?: React.ReactNode;
}

// 2. Nhận props children
export default function CreateLessonDialog({
  children,
}: CreateLessonDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { createLesson, isCreating } = useLessonActions();

  // Setup Form
  const form = useForm<LessonFormValues>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      title: "",
      description: "",
      lessonType: "Dictation",
      level: "Beginner",
      category: "General",
      status: "Draft",
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

  const onSubmit = (values: LessonFormValues) => {
    createLesson(values as any, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 3. Cập nhật DialogTrigger để linh hoạt hiển thị */}
      <DialogTrigger asChild>
        {children ? (
          children // Nếu có children (ví dụ: DropdownMenuItem), render children
        ) : (
          // Nếu không có children, render nút mặc định
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

        {/* Form nhập liệu đầy đủ */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            {/* Hàng 1: Title & Category */}
            <div className="grid grid-cols-2 gap-4">
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

            {/* Hàng 2: Type, Level, Status */}
            <div className="grid grid-cols-3 gap-4">
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
                        <SelectItem value="Dictation">Dictation</SelectItem>
                        <SelectItem value="Shadowing">Shadowing</SelectItem>
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
                        <SelectItem value="Draft">Nháp</SelectItem>
                        <SelectItem value="Published">Công khai</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Hàng 3: URLs */}
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
            </div>

            <FormField
              control={form.control}
              name="fullTranscript"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-zinc-500">
                    Transcript / Nội dung
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-black/20 border-white/10 h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Switch Premium */}
            <FormField
              control={form.control}
              name="isPremiumOnly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold text-white">
                      Dành cho Premium
                    </FormLabel>
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

            <DialogFooter>
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
