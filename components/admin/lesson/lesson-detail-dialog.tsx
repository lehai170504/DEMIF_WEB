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
import { Trash2, Save, FileEdit } from "lucide-react";

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
    // Tùy chỉnh SweetAlert theme tối nếu cần
    Swal.fire({
      title: "Xóa bài học?",
      text: "Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red-500
      cancelButtonColor: "#3f3f46", // Zinc-700
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      background: "#18181b",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(lesson.id);
        onClose();
        Swal.fire({
          title: "Đã xóa!",
          text: "Bài học đã bị xóa thành công.",
          icon: "success",
          background: "#18181b",
          color: "#fff",
          confirmButtonColor: "#f97316",
        });
      }
    });
  };

  const handleSave = () => {
    if (lesson) {
      onSave(lesson);
      onClose();
      Swal.fire({
        title: "Đã lưu!",
        text: "Cập nhật bài học thành công.",
        icon: "success",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#f97316",
      });
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-[#18181b] border border-white/10 text-zinc-100 rounded-[2rem] shadow-2xl p-0 font-mono overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-white/5 bg-gradient-to-br from-purple-500/10 to-transparent">
          <DialogHeader className="relative z-10 text-left">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-500">
                <FileEdit className="h-5 w-5" />
              </div>
              <DialogTitle className="text-xl font-black uppercase tracking-tight text-white">
                Chi Tiết Bài Học
              </DialogTitle>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Tiêu đề
            </Label>
            <Input
              value={lesson.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="bg-black/20 border-white/10 text-white rounded-xl focus-visible:ring-purple-500/50 h-10 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Loại bài
              </Label>
              <Select
                value={lesson.type}
                onValueChange={(v) => handleChange("type", v)}
              >
                <SelectTrigger className="bg-black/20 border-white/10 text-white rounded-xl h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#18181b] border-white/10 text-white">
                  <SelectItem value="Dictation">Dictation</SelectItem>
                  <SelectItem value="Shadowing">Shadowing</SelectItem>
                  <SelectItem value="Test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Trình độ
              </Label>
              <Input
                value={lesson.level}
                onChange={(e) => handleChange("level", e.target.value)}
                className="bg-black/20 border-white/10 text-white rounded-xl focus-visible:ring-purple-500/50 h-10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Trạng thái
            </Label>
            <Select
              value={lesson.status}
              onValueChange={(v) => handleChange("status", v)}
            >
              <SelectTrigger className="bg-black/20 border-white/10 text-white rounded-xl h-10">
                <SelectValue />
              </SelectTrigger>
              n
              <SelectContent className="bg-[#18181b] border-white/10 text-white">
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 border-t border-white/5 flex gap-3">
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex-1 rounded-xl h-11 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 font-bold uppercase text-xs tracking-widest transition-all"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Xóa
          </Button>
          <Button
            onClick={handleSave}
            className="flex-[2] rounded-xl h-11 bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-widest transition-all shadow-lg shadow-white/5"
          >
            <Save className="h-4 w-4 mr-2" /> Lưu Thay Đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
