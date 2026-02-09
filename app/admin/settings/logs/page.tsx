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

// --- Dữ liệu giả lập ---
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-[2rem] border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
            <Terminal className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">
              Nhật ký hoạt động
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Giám sát mọi thao tác trên hệ thống quản trị.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-xl border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Download className="mr-2 h-4 w-4" /> Xuất CSV
          </Button>
          <Button
            variant="ghost"
            className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* --- FILTER BAR --- */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Tìm theo hành động, mã log hoặc IP..."
            className="pl-10 h-12 rounded-2xl border-border bg-card shadow-sm focus-visible:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-12 rounded-2xl px-5 border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <Filter className="mr-2 h-4 w-4" /> Bộ lọc
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-2xl px-5 border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <Clock className="mr-2 h-4 w-4" /> 7 ngày qua
          </Button>
        </div>
      </div>

      {/* --- LOGS TABLE --- */}
      <Card className="border-border shadow-xl bg-card rounded-[2.5rem] overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-[100px] font-bold text-muted-foreground uppercase text-[11px] tracking-wider pl-8 h-12">
                Mã ID
              </TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase text-[11px] tracking-wider h-12">
                Hành động
              </TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase text-[11px] tracking-wider h-12">
                Người thực hiện
              </TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase text-[11px] tracking-wider h-12">
                Trạng thái
              </TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase text-[11px] tracking-wider h-12">
                Vị trí / IP
              </TableHead>
              <TableHead className="font-bold text-muted-foreground uppercase text-[11px] tracking-wider text-right pr-8 h-12">
                Thời gian
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOGS_DATA.map((log) => (
              <TableRow
                key={log.id}
                className="group border-b border-white/5 hover:bg-muted/20 transition-colors"
              >
                <TableCell className="pl-8 font-bold text-muted-foreground text-xs font-mono">
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
                          "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
                      )}
                    />
                    <span className="font-bold text-foreground text-sm">
                      {log.action}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center border border-border">
                      <User className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-semibold text-foreground/80">
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
                        "bg-emerald-500/10 text-emerald-500",
                      log.type === "info" && "bg-blue-500/10 text-blue-500",
                      log.type === "warning" &&
                        "bg-orange-500/10 text-orange-500",
                      log.type === "danger" && "bg-red-500/10 text-red-500",
                    )}
                  >
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-0.5">
                    <div className="flex items-center gap-1 text-foreground font-bold text-xs">
                      <Globe className="h-3 w-3 text-muted-foreground" />{" "}
                      {log.ip}
                    </div>
                    <span className="text-[10px] text-muted-foreground italic">
                      {log.device}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <span className="text-xs font-bold text-muted-foreground">
                    {log.time}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* --- PAGINATION --- */}
        <div className="p-6 border-t border-border flex items-center justify-between bg-card">
          <p className="text-xs text-muted-foreground">
            Hiển thị <span className="font-bold text-foreground">4</span> trên{" "}
            <span className="font-bold text-foreground">1,240</span> bản ghi
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-border text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              className="h-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 px-3 font-bold"
            >
              1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg px-3 font-bold text-muted-foreground hover:text-foreground"
            >
              2
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg px-3 font-bold text-muted-foreground hover:text-foreground"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-border text-muted-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* --- QUICK ALERT --- */}
      <div className="p-6 bg-primary/5 border border-primary/20 rounded-[2rem] flex items-center gap-4">
        <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center border border-primary/20 shadow-sm text-primary">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-primary uppercase tracking-wide">
            Tự động xóa nhật ký
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Để bảo ưu năng suất, các bản ghi cũ hơn 30 ngày sẽ được lưu trữ
            (archived) và xóa khỏi bảng xem trực tiếp.
          </p>
        </div>
        <Button
          variant="link"
          className="text-primary font-bold no-underline hover:text-primary/80"
        >
          Cấu hình
        </Button>
      </div>
    </div>
  );
}
