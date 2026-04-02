import axiosClient from "@/lib/axios-client";
import {
  AssignRoleRequest,
  CreateUserRequest,
  GetUsersParams,
  GetUsersResponse,
  UpdateStatusRequest,
  UpdateUserRequest,
  UserDetailDto,
} from "@/types/user.type";

export const userService = {
  getUsers: async (params: GetUsersParams): Promise<GetUsersResponse> => {
    return await axiosClient.get("/Users", { params });
  },
  getUserById: async (id: string): Promise<UserDetailDto> => {
    const response = await axiosClient.get(`/Users/${id}`);
    return (response as any).data ?? response;
  },

  createUser: async (data: CreateUserRequest) => {
    const response = await axiosClient.post("/Users", data);
    return response.data;
  },

  //   updateUser: async (id: string, data: UpdateUserRequest) => {
  //     const response = await axiosClient.put(`/Users/${id}`, data);
  //     return response.data;
  //   },

  deleteUser: async (id: string) => {
    const response = await axiosClient.delete(`/Users/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const payload: UpdateStatusRequest = { status };
    const response = await axiosClient.patch(`/Users/${id}/status`, payload);
    return response.data;
  },

  assignRole: async (id: string, data: AssignRoleRequest) => {
    const response = await axiosClient.post(`/Users/${id}/roles`, data);
    return response.data;
  },

  removeRole: async (id: string, roleName: string) => {
    const response = await axiosClient.delete(`/Users/${id}/roles/${roleName}`);
    return response.data;
  },
};
