"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/public/animations/character-run.json";

export function RunningMascot() {
  const { scrollYProgress } = useScroll();

  // 1. Làm mượt tiến trình cuộn
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 2. Tính toán Tốc độ (Velocity) để tạo hiệu ứng vệt mờ
  const scrollVelocity = useVelocity(smoothProgress);
  const velocitySpring = useSpring(scrollVelocity, {
    stiffness: 50,
    damping: 20,
  });

  // Khi cuộn nhanh, các bóng phía sau sẽ dạt ra xa (khoảng cách tối đa 40px)
  const trailOffset = useTransform(velocitySpring, [-1, 0, 1], [40, 0, -40]);
  // Khi cuộn nhanh, vệt mờ mới hiện lên (opacity tăng)
  const trailOpacity = useTransform(
    velocitySpring,
    [-1, -0.1, 0, 0.1, 1],
    [0.4, 0, 0, 0, 0.4],
  );

  // 3. Logic Chạy ngang & Nhảy (Giữ nguyên combo thần thánh)
  const x = useTransform(smoothProgress, [0, 1], ["-10vw", "110vw"]);
  const jumpY = useTransform(smoothProgress, (v) => {
    const jump = Math.abs(Math.sin(v * Math.PI * 10)) * 70; // Nhảy cao 70px
    return -jump;
  });

  const rotate = useTransform(smoothProgress, [0, 1], [5, 15]);

  return (
    <motion.div
      style={{
        x,
        position: "fixed",
        bottom: "100px",
        zIndex: 100,
      }}
      className="pointer-events-none flex flex-col items-center"
    >
      <motion.div style={{ y: jumpY, rotate }} className="relative">
        {/* VẾT BÓNG MỜ 2 (Xa nhất) */}
        <motion.div
          style={{
            x: trailOffset,
            opacity: trailOpacity,
            filter: "blur(4px) grayscale(1)",
          }}
          className="absolute inset-0 scale-95 origin-bottom"
        >
          <Lottie animationData={animationData} loop={true} />
        </motion.div>

        {/* VẾT BÓNG MỜ 1 (Gần nhân vật hơn) */}
        <motion.div
          style={{
            x: useTransform(velocitySpring, [-1, 1], [20, -20]),
            opacity: trailOpacity,
            filter: "blur(2px)",
          }}
          className="absolute inset-0 scale-100 origin-bottom"
        >
          <Lottie animationData={animationData} loop={true} />
        </motion.div>

        {/* NHÂN VẬT CHÍNH */}
        <div className="w-24 h-24 md:w-32 md:h-32 relative z-10 drop-shadow-[0_0_15px_rgba(255,122,0,0.3)]">
          <Lottie animationData={animationData} loop={true} autoplay={true} />
        </div>

        {/* Hiệu ứng bụi chân khi chạm đất */}
        <motion.div
          style={{ opacity: useTransform(jumpY, [0, -10], [1, 0]) }}
          className="absolute -left-4 bottom-4 flex gap-1"
        >
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, -40],
                y: [0, -10],
                opacity: [0.5, 0],
                scale: [1, 0],
              }}
              transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
              className="w-2 h-2 bg-orange-500/20 rounded-full blur-[1px]"
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Bóng đổ dưới sàn */}
      <motion.div
        style={{
          scale: useTransform(jumpY, [0, -70], [1, 0.4]),
          opacity: useTransform(jumpY, [0, -70], [0.3, 0.05]),
        }}
        className="w-16 h-2 bg-black/30 blur-lg rounded-full"
      />
    </motion.div>
  );
}
