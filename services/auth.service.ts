// src/services/auth.service.ts
import axiosClient from "@/lib/axios-client";
import {
  ChangePasswordPayload,
  GoogleLoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UpdateProfilePayload,
  UserProfile,
  VerifyEmailResponse,
} from "@/types/auth.type";

export const authService = {
  login: async (payload: any): Promise<LoginResponse> => {
    return await axiosClient.post("/Auth/login", payload);
  },

  getProfile: async (): Promise<UserProfile> => {
    return await axiosClient.get("/Profile/me");
  },

  logout: async (refreshToken: string) => {
    return await axiosClient.post("/Auth/logout", { refreshToken });
  },

  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<UserProfile> => {
    return await axiosClient.put("/Profile/me", payload);
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    return await axiosClient.post("/Profile/change-password", payload);
  },

  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    return await axiosClient.post("/Auth/register", payload);
  },

  // THÊM MỚI HÀM VERIFY EMAIL
  verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
    return await axiosClient.get("/Auth/verify-email", { params: { token } });
  },

  googleLogin: async (payload: GoogleLoginPayload): Promise<LoginResponse> => {
    return await axiosClient.post("/Auth/google-login", payload);
  },
};
