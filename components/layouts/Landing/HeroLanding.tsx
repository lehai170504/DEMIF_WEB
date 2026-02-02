"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Check,
  Mic,
  Activity,
  PlayCircle,
  LucideIcon,
} from "lucide-react";
import {
  motion,
  Variants,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useRef, MouseEvent } from "react";

// --- COMPONENTS CON ---

interface FloatingFeatureCardProps {
  icon: LucideIcon;
  title: string;
  sub: string;
  className?: string;
  delay: number;
}

// Glass Card 3D
function FloatingFeatureCard({
  icon: Icon,
  title,
  sub,
  className,
  delay,
}: FloatingFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{
        opacity: 1,
        y: [0, -15, 0],
        rotateX: [10, 0, 10],
      }}
      transition={{
        opacity: { duration: 1, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute hidden lg:flex items-center gap-4 p-4 pr-6 rounded-2xl 
        bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl 
        hover:bg-white/10 transition-colors duration-300 font-mono
        ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/20">
        <Icon className="text-[#FF7A00] w-6 h-6 relative z-10" />
        <div className="absolute inset-0 bg-[#FF7A00] blur-lg opacity-20" />
      </div>
      <div className="flex flex-col">
        <span className="text-white/90 font-bold text-sm tracking-wide">
          {title}
        </span>
        <span className="text-white/50 text-xs font-medium">{sub}</span>
      </div>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---

export function HeroLanding() {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse Move Effect cho Button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Text Animation
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  return (
    <section
      ref={containerRef}
      // Đã xóa bg-[#050505] để dùng nền global
      className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden py-24 md:py-32 font-mono"
    >
      {/* --- 3D DECORATION ELEMENTS --- */}
      <div className="absolute inset-0 w-full h-full max-w-[1400px] mx-auto pointer-events-none perspective-[1000px]">
        {/* Card Trái */}
        <FloatingFeatureCard
          icon={Mic}
          title="Nhận diện giọng nói"
          sub="Chính xác 98%"
          delay={0.5}
          className="top-[20%] left-[5%] -rotate-[5deg]"
        />

        {/* Card Phải */}
        <FloatingFeatureCard
          icon={Activity}
          title="Phân tích thời gian thực"
          sub="Phản hồi tức thì"
          delay={0.8}
          className="top-[30%] right-[5%] rotate-[5deg]"
        />

        {/* Background Blur Blob */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container relative z-10 mx-auto px-4 perspective-[2000px]">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* BADGE */}
          <motion.div
            variants={textVariants}
            className="flex justify-center mb-8"
          >
            <Badge className="bg-white/5 hover:bg-white/10 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(255,122,0,0.1)] transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-[#FF7A00]" />
              <span className="tracking-wide font-medium font-mono text-xs md:text-sm">
                Nền tảng học ngôn ngữ ứng dụng AI
              </span>
            </Badge>
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter text-white drop-shadow-2xl font-mono leading-tight"
          >
            Chinh phục ngôn ngữ <br className="hidden md:block" />
            với{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-r from-[#FF7A00] via-[#FF9E2C] to-[#FFD056] bg-clip-text text-transparent">
                Sức mạnh AI
              </span>
              <div className="absolute inset-0 bg-orange-500/20 blur-xl -z-10 scale-110"></div>
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={textVariants}
            className="text-base md:text-xl text-zinc-400 font-normal mb-10 max-w-2xl mx-auto leading-relaxed font-mono"
          >
            Nâng cao kỹ năng nói với công nghệ Shadowing AI tiên tiến. Phản hồi
            thời gian thực, lộ trình cá nhân hóa và trải nghiệm học tập nhập vai
            hoàn toàn mới.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
              onMouseMove={handleMouseMove}
            >
              <motion.div
                className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 opacity-70 blur transition duration-200 group-hover:opacity-100"
                style={{ opacity: 0.6 }}
              />
              <Button
                size="lg"
                asChild
                className="relative h-14 px-8 bg-black text-white rounded-2xl border border-white/10 overflow-hidden font-bold text-lg font-mono cursor-pointer"
              >
                <Link href="/signup">
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                      background: useMotionTemplate`
                      radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(255,122,0,0.15),
                        transparent 80%
                      )
                    `,
                    }}
                  />
                  <span className="flex items-center gap-2 relative z-10">
                    Bắt đầu miễn phí
                    <ArrowRight className="w-5 h-5 text-[#FF7A00]" />
                  </span>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="h-14 px-8 text-zinc-300 hover:text-white hover:bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all font-bold text-lg font-mono cursor-pointer"
              >
                <Link href="#demo">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Xem Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* FOOTER TEXT */}
          <motion.div
            variants={textVariants}
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-zinc-500 font-medium font-mono"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-500" />
              <span>Không cần thẻ tín dụng</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-500" />
              <span>Dùng thử miễn phí 14 ngày</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Giữ lại gradient đáy để chuyển tiếp mượt mà sang section Features */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20"></div>
    </section>
  );
}
