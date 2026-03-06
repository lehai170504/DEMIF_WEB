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
  confirmPassword: string;
  username: string;
}

//==================================
// 2. KẾT QUẢ TRẢ VỀ SAU KHI ĐĂNG KÝ
export interface RegisterResponse {
  userId: string;
  email: string;
  username: string;
  message: string;
  requiresEmailVerification: boolean;
}

//==================================
// 3. KẾT QUẢ TRẢ VỀ SAU KHI XÁC THỰC EMAIL (CÓ TRẢ VỀ TOKEN)
export interface VerifyEmailResponse {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  roles: string[];
  message: string;
}

//==================================
export interface GoogleLoginPayload {
  idToken: string;
}
