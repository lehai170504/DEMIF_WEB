// src/components/layouts/Landing/FooterLanding.jsx

import Link from "next/link"

export function FooterLanding() {
  return (
    <footer className="border-t border-border mt-20 bg-card/50">
      <div className="container mx-auto px-4 py-16 font-mono">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline - Logo và Slogan */}
          <div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-orange-50/30 border border-orange-200/50 mb-6">
              <img
                src="/DemifLogo.png"
                alt="DEMIF Logo"
                className="w-12 h-12 rounded-xl shadow-lg"
              />
              <span className="text-3xl font-extrabold bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C] bg-clip-text text-transparent tracking-wide">
                DEMIF
              </span>
            </div>
            <p className="text-foreground/60 leading-relaxed">
              Nền tảng học ngôn ngữ được hỗ trợ bởi AI thông qua bài tập chính tả và Shadowing
            </p>
          </div>

          {/* Product Links - Liên kết Sản phẩm */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Sản phẩm</h4>
            <ul className="space-y-3 text-foreground/70">
              <li>
                <Link href="#features" className="hover:text-[#FF7A00] transition-colors">
                  Tính năng
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[#FF7A00] transition-colors">
                  Giá
                </Link>
              </li>
              <li>
                <Link href="#demo" className="hover:text-[#FF7A00] transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/home" className="hover:text-[#FF7A00] transition-colors">
                  Bảng điều khiển
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links - Liên kết Công ty */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Công ty</h4>
            <ul className="space-y-3 text-foreground/70">
              <li>
                <Link href="/about" className="hover:text-[#FF7A00] transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FF7A00] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#FF7A00] transition-colors">
                  Cơ hội nghề nghiệp
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF7A00] transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links - Liên kết Pháp lý */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Pháp lý</h4>
            <ul className="space-y-3 text-foreground/70">
              <li>
                <Link href="/privacy" className="hover:text-[#FF7A00] transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FF7A00] transition-colors">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#FF7A00] transition-colors">
                  Chính sách Cookie
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Language Switcher - Bản quyền và Chuyển đổi Ngôn ngữ */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/60 text-sm">&copy; 2025 DEMIF. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-6 text-sm text-foreground/60">
            <Link href="#" className="hover:text-[#FF7A00] transition-colors">
              English
            </Link>
            <Link href="#" className="hover:text-[#FF7A00] transition-colors">
              Tiếng Việt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}