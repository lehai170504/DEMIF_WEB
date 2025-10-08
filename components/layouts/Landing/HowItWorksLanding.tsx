// src/components/layouts/Landing/HowItWorksLanding.jsx

import { Badge } from "@/components/ui/badge"

export function HowItWorksLanding() {
  return (
    <section id="how-it-works" className="container mx-auto px-4 py-24 font-mono">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">Cách hoạt động</Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Quy trình đơn giản, hiệu quả</h2>
        <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Bắt đầu cải thiện kỹ năng ngôn ngữ của bạn chỉ trong ba bước dễ dàng
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Bước 1 */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
            <span className="text-3xl font-bold text-white">1</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Chọn Bài tập</h3>
          <p className="text-foreground/70 leading-relaxed">
            Chọn từ các bài tập chính tả hoặc shadowing được điều chỉnh theo trình độ và mục tiêu học tập của bạn
          </p>
        </div>

        {/* Bước 2 */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
            <span className="text-3xl font-bold text-white">2</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Luyện tập & Ghi âm</h3>
          <p className="text-foreground/70 leading-relaxed">
            Nghe kỹ và phản hồi - gõ cho bài tập chính tả hoặc nói cho bài tập shadowing
          </p>
        </div>

        {/* Bước 3 */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
            <span className="text-3xl font-bold text-white">3</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Nhận Phản hồi AI</h3>
          <p className="text-foreground/70 leading-relaxed">
            Nhận phân tích AI chi tiết, tức thì với các mẹo cải thiện cá nhân hóa và theo dõi tiến độ
          </p>
        </div>
      </div>
    </section>
  )
}