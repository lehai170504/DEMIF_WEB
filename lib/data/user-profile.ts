export interface UserProfile {
  id: string
  username: string
  email: string
  avatar: string
  country: string
  nativeLanguage: string
  targetLanguage: string
  learningGoal: string
  dailyGoalMinutes: number
  notifications: {
    email: boolean
    push: boolean
    dailyReminder: boolean
    weeklyReport: boolean
  }
  privacy: {
    showProfile: boolean
    showProgress: boolean
    showOnLeaderboard: boolean
  }
  joinedDate: string
}

export const mockUserProfile: UserProfile = {
  id: "user-1",
  username: "You",
  email: "user@example.com",
  avatar: "/placeholder.svg",
  country: "USA",
  nativeLanguage: "English",
  targetLanguage: "Spanish",
  learningGoal: "Professional fluency",
  dailyGoalMinutes: 30,
  notifications: {
    email: true,
    push: true,
    dailyReminder: true,
    weeklyReport: true,
  },
  privacy: {
    showProfile: true,
    showProgress: true,
    showOnLeaderboard: true,
  },
  joinedDate: "2024-12-01",
}
