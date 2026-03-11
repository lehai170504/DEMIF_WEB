"use client";

import Link from "next/link";
import { useRef, MouseEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Headphones,
  Mic,
  BarChart3,
  Trophy,
  BookOpen,
  Zap,
} from "lucide-react";

// --- DỮ LIỆU ---
const features_vi = [
  {
    icon: Headphones,
    title: "Chính tả AI",
    desc: "Đánh giá độ chính xác từng âm tiết bạn nghe được.",
  },
  {
    icon: Mic,
    title: "Shadowing",
    desc: "Bắt chước ngữ điệu bản xứ và nhận điểm tức thì.",
  },
  {
    icon: BarChart3,
    title: "Tiến độ",
    desc: "Phân tích điểm mạnh yếu qua biểu đồ trực quan.",
  },
];

export function CinematicJourney() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Tối ưu hóa độ mượt: Tăng stiffness để phản hồi cuộn nhanh và dứt khoát hơn
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
    [1, 1.1, 0.95, 1.15],
  );
  const bgRotate = useTransform(smoothProgress, [0, 1], [-5, 15]);
  const bgOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 0.1, 0.05, 0.3],
  );

  // ========================================================
  // SCENE 1: HERO (0% -> 20%)
  // ========================================================
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -50]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.95]);
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
    [80, 0, 0, -80],
  );
  const featuresPointer = useTransform(smoothProgress, (v) =>
    v >= 0.15 && v < 0.5 ? "auto" : "none",
  );

  // Hiệu ứng hiện ra lần lượt (Stagger) cho các Card Tính năng
  const card1Y = useTransform(smoothProgress, [0.15, 0.22], [50, 0]);
  const card2Y = useTransform(smoothProgress, [0.18, 0.25], [50, 0]);
  const card3Y = useTransform(smoothProgress, [0.21, 0.28], [50, 0]);

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
    [0.95, 1, 1, 1.05],
  );
  const howPointer = useTransform(smoothProgress, (v) =>
    v >= 0.45 && v < 0.8 ? "auto" : "none",
  );

  // ========================================================
  // SCENE 4: CTA CUỐI CÙNG (80% -> 100%)
  // ========================================================
  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.75, 0.85], [40, 0]);
  const ctaPointer = useTransform(smoothProgress, (v) =>
    v >= 0.75 ? "auto" : "none",
  );

  // --- Tương tác chuột ---
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
      className="relative h-[500vh] bg-white dark:bg-[#050505] font-mono selection:bg-[#FF7A00]/30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        {/* --- NỀN VẬT THỂ CỐ ĐỊNH --- */}
        <motion.div
          style={{ scale: bgScale, rotate: bgRotate, opacity: bgOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none will-change-transform"
        >
          {/* Spotlight tỏa sáng từ trung tâm */}
          <div className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-[#FF7A00]/20 to-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
          <img
            src="/headphone-3d.png"
            alt="3D Element"
            className="w-full h-full max-w-[1000px] object-contain opacity-40 dark:opacity-20 blur-[10px]"
          />
        </motion.div>

        {/* --- SCENE 1: HERO --- */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            scale: heroScale,
            pointerEvents: heroPointer,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 will-change-transform"
        >
          <Badge className="mb-8 bg-[#FF7A00]/10 text-[#FF7A00] border-none px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg shadow-[#FF7A00]/5">
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            <span className="tracking-wide font-bold text-xs uppercase">
              Thế hệ học tập mới
            </span>
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black mb-6 tracking-tighter text-center text-gray-900 dark:text-white leading-[1.05]">
            Chinh phục ngôn ngữ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFD056]">
              bằng AI Mentor
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-zinc-400 font-medium text-center max-w-2xl">
            Lộ trình cá nhân hóa, phản hồi phát âm theo thời gian thực. Không
            còn học vẹt, chỉ có thực hành chuẩn xác.
          </p>
        </motion.div>

        {/* --- SCENE 2: TÍNH NĂNG (Thiết kế lại theo dạng thẻ Card sang trọng) --- */}
        <motion.div
          style={{
            opacity: featuresOpacity,
            y: featuresY,
            pointerEvents: featuresPointer,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20 will-change-transform"
        >
          <div className="max-w-6xl w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                Mọi công cụ bạn cần
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {features_vi.slice(0, 3).map((f, i) => (
                <motion.div
                  key={i}
                  style={{ y: i === 0 ? card1Y : i === 1 ? card2Y : card3Y }} // Stagger Animation
                  className="group p-8 lg:p-10 rounded-[2rem] bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-white/60 dark:hover:bg-white/10 transition-colors duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-8 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                    <f.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-2xl mb-4">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 dark:text-zinc-400 text-base leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- SCENE 3: QUY TRÌNH (Thiết kế tối giản, nối tiếp) --- */}
        <motion.div
          style={{
            opacity: howOpacity,
            scale: howScale,
            pointerEvents: howPointer,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-30 will-change-transform"
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              Đơn giản hóa việc học
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-center gap-12 lg:gap-20 max-w-5xl w-full relative">
            {/* Đường nối mờ nhạt phía sau - Thu ngắn lại một chút để không bị dư ở 2 đầu */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent z-0" />

            {[
              {
                id: 1,
                title: "Lắng nghe",
                desc: "Chọn bài hội thoại đa dạng.",
              },
              {
                id: 2,
                title: "Thực hành",
                desc: "Ghi âm lại giọng nói của bạn.",
              },
              {
                id: 3,
                title: "Hoàn thiện",
                desc: "Nhận điểm số & sửa lỗi từ AI.",
              },
            ].map((step) => (
              <div
                key={step.id}
                className="relative flex-1 flex flex-col items-center text-center z-10 group"
              >
                {/* VÒNG TRÒN SỐ */}
                <div className="relative w-24 h-24 rounded-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 flex items-center justify-center text-4xl font-black text-gray-300 dark:text-white/10 mb-8 shadow-xl transition-all duration-500 group-hover:border-[#FF7A00]/50 group-hover:dark:text-white/20">
                  {/* Số thứ tự */}
                  {step.id}

                  {/* FIX: Dời chấm tròn cam ra viền ngoài để không đè lên số */}
                  <div className="absolute top-1 right-2 w-4 h-4 rounded-full bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-[#FF7A00] rounded-full shadow-[0_0_8px_#FF7A00]" />
                  </div>
                </div>

                {/* TEXT NỘI DUNG */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-[#FF7A00]">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-zinc-400 font-medium leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- SCENE 4: CTA (Trọng tâm mạnh mẽ) --- */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-40 bg-white/50 dark:bg-black/50 backdrop-blur-xl will-change-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/50 dark:to-white/5" />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-10 text-center tracking-tighter">
              Bạn đã sẵn sàng?
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseMove={handleMouseMove}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFD056] opacity-60 blur-lg transition duration-500 group-hover:opacity-100 group-hover:blur-xl" />
              <Button
                size="lg"
                asChild
                className="relative h-16 px-12 bg-gray-900 dark:bg-black text-white rounded-full overflow-hidden font-bold text-xl border border-white/10"
              >
                <Link href="/signup">
                  Bắt đầu miễn phí
                  <ArrowRight className="ml-3 w-6 h-6 text-[#FF7A00]" />
                </Link>
              </Button>
            </motion.div>
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Không cần thẻ tín dụng
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
