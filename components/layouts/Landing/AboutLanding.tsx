"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  BrainCircuit,
  Mic2,
  Volume2,
  VolumeX,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export function AboutLanding() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 font-mono overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-500"
    >
      {/* --- 1. DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/10 dark:bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-7xl mx-auto">
          {/* --- 2. TEXT CONTENT --- */}
          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-orange-500/10 text-[#FF7A00] border-none px-4 py-1.5 rounded-full uppercase tracking-[0.2em] text-[10px] font-black">
                <Sparkles className="w-3 h-3 mr-2 inline" />
                Next-Gen AI Learning
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-[0.95] tracking-tighter mb-8">
                Học chuẩn xác. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FF9E2C] to-[#FFD056]">
                  Nói tự tin.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-zinc-400 leading-relaxed font-medium max-w-lg">
                Hệ thống AI Mentor mô phỏng môi trường giao tiếp 1:1, phá vỡ rào
                cản ngôn ngữ bằng công nghệ độc bản.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5">
              {[
                {
                  icon: Mic2,
                  title: "Shadowing Mode",
                  text: "Phản hồi độ trễ 0ms chuẩn xác từng âm sắc.",
                },
                {
                  icon: BrainCircuit,
                  title: "Deep Analysis",
                  text: "Chấm điểm bằng thuật toán Neural Network.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-gray-50/80 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 backdrop-blur-md group hover:border-orange-500/30 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 border border-gray-100 dark:border-white/5">
                    <item.icon className="text-[#FF7A00]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 dark:text-zinc-500 text-sm font-medium">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- 3. THE CINEMATIC VIDEO DISPLAY --- */}
          <div className="flex-1 relative w-full">
            {/* Glow tỏa sáng nền */}
            <div className="absolute inset-0 bg-[#FF7A00]/20 blur-[100px] rounded-full opacity-40 animate-pulse" />

            <motion.div
              style={{ y: videoY }}
              className="relative z-10 w-full aspect-square md:aspect-[4/5] lg:aspect-square rounded-[4rem] p-2 bg-gradient-to-br from-white/30 to-white/5 dark:from-white/10 dark:to-transparent border border-white/30 dark:border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden"
            >
              <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden bg-black group shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[3s] ease-out"
                >
                  <source src="/intro-ai.mp4" type="video/mp4" />
                </video>

                {/* Các lớp phủ High-tech */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />

                {/* Mute Toggle Button */}
                <button
                  onClick={toggleMute}
                  className="absolute top-8 right-8 z-30 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-[#FF7A00] transition-all group/mute"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest overflow-hidden max-w-0 group-hover/mute:max-w-[100px] transition-all duration-500 whitespace-nowrap">
                    {isMuted ? "Unmute" : "Mute"}
                  </span>
                  {isMuted ? (
                    <VolumeX size={18} />
                  ) : (
                    <Volume2 size={18} className="animate-pulse" />
                  )}
                </button>

                {/* Bottom Stats Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
                  <div className="flex items-end justify-between">
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-[9px] font-black text-white uppercase animate-pulse">
                          Live
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/10 text-[9px] font-black text-white/80 uppercase backdrop-blur-md border border-white/10">
                          98.2% Accuracy
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        AI Recognition Engine
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-12 bg-orange-500 rounded-full animate-pulse" />
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                          Processing Patterns...
                        </p>
                      </div>
                    </div>
                    <Cpu
                      className="text-[#FF7A00] animate-spin-slow-neon hidden md:block"
                      size={40}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FLOATING CARDS (Hidden on small mobile) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-12 z-20 p-5 rounded-[1.5rem] bg-white dark:bg-zinc-900 shadow-2xl border border-gray-100 dark:border-white/10 hidden xl:block backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <CheckCircle2 size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">
                    Status
                  </span>
                  <span className="text-sm font-bold dark:text-white">
                    Lộ trình tối ưu
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -right-12 z-20 p-5 rounded-[1.5rem] bg-white dark:bg-zinc-900 shadow-2xl border border-gray-100 dark:border-white/10 hidden xl:block backdrop-blur-xl"
            >
              <div className="space-y-2">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                  AI Performance
                </p>
                <div className="w-40 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFD056]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
