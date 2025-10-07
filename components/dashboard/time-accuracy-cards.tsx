import { Card } from "@/components/ui/card"
import { Clock, Target } from "lucide-react"

export function TimeAccuracyCards() {
  return (
    <div className="space-y-4">
      <Card className="p-6 border-orange-200/50 bg-white text-center">
        <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
        <div className="text-3xl font-bold text-blue-500 mb-1">00:02:29</div>
        <div className="text-sm text-slate-600">Thời gian nghe</div>
      </Card>

      <Card className="p-6 border-orange-200/50 bg-white text-center">
        <Target className="h-8 w-8 text-purple-500 mx-auto mb-3" />
        <div className="text-3xl font-bold text-purple-500 mb-1">60%</div>
        <div className="text-sm text-slate-600">Độ chính xác</div>
      </Card>
    </div>
  )
}
