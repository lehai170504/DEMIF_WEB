"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, Variants } from "framer-motion"; // THÊM Variants

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Trash2, ArrowLeft, LayoutTemplate } from "lucide-react";
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

// Hàm xử lý Tags từ chuỗi JSON của BE về dạng text phẩy
const parseTagsForInput = (tagsRaw?: string | null) => {
  if (!tagsRaw) return "";
  try {
    const parsed = JSON.parse(tagsRaw);
    return Array.isArray(parsed) ? parsed.join(", ") : tagsRaw;
  } catch {
    return tagsRaw || "";
  }
};

const normalizeSelectValue = (
  value: string | number | null | undefined,
  options: { value: string; label: string }[],
  defaultValue: string,
) => {
  if (!value) return defaultValue;
  const strValue = String(value).toLowerCase();
  const match = options.find(
    (opt) => String(opt.value).toLowerCase() === strValue,
  );
  return match ? match.value : defaultValue;
};

// ĐÃ SỬA LỖI TYPE: Khai báo rõ kiểu Variants cho object
const tabVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("overview");

  const { data: lesson, isLoading: isFetching } = useLesson(lessonId);
  const { updateLesson, isUpdating } = useLessonActions();

  // KHỞI TẠO FORM VỚI UPDATE SCHEMA
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
        lessonType: normalizeSelectValue(
          lesson.lessonType,
          LESSON_TYPES,
          "Dictation",
        ),
        level: normalizeSelectValue(lesson.level, LESSON_LEVELS, "Beginner"),
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

    const formattedTags =
      values.tags && values.tags.trim() !== "" ? values.tags.trim() : null;

    // MAP DỮ LIỆU PAYLOAD CHUẨN XÁC CHO BE (PUT)
    const payload: UpdateLessonRequest = {
      title: values.title,
      description: values.description,
      lessonType: values.lessonType,
      level: values.level,
      category: values.category,
      audioUrl: values.audioUrl || null,
      mediaUrl: values.mediaUrl || null,
      mediaType: values.mediaType || "audio",
      thumbnailUrl: values.thumbnailUrl || null,
      // Gửi fullTranscript nếu có thay đổi. Nếu nó rỗng thì gửi undefined để BE bỏ qua
      fullTranscript: values.fullTranscript ? values.fullTranscript : undefined,
      isPremiumOnly: values.isPremiumOnly,
      displayOrder: Number(values.displayOrder),
      tags: formattedTags,
    };

    updateLesson(
      { id: lesson.id, data: payload },
      {
        onSuccess: () => {
          // Tuỳ chọn: Chuyển về tab Overview sau khi update thành công
          // setActiveTab("overview");
        },
      },
    );
  };

  if (isFetching) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-slate-500 font-sans">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <p className="text-sm font-medium">Đang tải dữ liệu bài học...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-slate-500 font-sans">
        <p className="text-sm font-medium mb-2">Không tìm thấy bài học.</p>
        <Button variant="link" onClick={() => router.push("/admin/lessons")}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[1200px] mx-auto space-y-6 pb-12 font-mono px-4 lg:px-8"
    >
      {/* NÚT QUAY LẠI */}
      <button
        onClick={() => router.push("/admin/lessons")}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-2 mt-6"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </button>

      {/* HEADER CHI TIẾT BÀI HỌC */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-xl border border-orange-100">
              <LayoutTemplate className="h-5 w-5 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Chi tiết bài học
            </h1>
            <Badge
              variant={lesson.status === "published" ? "default" : "secondary"}
              className="ml-2 uppercase text-[10px]"
            >
              {lesson.status}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium bg-slate-100 w-fit px-3 py-1.5 rounded-lg ml-[3.25rem]">
            <span className="font-mono">ID: {lessonId}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 bg-white border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            <span className="font-semibold text-sm">Xóa bài</span>
          </Button>

          {/* ANIMATION CHO NÚT LƯU */}
          <AnimatePresence mode="wait">
            {activeTab === "edit" && (
              <motion.div
                key="save-btn"
                initial={{ opacity: 0, x: 20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: 20, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Button
                  type="submit"
                  form="update-lesson-form"
                  className="h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 px-6 transition-all active:scale-95 whitespace-nowrap"
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

      {/* NỘI DUNG TABS */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm min-h-[500px] overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full relative"
        >
          <TabsList className="w-full bg-slate-100/50 p-1.5 rounded-2xl mb-8 grid grid-cols-3 h-14 relative z-10">
            <TabsTrigger
              value="overview"
              className="rounded-xl font-semibold text-sm text-slate-500 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
            >
              Tổng quan
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="rounded-xl font-semibold text-sm text-slate-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
            >
              Chỉnh sửa nội dung
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-xl font-semibold text-sm text-slate-500 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm transition-all"
            >
              Xem trước & Kiểm định
            </TabsTrigger>
          </TabsList>

          <div className="relative">
            <AnimatePresence mode="wait">
              {/* TAB 1: TỔNG QUAN */}
              {activeTab === "overview" && (
                <motion.div
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="tab-overview"
                >
                  <TabsContent
                    value="overview"
                    className="mt-0 outline-none m-0"
                    forceMount
                  >
                    <LessonOverviewTab lesson={lesson} />
                  </TabsContent>
                </motion.div>
              )}

              {/* TAB 2: CHỈNH SỬA */}
              {activeTab === "edit" && (
                <motion.div
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="tab-edit"
                >
                  <TabsContent
                    value="edit"
                    className="mt-0 outline-none m-0"
                    forceMount
                  >
                    <Form {...form}>
                      <form
                        id="update-lesson-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                      >
                        <LessonFormFields
                          form={form as any}
                          isEditMode={true}
                        />

                        <AnimatePresence>
                          {Object.keys(formErrors).length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-8 p-5 bg-red-50 border border-red-100 rounded-2xl overflow-hidden"
                            >
                              <p className="text-red-600 text-sm font-bold mb-3">
                                Vui lòng sửa các lỗi sau để lưu:
                              </p>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-red-500 font-medium">
                                {Object.entries(formErrors).map(
                                  ([key, err]) => (
                                    <li
                                      key={key}
                                      className="flex items-center gap-2"
                                    >
                                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                      <span className="text-xs bg-white px-2 py-0.5 rounded-md text-red-400 border border-red-100">
                                        {key}
                                      </span>
                                      <span className="truncate">
                                        {err?.message as string}
                                      </span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </form>
                    </Form>
                  </TabsContent>
                </motion.div>
              )}

              {/* TAB 3: XEM TRƯỚC */}
              {activeTab === "preview" && (
                <motion.div
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="tab-preview"
                >
                  <TabsContent
                    value="preview"
                    className="mt-0 outline-none m-0"
                    forceMount
                  >
                    <DictationPreviewTab lessonId={lessonId} />
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      {/* DIALOG XÓA BÀI HỌC */}
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
