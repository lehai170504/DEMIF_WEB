"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  BookOpen,
  Plus,
  Filter,
  LayoutGrid,
  ListFilter,
  Activity,
} from "lucide-react";

import DataTable from "@/components/admin/dashboard/data-table";
import AddLessonDialog from "@/components/admin/lesson/AddLessonDialog";
import { cn } from "@/lib/utils";

// Giả lập logic dữ liệu (Giữ nguyên phần parse schema của bạn)
import { lessonsData } from "./admin-lessons-data";
import { schema } from "@/components/admin/dashboard/table-columns";

const allLessons = lessonsData.map((item) => {
  try {
    return schema.parse(item);
  } catch (e) {
    console.error("Lỗi xác thực dữ liệu Bài Học:", e);
    return item as any;
  }
});

type LessonStatus = "all" | "Published" | "Draft" | "Review";
type LessonType = "all" | "Dictation" | "Shadowing" | "Test";

export default function AdminLessonsPage() {
  const [activeStatus, setActiveStatus] = React.useState<LessonStatus>("all");
  const [activeType, setActiveType] = React.useState<LessonType>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredLessons = allLessons.filter((lesson) => {
    const statusMatch =
      activeStatus === "all" || lesson.status === activeStatus;
    const typeMatch = activeType === "all" || lesson.type === activeType;
    const searchMatch = lesson.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return statusMatch && typeMatch && searchMatch;
  });

  return (
    <div className="w-full space-y-8 pb-10 font-mono">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <LayoutGrid className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Course Management
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-slate-900 dark:text-white">
            Lesson{" "}
            <span className="text-slate-300 dark:text-slate-700">
              Repository
            </span>
          </h1>
          <p className="text-muted-foreground text-xs font-medium italic">
            Quản lý và biên tập nội dung luyện nghe, shadowing hệ thống.
          </p>
        </div>

        <AddLessonDialog>
          <Button className="h-12 px-6 bg-slate-900 dark:bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 dark:shadow-orange-900/20 transition-all active:scale-95">
            <Plus className="h-4 w-4 mr-2" /> Tạo bài học mới
          </Button>
        </AddLessonDialog>
      </div>

      {/* --- FILTER CONTROL PANEL --- */}
      <Card className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] bg-white dark:bg-slate-900 p-8 space-y-6 mx-2">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search Bar */}
          <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
            <Input
              placeholder="Tìm kiếm tiêu đề bài học..."
              className="h-12 pl-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold focus-visible:ring-2 focus-visible:ring-orange-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 hidden lg:block" />

          {/* Type Selector */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <ListFilter className="h-4 w-4 text-slate-400" />
            <Select value={activeType} onValueChange={setActiveType as any}>
              <SelectTrigger className="h-12 w-full lg:w-[220px] rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold italic">
                <SelectValue placeholder="Thể loại" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl font-mono">
                <SelectItem value="all">Tất cả thể loại</SelectItem>
                <SelectItem value="Dictation">Dictation</SelectItem>
                <SelectItem value="Shadowing">Shadowing</SelectItem>
                <SelectItem value="Test">Final Test</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-800">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-2 italic">
            <Filter className="h-3 w-3" /> Lọc theo trạng thái:
          </span>
          {["all", "Published", "Draft", "Review"].map((status) => {
            const isActive = activeStatus === status;
            const count =
              status === "all"
                ? allLessons.length
                : allLessons.filter((l) => l.status === status).length;
            return (
              <Button 
                key={status}
                onClick={() => setActiveStatus(status as any)}
                className={cn(
                  "px-5 py-2 rounded-xl text-[11px] font-bold uppercase transition-all duration-300 flex items-center gap-2",
                  isActive
                    ? "bg-slate-900 text-white dark:bg-orange-500 shadow-lg shadow-slate-200 dark:shadow-orange-900/20"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100"
                )}
              >
                {status}
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-md text-[9px] font-black",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                  )}
                >
                  {count}
                </span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* --- DATA TABLE SECTION --- */}
      <div className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden bg-white dark:bg-slate-900 mx-2 transition-all hover:shadow-md">
        <div className="p-8 border-b flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-2xl">
              <BookOpen className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h2 className="font-black text-xl italic uppercase text-slate-800 dark:text-white leading-none">
                Lessons Database
              </h2>
              <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-1.5">
                Hiển thị {filteredLessons.length} kết quả phù hợp
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase italic animate-pulse">
            <Activity className="h-3 w-3" /> System Live
          </div>
        </div>
        <DataTable data={filteredLessons} />
      </div>
    </div>
  );
}
