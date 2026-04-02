"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Send } from "lucide-react";

export function NewsletterCard() {
  return (
    <Card className="relative overflow-hidden p-8 border-none rounded-[2.5rem] bg-gradient-to-br from-orange-600 to-red-600 shadow-2xl">
      {/* Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-[50px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-[50px] pointer-events-none" />

      <div className="relative z-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/20">
          <Sparkles className="h-7 w-7 text-white fill-white" />
        </div>

        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
          Đăng ký nhận tin
        </h3>
        <p className="text-orange-100 text-sm font-medium mb-8 leading-relaxed px-2">
          Nhận các mẹo học tập độc quyền và bài viết mới nhất trực tiếp qua
          email.
        </p>

        <div className="space-y-3">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email của bạn"
              className="h-12 rounded-xl bg-black/20 border-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/30 pl-4 pr-4 transition-all"
            />
          </div>
          <Button className="w-full h-12 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-bold uppercase tracking-widest text-xs shadow-lg transition-all active:scale-[0.98]">
            Đăng ký ngay <Send className="w-3.5 h-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
