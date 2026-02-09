// src/types/auth.type.ts

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  country: string;
  nativeLanguage: string;
  targetLanguage: string;
  currentLevel: string;
  dailyGoalMinutes: number;
  roles: string[];
  authProvider: string;
  createdAt: string;
  lastLoginAt: string;
}

//==================================
export interface LoginResponse {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  roles: string[];
}

//==================================
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

//==================================
export interface UpdateProfilePayload {
  username: string;
  avatarUrl: string | null;
  country: string;
  nativeLanguage: string;
  targetLanguage: string;
  currentLevel: string;
  dailyGoalMinutes: number;
}

//==================================
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

//==================================
export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string; // Trường mới
  username: string;
  country: string; // Trường mới
  nativeLanguage: string; // Trường mới
  targetLanguage: string; // Trường mới
}

//==================================
export interface RegisterResponse {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  roles: string[];
}

//==================================
export interface FirebaseLoginPayload {
  idToken: string;
}

export interface FirebaseLoginResponse {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
  roles: string[];
  isNewUser: boolean;
}
