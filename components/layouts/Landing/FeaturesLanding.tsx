// src/components/layouts/Landing/FeaturesLanding.jsx

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Headphones,
  Mic,
  BarChart3,
  Trophy,
  BookOpen,
  Zap,
} from "lucide-react";

const features_vi = [
  {
    icon: Headphones,
    title: "Chính tả AI (AI Dictation)",
    description:
      "Nghe giọng nói của người bản xứ và gõ lại những gì bạn nghe được. AI sẽ đánh giá độ chính xác, nhận diện lỗi và chỉ ra điểm cần cải thiện trong kỹ năng nghe hiểu.",
  },
  {
    icon: Mic,
    title: "Luyện tập Shadowing",
    description:
      "Ghi âm giọng nói khi bạn bắt chước người bản xứ. AI phân tích phát âm, ngữ điệu và độ trôi chảy để giúp bạn luyện nói tự nhiên hơn qua từng bài tập.",
  },
  {
    icon: BarChart3,
    title: "Theo dõi tiến độ",
    description:
      "Quan sát sự tiến bộ của bạn qua biểu đồ radar và thống kê chi tiết. Nắm rõ điểm mạnh, điểm yếu để tối ưu quá trình học tập.",
  },
  {
    icon: BookOpen,
    title: "Ôn tập thông minh",
    description:
      "Áp dụng kỹ thuật lặp lại ngắt quãng (Spaced Repetition) được AI cá nhân hóa cho bạn. Ghi nhớ từ vựng và cấu trúc ngữ pháp lâu dài, không học vẹt.",
  },
  {
    icon: Trophy,
    title: "Thành tích & Xếp hạng",
    description:
      "Cạnh tranh cùng cộng đồng học viên toàn cầu. Nhận huy hiệu, đạt thành tựu và duy trì động lực với bảng xếp hạng theo thời gian thực.",
  },
  {
    icon: Zap,
    title: "Học tập thích ứng (Adaptive Learning)",
    description:
      "AI tự động điều chỉnh độ khó và nội dung phù hợp với năng lực hiện tại của bạn, đảm bảo luôn học trong vùng phát triển tối ưu.",
  },
];

export function FeaturesLanding() {
  return (
    <section id="features" className="container mx-auto px-4 py-24 font-mono">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">
          Tính năng nổi bật
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Mọi công cụ bạn cần để bứt phá
        </h2>
        <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Bộ công cụ toàn diện được hỗ trợ bởi AI — giúp bạn học hiệu quả hơn,
          phát âm chuẩn hơn và tự tin giao tiếp như người bản xứ.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features_vi.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card
              key={index}
              className="p-8 bg-card border-2 border-border hover:border-[#FF7A00] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                <IconComponent className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
