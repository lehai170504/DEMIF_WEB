"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Target } from "lucide-react";
import { ProgressRow } from "./progress-row";

// Dữ liệu mẫu (Có thể thay thế bằng API thực tế sau này)
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

export function PerformanceTracker() {
  return (
    <div className="rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden bg-black/40 backdrop-blur-2xl mx-2">
      {/* Header của bảng */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-orange-500/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FF7A00]/10 rounded-2xl text-[#FF7A00] border border-[#FF7A00]/20 shadow-[0_0_15px_rgba(255,122,0,0.1)]">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-black text-xl italic uppercase leading-none text-white tracking-tight">
              Theo dõi hiệu suất
            </h2>
            <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mt-2">
              Bảng dữ liệu thời gian thực
            </p>
          </div>
        </div>
      </div>

      {/* Container bảng với scrollbar ẩn */}
      <div className="overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Học viên
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Bài tập
              </TableHead>
              <TableHead className="px-8 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Tiến độ lộ trình
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Chỉ số AI
              </TableHead>
              <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentProgress.map((student, index) => (
              <ProgressRow key={index} student={student} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer bổ sung để bảng bớt trống nếu dữ liệu ít */}
      <div className="p-4 border-t border-white/5 text-center">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em]">
          End of Student List • Demif AI System
        </p>
      </div>
    </div>
  );
}
