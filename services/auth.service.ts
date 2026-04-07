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
    return await axiosClient.post("/auth/login", payload);
  },

  getProfile: async (): Promise<UserProfile> => {
    return await axiosClient.get("/profile/me");
  },

  logout: async (refreshToken: string) => {
    return await axiosClient.post("/auth/logout", { refreshToken });
  },

  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<UserProfile> => {
    return await axiosClient.put("/profile/me", payload);
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    return await axiosClient.post("/profile/change-password", payload);
  },

  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    return await axiosClient.post("/auth/register", payload);
  },

  verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
    return await axiosClient.get("/auth/verify-email", { params: { token } });
  },

  googleLogin: async (payload: GoogleLoginPayload): Promise<LoginResponse> => {
    return await axiosClient.post("/auth/google-login", payload);
  },
};
