"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DataTable({ data }: { data: any[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b bg-slate-50/40 dark:bg-slate-800/40">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Học viên
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Nội dung bài học
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Kỹ năng
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">
              Kết quả AI
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.map((item) => (
            <tr
              key={item.id}
              className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-9 w-9 border-2 border-white dark:border-slate-700 shadow-sm">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user}`}
                      />
                      <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                        {item.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {item.user}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">
                      {item.status}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">
                {item.lesson}
              </td>
              <td className="px-6 py-4">
                <Badge
                  className={cn(
                    "px-2.5 py-0.5 rounded-lg border-none font-bold text-[10px] uppercase tracking-tighter",
                    item.type === "Dictation"
                      ? "bg-orange-100 text-orange-600 dark:bg-orange-500/10"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-500/10"
                  )}
                >
                  {item.type}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      "text-sm font-black italic",
                      item.score >= 90 ? "text-emerald-500" : "text-orange-500"
                    )}
                  >
                    {item.score}%
                  </span>
                  <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        item.score >= 90 ? "bg-emerald-500" : "bg-orange-500"
                      )}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full text-orange-500"
                  >
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full text-slate-400"
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
