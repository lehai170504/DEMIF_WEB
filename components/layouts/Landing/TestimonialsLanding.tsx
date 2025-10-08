// src/components/layouts/Landing/TestimonialsLanding.jsx

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function TestimonialsLanding() {
  return (
    <section id="testimonials" className="container mx-auto px-4 py-24 font-mono">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-orange-100 text-[#FF7A00] border-orange-200">Lời chứng thực</Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Được người học trên toàn thế giới yêu thích</h2>
        <p className="text-foreground/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Xem cộng đồng của chúng tôi nói gì về hành trình học tập của họ
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Testimonial 1 */}
        <Card className="p-8 bg-card border-2 border-border">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#FF7A00] text-[#FF7A00]" />
            ))}
          </div>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            "DEMIF đã thay đổi kỹ năng nghe tiếng Anh của tôi chỉ trong 3 tháng. Phản hồi của AI cực kỳ chính xác và hữu ích!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C]" />
            <div>
              <p className="font-semibold">Nguyễn Minh Tường</p>
              <p className="text-sm text-foreground/60">Sinh viên, Việt Nam</p>
            </div>
          </div>
        </Card>

        {/* Testimonial 2 */}
        <Card className="p-8 bg-card border-2 border-border">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#FF7A00] text-[#FF7A00]" />
            ))}
          </div>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            "Các bài tập shadowing giúp tôi cải thiện phát âm đáng kể. Bây giờ tôi cảm thấy tự tin hơn rất nhiều khi nói."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C]" />
            <div>
              <p className="font-semibold">Sarah Chen</p>
              <p className="text-sm text-foreground/60">Chuyên gia, Singapore</p>
            </div>
          </div>
        </Card>

        {/* Testimonial 3 */}
        <Card className="p-8 bg-card border-2 border-border">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#FF7A00] text-[#FF7A00]" />
            ))}
          </div>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            "Nền tảng học ngôn ngữ tốt nhất tôi từng sử dụng. Theo dõi tiến độ giúp tôi có động lực và bảng xếp hạng tạo thêm niềm vui cạnh tranh."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C]" />
            <div>
              <p className="font-semibold">David Kim</p>
              <p className="text-sm text-foreground/60">Giáo viên, Hàn Quốc</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}