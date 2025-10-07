"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skills = [
  { name: "Nghe hiểu", level: 85, color: "bg-orange-500" },
  { name: "Phát âm", level: 78, color: "bg-blue-500" },
  { name: "Từ vựng", level: 92, color: "bg-green-500" },
  { name: "Ngữ pháp", level: 73, color: "bg-purple-500" },
  { name: "Giao tiếp", level: 81, color: "bg-pink-500" },
]

export function SkillBreakdownChart() {
  return (
    <Card className="p-4 border border-orange-200/70 bg-white shadow-sm rounded-xl">
      <h3 className="font-bold text-slate-800 mb-3 text-sm">Phân tích kỹ năng</h3>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-slate-700">{skill.name}</span>
              <span className="text-xs font-bold text-[#FF7A00]">{skill.level}%</span>
            </div>
            <Progress value={skill.level} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  )
}
