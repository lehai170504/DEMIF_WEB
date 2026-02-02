"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ShadowingHeaderProps {
  title: string;
  current: number;
  total: number;
  progress: number;
}

export function ShadowingHeader({
  title,
  current,
  total,
  progress,
}: ShadowingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <Link href="/shadowing">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-sm font-bold text-white uppercase tracking-wider line-clamp-1 max-w-[200px] sm:max-w-none">
              {title}
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Luyện tập Shadowing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-zinc-500">
            {current} <span className="text-zinc-700">/</span> {total}
          </span>
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
