"use client"

interface WeeklyProgressChartProps {
  data: {
    day: string
    minutes: number
  }[]
}

export function WeeklyProgressChart({ data }: WeeklyProgressChartProps) {
  const maxMinutes = Math.max(...data.map((d) => d.minutes))
  const goal = 60 // Daily goal in minutes

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-48 mb-4">
        {data.map((item, index) => {
          const height = (item.minutes / maxMinutes) * 100
          const isAboveGoal = item.minutes >= goal
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex items-end justify-center" style={{ height: "100%" }}>
                <div className="absolute bottom-0 w-full flex flex-col items-center">
                  <span className="text-xs font-medium text-primary mb-1">{item.minutes}m</span>
                  <div
                    className={`w-full rounded-t transition-all ${isAboveGoal ? "bg-primary" : "bg-primary/50"}`}
                    style={{ height: `${height}%`, minHeight: "8px" }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-medium">{item.day}</span>
            </div>
          )
        })}
      </div>

      {/* Goal line indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-3 h-3 rounded-full bg-primary" />
        <span>Daily goal: {goal} minutes</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="p-3 rounded bg-secondary/50">
          <div className="text-2xl font-bold text-primary">{data.reduce((sum, d) => sum + d.minutes, 0)}</div>
          <div className="text-xs text-muted-foreground">Total Minutes</div>
        </div>
        <div className="p-3 rounded bg-secondary/50">
          <div className="text-2xl font-bold text-primary">
            {Math.round(data.reduce((sum, d) => sum + d.minutes, 0) / data.length)}
          </div>
          <div className="text-xs text-muted-foreground">Avg per Day</div>
        </div>
      </div>
    </div>
  )
}
