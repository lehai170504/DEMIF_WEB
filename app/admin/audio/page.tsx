// pages/admin/audio/page.tsx

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Volume2,
  Upload,
  FileAudio,
  Trash2,
  Clock,
  Mic,
  ListPlus,
} from "lucide-react";
import { toast } from "sonner";
import AudioUploadDialog from "@/components/admin/audio/AudioUploadDialog";

interface AudioFile {
  id: number;
  name: string;
  duration: string;
  size: string;
  uploaded: string;
  usedIn: number;
}

const audioLibrary: AudioFile[] = [
  {
    id: 1,
    name: "Intro_Self_Eng.mp3",
    duration: "00:45",
    size: "650 KB",
    uploaded: "5 ngày trước",
    usedIn: 3,
  },
  {
    id: 2,
    name: "Job_Interview_Part1.wav",
    duration: "01:10",
    size: "1.5 MB",
    uploaded: "1 tuần trước",
    usedIn: 1,
  },
  {
    id: 3,
    name: "Tech_Slang_Daily.mp3",
    duration: "02:30",
    size: "2.8 MB",
    uploaded: "2 tuần trước",
    usedIn: 4,
  },
  {
    id: 4,
    name: "Advanced_Economics.mp3",
    duration: "03:15",
    size: "3.5 MB",
    uploaded: "1 tháng trước",
    usedIn: 2,
  },
  {
    id: 5,
    name: "Pronunciation_Test_V2.mp3",
    duration: "00:30",
    size: "400 KB",
    uploaded: "3 ngày trước",
    usedIn: 5,
  },
];

export default function AdminAudioPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredAudio = audioLibrary.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDuration = audioLibrary.reduce((total, file) => {
    const [min, sec] = file.duration.split(":").map(Number);
    return total + min * 60 + sec;
  }, 0);

  const totalFiles = audioLibrary.length;
  const totalUsed = audioLibrary.reduce(
    (total, file) => total + file.usedIn,
    0
  );

  const handlePlay = (fileName: string) => {
    toast.info(`Đang phát: ${fileName}`);
  };

  const handleDelete = (id: number, name: string) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: `Đang xóa ${name}...`,
      success: "Đã xóa thành công!",
      error: "Lỗi xóa file",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileAudio className="h-6 w-6 text-primary" /> Thư Viện Audio
        </h1>
        <AudioUploadDialog>
          <Button size="sm" className="shadow-md">
            <Upload className="h-4 w-4 mr-2" /> Tải Lên Audio
          </Button>
        </AudioUploadDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Số Files</CardTitle>
            <Mic className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{totalFiles}</div>
            <p className="text-xs text-muted-foreground">Audio files có sẵn</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng Thời Lượng
            </CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {Math.floor(totalDuration / 60)}m {totalDuration % 60}s
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng thời gian luyện tập
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng Lượt Sử Dụng
            </CardTitle>
            <ListPlus className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{totalUsed}</div>
            <p className="text-xs text-muted-foreground">
              Lượt sử dụng trong các bài học
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Danh sách Files</CardTitle>
          <div className="relative flex-1 max-w-sm ml-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm file..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/70 hover:bg-muted/70">
                  {/* Tên File: Căn trái */}
                  <TableHead className="w-[45%] min-w-[280px]">
                    Tên File
                  </TableHead>

                  {/* Cột số liệu: Căn giữa */}
                  <TableHead className="w-[100px] text-center">
                    Kích Thước
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Thời Lượng
                  </TableHead>
                  <TableHead className="w-[120px] text-center hidden sm:table-cell">
                    Số Bài Dùng
                  </TableHead>
                  <TableHead className="w-[150px] text-center hidden md:table-cell">
                    Tải Lên
                  </TableHead>

                  {/* Hành động: Căn phải */}
                  <TableHead className="w-[100px] text-right">
                    Hành động
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudio.length > 0 ? (
                  filteredAudio.map((file) => (
                    <TableRow
                      key={file.id}
                      className="hover:bg-secondary/20 transition-colors"
                    >
                      {/* Cột Tên File: Căn trái */}
                      <TableCell className="font-medium py-3">
                        <div className="flex items-center gap-2">
                          <FileAudio className="h-5 w-5 text-primary" />
                          <span className="font-semibold truncate max-w-[200px]">
                            {file.name}
                          </span>
                        </div>
                      </TableCell>

                      {/* Cột Kích Thước: Căn giữa */}
                      <TableCell className="text-center tabular-nums text-sm font-medium">
                        {file.size}
                      </TableCell>

                      {/* Cột Thời Lượng: Căn giữa */}
                      <TableCell className="text-center tabular-nums text-sm text-muted-foreground">
                        {file.duration}
                      </TableCell>

                      {/* Cột Số Bài Sử Dụng: Căn giữa */}
                      <TableCell className="text-center tabular-nums hidden sm:table-cell text-sm font-medium text-primary">
                        {file.usedIn}
                      </TableCell>

                      {/* Cột Tải Lên: Căn giữa */}
                      <TableCell className="text-center hidden md:table-cell text-sm text-muted-foreground">
                        {file.uploaded}
                      </TableCell>

                      {/* Cột Hành động: Căn phải */}
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:bg-primary/10"
                          onClick={() => handlePlay(file.name)}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(file.id, file.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Không tìm thấy file audio nào khớp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
