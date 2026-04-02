"use client";

interface SkillRadarChartProps {
  data: {
    listening: number;
    speaking: number;
    vocabulary: number;
    pronunciation: number;
    fluency: number;
  };
}

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  const skills = [
    { name: "Listening", value: data.listening, angle: 0 },
    { name: "Speaking", value: data.speaking, angle: 72 },
    { name: "Vocabulary", value: data.vocabulary, angle: 144 },
    { name: "Pronunciation", value: data.pronunciation, angle: 216 },
    { name: "Fluency", value: data.fluency, angle: 288 },
  ];

  const center = 150;
  const maxRadius = 100;
  const levels = 4;

  const polarToCartesian = (angle: number, radius: number) => {
    const angleInRadians = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleInRadians),
      y: center + radius * Math.sin(angleInRadians),
    };
  };

  const getPolygonPoints = (percentage: number) => {
    return skills
      .map((skill) => {
        const radius = (maxRadius * percentage) / 100;
        const point = polarToCartesian(skill.angle, radius);
        return `${point.x},${point.y}`;
      })
      .join(" ");
  };

  const dataPoints = skills
    .map((skill) => {
      const radius = (maxRadius * skill.value) / 100;
      const point = polarToCartesian(skill.angle, radius);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return (
    <div className="w-full relative">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-auto drop-shadow-[0_0_15px_rgba(249,115,22,0.2)]"
      >
        {/* Background Circles (Levels) */}
        {[...Array(levels)].map((_, i) => {
          const radius = (maxRadius * (i + 1)) / levels;
          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#27272a" // zinc-800
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Radar Lines */}
        {skills.map((skill, i) => {
          const point = polarToCartesian(skill.angle, maxRadius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#27272a"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Area - Neon Glow */}
        <polygon
          points={dataPoints}
          fill="rgba(249, 115, 22, 0.2)" // Orange-500
          stroke="#f97316"
          strokeWidth="2"
          className="filter drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]"
        />

        {/* Data Points */}
        {skills.map((skill, i) => {
          const radius = (maxRadius * skill.value) / 100;
          const point = polarToCartesian(skill.angle, radius);
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#000"
              stroke="#f97316"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const labelRadius = maxRadius + 25;
          const point = polarToCartesian(skill.angle, labelRadius);
          return (
            <text
              key={i}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-zinc-400 font-bold uppercase tracking-wider"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
