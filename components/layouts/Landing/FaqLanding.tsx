"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Plus } from "lucide-react";
import Link from "next/link";

export function FaqLanding() {
  const faqs = [
    {
      q: "Phương pháp Shadowing là gì?",
      a: "Shadowing là kỹ thuật nghe và lặp lại ngay lập tức những gì người bản ngữ nói. Nó giúp cải thiện phát âm, ngữ điệu và phản xạ ngôn ngữ vô cùng hiệu quả.",
    },
    {
      q: "Tôi có thể dùng thử miễn phí không?",
      a: "Có! DEMIF cung cấp tài khoản Basic miễn phí vĩnh viễn và cho phép dùng thử các tính năng Premium trong 7 ngày không cần thẻ tín dụng.",
    },
    {
      q: "AI đánh giá giọng nói của tôi như thế nào?",
      a: "Hệ thống sử dụng các mô hình Speech-to-Text tiên tiến để so sánh từng âm tiết với giọng chuẩn, sau đó trả về điểm số chi tiết kèm gợi ý sửa lỗi.",
    },
    {
      q: "Dữ liệu âm thanh có được bảo mật?",
      a: "Tuyệt đối an toàn. Dữ liệu ghi âm của bạn chỉ được xử lý mã hóa theo thời gian thực để chấm điểm và không bao giờ được lưu trữ lâu dài.",
    },
  ];

  return (
    // Thay py-32 bằng py-12 để khớp với khung nhìn h-screen của StackedSection
    <section className="container mx-auto px-6 py-12 md:py-20 font-mono h-full flex flex-col justify-center">
      {/* Tiêu đề chính - Thu nhỏ margin để tiết kiệm diện tích */}
      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-orange-500/10 text-orange-600 dark:text-[#FF7A00] border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold">
            Hỗ trợ & Giải đáp
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
            Mọi thứ bạn{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
              cần biết.
            </span>
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            Tìm câu trả lời nhanh cho những thắc mắc phổ biến tại DEMIF.
          </p>
        </motion.div>
      </div>

      {/* FAQ Grid Layout - Giảm Gap để không bị tràn khung hình */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group p-5 md:p-8 bg-gray-50/50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5 rounded-[2rem] hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500 hover:shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-black flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 group-hover:border-[#FF7A00]/30 transition-colors">
                  <HelpCircle className="w-5 h-5 text-[#FF7A00]" />
                </div>
                <Plus className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-[#FF7A00] transition-colors">
                {faq.q}
              </h3>

              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-xs md:text-sm font-medium">
                {faq.a}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Nút hỗ trợ thêm - Đưa sát lên trên */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-10 md:mt-12 text-center"
      >
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 text-[#FF7A00] text-xs md:text-sm font-black transition-all"
        >
          <span className="hover:underline underline-offset-8">
            Liên hệ với đội ngũ hỗ trợ 24/7
          </span>
          <Plus className="w-4 h-4 rotate-45 group-hover:rotate-90 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
