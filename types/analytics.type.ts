// ============================================================================
// 1. SHARED DTOs (CÁC TYPE DÙNG CHUNG)
// ============================================================================

export interface KeyCountDto {
  key: string;
  count: number;
}

export interface KeyAmountDto {
  key: string;
  amount: number;
}

export interface AlertDto {
  code: string;
  title: string;
  message: string;
  count: number;
  severity: "warning" | "error" | "critical" | "info" | string;
}

export interface LessonStatDto {
  lessonId: string;
  title: string;
  status: string;
  lessonType: string;
  level: string;
  category: string | null;
  avgScore: number;
  completionsCount: number;
  createdAt: string;
  authorId: string | null;
}

export interface TopUserDto {
  userId: string;
  username: string;
  email: string;
  currentLevel: string;
  totalPoints: number;
  totalMinutes: number;
  engagementScore: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  lastLoginAt: string;
}

export interface RecentPaymentDto {
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  planName: string;
  planTier: string;
  createdAt: string;
  completedAt: string;
}

export interface RecentVocabularyDto {
  vocabularyId: string;
  lessonId: string;
  lessonTitle: string;
  topic: string;
  word: string;
  reviewStatus: string;
  nextReviewAt: string;
  createdAt: string;
}

export interface BlogStatDto {
  blogId: string;
  title: string;
  status: string;
  viewCount: number;
  createdAt: string;
  authorId: string | null;
}

export interface LessonAccessDto {
  lessonId: string;
  title: string;
  lessonType: string;
  level: string;
  category: string | null;
  accessCount: number;
  uniqueUsers: number;
  completedCount: number;
  inProgressCount: number;
  startedCount: number;
  completionRate: number;
  firstAccessedAt: string;
  lastAccessedAt: string;
  createdAt: string;
}

// Bóc tách Summary ra để dùng chung cho Full Dashboard và Overview
export interface DashboardSummaryDto {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalLessons: number;
  publishedLessons: number;
  totalExercises: number;
  totalVocabulary: number;
  dueVocabulary: number;
  activeSubscriptions: number;
  expiringSubscriptionsSoon: number;
  totalRevenue: number;
  pendingPayments: number;
  totalBlogs: number;
}

// ============================================================================
// 2. ENDPOINT RESPONSES (RESPONSE CHO TỪNG API LẺ)
// ============================================================================

// GET /api/admin/analytics/overview
export interface AdminOverviewResponse {
  generatedAt: string;
  summary: DashboardSummaryDto;
  alerts: AlertDto[];
  topUsers: TopUserDto[];
  popularLessons: LessonStatDto[];
  difficultLessons: LessonStatDto[];
  recentPayments: RecentPaymentDto[];
}

// GET /api/admin/analytics/users
export interface AdminUsersResponse {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  bannedUsers: number;
  verifiedUsers: number;
  newUsersToday: number;
  newUsersThisMonth: number;
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  usersActiveInLast7Days: number;
  byStatus: KeyCountDto[];
  byAuthProvider: KeyCountDto[];
  byLevel: KeyCountDto[];
  byCountry: KeyCountDto[];
}

// GET /api/admin/analytics/lessons
export interface AdminLessonsResponse {
  totalLessons: number;
  publishedLessons: number;
  draftLessons: number;
  archivedLessons: number;
  dictationLessons: number;
  shadowingLessons: number;
  premiumLessons: number;
  audioLessons: number;
  youtubeLessons: number;
  totalCompletions: number;
  averageScore: number;
  byStatus: KeyCountDto[];
  byType: KeyCountDto[];
  byLevel: KeyCountDto[];
  byCategory: KeyCountDto[];
  byMediaType: KeyCountDto[];
  popularLessons: LessonStatDto[];
  difficultLessons: LessonStatDto[];
  recentLessons: LessonStatDto[];
  accessStats?: AdminLessonAccessResponse; // Có thể BE gộp vào luôn
}

// GET /api/admin/analytics/lessons/access
export interface AdminLessonAccessResponse {
  generatedAt: string;
  totalAccessEvents: number;
  totalTrackedLessons: number;
  totalTrackedUsers: number;
  completedTrackers: number;
  inProgressTrackers: number;
  startedTrackers: number;
  topAccessedLessons: LessonAccessDto[];
  recentAccessedLessons: LessonAccessDto[]; // Hoặc mảng type tương tự
  byStatus: KeyCountDto[];
  byAccessType: KeyCountDto[];
}

// GET /api/admin/analytics/vocabulary
export interface AdminVocabularyResponse {
  totalVocabulary: number;
  dueVocabulary: number;
  overdueVocabulary: number;
  newVocabulary: number;
  masteredVocabulary: number;
  learningVocabulary: number;
  recentVocabulary: number;
  vocabularyLessons: number;
  vocabularyTopics: number;
  topTopics: KeyCountDto[];
  topLessons: LessonStatDto[];
  recentItems: RecentVocabularyDto[];
}

// GET /api/admin/analytics/payments
export interface AdminPaymentsResponse {
  totalPayments: number;
  completedPayments: number;
  pendingPayments: number;
  failedPayments: number;
  refundedPayments: number;
  totalRevenue: number;
  todayRevenue: number;
  monthlyRevenue: number;
  averagePaymentAmount: number;
  paymentsToday: number;
  paymentsThisMonth: number;
  byStatus: KeyCountDto[];
  byMethod: KeyCountDto[];
  revenueByTier: KeyAmountDto[];
  revenueByBillingCycle: KeyAmountDto[];
  recentPayments: RecentPaymentDto[];
}

// GET /api/admin/analytics/content
export interface AdminContentResponse {
  blogs: {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    archivedBlogs: number;
    totalViews: number;
    averageViews: number;
    byStatus: KeyCountDto[];
    popularBlogs: BlogStatDto[];
    recentBlogs: BlogStatDto[];
  };
  notifications: {
    totalNotifications: number;
    unreadNotifications: number;
    readNotifications: number;
    notificationsToday: number;
    notificationsThisMonth: number;
    byType: KeyCountDto[];
    byChannel: KeyCountDto[];
  };
  engagement: {
    usersWithProgress: number;
    usersWithStreak: number;
    usersWithAnalytics: number;
    averagePoints: number;
    averageMinutes: number;
    averageLessonsCompleted: number;
    averageDictationScore: number;
    averageShadowingScore: number;
    averageCurrentStreak: number;
    longestStreak: number;
    topUsers: TopUserDto[];
  };
}

// ============================================================================
// 3. FULL DASHBOARD RESPONSE (GET /api/admin/analytics)
// ============================================================================

export interface AdminAnalyticsResponse {
  generatedAt: string;
  summary: DashboardSummaryDto;
  users: AdminUsersResponse;
  lessons: AdminLessonsResponse;
  vocabulary: AdminVocabularyResponse;
  payments: AdminPaymentsResponse;

  // Các field dưới đây nếu BE ghép vào cục to:
  blogs?: AdminContentResponse["blogs"];
  notifications?: AdminContentResponse["notifications"];
  engagement?: AdminContentResponse["engagement"];

  alerts: AlertDto[];

  // Những list này có thể nằm chỏng chơ ngoài root giống Overview tuỳ cách BE format
  topUsers?: TopUserDto[];
  popularLessons?: LessonStatDto[];
  difficultLessons?: LessonStatDto[];
  recentLessons?: LessonStatDto[];
  recentPayments?: RecentPaymentDto[];
}
