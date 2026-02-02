"use client";

import * as React from "react";
import { LessonHeader } from "@/components/admin/lesson/lesson-header";
import {
  LessonFilterBar,
  LessonStatus,
  LessonType,
} from "@/components/admin/lesson/lesson-filter-bar";
import { LessonTableWrapper } from "@/components/admin/lesson/lesson-table-wrapper";

// Giả lập logic dữ liệu
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

  // Tính toán số lượng cho bộ lọc status
  const lessonCounts = React.useMemo(() => {
    const counts: Record<LessonStatus, number> = {
      all: allLessons.length,
      Published: 0,
      Draft: 0,
      Review: 0,
    };
    allLessons.forEach((l) => {
      if (l.status in counts) {
        counts[l.status as LessonStatus]++;
      }
    });
    return counts;
  }, []);

  return (
    <div className="w-full space-y-8 pb-10 font-mono text-zinc-100 relative">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] right-[20%] w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        <LessonHeader />

        <LessonFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeType={activeType}
          onTypeChange={setActiveType}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          lessonCounts={lessonCounts}
        />

        <LessonTableWrapper data={filteredLessons} />
      </div>
    </div>
  );
}
