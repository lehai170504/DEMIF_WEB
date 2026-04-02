"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Plus,
  BookPlus,
  Youtube,
  Sparkles,
  Search,
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";

import {
  useLessonActions,
  useCreateFromYoutube,
  useYoutubePreview,
  useYoutubeTranscript,
} from "@/hooks/use-lesson";
import {
  CreateLessonSchema,
  CreateLessonFormValues,
} from "@/schemas/lesson.schema";
import {
  CreateLessonRequest,
  CreateLessonFromYoutubeRequest,
} from "@/types/lesson.type";
import { LessonFormFields } from "./lesson-form-fields";
import { LESSON_LEVELS } from "./lesson.constants";
import { YoutubePreviewCard } from "./youtube-preview-card";
import { cn } from "@/lib/utils";

interface CreateLessonDialogProps {
  children?: React.ReactNode;
}

export default function CreateLessonDialog({
  children,
}: CreateLessonDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { createLesson, isCreating } = useLessonActions();
  const { mutate: createFromYoutube, isPending: isYoutubePending } =
    useCreateFromYoutube();

  // --- Trạng Thái Khởi Tạo Từ YouTube ---
  const [ytUrl, setYtUrl] = React.useState("");
  const [ytLevel, setYtLevel] = React.useState("Beginner");
  const [ytType, setYtType] = React.useState("Dictation");
  const [ytLang, setYtLang] = React.useState("en");

  // Hook lấy thông tin Video Preview
  const {
    data: preview,
    isLoading: isPreviewLoading,
    isError: isPreviewError,
  } = useYoutubePreview(ytUrl);

  // Hook lấy Transcript (Phụ đề) để xem trước
  const { data: transcript, isLoading: isTranscriptLoading } =
    useYoutubeTranscript({
      url: ytUrl,
      preferredLanguage: ytLang,
    });

  // Tự động chọn ngôn ngữ đầu tiên khi Preview trả về danh sách ngôn ngữ
  React.useEffect(() => {
    if (
      preview?.availableCaptionLanguages &&
      preview.availableCaptionLanguages.length > 0
    ) {
      setYtLang(preview.availableCaptionLanguages[0]);
    }
  }, [preview]);

  // --- Quản Lý Form Thủ Công ---
  const manualForm = useForm<CreateLessonFormValues>({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      title: "",
      description: "",
      transcript: "",
      format: "srt",
      mediaUrl: "",
      mediaType: "audio",
      durationSeconds: 0,
      level: "Beginner",
      lessonType: "Dictation",
      category: "General",
      isPremiumOnly: false,
      displayOrder: 0,
      tags: "",
      thumbnailUrl: "",
    },
  });

  const onManualSubmit = (values: CreateLessonFormValues) => {
    const formattedTags =
      values.tags && values.tags.trim() !== "" ? values.tags.trim() : null;

    const payload: CreateLessonRequest = {
      ...values,
      durationSeconds: Number(values.durationSeconds),
      displayOrder: Number(values.displayOrder),
      tags: formattedTags,
      thumbnailUrl: values.thumbnailUrl || null,
    };

    createLesson(payload, {
      onSuccess: () => {
        setOpen(false);
        manualForm.reset();
      },
    });
  };

  // --- Xử lý Submit YouTube ---
  const handleYoutubeSubmit = () => {
    if (!ytUrl || !preview?.hasCaptions) return;

    // PAYLOAD FIX TRIỆT ĐỂ: Khớp 100% với JSON Request Schema
    const payload: CreateLessonFromYoutubeRequest = {
      youTubeUrl: ytUrl, // Tên biến khớp với Backend (T và U viết hoa)
      captionLanguage: ytLang,
      lessonType: ytType,
      level: ytLevel,
      category: preview.suggestedCategory || "YouTube Import",
      isPremiumOnly: false,
      displayOrder: 0,
      status: "draft",
      tags: null,
      titleOverride: null,
      descriptionOverride: null,
    };

    createFromYoutube(payload, {
      onSuccess: () => {
        setOpen(false);
        setYtUrl("");
        manualForm.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="h-10 gap-2 bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold rounded-xl shadow-lg transition-all">
            <Plus className="h-4 w-4" /> Thêm Bài Học Mới
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] bg-white text-gray-900 font-mono max-h-[95vh] overflow-y-auto no-scrollbar p-0 rounded-[2.5rem] shadow-2xl border-none">
        <DialogHeader className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-20 backdrop-blur-md">
          <DialogTitle className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight">
            <BookPlus className="h-7 w-7 text-orange-500" /> Khởi Tạo Bài Tập
          </DialogTitle>
        </DialogHeader>

        <div className="p-8">
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-10 bg-gray-100 p-1.5 rounded-2xl h-14">
              <TabsTrigger
                value="manual"
                className="rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white transition-all"
              >
                <Plus className="w-4 h-4 mr-2" /> Thủ Công
              </TabsTrigger>
              <TabsTrigger
                value="youtube"
                className="rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-red-600 transition-all"
              >
                <Youtube className="w-4 h-4 mr-2 text-red-500" /> YouTube
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: KHỞI TẠO THỦ CÔNG */}
            <TabsContent value="manual" className="mt-0 outline-none">
              <Form {...manualForm}>
                <form onSubmit={manualForm.handleSubmit(onManualSubmit)}>
                  <LessonFormFields
                    form={manualForm as any}
                    isEditMode={false}
                  />
                  <DialogFooter className="pt-8 mt-10 border-t border-gray-100">
                    <Button
                      type="submit"
                      disabled={isCreating}
                      className="w-full h-14 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all"
                    >
                      {isCreating ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                      )}
                      {isCreating ? "Đang Xử Lý..." : "Xác Nhận Tạo Bài Tập"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </TabsContent>

            {/* TAB 2: NHẬP TỪ YOUTUBE */}
            <TabsContent value="youtube" className="mt-0 outline-none">
              <div className="space-y-8 py-4 max-w-2xl mx-auto">
                <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-start gap-5">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <Sparkles className="w-7 h-7 text-red-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-red-900 uppercase tracking-tight">
                      Tự Động Hóa AI
                    </p>
                    <p className="text-xs text-red-700/80 italic font-medium leading-relaxed">
                      Hệ thống sẽ bóc tách phụ đề từ YouTube để khởi tạo bài tập
                      tự động chỉ với một đường dẫn video.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                      Đường Dẫn YouTube
                    </label>
                    <div className="relative group">
                      <Input
                        placeholder="Dán đường dẫn video..."
                        className="h-16 rounded-2xl border-gray-200 shadow-sm text-lg px-6 font-bold pr-12 transition-all focus:ring-red-500"
                        value={ytUrl}
                        onChange={(e) => setYtUrl(e.target.value)}
                      />
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
                    </div>
                  </div>

                  {isPreviewLoading && (
                    <div className="h-48 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 gap-3">
                      <Loader2 className="animate-spin text-red-400 w-8 h-8" />
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                        Đang phân tích video...
                      </p>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {preview && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <YoutubePreviewCard data={preview} />

                        {/* HIỂN THỊ PREVIEW TRANSCRIPT (CHỈNH SỬA MỚI) */}
                        {transcript && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] relative overflow-hidden shadow-inner group"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Phụ đề xem
                                trước ({ytLang.toUpperCase()})
                              </p>
                              {isTranscriptLoading && (
                                <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                              )}
                            </div>
                            <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar transition-all">
                              <p
                                className={cn(
                                  "text-[11px] leading-relaxed text-slate-600 font-medium italic",
                                  isTranscriptLoading &&
                                    "opacity-30 blur-[1px]",
                                )}
                              >
                                {transcript.fullText ||
                                  "Không tìm thấy nội dung văn bản cho ngôn ngữ này."}
                              </p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isPreviewError && ytUrl && (
                    <p className="text-[10px] text-red-500 font-black uppercase text-center py-3 bg-red-50 rounded-xl border border-red-100">
                      Đường dẫn video không hợp lệ hoặc không tìm thấy.
                    </p>
                  )}
                </div>

                {preview && !preview.hasCaptions && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 shadow-sm">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-black text-red-900 uppercase tracking-tight">
                        Không tìm thấy phụ đề
                      </p>
                      <p className="text-[11px] text-red-700 italic font-bold">
                        Video này không có phụ đề Manual (đã tải lên). Hệ thống
                        không thể tự động khởi tạo dữ liệu.
                      </p>
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "grid grid-cols-3 gap-4 transition-all duration-300",
                    (!preview || !preview.hasCaptions) &&
                      "opacity-30 pointer-events-none grayscale",
                  )}
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Cấp Độ
                    </label>
                    <Select value={ytLevel} onValueChange={setYtLevel}>
                      <SelectTrigger className="h-11 rounded-xl bg-gray-50 font-bold border-none shadow-sm focus:ring-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LESSON_LEVELS.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Loại Bài
                    </label>
                    <Select value={ytType} onValueChange={setYtType}>
                      <SelectTrigger className="h-11 rounded-xl bg-gray-50 font-bold border-none shadow-sm focus:ring-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dictation">Dictation</SelectItem>
                        <SelectItem value="Shadowing">Shadowing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Ngôn Ngữ
                    </label>
                    <Select value={ytLang} onValueChange={setYtLang}>
                      <SelectTrigger className="h-11 rounded-xl bg-gray-50 font-bold border-none shadow-sm focus:ring-red-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {preview?.availableCaptionLanguages?.length ? (
                          preview.availableCaptionLanguages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang.toUpperCase()}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="en">ENGLISH</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                  disabled={
                    isYoutubePending ||
                    !preview?.hasCaptions ||
                    !ytUrl ||
                    isPreviewLoading
                  }
                  onClick={handleYoutubeSubmit}
                >
                  {isYoutubePending ? (
                    <Loader2 className="animate-spin mr-3 h-6 w-6" />
                  ) : (
                    <Sparkles className="mr-3 h-6 w-6" />
                  )}
                  {isYoutubePending
                    ? "Đang Xử Lý Hệ Thống..."
                    : "Tự Động Tạo Bài Tập"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
