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
} from "lucide-react";

import {
  useLessonActions,
  useCreateFromYoutube,
  useYoutubePreview,
} from "@/hooks/use-lesson";
import { LessonSchema, LessonFormValues } from "@/schemas/lesson.schema";
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

  // Truy vấn thông tin xem trước của Video
  const {
    data: preview,
    isLoading: isPreviewLoading,
    isError: isPreviewError,
  } = useYoutubePreview(ytUrl);

  // Tự động cập nhật ngôn ngữ phụ đề khả dụng
  React.useEffect(() => {
    if (
      preview?.availableCaptionLanguages &&
      preview.availableCaptionLanguages.length > 0
    ) {
      setYtLang(preview.availableCaptionLanguages[0]);
    }
  }, [preview]);

  // --- Quản Lý Form Thủ Công ---
  const manualForm = useForm<LessonFormValues>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
      title: "",
      description: "",
      lessonType: "Dictation",
      level: "Beginner",
      category: "General",
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

  const onManualSubmit = (values: LessonFormValues) => {
    const formattedTags = values.tags
      ? JSON.stringify(values.tags.split(",").map((t: string) => t.trim()))
      : null;

    const payload = {
      ...values,
      tags: formattedTags,
      durationSeconds: Number(values.durationSeconds),
      displayOrder: Number(values.displayOrder),
    };

    createLesson(payload as any, {
      onSuccess: () => {
        setOpen(false);
        manualForm.reset();
      },
    });
  };

  const handleYoutubeSubmit = () => {
    if (!ytUrl || !preview?.hasCaptions) return;
    createFromYoutube(
      {
        youtubeUrl: ytUrl,
        captionLanguage: ytLang,
        lessonType: ytType,
        level: ytLevel,
        category: preview.suggestedCategory || "YouTube Import",
        isPremiumOnly: false,
        displayOrder: 0,
        status: "draft",
      },
      {
        onSuccess: () => {
          setOpen(false);
          setYtUrl("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="h-10 gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all">
            <Plus className="h-4 w-4" /> Thêm Bài Học Mới
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] bg-white border-gray-200 text-gray-900 font-mono max-h-[95vh] overflow-y-auto no-scrollbar p-0 rounded-[2.5rem] shadow-2xl">
        {/* Tiêu Đề Chính */}
        <DialogHeader className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-20 backdrop-blur-md">
          <DialogTitle className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight text-gray-900">
            <BookPlus className="h-7 w-7 text-orange-500" /> Khởi Tạo Bài Tập Hệ
            Thống
          </DialogTitle>
        </DialogHeader>

        <div className="p-8">
          <Tabs defaultValue="manual" className="w-full">
            {/* Lựa Chọn Phương Thức */}
            <TabsList className="grid grid-cols-2 w-full mb-10 bg-gray-100 p-1.5 rounded-2xl h-14">
              <TabsTrigger
                value="manual"
                className="rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all"
              >
                <Plus className="w-4 h-4 mr-2 text-gray-400" /> Khởi Tạo Thủ
                Công
              </TabsTrigger>
              <TabsTrigger
                value="youtube"
                className="rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm transition-all"
              >
                <Youtube className="w-4 h-4 mr-2 text-red-500" /> Nhập Từ
                YouTube
              </TabsTrigger>
            </TabsList>

            {/* Nội Dung: Khởi Tạo Thủ Công */}
            <TabsContent value="manual" className="mt-0 outline-none">
              <Form {...manualForm}>
                <form onSubmit={manualForm.handleSubmit(onManualSubmit)}>
                  <LessonFormFields form={manualForm} />
                  <DialogFooter className="pt-8 mt-10 border-t border-gray-100">
                    <Button
                      type="submit"
                      disabled={isCreating}
                      className="w-full h-14 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all active:scale-[0.98]"
                    >
                      {isCreating ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                      )}
                      {isCreating
                        ? "Đang Xử Lý Hệ Thống..."
                        : "Xác Nhận Tạo Bài Tập"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </TabsContent>

            {/* Nội Dung: Nhập Từ YouTube (Có Xem Trước) */}
            <TabsContent value="youtube" className="mt-0 outline-none">
              <div className="space-y-8 py-4 max-w-2xl mx-auto">
                {/* Biểu Ngữ Trí Tuệ Nhân Tạo */}
                <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-start gap-5">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <Sparkles className="w-7 h-7 text-red-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black text-red-900 uppercase tracking-tight">
                      Trí Tuệ Nhân Tạo Tự Động Hóa
                    </p>
                    <p className="text-xs text-red-700/80 leading-relaxed italic font-medium">
                      Hệ thống sẽ tự động bóc tách tiêu đề, mô tả và phụ đề từ
                      đường dẫn YouTube để khởi tạo bài tập chỉ trong vài giây.
                    </p>
                  </div>
                </div>

                {/* Nhập URL & Khu Vực Xem Trước */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                      Đường Dẫn YouTube Video
                    </label>
                    <div className="relative group">
                      <Input
                        placeholder="Dán đường dẫn video tại đây..."
                        className="h-16 rounded-2xl border-gray-200 focus:ring-red-500 shadow-sm text-lg px-6 font-bold pr-12 transition-all"
                        value={ytUrl}
                        onChange={(e) => setYtUrl(e.target.value)}
                      />
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
                    </div>
                  </div>

                  {/* Trạng Thái Đang Phân Tích */}
                  {isPreviewLoading && (
                    <div className="h-48 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 gap-3">
                      <Loader2 className="animate-spin text-red-400 w-8 h-8" />
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                        Đang phân tích dữ liệu video...
                      </p>
                    </div>
                  )}

                  {/* Hiển Thị Thông Tin Xem Trước */}
                  <AnimatePresence mode="wait">
                    {preview && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <YoutubePreviewCard data={preview} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Thông Báo Lỗi Khi Không Tìm Thấy Video */}
                  {isPreviewError && ytUrl && (
                    <p className="text-[10px] text-red-500 font-black uppercase italic text-center py-3 bg-red-50 rounded-xl border border-red-100">
                      Không tìm thấy video hoặc đường dẫn không hợp lệ.
                    </p>
                  )}
                </div>

                {/* BƯỚC B: Cảnh Báo Phụ Đề & Chặn Hành Động */}
                {preview && !preview.hasCaptions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 shadow-sm animate-pulse"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-black text-red-900 uppercase tracking-tight">
                        Nội Dung Không Khả Dụng
                      </p>
                      <p className="text-[11px] text-red-700 leading-relaxed font-bold italic">
                        Video này không có phụ đề Manual (do người dùng tải
                        lên). Hệ thống không thể tự động khởi tạo dữ liệu
                        Dictation.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Cấu Hình Thông Số Nhanh */}
                <div
                  className={cn(
                    "grid grid-cols-3 gap-6 transition-all duration-500",
                    (!preview || !preview.hasCaptions) &&
                      "opacity-40 pointer-events-none grayscale",
                  )}
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Cấp Độ
                    </label>
                    <Select value={ytLevel} onValueChange={setYtLevel}>
                      <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 font-bold">
                        <SelectValue placeholder="Chọn cấp độ" />
                      </SelectTrigger>
                      <SelectContent className="font-mono">
                        {LESSON_LEVELS.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Loại Bài Tập
                    </label>
                    <Select value={ytType} onValueChange={setYtType}>
                      <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 font-bold">
                        <SelectValue placeholder="Chọn loại bài" />
                      </SelectTrigger>
                      <SelectContent className="font-mono">
                        <SelectItem value="Dictation">Dictation</SelectItem>
                        <SelectItem value="Shadowing">Shadowing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Ngôn Ngữ Phụ Đề
                    </label>
                    <Select value={ytLang} onValueChange={setYtLang}>
                      <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 font-bold">
                        <SelectValue placeholder="Chọn ngôn ngữ" />
                      </SelectTrigger>
                      <SelectContent className="font-mono">
                        {preview?.availableCaptionLanguages?.length ? (
                          preview.availableCaptionLanguages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang.toUpperCase()}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="en">English (Mặc định)</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Nút Thực Thi Tự Động */}
                <Button
                  className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-[0.98] mt-6 disabled:opacity-50 disabled:grayscale"
                  disabled={
                    isYoutubePending ||
                    !preview?.hasCaptions ||
                    isPreviewLoading ||
                    !ytUrl
                  }
                  onClick={handleYoutubeSubmit}
                >
                  {isYoutubePending ? (
                    <Loader2 className="animate-spin mr-3 h-6 w-6" />
                  ) : (
                    <Sparkles className="mr-3 h-6 w-6" />
                  )}
                  {isYoutubePending
                    ? "Đang Xử Lý Dữ Liệu..."
                    : "Tự Động Tạo Bài Tập Từ Video"}
                </Button>

                {/* Gợi Ý Cho Admin Khi Bị Chặn */}
                {preview && !preview.hasCaptions && (
                  <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest px-4 leading-normal">
                    Mẹo: Bạn vẫn có thể tạo bài học thủ công và sử dụng tính
                    năng{" "}
                    <span className="text-orange-500">
                      "Nhập Transcript Nhanh"
                    </span>{" "}
                    để dán phụ đề tự do.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
