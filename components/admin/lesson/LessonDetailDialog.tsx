"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";

interface Lesson {
  id: string;
  title: string;
  type: "Dictation" | "Shadowing" | "Test";
  level: string;
  status: "Published" | "Draft" | "Review";
  createdAt?: string;
}

interface LessonDetailDialogProps {
  open: boolean;
  onClose: () => void;
  data?: Lesson | null;
  onSave: (updated: Lesson) => void;
  onDelete: (id: string) => void;
}

export default function LessonDetailDialog({
  open,
  onClose,
  data,
  onSave,
  onDelete,
}: LessonDetailDialogProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    setLesson(data || null);
  }, [data]);

  const handleChange = (field: keyof Lesson, value: string) => {
    setLesson((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleDelete = () => {
    if (!lesson) return;
    Swal.fire({
      title: "Xóa bài học?",
      text: "Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(lesson.id);
        onClose();
        Swal.fire("Đã xóa!", "Bài học đã bị xóa thành công.", "success");
      }
    });
  };

  const handleSave = () => {
    if (lesson) {
      onSave(lesson);
      onClose();
      Swal.fire("Đã lưu!", "Cập nhật bài học thành công.", "success");
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md font-mono">
        <DialogHeader>
          <DialogTitle>Chi Tiết Bài Học</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Tiêu đề</Label>
            <Input
              value={lesson.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Label>Loại bài</Label>
              <Select
                value={lesson.type}
                onValueChange={(v) => handleChange("type", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dictation">Dictation</SelectItem>
                  <SelectItem value="Shadowing">Shadowing</SelectItem>
                  <SelectItem value="Test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Trình độ</Label>
              <Input
                value={lesson.level}
                onChange={(e) => handleChange("level", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Trạng thái</Label>
            <Select
              value={lesson.status}
              onValueChange={(v) => handleChange("status", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Xóa
          </Button>
          <Button onClick={handleSave}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
