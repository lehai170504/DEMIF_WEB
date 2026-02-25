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

  // 1. CHỈ GỌI API ĐỂ LẤY DỮ LIỆU (KHÔNG TRUYỀN FILTER XUỐNG BE NỮA)
  // Nếu muốn FE tự lọc hết, bạn nên set pageSize lớn (vd: 1000) ở Backend hoặc API để lấy full list.
  const { data, isLoading, isError, refetch } = useLessons({
    page,
    pageSize,
    // Bỏ trống status, type, search ở đây để BE trả về tất cả
  });

  const allLessons = data?.items || [];

  // 2. FE TỰ ĐỘNG ĐẾM SỐ LƯỢNG TỪNG TRẠNG THÁI TỪ DATA GỐC
  const lessonCounts = React.useMemo(() => {
    const counts: Record<LessonStatus, number> = {
      all: allLessons.length,
      Published: 0,
      Draft: 0,
      Review: 0,
      Archived: 0,
    };

    allLessons.forEach((lesson) => {
      // Dùng hàm normalizeStatus để đưa về đúng chuẩn chữ (Published, Draft...)
      const status = normalizeStatus(lesson.status) as LessonStatus;
      if (counts[status] !== undefined) {
        counts[status] += 1;
      }
    });

    return counts;
  }, [allLessons]);

  // 3. FE TỰ THỰC HIỆN LỌC DỮ LIỆU (FILTERING)
  const filteredLessons = React.useMemo(() => {
    return allLessons.filter((lesson) => {
      // -- Lọc theo Status --
      const currentStatus = normalizeStatus(lesson.status);
      const matchStatus =
        activeStatus === "all" || currentStatus === activeStatus;

      // -- Lọc theo Type --
      const currentType = normalizeType(lesson.lessonType);
      const matchType = activeType === "all" || currentType === activeType;

      // -- Lọc theo Search (Tìm theo Title) --
      const matchSearch =
        searchTerm === "" ||
        (lesson.title &&
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()));

      // Phải thỏa mãn cả 3 điều kiện mới được hiển thị
      return matchStatus && matchType && matchSearch;
    });
  }, [allLessons, activeStatus, activeType, searchTerm]);

  // Khi đổi filter, reset về trang 1
  React.useEffect(() => {
    setPage(1);
  }, [activeStatus, activeType, searchTerm]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-zinc-500 font-mono animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-xs uppercase tracking-widest">
          Đang tải dữ liệu bài học...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4 text-zinc-500 font-mono">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p>Không thể tải dữ liệu.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-10 font-mono text-zinc-100 relative">
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
