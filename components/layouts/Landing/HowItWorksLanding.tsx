// src/components/layouts/Landing/HowItWorksLanding.jsx

import { Badge } from "@/components/ui/badge";

export function HowItWorksLanding() {
  return (
    <section
      id="how-it-works"
      className="container mx-auto px-4 py-24 font-mono"
    >
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">
          Cách hoạt động
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Học dễ dàng chỉ với 3 bước
        </h2>
        <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Trải nghiệm hành trình học ngôn ngữ được dẫn dắt bởi AI — đơn giản,
          trực quan và hiệu quả vượt trội.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Bước 1 */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
            <span className="text-3xl font-bold text-white">1</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Chọn bài luyện phù hợp</h3>
          <p className="text-foreground/70 leading-relaxed">
            Chọn giữa bài chính tả (Dictation) hoặc shadowing, được cá nhân hóa
            theo trình độ và mục tiêu học của bạn.
          </p>
        </div>

        {/* Bước 2 */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
            <span className="text-3xl font-bold text-white">2</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Thực hành và ghi âm</h3>
          <p className="text-foreground/70 leading-relaxed">
            Nghe, gõ hoặc nói lại theo người bản xứ. Mỗi bài luyện là một cơ hội
            để cải thiện phát âm và phản xạ tự nhiên.
          </p>
        </div>

        {/* Bước 3 */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
            <span className="text-3xl font-bold text-white">3</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Nhận phản hồi từ AI</h3>
          <p className="text-foreground/70 leading-relaxed">
            Nhận đánh giá chi tiết và mẹo cải thiện tức thì từ AI. Theo dõi tiến
            trình và thấy rõ sự tiến bộ của bạn sau từng buổi học.
          </p>
        </div>
      </div>
    </section>
  );
}
