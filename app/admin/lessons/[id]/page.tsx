"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Save,
  Trash2,
  ArrowLeft,
  LayoutTemplate,
  Star,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useLesson, useLessonActions } from "@/hooks/use-lesson";
import {
  UpdateLessonSchema,
  UpdateLessonFormValues,
} from "@/schemas/lesson.schema";
import { UpdateLessonRequest } from "@/types/lesson.type";

import { LessonFormFields } from "@/components/admin/lesson/lesson-form-fields";
import { LessonOverviewTab } from "@/components/admin/lesson/lesson-overview-tab";
import { DictationPreviewTab } from "@/components/admin/lesson/dictation-preview-tab";
import { DeleteLessonDialog } from "@/components/admin/lesson/delete-lesson-dialog";
import { cn } from "@/lib/utils";

const tabVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("overview");

  const { data: lesson, isLoading: isFetching } = useLesson(lessonId);
  const { updateLesson, updateStatus, isUpdating } = useLessonActions();

  // Khởi tạo form với giá trị string mặc định theo chuẩn BE mới
  const form = useForm<UpdateLessonFormValues>({
    resolver: zodResolver(UpdateLessonSchema),
    defaultValues: {
      title: "",
      description: "",
      lessonType: "Dictation",
      level: "Beginner",
      category: "",
      isPremiumOnly: false,
      displayOrder: 0,
      audioUrl: "",
      mediaUrl: "",
      mediaType: "youtube",
      fullTranscript: "",
      tags: "",
    },
  });

  const formErrors = form.formState.errors;

  // Reset Form khi dữ liệu Lesson tải xong
  React.useEffect(() => {
    if (lesson) {
      form.reset({
        title: lesson.title,
        description: lesson.description || "",
        lessonType: lesson.lessonType, // Nhận trực tiếp string (ví dụ: "Dictation")
        level: lesson.level, // Nhận trực tiếp string (ví dụ: "Expert")
        category: lesson.category || "",
        tags: lesson.tags || "",
        mediaUrl: lesson.mediaUrl || "",
        audioUrl: lesson.audioUrl || "",
        thumbnailUrl: lesson.thumbnailUrl || "",
        fullTranscript: lesson.fullTranscript || "",
        isPremiumOnly: !!lesson.isPremiumOnly,
        // Ép kiểu qua any để lấy displayOrder nếu Interface LessonDto chưa cập nhật
        displayOrder: (lesson as any).displayOrder || 0,
        mediaType: lesson.mediaType || "youtube",
      });
    }
  }, [lesson, form]);

  const onSubmit = (values: UpdateLessonFormValues) => {
    if (!lesson) return;

    // Payload gửi lên Backend: Giữ nguyên String cho level và lessonType
    const payload: UpdateLessonRequest = {
      ...values,
      lessonType: values.lessonType,
      level: values.level,
      displayOrder: Number(values.displayOrder),
      tags: values.tags?.trim() || null,
      fullTranscript: values.fullTranscript || undefined,
    };

    updateLesson({ id: lesson.id, data: payload });
  };

  if (isFetching) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center text-slate-500 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">
          Đang đồng bộ dữ liệu...
        </p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-slate-500 font-mono">
        <p className="text-sm font-bold mb-4 uppercase tracking-widest">
          Không tìm thấy bài học.
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/lessons")}
          className="rounded-xl border-slate-200"
        >
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const isPublished = lesson?.status?.toLowerCase() === "published";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[1400px] mx-auto space-y-6 pb-12 font-mono px-4 lg:px-12 text-left"
    >
      {/* Nút quay lại */}
      <button
        onClick={() => router.push("/admin/lessons")}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all group"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        Quay lại danh sách
      </button>

      {/* Header Card: Điều khiển trạng thái bài học */}
      <div className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
            <LayoutTemplate className="h-6 w-6 text-orange-600 dark:text-orange-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight truncate max-w-[300px] md:max-w-[450px]">
              {lesson.title || "Biên tập bài học"}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className="uppercase text-[9px] font-black tracking-widest border-orange-200 text-orange-600"
              >
                ID: {lesson.id.split("-")[0]}
              </Badge>
              {lesson.status && (
                <Badge
                  className={cn(
                    "uppercase text-[9px] font-black tracking-widest",
                    isPublished
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-600",
                  )}
                >
                  {lesson.status}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Nút Toggle Publish/Draft */}
          <Button
            variant="outline"
            className={cn(
              "h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
              isPublished
                ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                : "border-emerald-200 text-emerald-600 hover:bg-emerald-50",
            )}
            onClick={() =>
              updateStatus({
                id: lesson.id,
                status: isPublished ? "draft" : "published",
              })
            }
            disabled={isUpdating}
          >
            <Star
              className={cn(
                "h-4 w-4 mr-2",
                isPublished ? "fill-amber-600/20" : "",
              )}
            />
            {isPublished ? "Gỡ bài (Draft)" : "Đăng bài (Publish)"}
          </Button>

          {/* Nút Xóa */}
          <Button
            variant="outline"
            className="h-12 px-6 border-red-200 text-red-600 hover:bg-red-50 rounded-2xl font-black text-[10px] uppercase tracking-widest"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isUpdating}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Xóa bài
          </Button>

          {/* Nút Lưu (Chỉ hiện ở Tab Nội dung) */}
          <AnimatePresence mode="wait">
            {activeTab === "edit" && (
              <motion.div
                key="save-btn"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Button
                  type="submit"
                  form="update-lesson-form"
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 text-[10px] uppercase tracking-[0.2em]"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Lưu thay đổi
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 rounded-[3rem] p-4 shadow-sm min-h-[600px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-slate-100/50 dark:bg-white/5 p-2 rounded-[2rem] mb-8 grid grid-cols-3 h-16">
            <TabsTrigger
              value="overview"
              className="rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-lg transition-all"
            >
              Tổng quan
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg transition-all"
            >
              Nội dung
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg transition-all"
            >
              Kiểm định
            </TabsTrigger>
          </TabsList>

          <div className="px-4 pb-4">
            <AnimatePresence mode="wait">
              {/* Tab 1: Tổng quan (Thông số từ BE) */}
              {activeTab === "overview" && (
                <motion.div
                  key="ov"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <LessonOverviewTab lesson={lesson} />
                </motion.div>
              )}

              {/* Tab 2: Chỉnh sửa nội dung Form */}
              {activeTab === "edit" && (
                <motion.div
                  key="ed"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Form {...form}>
                    <form
                      id="update-lesson-form"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <LessonFormFields form={form as any} isEditMode={true} />

                      {/* Danh sách lỗi Validation nếu có */}
                      {Object.keys(formErrors).length > 0 && (
                        <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-[2rem]">
                          <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">
                              Lỗi nhập liệu cần sửa:
                            </p>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {Object.entries(formErrors).map(([key, err]) => (
                              <li
                                key={key}
                                className="text-[11px] font-bold text-red-500 uppercase flex items-center gap-2"
                              >
                                <span className="h-1 w-1 bg-red-500 rounded-full" />
                                {key}: {err?.message as string}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </form>
                  </Form>
                </motion.div>
              )}

              {/* Tab 3: Xem trước dữ liệu Dictation đã generate */}
              {activeTab === "preview" && (
                <motion.div
                  key="pv"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <DictationPreviewTab lessonId={lessonId} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      {/* Dialog xác nhận xóa */}
      <DeleteLessonDialog
        lessonId={lessonId}
        lessonTitle={lesson?.title || ""}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={() => router.push("/admin/lessons")}
      />
    </motion.div>
  );
}
