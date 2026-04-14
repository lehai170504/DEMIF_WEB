"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import {
  Sparkles,
  Target,
  Zap,
  ArrowRight,
  Headphones,
  Rocket,
  Cpu,
  Star,
  Trophy,
  Flame,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import studyAnimation from "@/public/animations/learning.json";

export default function AboutPage() {
  const fadeIn: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] font-mono pt-32 pb-32 relative overflow-hidden text-gray-900 dark:text-white">
      {/* ── BACKGROUND DECOR ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-orange-500/[0.07] blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/[0.05] blur-[120px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto px-6 relative z-10 space-y-40">
        {/* ── 1. HERO SECTION ── */}
        <section className="relative pt-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-inner">
                <Star size={14} className="fill-orange-500" /> DEMIF: The Future
                of Learning
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 uppercase leading-[1.1]">
                Khai phá <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] p-2">
                  tiềm năng
                </span>
              </h1>

              <p className="text-gray-500 dark:text-zinc-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed mb-10">
                DEMIF là hệ thống học tiếng Anh hiện đại, tập trung vào phương
                pháp thực chiến giúp bạn nghe thấu, nói thạo thông qua công nghệ
                phân tích giọng nói và lộ trình cá nhân hóa.
              </p>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="rounded-2xl px-10 bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-orange-500/20 transition-transform hover:scale-105"
                  asChild
                >
                  <Link href="/dictation">Bắt đầu ngay</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full" />
              <div className="relative z-10 w-full max-w-[500px] ml-auto">
                <Lottie animationData={studyAnimation} loop={true} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. CORE FEATURES (BENTO GRID) ── */}
        <section>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
              Tính năng <br />{" "}
              <span className="text-orange-500">vượt trội</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
            {/* Dictation Engine */}
            <motion.div
              {...fadeIn}
              className="md:col-span-8 p-10 md:p-12 rounded-[3rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 relative overflow-hidden group"
            >
              <div className="absolute -top-20 -right-20 p-20 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                <Headphones size={300} />
              </div>
              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-orange-500/20">
                <Headphones size={28} />
              </div>
              <h3 className="text-3xl font-black mb-4 uppercase">
                Dictation & Shadowing
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 font-medium text-lg leading-relaxed max-w-xl">
                Luyện nghe chép chính tả kết hợp nói đuổi theo video thực tế.
                Công nghệ AI giúp bạn bóc tách từng từ, sửa lỗi phát âm và cải
                thiện phản xạ tức thì.
              </p>
            </motion.div>

            {/* Streak System */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 p-10 rounded-[3rem] bg-zinc-900 text-white border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 p-8 opacity-10">
                <Flame size={100} />
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                <Flame size={24} className="fill-orange-500" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase leading-tight">
                Giữ lửa <br /> Streak
              </h3>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                Hệ thống Streak giúp bạn duy trì thói quen học tập mỗi ngày.
                Đừng để ngọn lửa vụt tắt và nhận XP xứng đáng.
              </p>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 p-10 rounded-[3rem] bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-2">
                  <Trophy size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase">
                  Bảng vàng <br /> vinh danh
                </h3>
              </div>
              <p className="text-gray-500 dark:text-zinc-500 text-sm font-medium">
                Cạnh tranh công bằng với cộng đồng DEMIF. Tích lũy XP để leo
                hạng và khẳng định vị thế.
              </p>
              <Link
                href="/leaderboard"
                className="mt-4 text-xs font-black text-orange-500 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
              >
                Xem BXH <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Premium Access */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="md:col-span-8 p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-orange-500 to-amber-600 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-black uppercase">
                    Trải nghiệm không giới hạn
                  </h3>
                  <p className="text-white/80 font-medium leading-relaxed">
                    Nâng cấp Premium để mở khóa video độc quyền, không quảng cáo
                    và nhận hỗ trợ ưu tiên từ AI Mentor.
                  </p>
                  <Button
                    variant="secondary"
                    className="rounded-xl bg-white text-orange-600 font-black px-8 hover:bg-white/90 transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/upgrade">Nâng cấp ngay</Link>
                  </Button>
                </div>
                <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <Zap size={60} className="text-white fill-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 3. MILESTONES ── */}
        <section className="py-20">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
              Hành trình của DEMIF
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 hidden md:block" />

            <div className="space-y-24">
              {[
                {
                  year: "2024",
                  title: "Khởi tạo lõi AI",
                  desc: "Xây dựng engine bóc tách âm thanh và nhận diện lỗi đầu tiên.",
                  icon: Target,
                },
                {
                  year: "2025",
                  title: "Hệ sinh thái",
                  desc: "Tích hợp Gamification, Bảng xếp hạng và Thư viện đa dạng.",
                  icon: Rocket,
                },
                {
                  year: "2026",
                  title: "Deep Learning",
                  desc: "Cá nhân hóa tuyệt đối lộ trình học cho từng cá nhân.",
                  icon: Sparkles,
                },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  {...fadeIn}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1 text-center md:text-right">
                    {i % 2 !== 0 ? null : (
                      <div className="space-y-2">
                        <span className="text-orange-500 font-black text-2xl">
                          {m.year}
                        </span>
                        <h4 className="text-xl font-black uppercase">
                          {m.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-xs ml-auto leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#111113] border border-gray-200 dark:border-white/10 flex items-center justify-center text-orange-500 z-10 shadow-xl">
                    <m.icon size={28} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    {i % 2 === 0 ? null : (
                      <div className="space-y-2">
                        <span className="text-orange-500 font-black text-2xl">
                          {m.year}
                        </span>
                        <h4 className="text-xl font-black uppercase">
                          {m.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-xs leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. FINAL CTA ── */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 rounded-[4rem] bg-orange-500 text-white text-center relative overflow-hidden shadow-[0_40px_100px_rgba(249,115,22,0.3)]"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1]">
                Viết tiếp chương mới <br /> trong sự nghiệp của bạn
              </h2>
              <p className="text-white/80 font-medium text-lg max-w-xl mx-auto leading-relaxed">
                Tiếng Anh không còn là rào cản. Biến nó thành vũ khí sắc bén
                nhất để bạn tự tin bước ra thế giới cùng DEMIF.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-2xl px-12 bg-white text-orange-500 hover:bg-zinc-100 font-black uppercase text-xs tracking-widest transition-transform hover:scale-105"
                  asChild
                >
                  <Link href="/dictation">Học ngay</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl px-12 border-white text-white hover:bg-white/10 font-black uppercase text-xs tracking-widest transition-transform hover:scale-105"
                  asChild
                >
                  <Link href="/contact">Hợp tác</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
