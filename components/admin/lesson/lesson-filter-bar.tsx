"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Filter,
  Search,
  Target,
  Layers,
  Video,
  Tag as TagIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GetLessonsParams } from "@/types/lesson.type";

interface LessonFilterBarProps {
  params: GetLessonsParams;
  setParams: (params: GetLessonsParams) => void;
}

export function LessonFilterBar({ params, setParams }: LessonFilterBarProps) {
  const updateParam = (key: keyof GetLessonsParams, value: any) => {
    setParams({ ...params, [key]: value, page: 1 });
  };

  const statusOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Bản nháp", value: "draft" },
    { label: "Đã đăng", value: "published" },
    { label: "Lưu trữ", value: "archived" },
  ];

  return (
    <Card className="rounded-[2.5rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden">
      {/* 1. HÀNG TRÊN: SEARCH & SELECT FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        {/* Search */}
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm tên bài học..."
            value={params.search || ""}
            onChange={(e) => updateParam("search", e.target.value)}
            className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-white/5 border-none font-bold text-xs"
          />
        </div>

        {/* Level Filter */}
        <Select
          value={params.level}
          onValueChange={(v) => updateParam("level", v)}
        >
          <SelectTrigger className="h-11 rounded-xl bg-slate-50 dark:bg-white/5 border-none font-bold text-[11px] uppercase">
            <div className="flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-emerald-500" />
              <SelectValue placeholder="Cấp độ" />
            </div>
          </SelectTrigger>
          <SelectContent className="font-mono">
            <SelectItem value="all">Mọi cấp độ</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={params.type}
          onValueChange={(v) => updateParam("type", v)}
        >
          <SelectTrigger className="h-11 rounded-xl bg-slate-50 dark:bg-white/5 border-none font-bold text-[11px] uppercase">
            <div className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-orange-500" />
              <SelectValue placeholder="Loại bài" />
            </div>
          </SelectTrigger>
          <SelectContent className="font-mono">
            <SelectItem value="all">Mọi loại</SelectItem>
            <SelectItem value="Dictation">Dictation</SelectItem>
            <SelectItem value="Shadowing">Shadowing</SelectItem>
          </SelectContent>
        </Select>

        {/* MediaType Filter */}
        <Select
          value={params.mediaType}
          onValueChange={(v) => updateParam("mediaType", v)}
        >
          <SelectTrigger className="h-11 rounded-xl bg-slate-50 dark:bg-white/5 border-none font-bold text-[11px] uppercase">
            <div className="flex items-center gap-2">
              <Video className="h-3.5 w-3.5 text-blue-500" />
              <SelectValue placeholder="Nguồn Media" />
            </div>
          </SelectTrigger>
          <SelectContent className="font-mono">
            <SelectItem value="all">Mọi nguồn</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="audio">File Audio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 2. HÀNG GIỮA: CATEGORY, TAG & PREMIUM SWITCH */}
      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-4 h-11 rounded-xl">
          <TagIcon className="h-3.5 w-3.5 text-purple-500" />
          <Input
            placeholder="Lọc Tag..."
            value={params.tag || ""}
            onChange={(e) => updateParam("tag", e.target.value)}
            className="bg-transparent border-none p-0 h-full w-24 text-[11px] font-bold focus-visible:ring-0 shadow-none"
          />
        </div>

        <div className="flex items-center space-x-3 bg-orange-50/50 dark:bg-orange-500/5 px-4 h-11 rounded-xl border border-orange-100 dark:border-orange-500/10">
          <Switch
            id="premium-filter"
            checked={params.isPremiumOnly}
            onCheckedChange={(v) => updateParam("isPremiumOnly", v)}
            className="scale-90 data-[state=checked]:bg-orange-500"
          />
          <Label
            htmlFor="premium-filter"
            className="text-[10px] font-black uppercase tracking-widest text-orange-600 cursor-pointer"
          >
            Chỉ bài Premium
          </Label>
        </div>
      </div>

      {/* 3. HÀNG DƯỚI: STATUS TABS */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-2">
          <Filter className="h-3 w-3" /> Trạng thái:
        </span>

        {statusOptions.map((item) => {
          const isActive = (params.status || "all") === item.value;
          return (
            <button
              key={item.value}
              onClick={() =>
                updateParam(
                  "status",
                  item.value === "all" ? undefined : item.value,
                )
              }
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all relative flex items-center gap-2 outline-none",
                isActive
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-slate-900 dark:bg-orange-500 rounded-xl shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
