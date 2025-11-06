import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding";

export default function UpgradePage() {
  return (
    <section
      id="upgrade"
      className="container mx-auto px-4 py-16 md:py-24 bg-gray-50/70 font-mono"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
          Chọn lộ trình học tập của bạn
        </h1>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-normal">
          Các gói linh hoạt được thiết kế để phù hợp với hành trình học ngôn ngữ
          của bạn
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        {/* Gói 1: Miễn phí (Freemium Plan) */}
        <Card className="p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-300 shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-300/60">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              Miễn phí (Freemium)
            </h3>
            <p className="text-gray-500">Bắt đầu học ngay</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#FF7A00]">
                Free
              </span>
            </div>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                Truy cập bài học chính tả giới hạn
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                Phản hồi AI cơ bản (chỉ độ chính xác)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                Chuỗi ngày học & thử thách hàng ngày
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                Truy cập cộng đồng & bảng xếp hạng
              </span>
            </li>
            <li className="flex items-start gap-3 opacity-60">
              <Zap className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <span className="text-gray-500 line-through">
                Lộ trình học AI cá nhân hóa
              </span>
            </li>
          </ul>
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 font-semibold hover:bg-gray-100/80 transition-all duration-200"
            size="lg"
            asChild
          >
            <Link href="/signup">Bắt đầu Miễn phí</Link>
          </Button>
        </Card>

        {/* Gói 2: Premium Hàng tháng (NỔI BẬT) */}
        <Card
          className="p-8 bg-gradient-to-br from-[#E85B00] to-[#FF9E2C] border-4 border-white
                     relative shadow-[0_20px_40px_-15px_rgba(255,122,0,0.5)] scale-100 md:scale-[1.05]
                     rounded-3xl transition-all duration-500 hover:scale-[1.07] hover:shadow-[0_25px_50px_-15px_rgba(255,122,0,0.7)]"
        >
          <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#FF7A00] font-bold py-1 px-3 rounded-full shadow-lg">
            <Star className="w-3 h-3 mr-1 fill-[#FF7A00]" />
            Được Đề Xuất
          </Badge>
          <div className="mb-6 mt-4">
            <h3 className="text-3xl font-extrabold mb-2 text-white">
              Premium Hàng tháng
            </h3>
            <p className="text-white/80">Linh hoạt, hoàn hảo để dùng thử</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-white">
                39.000đ
              </span>
              <span className="text-white/80">/tháng</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">
                Phản hồi AI toàn diện (chính xác + phát âm + tốc độ)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">
                Chính tả & shadowing không giới hạn
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">
                Bảng điều khiển theo dõi tiến độ
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">
                Truy cập kịch bản chuyên nghiệp (Thuyết trình, Phỏng vấn, Họp)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">
                Lộ trình học AI cá nhân hóa
              </span>
            </li>
          </ul>
          <Button
            className="w-full bg-white text-[#FF7A00] hover:bg-orange-50 font-bold shadow-lg shadow-white/30"
            size="lg"
            asChild
          >
            <Link href="/checkout-monthly">
              Bắt đầu ngay <Zap className="w-4 h-4 ml-2 fill-[#FF7A00]" />
            </Link>
          </Button>
        </Card>

        {/* Gói 3: Premium Hàng năm */}
        <Card className="p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-300 shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-300/60">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              Premium Hàng năm
            </h3>
            <p className="text-gray-500">Tiết kiệm nhiều nhất</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-gray-900 break-words">
                299.000đ
              </span>
              <span className="text-gray-500">/năm</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Chỉ <strong>24.916đ</strong> / tháng
            </p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">
                Mọi tính năng của Premium Hàng tháng
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">
                Gói nội dung độc quyền (Business, Interview, Academic)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">
                Báo cáo tiến độ chi tiết bằng AI
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">
                Hỗ trợ ưu tiên & cập nhật tương lai
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">
                Lộ trình học AI cá nhân hóa
              </span>
            </li>
          </ul>
          <Button
            className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-bold transition-all duration-200"
            size="lg"
            asChild
          >
            <Link href="/checkout-yearly">
              Chọn Gói Hàng Năm <Star className="w-4 h-4 ml-2 fill-white" />
            </Link>
          </Button>
        </Card>
      </div>

      <div className="mt-16 text-center text-gray-500">
        Bạn có câu hỏi?{" "}
        <Link
          href="/faq"
          className="text-[#FF7A00] font-medium hover:underline"
        >
          Xem Câu hỏi thường gặp
        </Link>{" "}
        hoặc liên hệ hỗ trợ.
      </div>

      <FooterLanding />
    </section>
  );
}
