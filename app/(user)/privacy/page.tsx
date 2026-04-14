"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  UserCheck,
  GlobeLock,
  ArrowRight,
  Clock,
} from "lucide-react";

const sections = [
  {
    id: "collection",
    title: "1. Thu thập thông tin",
    icon: Database,
    content:
      "Chúng tôi thu thập thông tin cơ bản bao gồm tên, email và tiến trình học tập để tối ưu hóa lộ trình cá nhân. Đặc biệt, dữ liệu giọng nói trong các bài tập Shadowing sẽ được AI xử lý tức thì và mã hóa ẩn danh hoàn toàn.",
  },
  {
    id: "security",
    title: "2. Bảo vệ dữ liệu",
    icon: Lock,
    content:
      "Mọi dữ liệu truyền tải đều được bảo vệ bởi giao thức mã hóa AES-256 bit cấp quân đội. Mật khẩu của bạn được lưu trữ dưới dạng Hash một chiều, đảm bảo ngay cả đội ngũ kỹ thuật của DEMIF cũng không thể tiếp cận.",
  },
  {
    id: "third-party",
    title: "3. Chia sẻ thông tin",
    icon: EyeOff,
    content:
      "DEMIF cam kết 100% không bán hoặc cho thuê dữ liệu cá nhân cho bên thứ ba vì mục đích quảng cáo. Chúng tôi chỉ chia sẻ dữ liệu cần thiết với các cổng thanh toán uy tín khi bạn thực hiện nâng cấp gói Premium.",
  },
  {
    id: "rights",
    title: "4. Quyền của người dùng",
    icon: UserCheck,
    content:
      "Bạn có toàn quyền truy cập, chỉnh sửa hoặc yêu cầu xóa vĩnh viễn tài khoản và dữ liệu liên quan bất kỳ lúc nào thông qua phần cài đặt hồ sơ hoặc liên hệ trực tiếp với bộ phận hỗ trợ.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <ShieldCheck size={14} /> Bảo mật tuyệt đối
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none"
          >
            Quyền <span className="text-[#FF7A00]">Riêng Tư.</span>
          </motion.h1>

          <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> Cập nhật: 14.04.2026
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="flex items-center gap-1.5">
              <GlobeLock size={12} /> Tiêu chuẩn quốc tế
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* --- LEFT: TRUST BADGE --- */}
          <aside className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-[2.5rem] bg-zinc-900 text-white border border-white/5 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <ShieldCheck size={120} />
              </div>

              <h3 className="text-xl font-black uppercase mb-4 relative z-10">
                Cam kết DEMIF
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 relative z-10 font-medium">
                Sự tin tưởng của bạn là tài sản quý giá nhất của chúng tôi.
                Chúng tôi thiết kế hệ thống dựa trên nguyên tắc "Privacy by
                Design".
              </p>

              <ul className="space-y-4 relative z-10">
                {[
                  "Không bán dữ liệu",
                  "Mã hóa 2 chiều",
                  "Xóa dữ liệu theo yêu cầu",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-orange-500"
                  >
                    <ArrowRight size={14} /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="p-8 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/10 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Lock size={20} />
              </div>
              <p className="text-[10px] font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest leading-relaxed">
                Hệ thống đạt chuẩn ISO/IEC 27001 về an toàn thông tin
              </p>
            </div>
          </aside>

          {/* --- RIGHT: POLICY CONTENT --- */}
          <div className="lg:col-span-8 space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className="p-8 md:p-10 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 hover:border-orange-500/30 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform shadow-sm">
                    <section.icon size={24} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-zinc-400 leading-[1.8]">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-8 text-center"
            >
              <p className="text-xs font-bold text-gray-400 dark:text-zinc-600 italic">
                Mọi thắc mắc về quyền riêng tư, vui lòng liên hệ:{" "}
                <span className="text-orange-500 not-italic">
                  privacy@demif.vn
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
