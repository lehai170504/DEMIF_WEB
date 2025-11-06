// src/components/layouts/Landing/PricingLanding.jsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-24 font-mono">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">
          Bảng giá
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Chọn lộ trình học tập của bạn
        </h2>
        <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Các gói linh hoạt được thiết kế để phù hợp với hành trình học ngôn ngữ
          của bạn
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Gói Miễn phí (Freemium Plan) */}
        <Card className="p-8 bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Miễn phí (Freemium)</h3>
            <p className="text-foreground/60">Bắt đầu học ngay</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-[#FF7A00]">Free</span>
              <span className="text-foreground/60">/mãi mãi</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">
                Truy cập bài học chính tả giới hạn
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">
                Phản hồi AI cơ bản (chỉ độ chính xác)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">
                Chuỗi ngày học & thử thách hàng ngày
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">
                Truy cập cộng đồng & bảng xếp hạng
              </span>
            </li>
            <li className="flex items-start gap-3 opacity-50">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />
              <span className="text-foreground/70">
                Không có theo dõi tiến độ nâng cao
              </span>
            </li>
          </ul>
          <Button
            className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white"
            size="lg"
            asChild
          >
            <Link href="/signup">Tham gia Miễn phí</Link>
          </Button>
        </Card>

        {/* Gói Premium Hàng tháng (Premium Monthly) - NỔI BẬT */}
        <Card className="p-8 bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] border-2 border-[#FF7A00] relative shadow-2xl shadow-orange-500/30 scale-105">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#FF7A00] border-white">
            <Star className="w-3 h-3 mr-1" /> Được Đề Xuất
          </Badge>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2 text-white">
              Premium Hàng tháng
            </h3>
            <p className="text-white/80">Linh hoạt, hoàn hảo để dùng thử</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">39.000đ</span>
              <span className="text-white/80">/tháng</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8 text-white/90">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0" /> Phản hồi AI
              toàn diện (chính xác + phát âm + tốc độ)
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0" /> Chính tả &
              shadowing không giới hạn
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0" /> Bảng điều khiển
              theo dõi tiến độ
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0" /> Truy cập kịch
              bản chuyên nghiệp (Thuyết trình, Phỏng vấn, Họp)
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0" /> Lộ trình học AI
              cá nhân hóa
            </li>
          </ul>
          <Button
            className="w-full bg-white text-[#FF7A00] hover:bg-orange-50"
            size="lg"
            asChild
          >
            <Link href="/signup">Bắt đầu ngay</Link>
          </Button>
        </Card>

        {/* Gói Premium Hàng năm (Premium Annual) */}
        <Card className="p-8 bg-card border-2 border-border hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Premium Hàng năm</h3>
            <p className="text-foreground/60">Tiết kiệm nhiều nhất</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">299.000đ</span>
              <span className="text-foreground/60">/năm</span>
            </div>
            <p className="text-sm text-foreground/60 mt-2">
              Chỉ <strong>24.916đ</strong> / tháng
            </p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />{" "}
              Mọi tính năng của Premium Hàng tháng
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />{" "}
              Gói nội dung độc quyền (Business, Interview, Academic)
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />{" "}
              Báo cáo tiến độ chi tiết bằng AI
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />{" "}
              Hỗ trợ ưu tiên & cập nhật tương lai
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-0.5 flex-shrink-0" />{" "}
              Lộ trình học AI cá nhân hóa
            </li>
          </ul>
          <Button
            className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white"
            size="lg"
            asChild
          >
            <Link href="/signup">Chọn Gói Hàng Năm</Link>
          </Button>
        </Card>
      </div>
    </section>
  );
}
