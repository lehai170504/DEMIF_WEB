"use client";

import Link from "next/link";
import { useRef, MouseEvent } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

// Import Lottie động để tối ưu hiệu suất (chỉ chạy ở Client)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Import các file hoạt ảnh JSON đồng bộ với mascot chạy
import accuracyAnim from "@/public/animations/accuracy-check.json";
import energyAnim from "@/public/animations/lightning-bolt.json";
import waveAnim from "@/public/animations/sound-wave.json";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Headphones,
  Mic,
  BarChart3,
  PlayCircle,
  CheckCircle2,
  Cpu,
  Globe,
  Activity,
} from "lucide-react";

// --- DỮ LIỆU FEATURES ---
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
  // ANIMATION: NỀN VÀ HIỆU ỨNG TỔNG THỂ
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
  // SCENE 1: HERO & LOTTIE CARDS (0% -> 20%)
  // ========================================================
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -100]);

  // Parallax cho các thẻ Lottie bay vút lên khi cuộn
  const floatCard1Y = useTransform(smoothProgress, [0, 0.15], [0, -350]);
  const floatCard2Y = useTransform(smoothProgress, [0, 0.15], [0, -250]);
  const floatCard3Y = useTransform(smoothProgress, [0, 0.15], [0, -400]);

  // ========================================================
  // SCENE 2: FEATURES (20% -> 50%)
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
  // SCENE 3: PROCESS (50% -> 80%)
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
  // SCENE 4: CTA FINAL (80% -> 100%)
  // ========================================================
  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.75, 0.85], [50, 0]);
  const ctaPointer = useTransform(smoothProgress, (v) =>
    v >= 0.75 ? "auto" : "none",
  );

  // Mouse move cho CTA Button
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
        {/* --- NỀN CỐ ĐỊNH --- */}
        <motion.div
          style={{ scale: bgScale, rotate: bgRotate, opacity: bgOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform"
        >
          <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-[#FF7A00]/20 via-orange-500/10 to-purple-500/10 blur-[150px] rounded-full mix-blend-screen dark:opacity-50" />
          <img
            src="/headphone-3d.png"
            alt="3D Visual"
            className="w-full h-full max-w-[1200px] object-contain opacity-60 dark:opacity-30 blur-[8px] mix-blend-multiply dark:mix-blend-lighten"
          />
        </motion.div>

        {/* ================= SCENE 1: HERO & LOTTIE CARDS ================= */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 will-change-transform"
        >
          {/* HỆ THỐNG THẺ LOTTIE TRÔI NỔI */}
          <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
            {/* Thẻ 1: Accuracy */}
            <motion.div
              style={{ y: floatCard1Y }}
              animate={{ y: [0, -20, 0], rotate: [-6, -4, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[18%] left-[5%] md:left-[10%] p-2 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl flex items-center pr-6"
            >
              <div className="w-16 h-16">
                <Lottie animationData={accuracyAnim} loop={true} />
              </div>
              <div>
                <div className="text-[10px] font-black text-orange-500 uppercase">
                  AI Analysis
                </div>
                <div className="text-lg font-black text-gray-900 dark:text-white leading-none">
                  98.5%
                </div>
              </div>
            </motion.div>

            {/* Thẻ 2: Energy/Fluency */}
            <motion.div
              style={{ y: floatCard2Y }}
              animate={{ y: [0, 20, 0], rotate: [8, 10, 8] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-[22%] right-[5%] md:right-[10%] p-2 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl flex items-center pr-6"
            >
              <div className="w-16 h-16 scale-125">
                <Lottie animationData={energyAnim} loop={true} />
              </div>
              <div>
                <div className="text-[10px] font-black text-orange-500 uppercase">
                  Fluency level
                </div>
                <div className="text-lg font-black text-gray-900 dark:text-white leading-none">
                  Advanced
                </div>
              </div>
            </motion.div>

            {/* Thẻ 3: Sound Waveform */}
            <motion.div
              style={{ y: floatCard3Y }}
              className="absolute top-[35%] right-[12%] hidden lg:block p-4 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl rotate-[-4deg]"
            >
              <div className="text-[10px] font-black text-gray-500 uppercase mb-3 flex items-center gap-2">
                <Activity size={12} className="text-blue-500" /> Live Analysis
              </div>
              <div className="w-32 h-12 overflow-hidden">
                <Lottie animationData={waveAnim} loop={true} />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center max-w-4xl mx-auto text-center relative z-10">
            <Badge className="mb-8 bg-orange-500/10 text-[#FF7A00] border-none px-5 py-2 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF7A00]"></span>
              </span>
              <span className="tracking-widest font-black text-[10px] uppercase">
                DEMIF AI SYSTEM 3.0
              </span>
            </Badge>

            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black mb-6 tracking-tighter text-gray-900 dark:text-white leading-[0.95]">
              Vượt qua <br className="hidden md:block" /> giới hạn{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FF9E2C] to-[#FFD056]">
                ngôn ngữ
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-zinc-400 font-medium mb-12 max-w-2xl leading-relaxed">
              Mô phỏng môi trường giao tiếp thực tế với AI Mentor. Luyện nghe
              sâu, phản xạ nhanh và chuẩn hóa phát âm.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-gray-500">
                <Cpu size={16} /> Neural Engine
              </span>
              <span className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-gray-500">
                <Globe size={16} /> Global Accent
              </span>
            </div>
          </div>
        </motion.div>

        {/* ================= SCENE 2: FEATURES ================= */}
        <motion.div
          style={{
            opacity: featuresOpacity,
            y: featuresY,
            pointerEvents: featuresPointer,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 z-20 will-change-transform"
        >
          <div className="max-w-7xl w-full">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-16">
              Công cụ <span className="text-[#FF7A00]">chuyên sâu.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features_vi.map((f, i) => (
                <motion.div
                  key={i}
                  style={{ y: i === 0 ? card1Y : i === 1 ? card2Y : card3Y }}
                  className="group relative p-8 rounded-[2.5rem] bg-white/70 dark:bg-[#0a0a0a]/80 border border-gray-200 dark:border-white/10 backdrop-blur-3xl shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[380px]"
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <f.icon className="w-7 h-7 text-[#FF7A00]" />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-3xl my-6 tracking-tight">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 dark:text-zinc-400 text-base leading-relaxed font-medium">
                      {f.desc}
                    </p>
                  </div>
                  <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                    {f.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-[10px] font-bold text-gray-500 uppercase"
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

        {/* ================= SCENE 3: PROCESS ================= */}
        <motion.div
          style={{
            opacity: howOpacity,
            scale: howScale,
            pointerEvents: howPointer,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-30"
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-none px-4 py-1.5 rounded-full uppercase text-[10px] font-bold">
              3 Bước hấp thụ
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
              Quy trình tự nhiên
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl w-full">
            {[
              {
                id: 1,
                icon: PlayCircle,
                title: "Nghe & Chép",
                status: "Input",
              },
              { id: 2, icon: Mic, title: "Thu âm Shadowing", status: "Output" },
              {
                id: 3,
                icon: CheckCircle2,
                title: "AI Chấm điểm",
                status: "Feedback",
              },
            ].map((step) => (
              <div
                key={step.id}
                className="flex-1 flex flex-col items-center text-center p-8 rounded-[2rem] bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-xl w-full"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF7A00]/10 flex items-center justify-center mb-6 relative">
                  <step.icon className="w-7 h-7 text-[#FF7A00]" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF7A00] text-white flex items-center justify-center text-[10px] font-black">
                    {step.id}
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase text-[#FF7A00] mb-2">
                  {step.status}
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ================= SCENE 4: CTA ================= */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-40 bg-white/90 dark:bg-[#050505]/95 backdrop-blur-2xl"
        >
          <div className="relative z-10 flex flex-col items-center max-w-3xl text-center">
            <div className="w-20 h-20 bg-[#FF7A00]/10 rounded-full flex items-center justify-center mb-8">
              <Sparkles className="w-10 h-10 text-[#FF7A00]" />
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
              Sẵn sàng để <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFD056]">
                bứt phá?
              </span>
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onMouseMove={handleMouseMove}
              className="relative group"
            >
              <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-[#FF7A00] to-[#FFD056] opacity-40 blur-xl group-hover:opacity-100 transition duration-500" />
              <Button
                size="lg"
                asChild
                className="relative h-16 md:h-20 px-10 md:px-14 bg-gray-900 dark:bg-white text-white dark:text-black rounded-[2rem] font-black text-lg md:text-xl border-none shadow-2xl"
              >
                <Link href="/signup" className="flex items-center">
                  Bắt đầu ngay miễn phí
                  <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
