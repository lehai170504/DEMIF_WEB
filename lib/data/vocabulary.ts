export interface VocabularyItem {
  id: string
  word: string
  translation: string
  example: string
  difficulty: "easy" | "medium" | "hard"
  nextReview: string
  reviewCount: number
  mastery: number
}

export const vocabularyItems: VocabularyItem[] = [
  {
    id: "vocab-1",
    word: "hello",
    translation: "a greeting",
    example: "Hello, how are you today?",
    difficulty: "easy",
    nextReview: "2025-01-08",
    reviewCount: 5,
    mastery: 95,
  },
  {
    id: "vocab-2",
    word: "restaurant",
    translation: "a place where meals are served",
    example: "Let's meet at the restaurant for dinner.",
    difficulty: "medium",
    nextReview: "2025-01-07",
    reviewCount: 3,
    mastery: 70,
  },
  {
    id: "vocab-3",
    word: "methodology",
    translation: "a system of methods used in a particular area",
    example: "The research methodology was comprehensive.",
    difficulty: "hard",
    nextReview: "2025-01-07",
    reviewCount: 2,
    mastery: 45,
  },
  {
    id: "vocab-4",
    word: "strategy",
    translation: "a plan of action designed to achieve a goal",
    example: "We need to discuss our marketing strategy.",
    difficulty: "medium",
    nextReview: "2025-01-08",
    reviewCount: 4,
    mastery: 80,
  },
  {
    id: "vocab-5",
    word: "comprehensive",
    translation: "complete and including everything",
    example: "The report provides a comprehensive analysis.",
    difficulty: "hard",
    nextReview: "2025-01-07",
    reviewCount: 1,
    mastery: 30,
  },
]
