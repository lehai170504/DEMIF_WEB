export interface Lesson {
  id: string
  title: string
  description: string
  level: "beginner" | "intermediate" | "advanced" // Giữ nguyên giá trị key tiếng Anh trong code
  duration: number // tính bằng giây
  audioUrl: string
  transcript: string
  vocabulary: string[]
  category: string
}

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Chào Hỏi Hàng Ngày",
    description: "Học các câu chào hỏi và giới thiệu cơ bản thông thường.",
    level: "beginner",
    duration: 45,
    audioUrl: "/audio/lesson-1.mp3",
    transcript: "Hello, my name is Sarah. Nice to meet you. How are you today?",
    vocabulary: ["hello", "name", "nice", "meet", "how"],
    category: "Hội Thoại",
  },
  {
    id: "lesson-2",
    title: "Tại Nhà Hàng",
    description: "Thực hành gọi món ăn và đồ uống.",
    level: "beginner",
    duration: 60,
    audioUrl: "/audio/lesson-2.mp3",
    transcript: "I would like to order a coffee and a sandwich, please. Can I have the bill?",
    vocabulary: ["order", "coffee", "sandwich", "please", "bill"],
    category: "Ăn Uống",
  },
  {
    id: "lesson-3",
    title: "Cuộc Họp Kinh Doanh",
    description: "Giao tiếp chuyên nghiệp trong môi trường họp hành.",
    level: "intermediate",
    duration: 90,
    audioUrl: "/audio/lesson-3.mp3",
    transcript:
      "Good morning everyone. Let's begin today's meeting by reviewing the quarterly results and discussing our strategy for the next quarter.",
    vocabulary: ["meeting", "quarterly", "results", "strategy", "discuss"],
    category: "Kinh Doanh",
  },
  {
    id: "lesson-4",
    title: "Chỉ Đường Du Lịch",
    description: "Thực hành hỏi và chỉ đường.",
    level: "intermediate",
    duration: 75,
    audioUrl: "/audio/lesson-4.mp3",
    transcript:
      "Excuse me, could you tell me how to get to the train station? Go straight ahead, then turn left at the second traffic light.",
    vocabulary: ["directions", "station", "straight", "turn", "traffic"],
    category: "Du Lịch",
  },
  {
    id: "lesson-5",
    title: "Thảo Luận Học Thuật Chuyên Sâu",
    description: "Các thuật ngữ và khái niệm học thuật phức tạp.",
    level: "advanced",
    duration: 120,
    audioUrl: "/audio/lesson-5.mp3",
    transcript:
      "The research methodology employed in this study demonstrates a comprehensive approach to analyzing the socioeconomic factors that influence educational outcomes.",
    vocabulary: ["methodology", "comprehensive", "socioeconomic", "influence", "outcomes"],
    category: "Học Thuật",
  },
]