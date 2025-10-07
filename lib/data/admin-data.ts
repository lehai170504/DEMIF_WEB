export interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalLessons: number
  totalExercises: number
  avgCompletionRate: number
  avgAccuracy: number
}

export interface UserManagement {
  id: string
  username: string
  email: string
  status: "active" | "suspended" | "banned"
  joinedDate: string
  lastActive: string
  completedLessons: number
  totalScore: number
}

export interface ContentManagement {
  id: string
  title: string
  type: "dictation" | "shadowing"
  level: "beginner" | "intermediate" | "advanced"
  status: "published" | "draft" | "archived"
  createdDate: string
  completions: number
  avgScore: number
}

export const adminStats: AdminStats = {
  totalUsers: 12450,
  activeUsers: 8920,
  totalLessons: 250,
  totalExercises: 45680,
  avgCompletionRate: 68,
  avgAccuracy: 79,
}

export const usersData: UserManagement[] = [
  {
    id: "user-101",
    username: "LanguageMaster",
    email: "master@example.com",
    status: "active",
    joinedDate: "2024-10-15",
    lastActive: "2025-01-07",
    completedLessons: 45,
    totalScore: 9850,
  },
  {
    id: "user-102",
    username: "FluentSpeaker",
    email: "fluent@example.com",
    status: "active",
    joinedDate: "2024-11-02",
    lastActive: "2025-01-07",
    completedLessons: 42,
    totalScore: 9420,
  },
  {
    id: "user-103",
    username: "SpamUser123",
    email: "spam@example.com",
    status: "suspended",
    joinedDate: "2024-12-20",
    lastActive: "2025-01-05",
    completedLessons: 2,
    totalScore: 150,
  },
]

export const contentData: ContentManagement[] = [
  {
    id: "lesson-1",
    title: "Daily Greetings",
    type: "dictation",
    level: "beginner",
    status: "published",
    createdDate: "2024-09-01",
    completions: 1250,
    avgScore: 85,
  },
  {
    id: "lesson-2",
    title: "At the Restaurant",
    type: "dictation",
    level: "beginner",
    status: "published",
    createdDate: "2024-09-05",
    completions: 980,
    avgScore: 82,
  },
  {
    id: "lesson-3",
    title: "Business Meeting",
    type: "shadowing",
    level: "intermediate",
    status: "published",
    createdDate: "2024-09-10",
    completions: 650,
    avgScore: 76,
  },
  {
    id: "lesson-draft-1",
    title: "Advanced Negotiations",
    type: "dictation",
    level: "advanced",
    status: "draft",
    createdDate: "2025-01-05",
    completions: 0,
    avgScore: 0,
  },
]
