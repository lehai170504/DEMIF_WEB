import { Card } from "@/components/ui/card"
import { Clock, Target } from "lucide-react"

export function TimeAccuracyCards() {
  return (
    <div className="grid grid-cols-1 gap-4 font-mono">
      {/* Time Card */}
      <Card className="p-6 border-none bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Clock className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Thời gian nghe
          </span>
        </div>
        <div className="text-4xl font-black italic tracking-tighter text-slate-900 leading-none">
          00:02:29
        </div>
      </Card>

      {/* Accuracy Card */}
      <Card className="p-6 border-none bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-50 rounded-xl text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <Target className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Độ chính xác
          </span>
        </div>
        <div className="flex items-baseline gap-2 text-slate-900 leading-none">
          <span className="text-4xl font-black italic tracking-tighter">60</span>
          <span className="text-xl font-black italic text-purple-500">%</span>
        </div>
        {/* Progress bar nhỏ phía dưới tạo điểm nhấn */}
        <div className="w-full h-1 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-purple-500 w-[60%] rounded-full" />
        </div>
      </Card>
    </div>
  )
}