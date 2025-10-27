"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts" // Thêm YAxis
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const chartData = [
  { date: "2024-04-01", dictation: 150, shadowing: 222 },
  { date: "2024-04-02", dictation: 180, shadowing: 97 },
  { date: "2024-04-03", dictation: 120, shadowing: 167 },
  { date: "2024-04-04", dictation: 260, shadowing: 242 },
  { date: "2024-04-05", dictation: 290, shadowing: 373 },
  { date: "2024-04-06", dictation: 340, shadowing: 301 },
  { date: "2024-04-07", dictation: 180, shadowing: 245 },
  { date: "2024-04-08", dictation: 320, shadowing: 409 },
  { date: "2024-04-09", dictation: 110, shadowing: 59 },
  { date: "2024-04-10", dictation: 190, shadowing: 261 },
  { date: "2024-04-11", dictation: 350, shadowing: 327 },
  { date: "2024-04-12", dictation: 210, shadowing: 292 },
  { date: "2024-04-13", dictation: 380, shadowing: 342 },
  { date: "2024-04-14", dictation: 220, shadowing: 137 },
  { date: "2024-04-15", dictation: 170, shadowing: 120 },
  { date: "2024-04-16", dictation: 190, shadowing: 138 },
  { date: "2024-04-17", dictation: 360, shadowing: 446 },
  { date: "2024-04-18", dictation: 410, shadowing: 364 },
  { date: "2024-04-19", dictation: 180, shadowing: 243 },
  { date: "2024-04-20", dictation: 150, shadowing: 89 },
  { date: "2024-04-21", dictation: 200, shadowing: 137 },
  { date: "2024-04-22", dictation: 170, shadowing: 224 },
  { date: "2024-04-23", dictation: 230, shadowing: 138 },
  { date: "2024-04-24", dictation: 290, shadowing: 387 },
  { date: "2024-04-25", dictation: 250, shadowing: 215 },
  { date: "2024-04-26", dictation: 130, shadowing: 75 },
  { date: "2024-04-27", dictation: 420, shadowing: 383 },
  { date: "2024-04-28", dictation: 180, shadowing: 122 },
  { date: "2024-04-29", dictation: 240, shadowing: 315 },
  { date: "2024-04-30", dictation: 380, shadowing: 454 },
  { date: "2024-05-01", dictation: 220, shadowing: 165 },
  { date: "2024-05-02", dictation: 310, shadowing: 293 },
  { date: "2024-05-03", dictation: 190, shadowing: 247 },
  { date: "2024-05-04", dictation: 420, shadowing: 385 },
  { date: "2024-05-05", dictation: 390, shadowing: 481 },
  { date: "2024-05-06", dictation: 520, shadowing: 498 },
  { date: "2024-05-07", dictation: 300, shadowing: 388 },
  { date: "2024-05-08", dictation: 210, shadowing: 149 },
  { date: "2024-05-09", dictation: 180, shadowing: 227 },
  { date: "2024-05-10", dictation: 330, shadowing: 293 },
  { date: "2024-05-11", dictation: 270, shadowing: 335 },
  { date: "2024-05-12", dictation: 240, shadowing: 197 },
  { date: "2024-05-13", dictation: 160, shadowing: 197 },
  { date: "2024-05-14", dictation: 490, shadowing: 448 },
  { date: "2024-05-15", dictation: 380, shadowing: 473 },
  { date: "2024-05-16", dictation: 400, shadowing: 338 },
  { date: "2024-05-17", dictation: 420, shadowing: 499 },
  { date: "2024-05-18", dictation: 350, shadowing: 315 },
  { date: "2024-05-19", dictation: 180, shadowing: 235 },
  { date: "2024-05-20", dictation: 230, shadowing: 177 },
  { date: "2024-05-21", dictation: 140, shadowing: 82 },
  { date: "2024-05-22", dictation: 120, shadowing: 81 },
  { date: "2024-05-23", dictation: 290, shadowing: 252 },
  { date: "2024-05-24", dictation: 220, shadowing: 294 },
  { date: "2024-05-25", dictation: 250, shadowing: 201 },
  { date: "2024-05-26", dictation: 170, shadowing: 213 },
  { date: "2024-05-27", dictation: 460, shadowing: 420 },
  { date: "2024-05-28", dictation: 190, shadowing: 233 },
  { date: "2024-05-29", dictation: 130, shadowing: 78 },
  { date: "2024-05-30", dictation: 280, shadowing: 340 },
  { date: "2024-05-31", dictation: 230, shadowing: 178 },
  { date: "2024-06-01", dictation: 200, shadowing: 178 },
  { date: "2024-06-02", dictation: 410, shadowing: 470 },
  { date: "2024-06-03", dictation: 160, shadowing: 103 },
  { date: "2024-06-04", dictation: 380, shadowing: 439 },
  { date: "2024-06-05", dictation: 140, shadowing: 88 },
  { date: "2024-06-06", dictation: 250, shadowing: 294 },
  { date: "2024-06-07", dictation: 370, shadowing: 323 },
  { date: "2024-06-08", dictation: 320, shadowing: 385 },
  { date: "2024-06-09", dictation: 480, shadowing: 438 },
  { date: "2024-06-10", dictation: 200, shadowing: 155 },
  { date: "2024-06-11", dictation: 150, shadowing: 92 },
  { date: "2024-06-12", dictation: 420, shadowing: 492 },
  { date: "2024-06-13", dictation: 130, shadowing: 81 },
  { date: "2024-06-14", dictation: 380, shadowing: 426 },
  { date: "2024-06-15", dictation: 350, shadowing: 307 },
  { date: "2024-06-16", dictation: 310, shadowing: 371 },
  { date: "2024-06-17", dictation: 520, shadowing: 475 },
  { date: "2024-06-18", dictation: 170, shadowing: 107 },
  { date: "2024-06-19", dictation: 290, shadowing: 341 },
  { date: "2024-06-20", dictation: 450, shadowing: 408 },
  { date: "2024-06-21", dictation: 210, shadowing: 169 },
  { date: "2024-06-22", dictation: 270, shadowing: 317 },
  { date: "2024-06-23", dictation: 530, shadowing: 480 },
  { date: "2024-06-24", dictation: 180, shadowing: 132 },
  { date: "2024-06-25", dictation: 190, shadowing: 141 },
  { date: "2024-06-26", dictation: 380, shadowing: 434 },
  { date: "2024-06-27", dictation: 490, shadowing: 448 },
  { date: "2024-06-28", dictation: 200, shadowing: 149 },
  { date: "2024-06-29", dictation: 160, shadowing: 103 },
  { date: "2024-06-30", dictation: 400, shadowing: 446 },
]

const chartConfig = {
  completions: {
    label: "Lượt Hoàn thành",
  },
  dictation: {
    label: "Dictation",
    color: "hsl(var(--primary))",
  },
  shadowing: {
    label: "Shadowing",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

export default function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Tổng Quan Luyện Tập</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Thống kê lượt hoàn thành Dictation & Shadowing
          </span>
          <span className="@[540px]/card:hidden">Lượt Hoàn Thành</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 tháng qua</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 ngày qua</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 ngày qua</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="3 tháng qua" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 tháng qua
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30 ngày qua
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 ngày qua
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDictation" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-dictation)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-dictation)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillShadowing" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-shadowing)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-shadowing)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="shadowing"
              type="natural"
              fill="url(#fillShadowing)"
              stroke="var(--color-shadowing)"
              stackId="a"
            />
            <Area
              dataKey="dictation"
              type="natural"
              fill="url(#fillDictation)"
              stroke="var(--color-dictation)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}