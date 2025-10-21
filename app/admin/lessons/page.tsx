// pages/admin/lessons/page.tsx

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
import { Search, BookOpen, Plus } from "lucide-react";

import DataTable from "@/components/dashboardAdmin/data-table";
import AddLessonDialog from "@/components/lessonManagement/AddLessonDialog";

import { lessonsData } from "./admin-lessons-data";
import { schema } from "@/components/dashboardAdmin/table-columns";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" /> Quản Lý Bài Học
        </h1>
        <AddLessonDialog>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" /> Thêm Bài Mới
          </Button>
        </AddLessonDialog>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tiêu đề bài học..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex gap-2 flex-wrap">
              {["all", "Published", "Draft", "Review"].map((status) => {
                const statusKey = status as LessonStatus;
                const count =
                  status === "all"
                    ? allLessons.length
                    : allLessons.filter((l) => l.status === statusKey).length;
                return (
                  <Button
                    key={status}
                    variant={activeStatus === statusKey ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveStatus(statusKey)}
                    className={
                      activeStatus === statusKey ? "" : "hover:bg-muted/50"
                    }
                  >
                    {status} ({count})
                  </Button>
                );
              })}
            </div>

            <div className="ml-auto w-40">
              <Select
                value={activeType}
                onValueChange={setActiveType as (value: LessonType) => void}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Loại Bài Tập" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả Loại bài</SelectItem>
                  <SelectItem value="Dictation">Dictation</SelectItem>
                  <SelectItem value="Shadowing">Shadowing</SelectItem>
                  <SelectItem value="Test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <DataTable data={filteredLessons} />
    </div>
  );
}
