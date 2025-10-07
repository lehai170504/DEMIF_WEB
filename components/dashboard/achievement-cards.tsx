import { Card } from "@/components/ui/card"
import { Trophy, Flame, Zap } from "lucide-react"

export function AchievementCards() {
  const achievements = [
    {
      icon: Trophy,
      title: "Nhập môn",
      subtitle: "Bài nộp đầu tiên",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: Flame,
      title: "Liên tục ghi điểm",
      subtitle: "10 bài nộp",
      color: "text-gray-500",
      bgColor: "bg-gray-50",
    },
    {
      icon: Zap,
      title: "Không thể ngăn cản",
      subtitle: "20 bài nộp",
      color: "text-gray-400",
      bgColor: "bg-gray-50",
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Danh hiệu (1 / 20)</h3>
        <a href="#" className="text-sm text-red-500 hover:underline">
          Xem tất cả
        </a>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <Card key={index} className="p-4 border-orange-200/50 bg-white text-center hover:shadow-md transition-shadow">
            <div
              className={`w-12 h-12 rounded-full ${achievement.bgColor} flex items-center justify-center mx-auto mb-3`}
            >
              <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
            </div>
            <h4 className="font-semibold text-sm text-slate-800 mb-1">{achievement.title}</h4>
            <p className="text-xs text-slate-600">{achievement.subtitle}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
