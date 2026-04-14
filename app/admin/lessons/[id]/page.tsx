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

import {
  LESSON_TYPES,
  LESSON_LEVELS,
} from "@/components/admin/lesson/lesson.constants";
import { cn } from "@/lib/utils";

// Helpers
const parseTagsForInput = (tagsRaw?: string | null) => {
  if (!tagsRaw) return "";
  try {
    const parsed = JSON.parse(tagsRaw);
    return Array.isArray(parsed) ? parsed.join(", ") : tagsRaw;
  } catch {
    return tagsRaw || "";
  }
};

const mapStringToNumber = (
  value: string | number | null | undefined,
  options: { value: number; label: string }[],
  defaultValue: number,
) => {
  // 1. Nếu rỗng thì trả về mặc định
  if (value === null || value === undefined || value === "")
    return defaultValue;

  // 2. Nếu đã là số thì dùng luôn
  if (typeof value === "number") return value;

  // 3. Chuẩn hóa chuỗi từ BE (xóa khoảng trắng, đưa về chữ thường)
  const incomingStr = String(value).trim().toLowerCase();

  // 4. Tìm theo Label (vd: "advanced")
  const matchByLabel = options.find(
    (opt) => opt.label.toLowerCase() === incomingStr,
  );
  if (matchByLabel !== undefined) return matchByLabel.value;

  // 5. Dự phòng: Tìm theo chính giá trị (vd: "2")
  const matchByValue = options.find((opt) => String(opt.value) === incomingStr);

  return matchByValue !== undefined ? matchByValue.value : defaultValue;
};

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

  const form = useForm<UpdateLessonFormValues>({
    resolver: zodResolver(UpdateLessonSchema),
    defaultValues: {
      title: "",
      description: "",
      lessonType: 0,
      level: 0,
      category: "",
      isPremiumOnly: false,
      displayOrder: 0,
      audioUrl: "",
      mediaUrl: "",
      mediaType: "audio",
      thumbnailUrl: "",
      fullTranscript: "",
      tags: "",
    },
  });

  const formErrors = form.formState.errors;

  React.useEffect(() => {
    if (lesson) {
      form.reset({
        title: lesson.title || "",
        description: lesson.description || "",
        lessonType: mapStringToNumber(lesson.lessonType, LESSON_TYPES, 0),
        level: mapStringToNumber(lesson.level, LESSON_LEVELS, 0),
        category: lesson.category || "",
        isPremiumOnly: !!lesson.isPremiumOnly,
        displayOrder: Number(lesson.displayOrder) || 0,
        audioUrl: lesson.audioUrl || "",
        mediaUrl: lesson.mediaUrl || "",
        mediaType: lesson.mediaType || "audio",
        thumbnailUrl: lesson.thumbnailUrl || "",
        fullTranscript: lesson.fullTranscript || "",
        tags: parseTagsForInput(lesson.tags),
      });
    }
  }, [lesson, form]);

  const onSubmit = (values: UpdateLessonFormValues) => {
    if (!lesson) return;

    const formattedTags = values.tags?.trim() || null;

    const payload: UpdateLessonRequest = {
      ...values,
      tags: formattedTags,
      fullTranscript: values.fullTranscript || undefined,
    };

    updateLesson({ id: lesson.id, data: payload });
  };

  if (isFetching) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">
          Đang tải dữ liệu bài học...
        </p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 font-mono">
        <p className="text-sm font-bold mb-4 uppercase tracking-widest">
          Không tìm thấy bài học.
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/lessons")}
          className="rounded-xl border-slate-200 dark:border-white/10"
        >
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const isPublished = lesson.status?.toLowerCase() === "published";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[1400px] mx-auto space-y-6 pb-12 font-mono px-4 lg:px-12 transition-colors duration-300"
    >
      <button
        onClick={() => router.push("/admin/lessons")}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all mb-2 mt-6 group"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />{" "}
        Quay lại danh sách
      </button>

      {/* Header section */}
      <div className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
            <LayoutTemplate className="h-6 w-6 text-orange-600 dark:text-orange-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Biên tập bài học
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className="uppercase text-[9px] font-black tracking-widest border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400"
              >
                ID: {lesson.id.split("-")[0]}
              </Badge>
              <Badge
                className={cn(
                  "uppercase text-[9px] font-black tracking-widest",
                  isPublished
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400",
                )}
              >
                {lesson.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className={cn(
              "h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
              isPublished
                ? "border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                : "border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
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

          <Button
            variant="outline"
            className="h-12 px-6 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isUpdating}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Xóa bài
          </Button>

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
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95"
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

      {/* Tabs section */}
      <div className="bg-white dark:bg-zinc-900/30 border border-slate-200 dark:border-white/5 rounded-[3rem] p-4 shadow-sm min-h-[600px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-slate-100/50 dark:bg-white/5 p-2 rounded-[2rem] mb-8 grid grid-cols-3 h-16">
            <TabsTrigger
              value="overview"
              className="rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-lg transition-all"
            >
              Tổng quan
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-lg transition-all"
            >
              Nội dung
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-lg transition-all"
            >
              Kiểm định
            </TabsTrigger>
          </TabsList>

          <div className="px-4 pb-4">
            <AnimatePresence mode="wait">
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
                      {/* Errors list logic */}
                      <AnimatePresence>
                        {Object.keys(formErrors).length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-8 p-6 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-[2rem] overflow-hidden"
                          >
                            <p className="text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest mb-4">
                              Lỗi nhập liệu:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {Object.entries(formErrors).map(([key, err]) => (
                                <li
                                  key={key}
                                  className="flex items-center gap-2 text-xs font-bold text-red-500/80"
                                >
                                  <span className="h-1 w-1 rounded-full bg-red-500 shrink-0" />
                                  <span className="opacity-60 uppercase text-[9px]">
                                    {key}:
                                  </span>{" "}
                                  {err?.message as string}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </Form>
                </motion.div>
              )}

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
