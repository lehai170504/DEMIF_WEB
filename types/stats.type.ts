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
