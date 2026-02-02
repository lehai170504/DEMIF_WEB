"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CtaLanding() {
  return (
    <section className="relative container mx-auto px-4 py-32 font-mono">
      {/* Background Glow phía sau thẻ CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-orange-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-16 text-center shadow-2xl"
      >
        {/* Inner Highlight Gradient */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF7A00]/50 to-transparent" />

        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF7A00]/20 blur-[80px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] text-xs font-bold mb-8 border border-[#FF7A00]/20">
            <Sparkles className="w-3 h-3" />
            <span>Ưu đãi giới hạn</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
            Sẵn sàng bứt phá <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
              ngôn ngữ mới?
            </span>
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            Tham gia cùng cộng đồng người học thông minh. Không còn học vẹt, chỉ
            có thực hành thực tế với AI Mentor 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="h-14 px-8 bg-[#FF7A00] hover:bg-[#FF8A10] text-white font-bold rounded-2xl shadow-lg shadow-orange-900/20 text-lg border-t border-white/20"
                asChild
              >
                <Link href="/signup">
                  Bắt đầu miễn phí
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl text-lg backdrop-blur-md"
                asChild
              >
                <Link href="#pricing">Xem Bảng giá</Link>
              </Button>
            </motion.div>
          </div>

          <p className="mt-8 text-xs text-zinc-500 font-medium">
            Không cần thẻ tín dụng • Hủy bất kỳ lúc nào
          </p>
        </div>
      </motion.div>
    </section>
  );
}
