"use client";

import Link from "next/link";
import { useRef, MouseEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Headphones,
  Mic,
  BarChart3,
  PlayCircle,
  Volume2,
  CheckCircle2,
  Cpu,
} from "lucide-react";

// --- DỮ LIỆU ---
const features_vi = [
  {
    icon: Headphones,
    title: "Dictation AI",
    desc: "Nghe chép chính tả với độ chính xác tuyệt đối. AI tự động phân tích từng âm tiết bạn bỏ lỡ.",
    tags: ["Real-time feedback", "Smart correction"],
  },
  {
    icon: Mic,
    title: "Shadowing Mode",
    desc: "Bắt chước ngữ điệu bản xứ. Thuật toán chấm điểm theo biên độ sóng âm (waveform) ngay lập tức.",
    tags: ["Zero latency", "Pitch analysis"],
  },
  {
    icon: BarChart3,
    title: "Personalized Track",
    desc: "Lộ trình học tự thích ứng. Hệ thống ghi nhận điểm yếu và tạo bài tập khắc phục tự động.",
    tags: ["Adaptive learning", "Growth chart"],
  },
];

export function CinematicJourney() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 35,
    restDelta: 0.001,
  });

  // ========================================================
  // ANIMATION: BACKGROUND & VẬT THỂ 3D
  // ========================================================
  const bgScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 1],
    [1, 1.05, 0.95, 1.1],
  );
  const bgRotate = useTransform(smoothProgress, [0, 1], [-2, 10]);
  const bgOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 0.15, 0.05, 0.4],
  );

  // ========================================================
  // SCENE 1: HERO (0% -> 20%)
  // ========================================================
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -100]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  const heroPointer = useTransform(smoothProgress, (v) =>
    v < 0.15 ? "auto" : "none",
  );

  // ========================================================
  // SCENE 2: TÍNH NĂNG (Features) (20% -> 50%)
  // ========================================================
  const featuresOpacity = useTransform(
    smoothProgress,
    [0.15, 0.25, 0.45, 0.5],
    [0, 1, 1, 0],
  );
  const featuresY = useTransform(
    smoothProgress,
    [0.15, 0.25, 0.45, 0.5],
    [100, 0, 0, -100],
  );
  const featuresPointer = useTransform(smoothProgress, (v) =>
    v >= 0.15 && v < 0.5 ? "auto" : "none",
  );

  const card1Y = useTransform(smoothProgress, [0.15, 0.22], [80, 0]);
  const card2Y = useTransform(smoothProgress, [0.18, 0.25], [80, 0]);
  const card3Y = useTransform(smoothProgress, [0.21, 0.28], [80, 0]);

  // ========================================================
  // SCENE 3: QUY TRÌNH (How it works) (50% -> 80%)
  // ========================================================
  const howOpacity = useTransform(
    smoothProgress,
    [0.45, 0.55, 0.75, 0.8],
    [0, 1, 1, 0],
  );
  const howScale = useTransform(
    smoothProgress,
    [0.45, 0.55, 0.75, 0.8],
    [0.9, 1, 1, 1.1],
  );
  const howPointer = useTransform(smoothProgress, (v) =>
    v >= 0.45 && v < 0.8 ? "auto" : "none",
  );

  // ========================================================
  // SCENE 4: CTA CUỐI CÙNG (80% -> 100%)
  // ========================================================
  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.75, 0.85], [50, 0]);
  const ctaPointer = useTransform(smoothProgress, (v) =>
    v >= 0.75 ? "auto" : "none",
  );

  // --- Tương tác chuột cho CTA ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-[#f8f9fa] dark:bg-[#020202] font-mono selection:bg-[#FF7A00]/30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        {/* --- NỀN VẬT THỂ CỐ ĐỊNH --- */}
        <motion.div
          style={{ scale: bgScale, rotate: bgRotate, opacity: bgOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform"
        >
          <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-[#FF7A00]/20 via-orange-500/10 to-purple-500/10 blur-[150px] rounded-full mix-blend-screen dark:opacity-50" />
          <img
            src="/headphone-3d.png"
            alt="3D Headphone Element"
            className="w-full h-full max-w-[1200px] object-contain opacity-60 dark:opacity-30 blur-[8px] mix-blend-multiply dark:mix-blend-lighten"
          />
        </motion.div>

        {/* ============================================== */}
        {/* SCENE 1: HERO - INTRODUCTION                   */}
        {/* ============================================== */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            scale: heroScale,
            pointerEvents: heroPointer,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 will-change-transform"
        >
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-orange-500/10 text-[#FF7A00] border-none px-5 py-2 rounded-full backdrop-blur-md shadow-lg shadow-[#FF7A00]/10 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF7A00]"></span>
              </span>
              <span className="tracking-widest font-black text-[10px] uppercase">
                DEMIF AI SYSTEM 2.0
              </span>
            </Badge>

            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black mb-6 tracking-tighter text-gray-900 dark:text-white leading-[0.95]">
              Vượt qua <br className="hidden md:block" />
              giới hạn{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FF9E2C] to-[#FFD056]">
                ngôn ngữ
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-zinc-400 font-medium mb-12 max-w-2xl leading-relaxed">
              Mô phỏng môi trường giao tiếp thực tế với AI Mentor. Luyện nghe
              sâu, phản xạ nhanh và chuẩn hóa phát âm.
            </p>

            {/* Các tag thông tin giả lập */}
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-md">
                <Cpu size={16} /> Neural Engine
              </span>
              <span className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-md">
                <Volume2 size={16} /> 0ms Latency
              </span>
            </div>
          </div>
        </motion.div>

        {/* ============================================== */}
        {/* SCENE 2: TÍNH NĂNG (BENTO GRID STYLE)          */}
        {/* ============================================== */}
        <motion.div
          style={{
            opacity: featuresOpacity,
            y: featuresY,
            pointerEvents: featuresPointer,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 z-20 will-change-transform"
        >
          <div className="max-w-7xl w-full">
            <div className="mb-16 md:mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
                Công cụ <span className="text-[#FF7A00]">chuyên sâu.</span>
              </h2>
              <p className="text-gray-500 dark:text-zinc-400 text-lg mt-4 font-medium">
                Hệ sinh thái tính năng được thiết kế riêng cho việc hấp thụ ngôn
                ngữ.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {features_vi.map((f, i) => (
                <motion.div
                  key={i}
                  style={{ y: i === 0 ? card1Y : i === 1 ? card2Y : card3Y }}
                  className="group relative p-8 lg:p-10 rounded-[2.5rem] bg-white/70 dark:bg-[#0a0a0a]/80 border border-gray-200 dark:border-white/10 backdrop-blur-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[380px]"
                >
                  {/* Glow Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/0 to-[#FF7A00]/0 group-hover:from-[#FF7A00]/5 group-hover:to-transparent transition-colors duration-500 z-0" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[#FF7A00]/50 transition-all duration-500">
                        <f.icon className="w-7 h-7 text-[#FF7A00]" />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-widest">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="font-black text-gray-900 dark:text-white text-3xl mb-4 tracking-tight">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 dark:text-zinc-400 text-base leading-relaxed font-medium mb-8">
                      {f.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                    {f.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-[10px] font-bold text-gray-600 dark:text-zinc-400 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================== */}
        {/* SCENE 3: QUY TRÌNH (FLOW INTERFACE)            */}
        {/* ============================================== */}
        <motion.div
          style={{
            opacity: howOpacity,
            scale: howScale,
            pointerEvents: howPointer,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-30 will-change-transform"
        >
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold">
              Quy trình 3 bước
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
              Hấp thụ tự nhiên
            </h2>
          </div>

          <div className="w-full max-w-6xl relative">
            {/* Thanh tiến trình chạy ngang giả lập */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-gray-200 dark:bg-white/5 -translate-y-1/2 hidden md:block rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-transparent via-[#FF7A00] to-purple-500"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              {[
                {
                  id: 1,
                  icon: PlayCircle,
                  title: "Nghe & Chép",
                  desc: "Lắng nghe Audio thực tế và gõ lại chính xác từng từ.",
                  status: "Input",
                },
                {
                  id: 2,
                  icon: Mic,
                  title: "Thu âm Shadowing",
                  desc: "Đọc đuổi theo tốc độ và ngữ điệu của người bản xứ.",
                  status: "Output",
                },
                {
                  id: 3,
                  icon: CheckCircle2,
                  title: "AI Chấm điểm",
                  desc: "Nhận báo cáo chi tiết về lỗi sai và gợi ý sửa ngay lập tức.",
                  status: "Feedback",
                },
              ].map((step) => (
                <div
                  key={step.id}
                  className="flex-1 flex flex-col items-center text-center group bg-white/50 dark:bg-black/50 p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 backdrop-blur-xl hover:border-[#FF7A00]/50 transition-colors w-full md:w-auto"
                >
                  <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-[#111111] border-2 border-gray-100 dark:border-white/5 flex items-center justify-center mb-6 shadow-xl relative group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-8 h-8 text-gray-400 dark:text-zinc-500 group-hover:text-[#FF7A00] transition-colors" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#FF7A00] text-white flex items-center justify-center text-xs font-black border-4 border-white dark:border-[#050505]">
                      {step.id}
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] mb-2">
                    {step.status}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 dark:text-zinc-400 font-medium text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================== */}
        {/* SCENE 4: CTA FINAL CỰC MẠNH                    */}
        {/* ============================================== */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-40 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-2xl will-change-transform"
        >
          <div className="relative z-10 flex flex-col items-center max-w-3xl text-center">
            <div className="w-24 h-24 bg-[#FF7A00]/10 rounded-full flex items-center justify-center mb-8">
              <Sparkles className="w-10 h-10 text-[#FF7A00]" />
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
              Sẵn sàng để <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFD056]">
                bứt phá?
              </span>
            </h2>

            <p className="text-xl text-gray-500 dark:text-zinc-400 font-medium mb-12 max-w-lg">
              Tham gia cùng hàng ngàn học viên đang thay đổi cách học ngoại ngữ
              mỗi ngày.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseMove={handleMouseMove}
              className="relative group"
            >
              <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-[#FF7A00] to-[#FFD056] opacity-40 blur-xl transition duration-500 group-hover:opacity-100 group-hover:blur-2xl" />
              <Button
                size="lg"
                asChild
                className="relative h-16 md:h-20 px-10 md:px-14 bg-gray-900 dark:bg-white text-white dark:text-black rounded-[2rem] overflow-hidden font-black text-lg md:text-xl border-none shadow-2xl"
              >
                <Link href="/signup" className="flex items-center">
                  Bắt đầu học miễn phí
                  <div className="ml-4 w-10 h-10 rounded-xl bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </Button>
            </motion.div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#FF7A00]" /> Không cần
                thẻ tín dụng
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#FF7A00]" /> Hủy bất cứ
                lúc nào
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
