import { Card } from "@/components/ui/card"

export function StreakCalendar() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
  const days = ["Sun", "Tue", "Thu", "Sat"]

  // Mock data - green squares for active days
  const activityData = Array(52)
    .fill(0)
    .map(() =>
      Array(7)
        .fill(0)
        .map(() => Math.random() > 0.8),
    )

  return (
    <Card className="p-6 border-orange-200/50 bg-white">
      <h3 className="font-bold text-slate-800 mb-2">Hoạt động Streak</h3>
      <p className="text-sm text-slate-600 mb-4">2 ngày có hoạt động trong 9 tháng 10 ngày qua</p>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex gap-1 mb-2 ml-12">
            {months.map((month) => (
              <div key={month} className="text-xs text-slate-600 w-12">
                {month}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-2">
              {days.map((day) => (
                <div key={day} className="text-xs text-slate-600 h-3 flex items-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Activity squares */}
            <div className="flex gap-1">
              {activityData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((isActive, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm ${
                        isActive ? "bg-green-500" : "bg-gray-200"
                      } hover:ring-2 hover:ring-orange-300 cursor-pointer`}
                      title={isActive ? "Active day" : "No activity"}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-slate-600">
            <span>Ít hơn</span>
            <div className="w-3 h-3 rounded-sm bg-gray-200" />
            <div className="w-3 h-3 rounded-sm bg-green-200" />
            <div className="w-3 h-3 rounded-sm bg-green-400" />
            <div className="w-3 h-3 rounded-sm bg-green-500" />
            <div className="w-3 h-3 rounded-sm bg-green-600" />
            <span>Nhiều hơn</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
