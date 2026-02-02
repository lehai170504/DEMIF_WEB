"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DataTable({ data }: { data: any[] }) {
  return (
    <div className="w-full overflow-x-auto font-mono">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Học viên
            </th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Nội dung bài học
            </th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Kỹ năng
            </th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-center">
              Kết quả AI
            </th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-right">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((item) => (
            <tr
              key={item.id}
              className="group hover:bg-white/5 transition-all duration-300"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-white/10 shadow-lg">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user}`}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold">
                        {item.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#18181b] rounded-full animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-zinc-200 text-sm group-hover:text-white transition-colors">
                      {item.user}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                      {item.status}
                    </span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <span className="font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {item.lesson}
                </span>
              </td>

              <td className="px-6 py-4">
                <Badge
                  className={cn(
                    "px-2.5 py-1 rounded-md border font-bold text-[10px] uppercase tracking-widest bg-transparent transition-colors",
                    item.type === "Dictation"
                      ? "border-orange-500/30 text-orange-400 group-hover:bg-orange-500/10"
                      : "border-blue-500/30 text-blue-400 group-hover:bg-blue-500/10",
                  )}
                >
                  {item.type}
                </Badge>
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-black italic tracking-tighter",
                      item.score >= 90
                        ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                        : "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]",
                    )}
                  >
                    {item.score}%
                  </span>
                  <div className="w-16 h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]",
                        item.score >= 90
                          ? "bg-emerald-500 text-emerald-500"
                          : "bg-orange-500 text-orange-500",
                      )}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg text-zinc-400 hover:text-orange-500 hover:bg-orange-500/10 transition-all"
                  >
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
