// src/app/admin/lessons/page.tsx
"use client";

import * as React from "react";
import { LessonHeader } from "@/components/admin/lesson/lesson-header";
import {
  LessonFilterBar,
  LessonStatus,
  LessonType,
} from "@/components/admin/lesson/lesson-filter-bar";
import { LessonTableWrapper } from "@/components/admin/lesson/lesson-table-wrapper";
import { useLessons } from "@/hooks/use-lesson";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  normalizeStatus,
  normalizeType,
} from "@/components/admin/lesson/table-columns";

export default function AdminLessonsPage() {
  const [activeStatus, setActiveStatus] = React.useState<LessonStatus>("all");
  const [activeType, setActiveType] = React.useState<LessonType>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading, isError, refetch } = useLessons({
    page,
    pageSize,
  });

  const allLessons = data?.items || [];

  const lessonCounts = React.useMemo(() => {
    const counts: Record<LessonStatus, number> = {
      all: allLessons.length,
      Published: 0,
      Draft: 0,
      Review: 0,
      Archived: 0,
    };

    allLessons.forEach((lesson) => {
      const status = normalizeStatus(lesson.status) as LessonStatus;
      if (counts[status] !== undefined) {
        counts[status] += 1;
      }
    });

    return counts;
  }, [allLessons]);

  const filteredLessons = React.useMemo(() => {
    return allLessons.filter((lesson) => {
      const currentStatus = normalizeStatus(lesson.status);
      const matchStatus =
        activeStatus === "all" || currentStatus === activeStatus;

      const currentType = normalizeType(lesson.lessonType);
      const matchType = activeType === "all" || currentType === activeType;

      const matchSearch =
        searchTerm === "" ||
        (lesson.title &&
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchStatus && matchType && matchSearch;
    });
  }, [allLessons, activeStatus, activeType, searchTerm]);

  React.useEffect(() => {
    setPage(1);
  }, [activeStatus, activeType, searchTerm]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-gray-500 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-xs uppercase tracking-widest">
          Đang tải dữ liệu bài học...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-gray-500 font-mono">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p>Không thể tải dữ liệu.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-10 font-mono text-gray-900 bg-gray-50 min-h-screen">
      <div className="relative z-10 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <LessonTableWrapper
          data={filteredLessons}
          pageIndex={page - 1}
          pageSize={pageSize}
          pageCount={Math.ceil(filteredLessons.length / pageSize) || 1}
          onPaginationChange={(newPageIndex, newPageSize) => {
            setPage(newPageIndex + 1);
            setPageSize(newPageSize);
          }}
        />
      </div>
    </div>
  );
}
