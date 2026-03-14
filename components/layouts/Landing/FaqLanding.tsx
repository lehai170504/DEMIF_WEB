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

  // Logic xác định hướng trượt dựa trên vị trí (Cột trái trượt từ trái, Cột phải trượt từ phải)
  const getCardAnimation = (idx: number) => {
    const isLeftColumn = idx % 2 === 0; // Index chẵn (0, 2) nằm bên trái
    return {
      initial: { opacity: 0, x: isLeftColumn ? -60 : 60, y: 20 },
      whileInView: { opacity: 1, x: 0, y: 0 },
    };
  };

  return (
    <section className="container mx-auto px-6 py-12 md:py-20 font-mono h-full flex flex-col justify-center overflow-hidden">
      {/* Tiêu đề chính - Slide từ trên xuống */}
      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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

      {/* FAQ Grid Layout - Slide lắp ráp từ 2 bên */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full relative z-10">
        {faqs.map((faq, idx) => {
          const anim = getCardAnimation(idx);

          return (
            <motion.div
              key={idx}
              initial={anim.initial}
              whileInView={anim.whileInView}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: idx * 0.1, // Stagger mượt mà
              }}
              className="group p-6 md:p-8 bg-gray-50/80 dark:bg-zinc-900/40 border border-gray-200 dark:border-white/5 rounded-[2rem] hover:bg-white dark:hover:bg-zinc-900/80 backdrop-blur-sm transition-colors duration-500 hover:shadow-xl hover:border-[#FF7A00]/30"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 group-hover:scale-110 group-hover:border-[#FF7A00]/30 transition-all duration-500">
                    <HelpCircle className="w-6 h-6 text-[#FF7A00]" />
                  </div>
                  <Plus className="w-5 h-5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-[#FF7A00] transition-colors duration-300">
                  {faq.q}
                </h3>

                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-sm font-medium">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nút hỗ trợ thêm - Slide từ dưới lên mượt mà */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        className="mt-10 md:mt-14 text-center relative z-10"
      >
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 text-[#FF7A00] text-sm font-black transition-all bg-[#FF7A00]/10 hover:bg-[#FF7A00]/20 px-6 py-3 rounded-full"
        >
          <span>Liên hệ với đội ngũ hỗ trợ 24/7</span>
          <Plus className="w-4 h-4 rotate-45 group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      </motion.div>
    </section>
  );
}
