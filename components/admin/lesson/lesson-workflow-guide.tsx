import * as React from "react";
import { Settings2, Lightbulb } from "lucide-react";

export function LessonWorkflowGuide() {
  return (
    <div className="lg:col-span-4 bg-slate-50/50 dark:bg-zinc-900/30 p-8 space-y-8 h-full border-l border-slate-100 dark:border-white/5">
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00] flex items-center gap-2">
          <Settings2 className="w-4 h-4" /> Luồng xuất bản nội dung
        </h3>

        {/* Workflow Steps */}
        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-white/10">
          <div className="relative flex items-start gap-4 pb-8">
            <div className="absolute left-0 w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border-2 border-orange-500 flex items-center justify-center z-10 shadow-sm">
              <span className="text-xs font-black text-orange-500">1</span>
            </div>
            <div className="pl-12 pt-1.5 space-y-1.5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                Tạo Dữ Liệu Thô (Draft)
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Dùng YouTube Auto (khuyên dùng) hoặc paste transcript từ
                Tactiq.io vào Quick Create. Hệ thống tự sinh 4 cấp độ.
              </p>
            </div>
          </div>

          <div className="relative flex items-start gap-4 pb-8">
            <div className="absolute left-0 w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-800 border-2 border-slate-200 dark:border-white/10 flex items-center justify-center z-10">
              <span className="text-xs font-black text-slate-400">2</span>
            </div>
            <div className="pl-12 pt-1.5 space-y-1.5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Rà Soát & Đục Lỗ (Blanks)
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Sau khi tạo, bạn sẽ được chuyển đến trang chi tiết để kiểm tra
                preview và can thiệp thủ công vào các lỗ hổng.
              </p>
            </div>
          </div>

          <div className="relative flex items-start gap-4">
            <div className="absolute left-0 w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-800 border-2 border-slate-200 dark:border-white/10 flex items-center justify-center z-10">
              <span className="text-xs font-black text-slate-400">3</span>
            </div>
            <div className="pl-12 pt-1.5 space-y-1.5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Xuất Bản (Publish)
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Khi nội dung đã hoàn hảo, chuyển trạng thái từ Draft sang
                Published để học viên bắt đầu luyện tập.
              </p>
            </div>
          </div>
        </div>

        {/* Notice Box */}
        <div className="p-5 bg-blue-50 dark:bg-blue-500/10 rounded-[1.5rem] border border-blue-100 dark:border-blue-500/20 space-y-2 mt-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Lightbulb className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Lưu ý
            </span>
          </div>
          <p className="text-[11px] text-blue-700/80 dark:text-blue-300 leading-relaxed font-medium">
            Với YouTube, video bắt buộc phải có{" "}
            <strong>phụ đề tải lên (Manual)</strong>. Hệ thống không hỗ trợ bóc
            tách phụ đề tự động (Auto-generated).
          </p>
        </div>
      </div>
    </div>
  );
}
