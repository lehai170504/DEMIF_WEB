"use client";

import {
  Terminal,
  Search,
  Filter,
  Download,
  Trash2,
  User,
  ShieldAlert,
  Globe,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// --- Dữ liệu giả lập (Mock Data) ---
const LOGS_DATA = [
  {
    id: "LOG-001",
    action: "Cập nhật hồ sơ",
    user: "Lê Hoàng Hải",
    status: "Thành công",
    ip: "14.232.245.88",
    device: "Chrome / Windows 11",
    time: "10:24 - 05/01/2026",
    type: "info",
  },
  {
    id: "LOG-002",
    action: "Đăng nhập hệ thống",
    user: "Lê Hoàng Hải",
    status: "Thành công",
    ip: "14.232.245.88",
    device: "iPhone 15 Pro",
    time: "08:15 - 05/01/2026",
    type: "success",
  },
  {
    id: "LOG-003",
    action: "Thay đổi mật khẩu",
    user: "Lê Hoàng Hải",
    status: "Cảnh báo",
    ip: "103.199.17.15",
    device: "Edge / MacOS",
    time: "21:30 - 04/01/2026",
    type: "warning",
  },
  {
    id: "LOG-004",
    action: "Xóa người dùng #123",
    user: "Admin_System",
    status: "Nguy hiểm",
    ip: "127.0.0.1",
    device: "Terminal Console",
    time: "15:45 - 04/01/2026",
    type: "danger",
  },
];

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-lg shadow-slate-200">
            <Terminal className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Nhật ký hoạt động
            </h1>
            <p className="text-sm text-slate-500">
              Giám sát mọi thao tác trên hệ thống quản trị.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 hover:text-black"
          >
            <Download className="mr-2 h-4 w-4" /> Xuất file CSV
          </Button>
          <Button
            variant="ghost"
            className="rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* --- FILTER BAR --- */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Tìm theo hành động, mã log hoặc IP..."
            className="pl-10 h-12 rounded-2xl border-none bg-white shadow-sm ring-1 ring-slate-200 focus-visible:ring-orange-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-12 rounded-2xl px-5 border-slate-200 bg-white"
          >
            <Filter className="mr-2 h-4 w-4 text-slate-400" /> Bộ lọc
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-2xl px-5 border-slate-200 bg-white"
          >
            <Clock className="mr-2 h-4 w-4 text-slate-400" /> 7 ngày qua
          </Button>
        </div>
      </div>

      {/* --- LOGS TABLE --- */}
      <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="w-[100px] font-bold text-slate-400 uppercase text-[11px] tracking-wider pl-8">
                Mã ID
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-wider">
                Hành động
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-wider">
                Người thực hiện
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-wider">
                Trạng thái
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-wider">
                Vị trí / IP
              </TableHead>
              <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-wider text-right pr-8">
                Thời gian
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOGS_DATA.map((log) => (
              <TableRow
                key={log.id}
                className="group border-b border-slate-50 hover:bg-slate-50/30 transition-colors"
              >
                <TableCell className="pl-8 font-bold text-slate-400 text-xs">
                  {log.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        log.type === "success" &&
                          "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
                        log.type === "info" &&
                          "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
                        log.type === "warning" &&
                          "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]",
                        log.type === "danger" &&
                          "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                      )}
                    />
                    <span className="font-bold text-slate-700">
                      {log.action}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border">
                      <User className="h-3 w-3 text-slate-500" />
                    </div>
                    <span className="text-sm font-semibold text-slate-600">
                      {log.user}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-lg px-2 py-0 border-none font-bold text-[10px] uppercase tracking-tighter",
                      log.type === "success" &&
                        "bg-emerald-50 text-emerald-600",
                      log.type === "info" && "bg-blue-50 text-blue-600",
                      log.type === "warning" && "bg-orange-50 text-orange-600",
                      log.type === "danger" && "bg-red-50 text-red-600"
                    )}
                  >
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-0.5">
                    <div className="flex items-center gap-1 text-slate-700 font-bold text-xs">
                      <Globe className="h-3 w-3 text-slate-400" /> {log.ip}
                    </div>
                    <span className="text-[10px] text-slate-400 italic">
                      {log.device}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <span className="text-xs font-bold text-slate-500">
                    {log.time}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* --- PAGINATION --- */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-white">
          <p className="text-xs text-slate-400">
            Hiển thị 4 trên 1,240 bản ghi
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-none bg-orange-600 text-white hover:bg-orange-700 px-3 font-bold"
            >
              1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg px-3 font-bold"
            >
              2
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg px-3 font-bold"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-slate-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* --- QUICK ALERT --- */}
      <div className="p-6 bg-orange-50/50 border border-orange-100 rounded-[2rem] flex items-center gap-4">
        <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center border border-orange-100 shadow-sm text-orange-600">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-orange-900 uppercase">
            Tự động xóa nhật ký
          </h4>
          <p className="text-xs text-orange-700/70">
            Để bảo ưu năng suất, các bản ghi cũ hơn 30 ngày sẽ được lưu trữ
            (archived) và xóa khỏi bảng xem trực tiếp.
          </p>
        </div>
        <Button
          variant="link"
          className="text-orange-600 font-bold no-underline hover:text-orange-700"
        >
          Cấu hình
        </Button>
      </div>
    </div>
  );
}
