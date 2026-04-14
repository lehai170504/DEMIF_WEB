"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Search,
  Sparkles,
  AlertCircle,
  FileText,
  Layers,
  Signal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateFromYoutube,
  useYoutubePreview,
  useYoutubeTranscript,
} from "@/hooks/use-lesson";
import { YoutubePreviewCard } from "./youtube-preview-card";
import { CreateLessonFromYoutubeResponse } from "@/types/lesson.type";

interface YoutubeAutoTabProps {
  onSuccess: (id?: string) => void;
}

export function YoutubeAutoTab({ onSuccess }: YoutubeAutoTabProps) {
  const [ytUrl, setYtUrl] = React.useState("");
  const [ytLang, setYtLang] = React.useState("en");

  const [lessonType, setLessonType] = React.useState("0");
  const [level, setLevel] = React.useState("0");

  const { mutate: createFromYoutube, isPending: isYoutubePending } =
    useCreateFromYoutube();

  const {
    data: preview,
    isLoading: isPreviewLoading,
    isError: isPreviewError,
  } = useYoutubePreview(ytUrl);

  const { data: transcript, isLoading: isTranscriptLoading } =
    useYoutubeTranscript({
      url: ytUrl,
      preferredLanguage: ytLang,
    });

  React.useEffect(() => {
    if (preview?.availableCaptionLanguages?.length) {
      setYtLang(preview.availableCaptionLanguages[0]);
    }
  }, [preview]);

  const handleYoutubeSubmit = () => {
    if (!ytUrl) return;

    createFromYoutube(
      {
        youTubeUrl: ytUrl,
        captionLanguage: ytLang || "en",
        lessonType: parseInt(lessonType, 10),
        level: parseInt(level, 10),
        category: preview?.suggestedCategory || "news",
        isPremiumOnly: false,
        displayOrder: 0,
        tags: "youtube,transcript",
        status: "draft",
        titleOverride: null,
        descriptionOverride: null,
      },
      {
        onSuccess: (data: CreateLessonFromYoutubeResponse) => {
          setYtUrl("");
          onSuccess(data.lessonId);
        },
      },
    );
  };

  return (
    <div className="space-y-8 font-mono text-left">
      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">
          Đường dẫn Video YouTube
        </label>
        <div className="relative group">
          <Input
            placeholder="https://youtube.com/watch?v=..."
            className="h-16 rounded-[1.5rem] border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 shadow-inner text-base px-6 font-bold pr-14 focus:ring-red-500 dark:text-white transition-all"
            value={ytUrl}
            onChange={(e) => setYtUrl(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isPreviewLoading ? (
              <Loader2 className="animate-spin text-red-500 w-5 h-5" />
            ) : (
              <Search className="text-slate-300 dark:text-slate-600 w-5 h-5" />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <YoutubePreviewCard data={preview} />

            {/* Cảnh báo nếu video không có sub Manual */}
            {!preview.hasCaptions && (
              <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl flex items-center gap-3 text-orange-600 dark:text-orange-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed text-left">
                  Lưu ý: Video không có phụ đề Manual. Hệ thống sẽ tạo Draft
                  trống nội dung.
                </p>
              </div>
            )}

            {/* --- KHU VỰC CHỌN THUỘC TÍNH BÀI HỌC --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                  <Layers className="w-3.5 h-3.5 text-blue-500" /> Loại bài học
                </label>
                <Select value={lessonType} onValueChange={setLessonType}>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 font-bold text-xs uppercase shadow-sm dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 font-mono">
                    <SelectItem
                      value="0"
                      className="text-[11px] font-bold uppercase"
                    >
                      Dictation (Chép chính tả)
                    </SelectItem>
                    <SelectItem
                      value="1"
                      className="text-[11px] font-bold uppercase"
                    >
                      Shadowing (Đuổi âm)
                    </SelectItem>
                    {/* Thêm value="2" nếu sau này BE bổ sung Conversation */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                  <Signal className="w-3.5 h-3.5 text-emerald-500" /> Cấp độ
                </label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 font-bold text-xs uppercase shadow-sm dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 font-mono">
                    <SelectItem
                      value="0"
                      className="text-[11px] font-bold uppercase"
                    >
                      Beginner (Cơ bản)
                    </SelectItem>
                    <SelectItem
                      value="1"
                      className="text-[11px] font-bold uppercase"
                    >
                      Intermediate (Trung cấp)
                    </SelectItem>
                    <SelectItem
                      value="2"
                      className="text-[11px] font-bold uppercase"
                    >
                      Advanced (Nâng cao)
                    </SelectItem>
                    <SelectItem
                      value="3"
                      className="text-[11px] font-bold uppercase"
                    >
                      Expert (Chuyên gia)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {transcript && (
              <div className="p-6 bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 rounded-[2rem] relative overflow-hidden shadow-inner group transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#FF7A00]" /> Dữ liệu
                    bóc tách
                  </p>
                  <div className="flex items-center gap-3">
                    {isTranscriptLoading && (
                      <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                    )}
                    <Select value={ytLang} onValueChange={setYtLang}>
                      <SelectTrigger className="h-8 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 font-bold text-[10px] uppercase shadow-sm dark:text-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10">
                        {preview?.availableCaptionLanguages?.length ? (
                          preview.availableCaptionLanguages.map((l) => (
                            <SelectItem
                              key={l}
                              value={l}
                              className="text-[10px] font-bold uppercase"
                            >
                              {l.toUpperCase()}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="en">EN (DEFAULT)</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar font-medium italic text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                  {transcript.fullText ||
                    "Không tìm thấy phụ đề bóc tách được từ video này."}
                </div>
              </div>
            )}

            <Button
              disabled={isYoutubePending || !ytUrl}
              onClick={handleYoutubeSubmit}
              className="w-full h-16 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-red-500/20 active:scale-95 transition-all"
            >
              {isYoutubePending ? (
                <Loader2 className="animate-spin mr-3 h-5 w-5" />
              ) : (
                <Sparkles className="mr-3 h-5 w-5" />
              )}
              Kéo Dữ Liệu & Tạo Draft
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {isPreviewError && (
        <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20 flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-left">
            Không thể đọc dữ liệu từ đường dẫn này.
          </p>
        </div>
      )}
    </div>
  );
}
