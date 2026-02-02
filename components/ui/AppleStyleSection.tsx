// src/components/ui/AppleStyleSection.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AppleStyleSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function AppleStyleSection({
  children,
  id,
  className,
  delay = 0,
}: AppleStyleSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
