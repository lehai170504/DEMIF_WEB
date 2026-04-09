export interface StatsSummaryResponse {
  longestStreak: number;
  currentStreak: number;
  savedWordsCount: number;
  totalPracticeMinutes: number;
  totalXp: number;
}

export interface HeatmapItem {
  date: string;
  count: number;
}

export interface HeatmapResponse {
  startDate: string;
  endDate: string;
  totalActivities: number;
  data: HeatmapItem[];
}

export interface DailyPracticeItem {
  date: string;
  minutes: number;
  xpEarned: number;
  sessionsCount: number;
}

export interface DailyPracticeResponse {
  exerciseType?: string;
  days: number;
  data: DailyPracticeItem[];
}

export interface ProgressResponse {
  totalPoints: number;
  totalMinutes: number;
  lessonsCompleted: number;
  dictationCompleted: number;
  shadowingCompleted: number;
  avgDictationScore: number;
  avgShadowingScore: number;
  currentLevel: string;
  levelProgress: number; // percentage normally
}

export interface StreakResponse {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  freezesAvailable: number;
  lastActiveDate: string;
  learnedToday: boolean;
}

export interface SkillAnalyticsResponse {
  [key: string]: any; // Flexibly defined since Swagger lacked schema
}
