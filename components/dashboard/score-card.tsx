import { Card } from "@/components/ui/card"
import { Share2 } from "lucide-react"

export function ScoreCard() {
  return (
    <Card className="p-6 border-orange-200/50 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">DEMIF SCORES</h3>
        <Share2 className="h-4 w-4 text-slate-600 cursor-pointer" />
      </div>
      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-red-500 mb-2">0,06</div>
        <p className="text-sm text-slate-600">
          Xếp hạng <span className="text-red-500 font-semibold">29.113</span> trên tổng số 32.578 học viên của DEMIF
        </p>
      </div>
    </Card>
  )
}
