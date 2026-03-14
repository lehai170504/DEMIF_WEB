"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Quote,
  MoveRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

// Định nghĩa kiểu dữ liệu
interface TestimonialItem {
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Nguyễn Minh Tường",
    role: "Sinh viên",
    location: "Việt Nam",
    content:
      "DEMIF đã thay đổi kỹ năng nghe tiếng Anh của tôi chỉ trong 3 tháng. Phản hồi của AI cực kỳ chính xác, giúp tôi nhận ra những lỗi sai nhỏ nhất mà giáo viên thường bỏ qua.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    location: "Singapore",
    content:
      "Các bài tập Shadowing giúp tôi cải thiện ngữ điệu đáng kể. Giờ đây tôi tự tin hơn rất nhiều khi thuyết trình bằng tiếng Anh trước các đối tác quốc tế.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Giáo viên IELTS",
    location: "Hàn Quốc",
    content:
      "Nền tảng học ngôn ngữ tốt nhất tôi từng trải nghiệm. Hệ thống theo dõi tiến độ rất trực quan, và bảng xếp hạng tạo động lực cạnh tranh lành mạnh.",
    rating: 5,
  },
  {
    name: "Lê Hoàng Phúc",
    role: "Kỹ sư Phần mềm",
    location: "Nhật Bản",
    content:
      "Tuyệt vời! Tính năng luyện phát âm với độ trễ 0ms thực sự là một bước đột phá. Cảm giác như đang nói chuyện với người bản xứ vậy.",
    rating: 5,
  },
];

export function TestimonialsLanding() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Hàm xử lý khi bấm nút cuộn trái/phải
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // Cuộn một khoảng bằng chiều rộng 1 thẻ + gap
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth", // Cuộn mượt
      });
    }
  };

  return (
    <section
      id="testimonials"
      className="relative w-full h-full flex flex-col justify-center py-12 md:py-24 font-mono overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#FF7A00]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto px-4 relative z-10 shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#FF7A00]/10 text-[#FF7A00] border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold">
            Cộng đồng
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white tracking-tighter">
            Hàng ngàn người <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
              đã thay đổi
            </span>
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base font-medium">
            Câu chuyện thành công từ những người học viên tiên phong.
          </p>
        </motion.div>
      </div>

      {/* CAROUSEL KHU VỰC CHÍNH */}
      <div className="relative w-full flex-grow flex flex-col justify-center group/carousel">
        {/* === NÚT ĐIỀU HƯỚNG TRÁI/PHẢI DÀNH CHO DESKTOP === */}
        {/* Nút Trái */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-md flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:text-[#FF7A00] hover:border-[#FF7A00]/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:flex shadow-lg"
          aria-label="Cuộn trái"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Nút Phải */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-md flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:text-[#FF7A00] hover:border-[#FF7A00]/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:flex shadow-lg"
          aria-label="Cuộn phải"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Màng làm mờ 2 cạnh (Giữ lại để tạo cảm giác chiều sâu) */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none hidden md:block" />

        {/* Container Cuộn Ngang */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-6 md:px-[15%] lg:px-[25%] no-scrollbar scroll-smooth items-stretch h-full"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              className="snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-[420px] h-full flex"
            >
              <div className="group relative flex flex-col w-full h-full p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:border-[#FF7A00]/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-none hover:shadow-2xl">
                {/* Dấu nháy kép làm nền */}
                <div className="absolute top-6 right-8 text-gray-100 dark:text-white/5 group-hover:text-[#FF7A00]/10 transition-colors duration-500">
                  <Quote size={80} strokeWidth={0.5} />
                </div>

                {/* Số sao đánh giá */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? "fill-[#FF7A00] text-[#FF7A00]"
                          : "text-gray-300 dark:text-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Nội dung Review */}
                <p className="text-gray-700 dark:text-zinc-300 mb-10 leading-relaxed relative z-10 flex-grow text-sm md:text-base font-medium">
                  &quot;{item.content}&quot;
                </p>

                {/* Thông tin tác giả */}
                <div className="flex items-center gap-4 mt-auto relative z-10 pt-6 border-t border-gray-100 dark:border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FF9E2C] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/20 shrink-0">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 dark:text-white group-hover:text-[#FF7A00] transition-colors tracking-tight">
                      {item.name}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-zinc-500 gap-2 font-medium mt-0.5">
                      <span>{item.role}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-600" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Glow dưới thẻ khi Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-transparent to-[#FF7A00]/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hướng dẫn vuốt ngang (Chỉ Mobile) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest animate-pulse pointer-events-none md:hidden">
          Vuốt để xem thêm <MoveRight size={12} />
        </div>
      </div>
    </section>
  );
}
