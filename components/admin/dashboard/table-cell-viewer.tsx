"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IconTrendingUp } from "@tabler/icons-react";
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { schema } from "./table-columns";

// Mock Data
const detailChartData = [
  { month: "Jan", attempts: 186, accuracy: 80 },
  { month: "Feb", attempts: 305, accuracy: 85 },
  { month: "Mar", attempts: 237, accuracy: 90 },
  { month: "Apr", attempts: 73, accuracy: 78 },
  { month: "May", attempts: 209, accuracy: 88 },
  { month: "Jun", attempts: 214, accuracy: 92 },
];

export default function TableCellViewer({
  item,
}: {
  item: z.infer<typeof schema>;
}) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-zinc-200 hover:text-orange-500 w-fit px-0 text-left font-bold transition-colors"
        >
          {item.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#18181b] border-l border-white/10 text-zinc-100 h-full max-w-md ml-auto rounded-none sm:rounded-l-[2rem] outline-none">
        <DrawerHeader className="gap-1 border-b border-white/5 pb-4 mb-4">
          <DrawerTitle className="text-xl font-black text-white tracking-tight">
            {item.title}
          </DrawerTitle>
          <DrawerDescription className="text-zinc-500 font-medium">
            Xem chi tiết hiệu suất và cấu hình bài tập.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-6 overflow-y-auto px-4 text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {!isMobile && (
            <div className="space-y-4">
              <div className="h-[200px] w-full rounded-xl bg-black/20 border border-white/5 p-4 relative overflow-hidden">
                {/* Chart Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={detailChartData}
                    margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorAccuracyDetail"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      vertical={false}
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <Tooltip
                      cursor={{ stroke: "rgba(255,255,255,0.1)" }}
                      contentStyle={{
                        backgroundColor: "#09090b",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAccuracyDetail)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid gap-2 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                <div className="flex gap-2 leading-none font-bold text-emerald-400 items-center">
                  <IconTrendingUp className="size-4" />
                  Tỷ lệ chính xác tăng 5.2%
                </div>
                <div className="text-xs text-zinc-500 font-medium">
                  So với trung bình 6 tháng qua.
                </div>
              </div>
            </div>
          )}

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="title"
                className="text-xs font-bold uppercase tracking-wider text-zinc-500"
              >
                Tiêu đề
              </Label>
              <Input
                id="title"
                defaultValue={item.title}
                className="bg-black/20 border-white/10 focus-visible:border-orange-500/50 text-white h-10 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="type"
                  className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                >
                  Loại
                </Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white h-10 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#18181b] border-white/10 text-white">
                    <SelectItem value="Dictation">Dictation</SelectItem>
                    <SelectItem value="Shadowing">Shadowing</SelectItem>
                    <SelectItem value="Test">Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="status"
                  className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                >
                  Trạng thái
                </Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white h-10 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#18181b] border-white/10 text-white">
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Min Accuracy
                </Label>
                <Input
                  defaultValue={item.min_accuracy}
                  className="bg-black/20 border-white/10 text-white h-10 rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Max Attempts
                </Label>
                <Input
                  defaultValue={item.max_attempts}
                  className="bg-black/20 border-white/10 text-white h-10 rounded-xl"
                />
              </div>
            </div>
          </form>
        </div>

        <DrawerFooter className="border-t border-white/5 mt-auto pt-4">
          <Button className="w-full h-11 bg-white text-black hover:bg-zinc-200 font-bold rounded-xl">
            Lưu Thay Đổi
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="w-full h-11 border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl"
            >
              Đóng
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
