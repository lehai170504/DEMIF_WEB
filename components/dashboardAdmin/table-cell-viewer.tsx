// components/dashboardAdmin/table-cell-viewer.tsx

"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { IconTrendingUp } from "@tabler/icons-react"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { schema } from "./table-columns" // Import schema đã sửa

// Dữ liệu biểu đồ giả lập cho Drawer
const detailChartData = [
  { month: "Jan", attempts: 186, accuracy: 80 },
  { month: "Feb", attempts: 305, accuracy: 85 },
  { month: "Mar", attempts: 237, accuracy: 90 },
  { month: "Apr", attempts: 73, accuracy: 78 },
  { month: "May", attempts: 209, accuracy: 88 },
  { month: "Jun", attempts: 214, accuracy: 92 },
]

const detailChartConfig = {
  attempts: {
    label: "Lượt Thử",
    color: "hsl(var(--primary))",
  },
  accuracy: {
    label: "Độ Chính Xác",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

export default function TableCellViewer({
  item,
}: {
  item: z.infer<typeof schema>
}) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.title}</DrawerTitle>
          <DrawerDescription>
            Xem chi tiết hiệu suất của bài tập
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={detailChartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={detailChartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="accuracy"
                    type="natural"
                    fill="var(--color-accuracy)"
                    fillOpacity={0.6}
                    stroke="var(--color-accuracy)"
                    stackId="a"
                  />
                  <Area
                    dataKey="attempts"
                    type="natural"
                    fill="var(--color-attempts)"
                    fillOpacity={0.4}
                    stroke="var(--color-attempts)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Tỷ lệ chính xác tăng 5.2% tháng này{" "}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Phân tích tổng số lượt thử và độ chính xác trung bình trong 6 tháng qua.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Tiêu đề Bài tập</Label>
              <Input id="title" defaultValue={item.title} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Loại Bài Tập</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Chọn loại bài tập" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dictation">Dictation</SelectItem>
                    <SelectItem value="Shadowing">Shadowing</SelectItem>
                    <SelectItem value="Test">Kiểm tra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Trạng thái</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Đã Xuất bản</SelectItem>
                    <SelectItem value="Draft">Bản nháp</SelectItem>
                    <SelectItem value="Review">Cần Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="min_accuracy">Độ chính xác Y/C</Label>
                <Input id="min_accuracy" defaultValue={item.min_accuracy} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="max_attempts">Số lần thử TĐ</Label>
                <Input id="max_attempts" defaultValue={item.max_attempts} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Người/AI Review</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Chọn người review" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI Voice Check">AI Voice Check</SelectItem>
                  <SelectItem value="Admin A">Admin A</SelectItem>
                  <SelectItem value="Admin B">Admin B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Lưu Thay Đổi</Button>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}