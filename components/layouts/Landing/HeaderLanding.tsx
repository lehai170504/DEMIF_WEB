// src/components/Header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeaderLanding() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between font-mono">
        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
          <img
            src="/DemifLogo.png"
            alt="DEMIF Logo"
            className="w-12 h-12 rounded-xl shadow-lg"
          />
          <span className="text-3xl font-extrabold bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] bg-clip-text text-transparent tracking-wide">
            DEMIF
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-foreground/70 hover:text-[#FF7A00] transition-colors"
          >
            Tính năng
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-foreground/70 hover:text-[#FF7A00] transition-colors"
          >
            Cách hoạt động
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-foreground/70 hover:text-[#FF7A00] transition-colors"
          >
            Bảng giá
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-foreground/70 hover:text-[#FF7A00] transition-colors"
          >
            Phản hồi
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground/70 hover:text-white hover:bg-[#FF7A00] transition-colors"
            asChild
          >
            <Link href="/login">Đăng nhập</Link>
          </Button>
          <Button
            size="sm"
            className="bg-[#FF7A00] hover:bg-[#FF9E2C] text-white shadow-lg shadow-orange-500/30"
            asChild
          >
            <Link href="/signup">Bắt đầu ngay</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}