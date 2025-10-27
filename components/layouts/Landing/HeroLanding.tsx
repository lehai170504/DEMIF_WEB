// src/components/layouts/Landing/HeroLanding.jsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Check } from "lucide-react";

export function HeroLanding() {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-5xl mx-auto text-center">
        <Badge className="mb-6 bg-orange-100 text-[#FF7A00] border-orange-200 hover:bg-orange-100 px-4 py-1.5 rounded-full shadow-sm tracking-wide font-mono">
          <Sparkles className="w-3 h-3 mr-1" />
          Nền tảng học ngôn ngữ ứng dụng AI thông minh
        </Badge>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-mono font-bold mb-7 text-balance leading-tight tracking-tight sm:tracking-normal">
          Chinh phục ngôn ngữ với{" "}
          <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF9E2C] to-[#FFB84D] bg-clip-text text-transparent font-mono">
            sức mạnh của AI
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/70 font-mono mb-10 text-pretty max-w-3xl mx-auto leading-relaxed tracking-wide">
          Nâng cao kỹ năng nghe và nói của bạn qua các bài tập chính tả và
          shadowing được cá nhân hóa. Nhận phản hồi tức thì từ AI, theo dõi tiến
          trình và cải thiện mỗi ngày một cách dễ dàng.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-mono shadow-lg shadow-orange-400/50 hover:shadow-xl rounded-xl transition-all duration-300 ease-in-out"
            asChild
          >
            <Link href="/signup">
              Bắt đầu miễn phí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="text-lg px-8 py-6 border-2 font-mono border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-white bg-transparent rounded-xl transition-all duration-300 ease-in-out"
          >
            <Link href="#demo">Xem thử ngay</Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/50 mt-8">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#FF7A00]" />
            <span>Không cần thẻ tín dụng</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#FF7A00]" />
            <span>Dùng thử miễn phí 14 ngày</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#FF7A00]" />
            <span>Có thể hủy bất kỳ lúc nào</span>
          </div>
        </div>
      </div>
    </section>
  );
}
