"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

interface TestimonialItem {
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Trần Thanh Hà",
    role: "Sinh viên năm cuối",
    location: "TP. Hồ Chí Minh",
    content:
      "Mình từng rất ám ảnh phần thi Speaking vì hay bị nuốt âm cuối. Nhờ luyện Shadowing mỗi ngày trên DEMIF, AI đã ép mình sửa từng âm tiết một. Kết quả là mình vừa đạt IELTS 7.0 tuần trước!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Hoàng Nhật Minh",
    role: "Chuyên viên Marketing",
    location: "Hà Nội",
    content:
      "Điểm 'ăn tiền' nhất của DEMIF là AI Mentor phản hồi ngay lập tức. Tính năng này giúp mình phản xạ nhanh hơn hẳn. Giờ mình hoàn toàn tự tin khi phải thuyết trình trực tiếp với đối tác nước ngoài.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Lê Ngọc Hân",
    role: "Điều dưỡng viên",
    location: "Melbourne, Úc",
    content:
      "Dù sống ở Úc nhưng thời gian đầu mình vẫn hay bị người bản xứ hỏi lại vì phát âm chưa chuẩn ngữ điệu. Công cụ phân tích sóng âm của DEMIF thực sự là cứu cánh, nó chỉ ra chính xác mình đang nói sai ở đâu.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Kevin Nguyễn",
    role: "Kỹ sư Phần mềm",
    location: "California, Mỹ",
    content:
      "Là dân công nghệ, mình cực kỳ khắt khe với các app AI. Nhưng DEMIF làm mình bất ngờ vì độ trễ (latency) gần như bằng 0. Cảm giác giao tiếp mượt mà, tự nhiên y hệt như đang nói chuyện với người thật.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
];

export default function TestimonialsLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative w-full h-[600vh] bg-transparent"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 py-20">
        {/* Nền Blur trang trí */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-[#FF7A00]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* NÂNG CẤP CHỐNG ĐÈ CHỮ: Sử dụng Flexbox để phân chia không gian */}
        <div className="w-full max-w-[90rem] h-full flex flex-col relative">
          {/* PHẦN 1: HEADER (Luôn nằm trên cùng của khung) */}
          <div className="w-full text-center shrink-0 mb-8 z-50">
            <Badge className="mb-4 bg-[#FF7A00]/10 text-[#FF7A00] border-none px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px] font-bold backdrop-blur-md shadow-lg">
              Cộng đồng
            </Badge>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter drop-shadow-md">
              Hàng ngàn người <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9E2C]">
                đã thay đổi
              </span>
            </h2>
          </div>

          {/* PHẦN 2: KHU VỰC HIỂN THỊ SLIDE (Lấy phần không gian còn lại) */}
          <div className="relative w-full flex-grow">
            {testimonials.map((item, index) => (
              <TestimonialSlide
                key={index}
                item={item}
                index={index}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// COMPONENT LOGIC SLIDE: Hiệu ứng hình tròn lăn (Orbital Motion)
// =========================================================================
function TestimonialSlide({
  item,
  index,
  progress,
}: {
  item: TestimonialItem;
  index: number;
  progress: MotionValue<number>;
}) {
  let input,
    opacityOut,
    imgXOut,
    imgYOut,
    imgRotateOut,
    textXOut,
    textYOut,
    scaleOut;

  if (index === 0) {
    input = [0, 0.2, 0.25];
    opacityOut = [1, 1, 0];
    imgXOut = [0, 0, -150];
    imgYOut = [0, 0, -300];
    imgRotateOut = [0, 0, -45];
    scaleOut = [1, 1, 0.5];

    textXOut = [0, 0, 150];
    textYOut = [0, 0, -100];
  } else if (index === 3) {
    input = [0.65, 0.75, 1];
    opacityOut = [0, 1, 1];
    imgXOut = [150, 0, 0];
    imgYOut = [300, 0, 0];
    imgRotateOut = [45, 0, 0];
    scaleOut = [0.5, 1, 1];

    textXOut = [150, 0, 0];
    textYOut = [100, 0, 0];
  } else {
    const start = index * 0.25 - 0.05;
    const active = index * 0.25;
    const hold = (index + 1) * 0.25 - 0.05;
    const end = (index + 1) * 0.25;

    input = [start, active, hold, end];
    opacityOut = [0, 1, 1, 0];
    imgXOut = [150, 0, 0, -150];
    imgYOut = [300, 0, 0, -300];
    imgRotateOut = [45, 0, 0, -45];
    scaleOut = [0.5, 1, 1, 0.5];

    textXOut = [150, 0, 0, 150];
    textYOut = [100, 0, 0, -100];
  }

  const opacity = useTransform(progress, input, opacityOut);
  const imgX = useTransform(progress, input, imgXOut);
  const imgY = useTransform(progress, input, imgYOut);
  const imgRotate = useTransform(progress, input, imgRotateOut);
  const scale = useTransform(progress, input, scaleOut);

  const textX = useTransform(progress, input, textXOut);
  const textY = useTransform(progress, input, textYOut);

  return (
    <motion.div
      style={{ opacity, zIndex: 10 - index }}
      className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 pointer-events-none"
    >
      {/* 1. CỘT TRÁI: HÌNH ẢNH TRÒN (Thu nhỏ lại trên Mobile/Tablet để nhường chỗ cho chữ) */}
      <motion.div
        style={{ x: imgX, y: imgY, rotate: imgRotate, scale }}
        className="w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] relative rounded-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] lg:shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-4 lg:border-8 border-white dark:border-[#1a1a1a] shrink-0"
      >
        <div className="absolute inset-0 bg-[#FF7A00]/20 mix-blend-overlay z-20 pointer-events-none" />
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover relative z-10"
        />
      </motion.div>

      {/* 2. CỘT PHẢI: LỜI NÓI CHỨNG THỰC & INFO */}
      <motion.div
        style={{ x: textX, y: textY, scale }}
        className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center relative text-center lg:text-left"
      >
        <Quote className="text-[#FF7A00]/20 w-16 h-16 lg:w-32 lg:h-32 absolute -top-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-top-12 lg:-left-12 -z-10" />

        <div className="flex gap-1.5 lg:gap-2 mb-4 lg:mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 lg:w-6 lg:h-6 ${
                i < item.rating
                  ? "fill-[#FF7A00] text-[#FF7A00]"
                  : "text-gray-300 dark:text-zinc-700"
              }`}
            />
          ))}
        </div>

        {/* Cỡ chữ được tinh chỉnh cho nhỏ gọn hơn trên Mobile */}
        <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-relaxed lg:leading-[1.3] tracking-tight mb-6 lg:mb-8 max-w-2xl">
          "{item.content}"
        </h3>

        <div>
          <p className="text-lg lg:text-xl font-black text-gray-900 dark:text-white drop-shadow-sm">
            {item.name}
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start text-xs lg:text-sm text-gray-500 dark:text-zinc-400 gap-2 font-medium mt-1 lg:mt-2 uppercase tracking-wider">
            <span>{item.role}</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
            <span>{item.location}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
