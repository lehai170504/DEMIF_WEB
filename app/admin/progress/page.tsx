"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  Clock,
  Mic,
  Headphones,
  LayoutGrid,
  Target,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProgressPage() {
  const stats = [
    {
      label: "Tổng học viên",
      value: 128,
      icon: BarChart3,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Trung bình AI",
      value: "86%",
      icon: Mic,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Luyện nghe TB",
      value: "42m",
      icon: Headphones,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      label: "Xong hôm nay",
      value: 37,
      icon: Clock,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  const studentProgress = [
    {
      name: "Nguyễn Văn A",
      total: 20,
      completed: 18,
      score: 91,
      lastActive: "10 phút trước",
    },
    {
      name: "Trần Thị B",
      total: 15,
      completed: 10,
      score: 78,
      lastActive: "2 giờ trước",
    },
    {
      name: "Lê Hoàng C",
      total: 12,
      completed: 9,
      score: 83,
      lastActive: "Hôm qua",
    },
    {
      name: "Phạm Quốc D",
      total: 8,
      completed: 5,
      score: 75,
      lastActive: "3 ngày trước",
    },
  ];

  return (
    <div className="w-full space-y-8 pb-10 font-mono">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Learning Analytics
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-slate-900 dark:text-white">
            Student{" "}
            <span className="text-slate-300 dark:text-slate-700">
              Milestones
            </span>
          </h1>
          <p className="text-muted-foreground text-xs font-medium italic">
            Phân tích chi tiết lộ trình và hiệu suất thực tế của học viên.
          </p>
        </div>
      </div>

      {/* --- QUICK STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {stats.map((item, idx) => (
          <Card
            key={idx}
            className="border-none shadow-sm rounded-[2rem] bg-white dark:bg-slate-900 transition-all hover:scale-[1.02]"
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
                {item.label}
              </CardTitle>
              <div className={cn("p-2 rounded-xl", item.bg, item.color)}>
                <item.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter italic">
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- DETAILED PROGRESS TABLE --- */}
      <div className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden bg-white dark:bg-slate-900 mx-2">
        <div className="p-8 border-b flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-black text-xl italic uppercase leading-none">
                Performance Tracker
              </h2>
              <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-1.5">
                Bảng theo dõi thời gian thực
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-slate-100">
                <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">
                  Học viên
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">
                  Hoàn thành
                </TableHead>
                <TableHead className="px-8 text-[10px] font-black uppercase tracking-widest">
                  Mức độ tiến độ
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">
                  Chỉ số AI
                </TableHead>
                <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-widest">
                  Chi tiết
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentProgress.map((student, index) => {
                const progress = Math.round(
                  (student.completed / student.total) * 100
                );
                return (
                  <TableRow
                    key={index}
                    className="group hover:bg-orange-50/30 transition-all border-b border-slate-50 last:border-none"
                  >
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 rounded-xl border-2 border-white shadow-sm">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                          />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {student.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            Active: {student.lastActive}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                        <span className="font-black text-xs text-slate-600">
                          {student.completed}
                        </span>
                        <span className="mx-1 text-[10px] text-slate-400">
                          /
                        </span>
                        <span className="font-bold text-[10px] text-slate-400">
                          {student.total}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="px-8 min-w-[250px]">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase italic tracking-tighter">
                          <span className="text-orange-500">
                            {progress}% Completed
                          </span>
                          <span className="text-slate-300">
                            {100 - progress}% Left
                          </span>
                        </div>
                        <Progress
                          value={progress}
                          className={cn(
                            "h-1.5 bg-slate-100 dark:bg-slate-800",
                            progress > 80
                              ? "[&>div]:bg-emerald-500"
                              : progress > 50
                              ? "[&>div]:bg-orange-500"
                              : "[&>div]:bg-rose-500"
                          )}
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-black italic shadow-sm",
                          student.score >= 85
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-orange-50 text-orange-600"
                        )}
                      >
                        <Zap
                          className={cn(
                            "h-3 w-3 fill-current",
                            student.score >= 85
                              ? "text-emerald-500"
                              : "text-orange-500"
                          )}
                        />
                        <span className="text-sm">{student.score}%</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right px-8">
                      <button className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all group/btn">
                        <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
