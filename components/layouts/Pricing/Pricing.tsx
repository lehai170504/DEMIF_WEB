// src/components/layouts/Landing/PricingLanding.jsx

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import Link from "next/link"

export function Pricing() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-24 font-mono">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">Bảng giá</Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Chọn lộ trình học tập của bạn</h2>
        <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Các gói linh hoạt được thiết kế để phù hợp với hành trình học ngôn ngữ của bạn
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Gói Hàng tháng (Monthly Plan) */}
        <Card className="p-8 bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Hàng tháng</h3>
            <p className="text-foreground/60">Hoàn hảo để dùng thử</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">39.000đ</span>
              <span className="text-foreground/60">/tháng</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Bài tập chính tả không giới hạn</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Luyện tập shadowing không giới hạn</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Phản hồi được hỗ trợ bởi AI</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Theo dõi & phân tích tiến độ</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Truy cập ứng dụng di động</span>
            </li>
          </ul>
          <Button className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white" size="lg" asChild>
            <Link href="/signup">Bắt đầu Dùng thử Miễn phí</Link>
          </Button>
        </Card>

        {/* Gói Hàng năm (Yearly Plan) - Phổ biến nhất */}
        <Card className="p-8 bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] border-2 border-[#FF7A00] relative shadow-2xl shadow-orange-500/30 scale-105">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#FF7A00] border-white">
            <Star className="w-3 h-3 mr-1" />
            Phổ biến nhất
          </Badge>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2 text-white">Hàng năm</h3>
            <p className="text-white/80">Tiết kiệm 25% hàng năm</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">29.166đ</span>
              <span className="text-white/80">/tháng</span>
            </div>
            <p className="text-sm text-white/70 mt-2">Thanh toán 350.000đ/năm</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Mọi thứ trong gói Hàng tháng</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Xử lý AI ưu tiên</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Bảng điều khiển phân tích nâng cao</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Thư viện nội dung độc quyền</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
              <span className="text-white/90">Hỗ trợ qua email</span>
            </li>
          </ul>
          <Button className="w-full bg-white text-[#FF7A00] hover:bg-orange-50" size="lg" asChild>
            <Link href="/signup">Bắt đầu Dùng thử Miễn phí</Link>
          </Button>
        </Card>

        {/* Gói Trọn đời (Lifetime Plan) */}
        <Card className="p-8 bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Trọn đời</h3>
            <p className="text-foreground/60">Thanh toán một lần duy nhất</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-bold break-words">3.500.000đ</span>
            </div>
            <p className="text-sm text-foreground/60 mt-2">Thanh toán một lần, học trọn đời</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Mọi thứ trong gói Hàng năm</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Truy cập trọn đời mọi tính năng</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Bao gồm tất cả cập nhật tương lai</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Hỗ trợ ưu tiên mãi mãi</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">Truy cập sớm các tính năng mới</span>
            </li>
          </ul>
          <Button className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white" size="lg" asChild>
            <Link href="/signup">Nhận Quyền Truy Cập Trọn đời</Link>
          </Button>
        </Card>
      </div>
    </section>
  )
}