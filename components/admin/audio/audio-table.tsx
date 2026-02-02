"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Volume2, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";

export interface AudioFile {
  id: number;
  name: string;
  duration: string;
  size: string;
  uploaded: string;
  usedIn: number;
}

interface AudioTableProps {
  files: AudioFile[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onDelete: (id: number, name: string) => void;
}

export function AudioTable({
  files,
  searchTerm,
  onSearchChange,
  onDelete,
}: AudioTableProps) {
  const handlePlay = (fileName: string) => {
    toast(`Đang phát: ${fileName}`, {
      icon: <Play className="h-4 w-4 text-orange-500" />,
      description: "Hệ thống đang tải dữ liệu âm thanh...",
      style: {
        backgroundColor: "#18181b",
        color: "#fff",
        borderColor: "rgba(255,255,255,0.1)",
      },
    });
  };

  return (
    <Card className="rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden bg-[#18181b] mx-2 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/20 via-transparent to-transparent" />

      <CardHeader className="p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/[0.02]">
        <div className="space-y-1">
          <h2 className="font-black text-xl italic uppercase text-white">
            Danh sách tài nguyên
          </h2>
          <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
            Hiển thị {files.length} files
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Tìm kiếm file..."
            className="pl-11 h-12 bg-black/20 border-white/10 text-white rounded-2xl focus-visible:ring-orange-500/50 focus-visible:border-orange-500 font-bold placeholder:text-zinc-600 transition-all"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 hover:bg-white/5 border-b border-white/5">
              <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Tên file
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Thông tin
              </TableHead>
              <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Sử dụng
              </TableHead>
              <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.length > 0 ? (
              files.map((file) => (
                <TableRow
                  key={file.id}
                  className="group hover:bg-white/5 transition-all border-b border-white/5 last:border-none"
                >
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                        <Volume2 className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-200 text-sm truncate max-w-[200px] group-hover:text-white transition-colors">
                          {file.name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className="text-[9px] px-1.5 py-0 bg-white/10 text-zinc-400 border-none uppercase font-bold hover:bg-white/20"
                          >
                            {file.name.split(".").pop()}
                          </Badge>
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">
                            {file.size}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-zinc-300 font-mono">
                        {file.duration}
                      </span>
                      <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">
                        {file.uploaded}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-black text-[10px] shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      {file.usedIn} Lessons
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <Button
                        onClick={() => handlePlay(file.name)}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-zinc-400 hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </Button>
                      <Button
                        onClick={() => onDelete(file.id, file.name)}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-40 text-center text-zinc-500 font-bold italic"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 opacity-20" />
                    Không tìm thấy tài nguyên nào khớp với từ khóa.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
