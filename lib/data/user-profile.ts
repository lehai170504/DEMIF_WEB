export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  country: string;
  nativeLanguage: string;
  targetLanguage: string;
  learningGoal: string;
  dailyGoalMinutes: number;
  notifications: {
    email: boolean;
    push: boolean;
    dailyReminder: boolean;
    weeklyReport: boolean;
  };
  privacy: {
    showProfile: boolean;
    showProgress: boolean;
    showOnLeaderboard: boolean;
  };
  joinedDate: string;
}

export const mockUserProfile: UserProfile = {
  id: "user-1",
  username: "huynhhutoan",
  email: "huynhhutoan@gmail.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
  country: "Vietnam",
  nativeLanguage: "Vietnamese",
  targetLanguage: "English",
  learningGoal: "Fluent conversation",
  dailyGoalMinutes: 45,
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
  joinedDate: "2024-01-15",
}; // Mock list of existing usernames to check for duplicates
export const existingUsernames = [
  "admin_user",
  "english_learner",
  "student_vip",
  "language_master",
  "pronunciation_pro",
  "fluent_speaker",
  "grammar_guru",
  "vocab_wizard",
  "listening_legend",
  "speaking_star",
  "huynhhutoan", // current user
];

// Helper function to check if username exists
export const checkUsernameExists = (
  username: string,
  currentUsername: string = ""
): boolean => {
  return existingUsernames.some(
    (u) =>
      u.toLowerCase() === username.toLowerCase() &&
      u.toLowerCase() !== currentUsername.toLowerCase()
  );
};

// Helper function to validate username format
export const validateUsername = (
  username: string
): { isValid: boolean; error?: string } => {
  if (!username || username.length < 3) {
    return { isValid: false, error: "Username phải có ít nhất 3 ký tự" };
  }

  if (username.length > 20) {
    return { isValid: false, error: "Username không được quá 20 ký tự" };
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      error: "Username chỉ được chứa chữ cái, số và dấu gạch dưới",
    };
  }

  if (checkUsernameExists(username, mockUserProfile.username)) {
    return { isValid: false, error: "Username này đã tồn tại" };
  }

  return { isValid: true };
};
