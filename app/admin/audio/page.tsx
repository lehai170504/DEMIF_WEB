// app/admin/audio/page.tsx

"use client";

import * as React from "react";
import { toast } from "sonner";

// Import các component con đã tách
import { AudioHeader } from "@/components/admin/audio/audio-header";
import { AudioStats } from "@/components/admin/audio/audio-stats";
import { AudioTable, AudioFile } from "@/components/admin/audio/audio-table";
import { StorageInfo } from "@/components/admin/audio/storage-info";

// Dữ liệu mẫu khởi tạo
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
    INITIAL_AUDIO_LIBRARY,
  );

  // 1. Logic Lọc dữ liệu theo từ khóa tìm kiếm
  const filteredAudio = audios.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 2. Logic Tính toán số liệu thống kê (Tự động cập nhật khi danh sách thay đổi)
  const stats = React.useMemo(() => {
    const totalSec = audios.reduce((total, file) => {
      // Giả sử định dạng duration là "MM:SS"
      const parts = file.duration.split(":").map(Number);
      const min = parts[0] || 0;
      const sec = parts[1] || 0;
      return total + min * 60 + sec;
    }, 0);

    return {
      count: audios.length,
      duration: `${Math.floor(totalSec / 60)}m ${totalSec % 60}s`,
      usage: audios.reduce((total, file) => total + file.usedIn, 0),
    };
  }, [audios]);

  // 3. Xử lý Xóa Audio (Truyền xuống component AudioTable)
  const handleDelete = (id: number, name: string) => {
    toast.error(`Xác nhận xóa tài nguyên?`, {
      description: `File "${name}" sẽ bị xóa vĩnh viễn khỏi hệ thống.`,
      action: {
        label: "Xóa ngay",
        onClick: () => {
          setAudios((prev) => prev.filter((item) => item.id !== id));
          toast.success(`Đã xóa thành công file ${name}`);
        },
      },
      // Style riêng cho toast delete để cảnh báo
      style: {
        backgroundColor: "#18181b",
        color: "#fff",
        borderColor: "rgba(220, 38, 38, 0.2)", // Red border
      },
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10 font-mono text-zinc-100 relative">
      {/* Background Glow Effect cho trang này */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[20%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header chứa nút Upload */}
        <AudioHeader />

        {/* Các thẻ thống kê */}
        <AudioStats
          count={stats.count}
          duration={stats.duration}
          usage={stats.usage}
        />

        {/* Bảng dữ liệu chính */}
        <AudioTable
          files={filteredAudio}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onDelete={handleDelete}
        />

        {/* Banner thông tin dung lượng */}
        <StorageInfo />
      </div>
    </div>
  );
}
