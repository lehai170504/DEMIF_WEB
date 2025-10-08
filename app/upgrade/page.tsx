import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap } from "lucide-react"
import Link from "next/link"

export default function UpgradePage() {
  return (
    <section id="upgrade" className="container mx-auto px-4 py-16 md:py-24 bg-gray-50/70 font-mono">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
          Sẵn sàng để tăng tốc quá trình học của bạn?
        </h1>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-normal">
          Nâng cấp lên **Pro** hoặc **Trọn đời** để mở khóa toàn bộ tiềm năng của AI và vượt xa giới hạn.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        
        <Card className="p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-300 shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-300/60">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Hàng tháng</h3>
            <p className="text-gray-500">Hoàn hảo để thử nghiệm</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-extrabold text-gray-900">$19</span>
              <span className="text-gray-500">/tháng</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Bài tập & Shadowing không giới hạn</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Phản hồi AI tiêu chuẩn (24h)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Truy cập ứng dụng di động</span>
            </li>
            <li className="flex items-start gap-3 opacity-60">
              <Zap className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <span className="text-gray-500 line-through">Xử lý AI ưu tiên</span>
            </li>
            <li className="flex items-start gap-3 opacity-60">
              <Zap className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <span className="text-gray-500 line-through">Thư viện độc quyền</span>
            </li>
          </ul>
          <Button 
            variant="outline"
            className="w-full border-gray-300 text-gray-700 font-semibold hover:bg-gray-100/80 transition-all duration-200" 
            size="lg" 
            asChild
          >
            <Link href="/signup">Chọn Gói Cơ bản</Link>
          </Button>
        </Card>

        <Card 
          className="p-8 bg-gradient-to-br from-[#E85B00] to-[#FF9E2C] 
                       border-4 border-white relative 
                       shadow-[0_20px_40px_-15px_rgba(255,122,0,0.5)] scale-100 md:scale-[1.05] 
                       rounded-3xl transition-all duration-500 hover:scale-[1.07] hover:shadow-[0_25px_50px_-15px_rgba(255,122,0,0.7)]"
        >
          <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#FF7A00] font-bold py-1 px-3 rounded-full shadow-lg">
            <Star className="w-3 h-3 mr-1 fill-[#FF7A00]" />
            PRO (Phổ biến nhất)
          </Badge>
          <div className="mb-6 mt-4">
            <h3 className="text-3xl font-extrabold mb-2 text-white">PRO Hàng năm</h3>
            <p className="text-white/80">Tiết kiệm 40% (Chỉ $132/năm)</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-extrabold text-white">$11</span>
              <span className="text-white/80">/tháng</span>
            </div>
            <p className="text-sm text-white/80 mt-2">Thanh toán hàng năm</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">Mọi thứ trong Cơ bản</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">Xử lý AI ưu tiên (Phản hồi tức thì)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">Bảng điều khiển phân tích nâng cao</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">Thư viện nội dung độc quyền</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
              <span className="text-white font-semibold">Hỗ trợ ưu tiên</span>
            </li>
          </ul>
          <Button 
            className="w-full bg-white text-[#FF7A00] hover:bg-orange-50 font-bold shadow-lg shadow-white/30" 
            size="lg" 
            asChild
          >
            <Link href="/checkout-yearly">
                Nâng cấp lên PRO <Zap className="w-4 h-4 ml-2 fill-[#FF7A00]" />
            </Link>
          </Button>
        </Card>

        <Card className="p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-300 shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-300/60">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Trọn đời</h3>
            <p className="text-gray-500">Đầu tư một lần duy nhất</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-extrabold text-gray-900">$299</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Thanh toán một lần</p>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">Mọi thứ trong PRO</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">Truy cập trọn đời mọi tính năng</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">Bao gồm tất cả cập nhật tương lai</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">Hỗ trợ ưu tiên mãi mãi</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#FF7A00] mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">Truy cập sớm các tính năng Beta</span>
            </li>
          </ul>
          <Button 
            className="w-full bg-[#FF7A00] hover:bg-[#FF9E2C] text-white font-bold transition-all duration-200" 
            size="lg" 
            asChild
          >
            <Link href="/checkout-lifetime">
                Nhận Trọn đời <Star className="w-4 h-4 ml-2 fill-white" />
            </Link>
          </Button>
        </Card>
      </div>

      <div className="mt-16 text-center text-gray-500">
        Bạn có câu hỏi? <Link href="/faq" className="text-[#FF7A00] font-medium hover:underline">Xem Câu hỏi thường gặp</Link> hoặc liên hệ hỗ trợ.
      </div>
      
    </section>
  )
}
