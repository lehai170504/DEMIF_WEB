"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileX, Home, ArrowLeft } from "lucide-react";

export function NotFoundPost() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] pointer-events-none" />

      <Card className="max-w-xl w-full text-center p-12 border border-white/10 bg-[#18181b] rounded-[3rem] shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner">
              <FileX className="h-12 w-12 text-zinc-500" />
            </div>
          </div>

          <h1 className="text-3xl font-black text-white mb-4 tracking-tight">
            Không tìm thấy bài viết
          </h1>
          <p className="text-zinc-400 mb-10 leading-relaxed max-w-sm mx-auto">
            Rất tiếc, bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              className="h-12 px-6 rounded-xl border-white/10 bg-transparent text-zinc-300 hover:text-white hover:bg-white/5 font-bold transition-all"
            >
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại Blog
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/20"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" /> Về Trang chủ
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
