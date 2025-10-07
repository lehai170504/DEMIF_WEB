export interface Lesson {
  id: string
  title: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
  duration: number // in seconds
  audioUrl: string
  transcript: string
  vocabulary: string[]
  category: string
}

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Daily Greetings",
    description: "Learn common greetings and introductions",
    level: "beginner",
    duration: 45,
    audioUrl: "/audio/lesson-1.mp3",
    transcript: "Hello, my name is Sarah. Nice to meet you. How are you today?",
    vocabulary: ["hello", "name", "nice", "meet", "how"],
    category: "Conversation",
  },
  {
    id: "lesson-2",
    title: "At the Restaurant",
    description: "Practice ordering food and drinks",
    level: "beginner",
    duration: 60,
    audioUrl: "/audio/lesson-2.mp3",
    transcript: "I would like to order a coffee and a sandwich, please. Can I have the bill?",
    vocabulary: ["order", "coffee", "sandwich", "please", "bill"],
    category: "Dining",
  },
  {
    id: "lesson-3",
    title: "Business Meeting",
    description: "Professional communication in meetings",
    level: "intermediate",
    duration: 90,
    audioUrl: "/audio/lesson-3.mp3",
    transcript:
      "Good morning everyone. Let's begin today's meeting by reviewing the quarterly results and discussing our strategy for the next quarter.",
    vocabulary: ["meeting", "quarterly", "results", "strategy", "discuss"],
    category: "Business",
  },
  {
    id: "lesson-4",
    title: "Travel Directions",
    description: "Asking for and giving directions",
    level: "intermediate",
    duration: 75,
    audioUrl: "/audio/lesson-4.mp3",
    transcript:
      "Excuse me, could you tell me how to get to the train station? Go straight ahead, then turn left at the second traffic light.",
    vocabulary: ["directions", "station", "straight", "turn", "traffic"],
    category: "Travel",
  },
  {
    id: "lesson-5",
    title: "Academic Discussion",
    description: "Complex academic vocabulary and concepts",
    level: "advanced",
    duration: 120,
    audioUrl: "/audio/lesson-5.mp3",
    transcript:
      "The research methodology employed in this study demonstrates a comprehensive approach to analyzing the socioeconomic factors that influence educational outcomes.",
    vocabulary: ["methodology", "comprehensive", "socioeconomic", "influence", "outcomes"],
    category: "Academic",
  },
]
