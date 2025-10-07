"use client"

interface SkillRadarChartProps {
  data: {
    listening: number
    speaking: number
    vocabulary: number
    pronunciation: number
    fluency: number
  }
}

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  const skills = [
    { name: "Listening", value: data.listening, angle: 0 },
    { name: "Speaking", value: data.speaking, angle: 72 },
    { name: "Vocabulary", value: data.vocabulary, angle: 144 },
    { name: "Pronunciation", value: data.pronunciation, angle: 216 },
    { name: "Fluency", value: data.fluency, angle: 288 },
  ]

  const center = 150
  const maxRadius = 120
  const levels = 5

  const polarToCartesian = (angle: number, radius: number) => {
    const angleInRadians = ((angle - 90) * Math.PI) / 180
    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians),
    }
  }

  const getPolygonPoints = (percentage: number) => {
    return skills
      .map((skill) => {
        const radius = (maxRadius * percentage) / 100
        const point = polarToCartesian(skill.angle, radius)
        return `${point.x},${point.y}`
      })
      .join(" ")
  }

  const dataPoints = skills
    .map((skill) => {
      const radius = (maxRadius * skill.value) / 100
      const point = polarToCartesian(skill.angle, radius)
      return `${point.x},${point.y}`
    })
    .join(" ")

  return (
    <div className="w-full">
      <svg viewBox="0 0 300 300" className="w-full h-auto">
        {/* Background circles */}
        {[...Array(levels)].map((_, i) => {
          const radius = (maxRadius * (i + 1)) / levels
          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
            />
          )
        })}

        {/* Grid lines */}
        {skills.map((skill, i) => {
          const point = polarToCartesian(skill.angle, maxRadius)
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
            />
          )
        })}

        {/* Reference polygon (80%) */}
        <polygon
          points={getPolygonPoints(80)}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-muted-foreground opacity-30"
          strokeDasharray="4,4"
        />

        {/* Data polygon */}
        <polygon
          points={dataPoints}
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Data points */}
        {skills.map((skill, i) => {
          const radius = (maxRadius * skill.value) / 100
          const point = polarToCartesian(skill.angle, radius)
          return <circle key={i} cx={point.x} cy={point.y} r="4" fill="currentColor" className="text-primary" />
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const labelRadius = maxRadius + 30
          const point = polarToCartesian(skill.angle, labelRadius)
          return (
            <text
              key={i}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-foreground font-medium"
            >
              {skill.name}
            </text>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between p-2 rounded bg-secondary/50">
            <span className="text-sm text-muted-foreground">{skill.name}</span>
            <span className="text-sm font-semibold text-primary">{skill.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
