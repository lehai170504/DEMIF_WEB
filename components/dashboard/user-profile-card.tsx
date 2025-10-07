import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Heart } from "lucide-react"

export function UserProfileCard() {
  return (
    <Card className="p-6 border-orange-200/50 bg-white">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 relative">
          <span className="text-3xl font-bold text-white">Hu</span>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-xs">🎥</span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Huỳnh Hữu Toàn</h2>
        <p className="text-sm text-slate-600 mb-3">(huynhtoan135)</p>
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span>TP. Hồ Chí Minh</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
          <Calendar className="h-4 w-4" />
          <span>Tham gia từ 21/10/2024, hoạt động 4 ngày trước</span>
        </div>
        <Button variant="outline" className="w-full border-orange-200 hover:bg-orange-50 text-slate-700 bg-transparent">
          <Heart className="h-4 w-4 mr-2" />
          Thích tiên
        </Button>
      </div>
    </Card>
  )
}
