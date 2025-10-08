// src/components/layouts/Landing/CtaLanding.jsx

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CtaLanding() {
  return (
    <section className="container mx-auto px-4 py-24 font-mono">
      <Card 
        className="p-16 bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] 
                   border-none rounded-3xl 
                   shadow-2xl shadow-orange-600/50 
                   transition-all duration-500 hover:shadow-orange-600/70"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
            Bạn đã sẵn sàng thay đổi cách học ngôn ngữ của mình chưa?
          </h2>
          <p className="text-white/95 text-xl mb-10 leading-relaxed font-light">
            Tham gia cùng hàng ngàn người học đang cải thiện kỹ năng với các bài luyện tập hỗ trợ AI. Bắt đầu dùng thử miễn phí ngay hôm nay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-white text-[#FF7A00] font-semibold 
                         hover:bg-orange-50 shadow-xl shadow-white/30 rounded-2xl 
                         transition-all duration-300 ease-in-out transform hover:-translate-y-1" 
              asChild
            >
              <Link href="/signup">
                Bắt đầu Dùng thử Miễn phí
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-white text-white font-semibold 
                         hover:bg-white/20 bg-transparent rounded-2xl 
                         transition-all duration-300 ease-in-out"
              asChild
            >
              <Link href="#pricing">Xem Bảng giá</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}