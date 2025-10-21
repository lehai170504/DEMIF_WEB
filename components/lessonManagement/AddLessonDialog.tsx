// components/admin/AddLessonDialog.tsx

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Thêm textarea cho nội dung bài học
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, FileText } from "lucide-react";
import { toast } from "sonner";

export default function AddLessonDialog({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Logic thêm bài học...
    new Promise((resolve) => setTimeout(resolve, 2000))
      .then(() => {
        toast.success("Đã tạo Bài Học mới thành công!");
      })
      .catch(() => {
        toast.error("Lỗi khi tạo bài học.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-lg font-mono">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Tạo Bài Học Mới
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin cơ bản và nội dung cho bài luyện tập.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Tiêu đề</Label>
            <Input id="title" required className="col-span-3" placeholder="Ví dụ: Bài 11: Văn hóa công sở" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Loại bài</Label>
            <Select required>
                <SelectTrigger id="type" className="col-span-3">
                    <SelectValue placeholder="Chọn loại bài" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Dictation">Dictation (Nghe chép)</SelectItem>
                    <SelectItem value="Shadowing">Shadowing (Đuổi theo)</SelectItem>
                    <SelectItem value="Test">Test (Kiểm tra)</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">Cấp độ</Label>
            <Select required>
                <SelectTrigger id="level" className="col-span-3">
                    <SelectValue placeholder="Chọn cấp độ" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-3 mt-4">
            <Label htmlFor="content">Nội dung (Transcript)</Label>
            <Textarea 
                id="content" 
                required 
                rows={5} 
                placeholder="Nhập nội dung văn bản gốc ở đây..."
            />
          </div>
          
          {/* Bạn sẽ cần thêm khu vực Upload Audio ở đây */}

          <DialogFooter className="mt-6">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Plus className="h-4 w-4 mr-2" /> Tạo Bài Học
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}