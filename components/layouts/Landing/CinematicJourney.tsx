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
  useMotionTemplate,
  Variants,
} from "framer-motion";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import accuracyAnim from "@/public/animations/accuracy-check.json";
import energyAnim from "@/public/animations/lightning-bolt.json";
import waveAnim from "@/public/animations/sound-wave.json";
import studentStudyAnim from "@/public/animations/student-study.json";

import aiBrainAnim from "@/public/animations/ai-brain.json";
import robotAnim from "@/public/animations/robot-assistant.json";

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
import Image from "next/image";

const features_vi = [
  {
    id: 1,
    icon: Headphones,
    title: "Dictation",
    desc: "Nghe chép chính tả với độ chính xác tuyệt đối.",
    tags: ["Real-time feedback"],
  },
  {
    id: 2,
    icon: Mic,
    title: "Shadowing Mode",
    desc: "Bắt chước ngữ điệu bản xứ và chấm điểm biên độ sóng âm.",
    tags: ["Pitch analysis"],
  },
  {
    id: 3,
    icon: BarChart3,
    title: "Personalized Track",
    desc: "Hệ thống ghi nhận điểm yếu và tạo bài tập khắc phục.",
    tags: ["Adaptive learning"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function CinematicJourney() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01,
  });

  const bgScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 1],
    [1, 1.05, 0.95, 1.1],
  );
  const bgOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 0.15, 0.05, 0.4],
  );

  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -100]);

  const floatCard1Y = useTransform(smoothProgress, [0, 0.15], [0, -300]);
  const floatCard2Y = useTransform(smoothProgress, [0, 0.15], [0, -220]);
  const floatCard3Y = useTransform(smoothProgress, [0, 0.15], [0, -400]);

  const featuresTitleY = useTransform(smoothProgress, [0.15, 0.25], [100, 0]);
  const featuresOpacity = useTransform(
    smoothProgress,
    [0.15, 0.25, 0.45, 0.5],
    [0, 1, 1, 0],
  );
  const featuresPointer = useTransform(smoothProgress, (v) =>
    v >= 0.15 && v < 0.5 ? "auto" : "none",
  );

  const card1Y = useTransform(smoothProgress, [0.17, 0.25], [100, 0]);
  const card2Y = useTransform(smoothProgress, [0.19, 0.27], [100, 0]);
  const card3Y = useTransform(smoothProgress, [0.21, 0.29], [100, 0]);

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
  const pathProgress = useTransform(
    smoothProgress,
    [0.45, 0.65],
    ["0%", "100%"],
  );

  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.75, 0.85], [50, 0]);
  const ctaPointer = useTransform(smoothProgress, (v) =>
    v >= 0.75 ? "auto" : "none",
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  const spotlightBackground = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(255,122,0,0.4), transparent 80%)`;

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-[#f8f9fa] dark:bg-[#020202] font-mono selection:bg-[#FF7A00]/30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <div className="absolute w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-tr from-[#FF7A00]/20 via-orange-500/10 to-purple-500/10 blur-[120px] rounded-full mix-blend-screen dark:opacity-50" />
        </motion.div>

        {/* ================= SCENE 1: HERO ================= */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex items-center justify-center w-full z-10 will-change-transform"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto px-4 md:px-8"
          >
            {/* TEXT */}
            <div className="flex flex-col items-start text-left relative z-20">
              <motion.div variants={itemVariants}>
                <Badge className="mb-8 bg-orange-500/10 text-[#FF7A00] border-none px-5 py-2 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF7A00]"></span>
                  </span>
                  <span className="tracking-widest font-black text-[10px] uppercase">
                    DEMIF AI SYSTEM 3.0
                  </span>
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl xl:text-8xl font-black mb-6 tracking-tighter text-gray-900 dark:text-white leading-[1]"
              >
                Vượt qua <br /> giới hạn{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FF9E2C] to-[#FFD056]">
                  ngôn ngữ
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 font-medium mb-10 max-w-lg leading-relaxed"
              >
                Mô phỏng môi trường giao tiếp thực tế. Luyện nghe sâu, phản xạ
                nhanh và chuẩn hóa phát âm.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <span className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/10">
                  <Cpu size={16} className="text-[#FF7A00]" /> Neural Engine
                </span>
                <span className="flex items-center gap-2 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/10">
                  <Globe size={16} className="text-blue-500" /> Global Accent
                </span>
              </motion.div>
            </div>

            {/* LOTTIE & CARDS */}
            <motion.div
              variants={itemVariants}
              className="relative w-full aspect-square flex items-center justify-center pointer-events-none mt-10 lg:mt-0"
            >
              <div className="w-full max-w-[450px] relative z-10 drop-shadow-2xl">
                <Lottie
                  animationData={studentStudyAnim}
                  loop={true}
                  autoplay={true}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                    progressiveLoad: true,
                    hideOnTransparent: true,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              {/* FIX: Thẻ 1 (Đổi màu chữ) */}
              <motion.div
                style={{ y: floatCard1Y }}
                className="absolute top-4 left-0 md:-left-6 p-2 rounded-3xl bg-white/70 dark:bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center pr-6 z-20"
              >
                <div className="w-14 h-14">
                  <Lottie
                    animationData={accuracyAnim}
                    loop={true}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                      progressiveLoad: true,
                      hideOnTransparent: true,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div>
                  <div className="text-[9px] font-black text-orange-500 uppercase">
                    AI Analysis
                  </div>
                  <div className="text-base font-black text-gray-900 dark:text-white leading-none">
                    98.5%
                  </div>
                </div>
              </motion.div>

              {/* FIX: Thẻ 2 (Đổi màu chữ) */}
              <motion.div
                style={{ y: floatCard2Y }}
                className="absolute bottom-10 right-0 md:-right-4 p-2 rounded-3xl bg-white/70 dark:bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center pr-6 z-20"
              >
                <div className="w-14 h-14 scale-125">
                  <Lottie
                    animationData={energyAnim}
                    loop={true}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                      progressiveLoad: true,
                      hideOnTransparent: true,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div>
                  <div className="text-[9px] font-black text-orange-500 uppercase">
                    Fluency
                  </div>
                  <div className="text-base font-black text-gray-900 dark:text-white leading-none">
                    Advanced
                  </div>
                </div>
              </motion.div>

              {/* FIX: Thẻ 3 Sóng Âm (Kéo sát vào trong, hiện rõ) */}
              <motion.div
                style={{ y: floatCard3Y }}
                className="absolute top-[35%] right-2 md:-right-6 p-3 rounded-3xl bg-white/70 dark:bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl rotate-[5deg] z-20"
              >
                <div className="text-[9px] font-black text-gray-600 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                  <Activity size={10} className="text-blue-500" /> Live Audio
                </div>
                <div className="w-24 h-8 overflow-hidden">
                  <Lottie
                    animationData={waveAnim}
                    loop={true}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                      progressiveLoad: true,
                      hideOnTransparent: true,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Cuộn để khám phá
            </span>
            <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-gray-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ================= SCENE 2: FEATURES ================= */}
        <motion.div
          style={{ opacity: featuresOpacity, pointerEvents: featuresPointer }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 z-20 will-change-transform"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl w-full items-center">
            <motion.div
              style={{ y: featuresTitleY }}
              className="lg:col-span-5 flex flex-col items-start"
            >
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-8">
                Hệ sinh thái <br />
                <span className="text-[#FF7A00]">chuyên sâu.</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10 font-medium">
                Khám phá các công cụ được thiết kế riêng để tối ưu hóa quá trình
                hấp thụ ngôn ngữ của bạn.
              </p>
              <div className="w-80 h-80 opacity-80 mix-blend-multiply dark:mix-blend-screen">
                <Lottie
                  animationData={aiBrainAnim}
                  loop={true}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                    progressiveLoad: true,
                    hideOnTransparent: true,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </motion.div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {features_vi.map((f, i) => (
                <motion.div
                  key={f.id}
                  style={{ y: i === 0 ? card1Y : i === 1 ? card2Y : card3Y }}
                  className="group relative p-6 rounded-3xl bg-white/70 dark:bg-[#0a0a0a]/80 border border-gray-200 dark:border-white/10 backdrop-blur-3xl shadow-xl flex items-center gap-6 hover:border-orange-500/50 transition-colors"
                >
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-white dark:bg-black border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <f.icon className="w-7 h-7 text-[#FF7A00]" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white text-xl mb-2">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {f.desc}
                    </p>
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
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-48 mb-6"
          >
            <Lottie
              animationData={robotAnim}
              loop={true}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
                progressiveLoad: true,
                hideOnTransparent: true,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

          <div className="text-center mb-16 relative z-20">
            <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-none px-4 py-1.5 rounded-full uppercase text-[10px] font-bold">
              3 Bước hấp thụ
            </Badge>
            {/* FIX: Màu chữ */}
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
              Quy trình tự nhiên
            </h2>
          </div>

          <div className="relative flex flex-col md:flex-row gap-12 max-w-6xl w-full">
            <div className="absolute top-1/2 left-[5%] right-[5%] h-1 bg-gray-200 dark:bg-white/10 -translate-y-1/2 hidden md:block rounded-full overflow-hidden z-0">
              <motion.div
                style={{ width: pathProgress }}
                className="h-full bg-gradient-to-r from-transparent via-[#FF7A00] to-[#FFD056]"
              />
            </div>

            {[
              {
                id: 1,
                icon: PlayCircle,
                title: "Nghe & Chép",
                status: "Input",
              },
              { id: 2, icon: Mic, title: "Thu âm", status: "Output" },
              {
                id: 3,
                icon: CheckCircle2,
                title: "Chấm điểm tự động",
                status: "Feedback",
              },
            ].map((step) => (
              <div
                key={step.id}
                className="relative z-10 flex-1 flex flex-col items-center text-center p-8 rounded-[2rem] bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-xl w-full hover:-translate-y-2 transition-transform duration-300"
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
                {/* FIX: Màu chữ */}
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
          {/* Ánh sáng trang trí phía sau CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF7A00]/10 to-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
            {/* NÂNG CẤP 1: Icon lơ lửng tạo cảm giác AI kỳ diệu */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-[#FF7A00]/10 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,122,0,0.2)]"
            >
              <Sparkles className="w-10 h-10 text-[#FF7A00]" />
            </motion.div>

            <h2 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-[0.9]">
              Sẵn sàng để <br className="hidden md:block" />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFD056]">
                bứt phá?
              </span>
            </h2>

            {/* NÂNG CẤP 2: Câu chữ chạm đúng "nỗi đau" học ngoại ngữ */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-12 max-w-2xl leading-relaxed">
              Phát âm không còn là nỗi sợ, từ vựng không còn là rào cản. Bắt đầu
              hành trình chinh phục sự lưu loát cùng AI Mentor ngay hôm nay.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              onMouseMove={handleMouseMove}
              className="relative group rounded-[2rem] p-[2px] overflow-hidden shadow-2xl mb-12 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00] to-[#FFD056] opacity-40 blur-xl group-hover:opacity-100 transition duration-500" />
              <motion.div
                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: spotlightBackground }}
              />
              <Button
                size="lg"
                asChild
                className="relative z-20 h-16 md:h-20 px-10 md:px-14 bg-gray-900 dark:bg-white text-white dark:text-black rounded-[2rem] font-black text-lg md:text-xl border-none"
              >
                <Link href="/signup" className="flex items-center">
                  Bắt đầu học miễn phí{" "}
                  <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Social Proof & Trust Badges */}
            <div className="flex flex-col items-center gap-6 mt-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex -space-x-4">
                  {[
                    "https://i.pravatar.cc/100?img=1",
                    "https://i.pravatar.cc/100?img=2",
                    "https://i.pravatar.cc/100?img=3",
                    "https://i.pravatar.cc/100?img=4",
                  ].map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white dark:border-[#050505] overflow-hidden bg-gray-200 hover:scale-110 hover:z-10 transition-transform duration-200 shadow-xl"
                    >
                      <Image
                        src={src}
                        alt="Student Avatar"
                        fill
                        sizes="(max-width: 768px) 56px, 64px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {/* Cân đối lại kích thước thẻ +10k cho bằng với Avatar */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white dark:border-[#050505] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] md:text-xs font-black text-gray-900 dark:text-white z-0 shadow-xl">
                    +1k
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center md:text-left leading-snug">
                  Đã trợ giúp{" "}
                  <strong className="text-gray-900 dark:text-white">
                    mọi người
                  </strong>
                  <br />
                  giao tiếp tự tin hơn mỗi ngày.
                </div>
              </div>

              {/* Cam kết niềm tin */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-[0.2em] mt-2">
                <span className="flex items-center gap-2 group cursor-default">
                  <CheckCircle2
                    size={14}
                    className="text-emerald-500 group-hover:scale-125 transition-transform"
                  />{" "}
                  Tự do trải nghiệm
                </span>
                <span className="flex items-center gap-2 group cursor-default">
                  <CheckCircle2
                    size={14}
                    className="text-emerald-500 group-hover:scale-125 transition-transform"
                  />{" "}
                  Hủy bất cứ lúc nào
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
