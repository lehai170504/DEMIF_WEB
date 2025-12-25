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
  Trash2,
  Clock,
  Mic,
  ListPlus,
  Play,
  Music,
  HardDrive,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import AudioUploadDialog from "@/components/admin/audio/AudioUploadDialog";

interface AudioFile {
  id: number;
  name: string;
  duration: string;
  size: string;
  uploaded: string;
  usedIn: number;
}

// Dữ liệu khởi tạo (Thực tế sẽ lấy từ API)
const INITIAL_AUDIO_LIBRARY: AudioFile[] = [
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
  const [audios, setAudios] = React.useState<AudioFile[]>(
    INITIAL_AUDIO_LIBRARY
  );

  // 1. Logic Lọc dữ liệu theo Search Term
  const filteredAudio = audios.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Logic Tính toán số liệu (Tự động cập nhật khi 'audios' thay đổi)
  const stats = React.useMemo(() => {
    const totalSec = audios.reduce((total, file) => {
      const [min, sec] = file.duration.split(":").map(Number);
      return total + min * 60 + sec;
    }, 0);

    return {
      count: audios.length,
      duration: `${Math.floor(totalSec / 60)}m ${totalSec % 60}s`,
      usage: audios.reduce((total, file) => total + file.usedIn, 0),
    };
  }, [audios]);

  // 3. Xử lý Phát Audio (Giả lập)
  const handlePlay = (fileName: string) => {
    toast(`Đang phát: ${fileName}`, {
      icon: <Play className="h-4 w-4 text-orange-500" />,
      description: "Hệ thống đang tải dữ liệu âm thanh...",
    });
  };

  // 4. Xử lý Xóa Audio (Cập nhật State)
  const handleDelete = (id: number, name: string) => {
    toast.error(`Xác nhận xóa ${name}?`, {
      action: {
        label: "Xác nhận",
        onClick: () => {
          setAudios((prev) => prev.filter((item) => item.id !== id));
          toast.success(`Đã xóa thành công file ${name}`);
        },
      },
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 font-mono">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <Music className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Media Assets
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
            Audio{" "}
            <span className="text-slate-300 dark:text-slate-700">Library</span>
          </h1>
          <p className="text-muted-foreground text-xs font-medium italic">
            Quản lý tài nguyên âm thanh cho hệ thống bài tập.
          </p>
        </div>

        <AudioUploadDialog>
          <Button className="h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 transition-all active:scale-95">
            <Upload className="h-4 w-4 mr-2" /> Tải lên tài nguyên mới
          </Button>
        </AudioUploadDialog>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        <StatCard
          label="Tổng số Files"
          val={stats.count}
          sub="Files sẵn dùng"
          icon={HardDrive}
          color="text-blue-500"
          bg="bg-blue-50"
        />
        <StatCard
          label="Tổng thời lượng"
          val={stats.duration}
          sub="Nội dung luyện tập"
          icon={Clock}
          color="text-orange-500"
          bg="bg-orange-50"
        />
        <StatCard
          label="Tỷ lệ sử dụng"
          val={stats.usage}
          sub="Lượt trong bài học"
          icon={ListPlus}
          color="text-emerald-500"
          bg="bg-emerald-50"
        />
      </div>

      {/* MAIN TABLE */}
      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900 mx-2">
        <CardHeader className="p-8 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-black text-xl italic uppercase">
              Danh sách tài nguyên
            </h2>
            <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mt-0.5">
              Thời gian thực
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm kiếm file..."
              className="pl-10 h-11 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-orange-500/20 font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b">
                <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">
                  Tên file
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">
                  Thông tin
                </TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">
                  Sử dụng
                </TableHead>
                <TableHead className="text-right px-8 text-[10px] font-black uppercase tracking-widest">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudio.length > 0 ? (
                filteredAudio.map((file) => (
                  <TableRow
                    key={file.id}
                    className="group hover:bg-orange-50/30 transition-all border-b last:border-none"
                  >
                    <TableCell className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 group-hover:scale-110 transition-transform">
                          <Volume2 className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 truncate max-w-[200px]">
                            {file.name}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="secondary"
                              className="text-[9px] px-1.5 py-0 bg-slate-100 text-slate-500 border-none uppercase font-bold"
                            >
                              {file.name.split(".").pop()}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground font-bold">
                              {file.size}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      <div className="flex flex-col items-center italic text-slate-600">
                        <span className="text-sm">{file.duration}</span>
                        <span className="text-[9px] text-muted-foreground uppercase not-italic">
                          {file.uploaded}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">
                        {file.usedIn} Lessons
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          onClick={() => handlePlay(file.name)}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl text-orange-500 hover:bg-orange-100 transition-colors"
                        >
                          <Play className="h-4 w-4 fill-current" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(file.id, file.name)}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-muted-foreground font-bold italic"
                  >
                    Không tìm thấy tài nguyên nào khớp với từ khóa.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* INFO BOX STORAGE */}
      <div className="mx-2 p-6 rounded-[2rem] bg-slate-900 text-white flex items-center justify-between overflow-hidden relative shadow-2xl shadow-slate-200">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-orange-500/20 to-transparent" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-white/10 rounded-2xl">
            <Mic className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg italic uppercase">
              Dung lượng lưu trữ
            </h3>
            <p className="text-xs opacity-60">
              Hệ thống đang sử dụng 1.2 GB / 2.0 GB.
            </p>
          </div>
        </div>
        <Button className="bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-orange-400 hover:text-white rounded-xl relative z-10 transition-colors">
          Quản lý gói
        </Button>
      </div>
    </div>
  );
}

// Component phụ cho thẻ Stats
function StatCard({ label, val, sub, icon: Icon, color, bg }: any) {
  return (
    <Card className="border-none shadow-sm rounded-[2rem] bg-white dark:bg-slate-900 overflow-hidden group">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
          {label}
        </CardTitle>
        <div
          className={cn(
            "p-2 rounded-xl transition-transform group-hover:scale-110",
            bg,
            color
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black italic tracking-tighter">{val}</div>
        <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-tighter">
          {sub}
        </p>
      </CardContent>
    </Card>
  );
}
