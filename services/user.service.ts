import axiosClient from "@/lib/axios-client";
import {
  AssignRoleRequest,
  CreateUserRequest,
  GetUsersParams,
  GetUsersResponse,
  UpdateStatusRequest,
  UserDetailDto,
} from "@/types/user.type";

export const userService = {
  getUsers: async (params: GetUsersParams): Promise<GetUsersResponse> => {
    const response = await axiosClient.get("/admin/users", { params });

    return response as unknown as GetUsersResponse;
  },
  getUserById: async (id: string): Promise<UserDetailDto> => {
    const response = await axiosClient.get(`/admin/users/${id}`);
    return (response as any).data ?? response;
  },

  createUser: async (data: CreateUserRequest) => {
    const response = await axiosClient.post("/admin/users", data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await axiosClient.delete(`/admin/users/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const payload: UpdateStatusRequest = { status };
    const response = await axiosClient.patch(
      `/admin/users/${id}/status`,
      payload,
    );
    return response.data;
  },

  assignRole: async (id: string, data: AssignRoleRequest) => {
    const response = await axiosClient.post(`/admin/users/${id}/roles`, data);
    return response.data;
  },

  removeRole: async (id: string, roleName: string) => {
    const response = await axiosClient.delete(
      `/admin/users/${id}/roles/${roleName}`,
    );
    return response.data;
  },
};
