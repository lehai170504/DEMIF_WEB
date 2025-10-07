"use client"

import { Card } from "@/components/ui/card"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts"

const weeklyData = [
  { day: "T2", lessons: 3, accuracy: 75, minutes: 25 },
  { day: "T3", lessons: 5, accuracy: 82, minutes: 40 },
  { day: "T4", lessons: 2, accuracy: 68, minutes: 15 },
  { day: "T5", lessons: 4, accuracy: 88, minutes: 35 },
  { day: "T6", lessons: 6, accuracy: 91, minutes: 50 },
  { day: "T7", lessons: 3, accuracy: 85, minutes: 28 },
  { day: "CN", lessons: 4, accuracy: 89, minutes: 42 },
]

const monthlyProgress = [
  { month: "T1", completed: 45, accuracy: 78 },
  { month: "T2", completed: 52, accuracy: 81 },
  { month: "T3", completed: 48, accuracy: 79 },
  { month: "T4", completed: 65, accuracy: 85 },
  { month: "T5", completed: 72, accuracy: 88 },
  { month: "T6", completed: 68, accuracy: 86 },
]

export function LearningAnalyticsChart() {
  return (
    <div className="space-y-3">
      <Card className="p-4 border border-orange-200/70 bg-white shadow-sm rounded-xl">
        <h3 className="font-bold text-slate-800 mb-3 text-sm">Tiến độ học tập tuần này</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #FF7A00",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Bar dataKey="lessons" fill="#FF7A00" name="Bài học" radius={[4, 4, 0, 0]} />
            <Bar dataKey="minutes" fill="#FFA500" name="Phút học" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4 border border-orange-200/70 bg-white shadow-sm rounded-xl">
        <h3 className="font-bold text-slate-800 mb-3 text-sm">Độ chính xác theo thời gian</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #FF7A00",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#FF7A00"
              strokeWidth={2}
              name="Độ chính xác (%)"
              dot={{ fill: "#FF7A00", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#10b981"
              strokeWidth={2}
              name="Bài hoàn thành"
              dot={{ fill: "#10b981", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
