export interface UserProgress {
  userId: string
  totalLessons: number
  completedLessons: number
  currentStreak: number
  longestStreak: number
  totalMinutes: number
  averageAccuracy: number
  skillRadar: {
    listening: number
    speaking: number
    vocabulary: number
    pronunciation: number
    fluency: number
  }
  recentActivity: {
    date: string
    type: "dictation" | "shadowing"
    lessonTitle: string
    score: number
  }[]
  weeklyProgress: {
    day: string
    minutes: number
  }[]
}

export const mockUserProgress: UserProgress = {
  userId: "user-1",
  totalLessons: 25,
  completedLessons: 12,
  currentStreak: 7,
  longestStreak: 14,
  totalMinutes: 340,
  averageAccuracy: 82,
  skillRadar: {
    listening: 85,
    speaking: 78,
    vocabulary: 82,
    pronunciation: 75,
    fluency: 80,
  },
  recentActivity: [
    {
      date: "2025-01-07",
      type: "dictation",
      lessonTitle: "Daily Greetings",
      score: 88,
    },
    {
      date: "2025-01-06",
      type: "shadowing",
      lessonTitle: "At the Restaurant",
      score: 82,
    },
    {
      date: "2025-01-05",
      type: "dictation",
      lessonTitle: "Business Meeting",
      score: 79,
    },
    {
      date: "2025-01-04",
      type: "shadowing",
      lessonTitle: "Travel Directions",
      score: 85,
    },
  ],
  weeklyProgress: [
    { day: "Mon", minutes: 45 },
    { day: "Tue", minutes: 60 },
    { day: "Wed", minutes: 30 },
    { day: "Thu", minutes: 55 },
    { day: "Fri", minutes: 40 },
    { day: "Sat", minutes: 70 },
    { day: "Sun", minutes: 40 },
  ],
}
