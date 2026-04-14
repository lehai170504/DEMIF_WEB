"use client";

import { motion } from "framer-motion";
import {
  FileText,
  UserCheck,
  Copyright,
  RefreshCcw,
  AlertCircle,
  Ban,
  Clock,
  ChevronRight,
} from "lucide-react";

const terms = [
  {
    title: "1. Chấp nhận điều khoản",
    icon: UserCheck,
    content:
      "Bằng việc khởi tạo tài khoản và sử dụng dịch vụ của DEMIF, bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều khoản này. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ ngay lập tức.",
  },
  {
    title: "2. Quyền sở hữu trí tuệ",
    icon: Copyright,
    content:
      "Toàn bộ bài giảng, thuật toán AI nhận diện giọng nói, mã nguồn và thiết kế giao diện đều là tài sản trí tuệ độc quyền của DEMIF. Mọi hành vi reverse-engineering hoặc sao chép nội dung đều bị nghiêm cấm.",
  },
  {
    title: "3. Chính sách hoàn tiền",
    icon: RefreshCcw,
    content:
      "Chúng tôi áp dụng chính sách '7-Day Money Back Guarantee'. Trong vòng 7 ngày kể từ khi nâng cấp Premium, nếu bạn không hài lòng, chúng tôi sẽ hoàn trả 100% học phí mà không cần lý do phức tạp.",
  },
  {
    title: "4. Trách nhiệm người dùng",
    icon: AlertCircle,
    content:
      "Người dùng có trách nhiệm bảo mật thông tin tài khoản. DEMIF không chịu trách nhiệm cho bất kỳ tổn thất nào phát sinh từ việc chia sẻ tài khoản hoặc sử dụng các công cụ can thiệp trái phép vào hệ thống.",
  },
  {
    title: "5. Chấm dứt dịch vụ",
    icon: Ban,
    content:
      "DEMIF có quyền tạm khóa hoặc xóa vĩnh viễn tài khoản đối với các hành vi vi phạm đạo đức cộng đồng, tấn công mạng hoặc gian lận hệ thống XP/Streak mà không cần báo trước.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono pt-32 pb-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-orange-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <FileText size={14} /> Legal Documents
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none"
          >
            Điều Khoản <span className="text-[#FF7A00]">Dịch Vụ.</span>
          </motion.h1>

          <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> Cập nhật lần cuối: 14.04.2026
            </span>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="space-y-4">
          {terms.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-sm">
                  <item.icon size={28} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                    {item.title}
                    <ChevronRight
                      size={18}
                      className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </h3>
                  <p className="text-base font-medium text-gray-600 dark:text-zinc-400 leading-[1.8] max-w-3xl">
                    {item.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- FOOTER NOTE --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-10 rounded-[3rem] bg-orange-500/5 border border-orange-500/10 text-center space-y-6"
        >
          <h4 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Bạn có câu hỏi về điều khoản?
          </h4>
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
            Nếu có bất kỳ thắc mắc nào liên quan đến quyền lợi và nghĩa vụ khi
            sử dụng dịch vụ, vui lòng liên hệ đội ngũ pháp lý của chúng tôi.
          </p>
          <button className="px-8 py-4 rounded-2xl bg-orange-500 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform">
            Liên hệ pháp lý
          </button>
        </motion.div>
      </main>
    </div>
  );
}
