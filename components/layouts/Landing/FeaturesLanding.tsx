// src/components/layouts/Landing/FeaturesLanding.jsx

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Headphones, Mic, BarChart3, Trophy, BookOpen, Zap } from "lucide-react"

const features_vi = [
  {
    icon: Headphones,
    title: "Chính tả AI (AI Dictation)",
    description: "Nghe người bản xứ nói và gõ lại những gì bạn nghe được. Nhận phản hồi tức thì từ AI về độ chính xác và khả năng nghe hiểu với phân tích chi tiết.",
  },
  {
    icon: Mic,
    title: "Luyện tập Shadowing",
    description: "Ghi âm lại giọng nói của bạn khi bắt chước phát âm của người bản xứ. AI nâng cao sẽ phân tích bài nói của bạn về độ chính xác, trôi chảy và ngữ điệu.",
  },
  {
    icon: BarChart3,
    title: "Theo dõi tiến độ",
    description: "Trực quan hóa sự cải thiện của bạn bằng các phân tích chi tiết, biểu đồ radar và thông tin chuyên sâu trên tất cả các khía cạnh kỹ năng.",
  },
  {
    icon: BookOpen,
    title: "Ôn tập thông minh",
    description: "Hệ thống lặp lại ngắt quãng (Spaced Repetition) được hỗ trợ bởi AI đảm bảo bạn ghi nhớ từ vựng và cấu trúc lâu dài.",
  },
  {
    icon: Trophy,
    title: "Bảng xếp hạng",
    description: "Cạnh tranh với những người học trên toàn thế giới. Theo dõi thứ hạng của bạn, ăn mừng thành tựu và duy trì động lực.",
  },
  {
    icon: Zap,
    title: "Học tập thích ứng",
    description: "AI tự động điều chỉnh độ khó dựa trên hiệu suất của bạn, giữ bạn ở trong vùng học tập tối ưu.",
  },
];

export function FeaturesLanding() {
  return (
    <section id="features" className="container mx-auto px-4 py-24 font-mono">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">Tính năng</Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Mọi thứ bạn cần để vượt trội</h2>
        <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Các công cụ toàn diện được hỗ trợ bởi AI, thiết kế để giúp bạn làm chủ ngôn ngữ một cách hiệu quả
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
          )
        })}
      </div>
    </section>
  )
}