import { Card } from "@/components/ui/card"
import { Target, FileText, CheckCircle, Headphones } from "lucide-react"

export function StatsRow() {
  const stats = [
    { icon: Target, label: "Ngày liên tiếp", value: "0", color: "text-red-500", bgColor: "bg-red-50" },
    { icon: FileText, label: "Từ đã nghe", value: "9", color: "text-blue-500", bgColor: "bg-blue-50" },
    { icon: CheckCircle, label: "Bài đã nộp", value: "1", color: "text-green-500", bgColor: "bg-green-50" },
    { icon: Headphones, label: "Bài đang nghe", value: "1", color: "text-orange-500", bgColor: "bg-orange-50" },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 border-orange-200/50 bg-white text-center">
          <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mx-auto mb-2`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
          <div className="text-xs text-slate-600">{stat.label}</div>
        </Card>
      ))}
    </div>
  )
}
