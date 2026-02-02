"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare } from "lucide-react";
import { FeedbackRow } from "./feedback-row";

interface CommunicationLogProps {
  data: any[];
  onViewDetail: (fb: any) => void;
}

export function CommunicationLog({
  data,
  onViewDetail,
}: CommunicationLogProps) {
  return (
    <div className="rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden bg-black/40 backdrop-blur-2xl mx-2">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-orange-500/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FF7A00]/10 rounded-2xl text-[#FF7A00] border border-[#FF7A00]/20 shadow-[0_0_15px_rgba(255,122,0,0.1)]">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-black text-xl italic uppercase leading-none text-white tracking-tight">
              Nhật ký phản hồi
            </h2>
            <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mt-2">
              {data.length} khiếu nại đang được quản lý
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Nguồn & Người gửi
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Danh mục
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Nội dung tóm tắt
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Trạng thái
              </TableHead>
              <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((fb) => (
              <FeedbackRow key={fb.id} fb={fb} onView={onViewDetail} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-white/5 text-center">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em]">
          End of Communication Log • Demif AI Engine
        </p>
      </div>
    </div>
  );
}
