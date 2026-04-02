"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function ParallaxBackground() {
  // 1. Tạo giá trị dựa trên vị trí chuột
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Làm mượt chuyển động chuột (Spring) để không bị giật
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // 3. Chuyển đổi tọa độ chuột thành khoảng cách di chuyển của đốm sáng
  const x1 = useTransform(smoothX, [-500, 500], [-40, 40]);
  const y1 = useTransform(smoothY, [-500, 500], [-40, 40]);

  const x2 = useTransform(smoothX, [-500, 500], [30, -30]);
  const y2 = useTransform(smoothY, [-500, 500], [30, -30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Tính toán vị trí chuột so với trung tâm màn hình
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white dark:bg-[#050505]">
      {/* Đốm sáng Cam - Chuyển động cùng chiều chuột */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-orange-600/[0.07] dark:bg-orange-600/[0.1] rounded-full blur-[120px] will-change-transform"
      />

      {/* Đốm sáng Tím - Chuyển động ngược chiều chuột tạo độ sâu */}
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -bottom-[10%] -left-[10%] w-[900px] h-[900px] bg-indigo-600/[0.05] dark:bg-indigo-600/[0.08] rounded-full blur-[150px] will-change-transform"
      />

      {/* Hiệu ứng Floating tự động (Option: làm các đốm sáng phập phồng nhẹ) */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,0.02),transparent_70%)]"
      />

      {/* Lớp Noise Texture (Tĩnh) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}
