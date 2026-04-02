import { Button } from "@/components/ui/button";
import { Keyboard, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ShadowingTextFallbackProps {
  userText: string;
  isChecking: boolean;
  onUserTextChange: (val: string) => void;
  onCheckText: () => void;
}

export function ShadowingTextFallback({
  userText,
  isChecking,
  onUserTextChange,
  onCheckText,
}: ShadowingTextFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="p-6 rounded-[2rem] bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/5 shadow-xl"
    >
      <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
        <Keyboard className="w-4 h-4 text-blue-500" /> Hoặc kiểm tra bằng văn
        bản
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={userText}
          onChange={(e) => onUserTextChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onCheckText()}
          placeholder="Gõ lại câu bạn nghe được vào đây..."
          className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none focus:border-blue-500 text-sm font-medium transition-all placeholder:text-gray-400"
          disabled={isChecking}
        />
        <Button
          onClick={onCheckText}
          disabled={!userText.trim() || isChecking}
          className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs shrink-0"
        >
          {isChecking ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Kiểm tra Text"
          )}
        </Button>
      </div>
    </motion.div>
  );
}
