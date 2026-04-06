// Params truyền lên
// 1. Params cho API (Theo Swagger hình ảnh c495c8)
export interface GetUsersParams {
  Page?: number;
  PageSize?: number;
  SearchTerm?: string;
  Status?: string;
}

// 2. Đối tượng User
export interface UserDto {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  status: "Active" | "Inactive" | "Banned" | string;
  roles: string[];
  createdAt: string;
  lastLoginAt: string | null;
}

// 3. Response trả về từ API
export interface GetUsersResponse {
  users: UserDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
//=================================
export interface RoleDto {
  roleId: string;
  roleName: string;
  assignedAt: string;
  expiresAt: string | null;
}

export interface UserDetailDto {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  status: string; // "Active"
  country: string | null;
  nativeLanguage: string | null;
  targetLanguage: string | null;
  currentLevel: string | null;
  dailyGoalMinutes: number;
  authProvider: string; // "google"
  roles: RoleDto[];
  createdAt: string;
  updatedAt: string | null;
  lastLoginAt: string | null;
}

//================================
export interface RoleDto {
  roleId: string;
  roleName: string;
  assignedAt: string;
  expiresAt: string | null;
}

export interface CreateUserRequest {
  email: string;
  password?: string;
  username: string;
  country?: string;
  nativeLanguage?: string;
  targetLanguage?: string;
  avatarUrl?: string;
  roles?: string[]; // ["Admin"]
}

export interface UpdateUserRequest {
  username?: string;
  avatarUrl?: string;
  country?: string;
  nativeLanguage?: string;
  targetLanguage?: string;
  currentLevel?: string;
  dailyGoalMinutes?: number;
}

export interface UpdateStatusRequest {
  status: string; // "Active", "Banned", "Suspended"
}

export interface AssignRoleRequest {
  roleName: string;
  expiresAt?: string; // Optional date string
}
