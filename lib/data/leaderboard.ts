export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  avatar: string
  totalScore: number
  completedLessons: number
  currentStreak: number
  country: string
}

export const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "user-101",
    username: "LanguageMaster",
    avatar: "/diverse-avatars.png",
    totalScore: 9850,
    completedLessons: 45,
    currentStreak: 28,
    country: "USA",
  },
  {
    rank: 2,
    userId: "user-102",
    username: "FluentSpeaker",
    avatar: "/diverse-avatars.png",
    totalScore: 9420,
    completedLessons: 42,
    currentStreak: 21,
    country: "UK",
  },
  {
    rank: 3,
    userId: "user-103",
    username: "WordWizard",
    avatar: "/diverse-avatars.png",
    totalScore: 9180,
    completedLessons: 40,
    currentStreak: 19,
    country: "Canada",
  },
  {
    rank: 4,
    userId: "user-104",
    username: "PronunciationPro",
    avatar: "/diverse-avatars.png",
    totalScore: 8950,
    completedLessons: 38,
    currentStreak: 15,
    country: "Australia",
  },
  {
    rank: 5,
    userId: "user-105",
    username: "ListeningLegend",
    avatar: "/diverse-avatars.png",
    totalScore: 8720,
    completedLessons: 36,
    currentStreak: 14,
    country: "Germany",
  },
  {
    rank: 6,
    userId: "user-1",
    username: "You",
    avatar: "/diverse-avatars.png",
    totalScore: 8500,
    completedLessons: 35,
    currentStreak: 7,
    country: "USA",
  },
  {
    rank: 7,
    userId: "user-106",
    username: "ShadowChampion",
    avatar: "/diverse-avatars.png",
    totalScore: 8320,
    completedLessons: 34,
    currentStreak: 12,
    country: "France",
  },
  {
    rank: 8,
    userId: "user-107",
    username: "DictationKing",
    avatar: "/diverse-avatars.png",
    totalScore: 8100,
    completedLessons: 32,
    currentStreak: 10,
    country: "Japan",
  },
]
