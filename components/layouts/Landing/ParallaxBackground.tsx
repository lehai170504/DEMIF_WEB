"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxBackground() {
  // Hook lấy vị trí cuộn chuột hiện tại
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Đốm sáng cam */}
      <motion.div
        style={{ y: y1 }} // Gắn giá trị động vào style
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px]"
      />

      {/* Đốm sáng tím/xanh */}
      <motion.div
        style={{ y: y2 }} // Gắn giá trị động vào style
        className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px]"
      />

      {/* Lớp Noise Texture (Tĩnh) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
}
