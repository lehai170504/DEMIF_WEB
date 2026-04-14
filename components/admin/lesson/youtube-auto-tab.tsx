"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, Sparkles, AlertCircle, FileText } from "lucide-react";
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

interface YoutubeAutoTabProps {
  onSuccess: (id?: string) => void;
}

export function YoutubeAutoTab({ onSuccess }: YoutubeAutoTabProps) {
  const [ytUrl, setYtUrl] = React.useState("");
  const [ytLang, setYtLang] = React.useState("en");

  const { mutate: createFromYoutube, isPending: isYoutubePending } =
    useCreateFromYoutube();
  const {
    data: preview,
    isLoading: isPreviewLoading,
    isError: isPreviewError,
  } = useYoutubePreview(ytUrl);
  const { data: transcript, isLoading: isTranscriptLoading } =
    useYoutubeTranscript({ url: ytUrl, preferredLanguage: ytLang });

  React.useEffect(() => {
    if (preview?.availableCaptionLanguages?.length) {
      setYtLang(preview.availableCaptionLanguages[0]);
    }
  }, [preview]);

  const handleYoutubeSubmit = () => {
    if (!ytUrl || !preview?.hasCaptions) return;
    createFromYoutube(
      {
        youTubeUrl: ytUrl,
        captionLanguage: ytLang,
        lessonType: 0, // 0: Dictation
        level: 0, // 0: Beginner
        category: preview.suggestedCategory || "YouTube Import",
        isPremiumOnly: false,
        displayOrder: 0,
        status: "draft",
        tags: "", // BE nhận chuỗi
        titleOverride: null,
        descriptionOverride: null,
      },
      {
        onSuccess: (data: any) => {
          setYtUrl("");
          onSuccess(data?.id);
        },
      },
    );
  };

  return (
    <div className="space-y-8 font-mono">
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
                      <SelectContent className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10">
                        {preview?.availableCaptionLanguages?.map((l) => (
                          <SelectItem
                            key={l}
                            value={l}
                            className="text-[10px] font-bold uppercase focus:bg-slate-100 dark:focus:bg-white/5"
                          >
                            {l}
                          </SelectItem>
                        )) || <SelectItem value="en">EN</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar font-medium italic text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {transcript.fullText ||
                    "Không có nội dung văn bản. Vui lòng kiểm tra lại Video."}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 dark:from-zinc-900/80 to-transparent pointer-events-none" />
              </div>
            )}

            <Button
              disabled={isYoutubePending || !preview?.hasCaptions || !ytUrl}
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
          <p className="text-[11px] font-bold uppercase tracking-widest">
            Không thể đọc dữ liệu từ đường dẫn này.
          </p>
        </div>
      )}
    </div>
  );
}
