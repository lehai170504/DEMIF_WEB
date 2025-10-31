import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function NewsletterCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 border-0 shadow-xl text-white">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Đăng ký nhận tin</h3>
        <p className="text-sm text-white/90">
          Nhận các mẹo học tập và bài viết mới nhất qua email
        </p>
      </div>
      <Input
        type="email"
        placeholder="Email của bạn"
        className="mb-3 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
      />
      <Button className="w-full bg-white text-orange-600 hover:bg-gray-50 font-semibold shadow-lg">
        Đăng ký ngay
      </Button>
    </Card>
  )
}
