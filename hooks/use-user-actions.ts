// src/hooks/use-user-actions.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/error";

export const useUserActions = () => {
  const queryClient = useQueryClient();

  // Helper để invalidate queries (làm mới dữ liệu)
  const invalidateUser = (userId?: string) => {
    queryClient.invalidateQueries({ queryKey: ["users"] }); // Refresh list
    if (userId) {
      queryClient.invalidateQueries({ queryKey: ["user-detail", userId] }); // Refresh detail
    }
  };

  // 1. Update Status (Ban/Unban)
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      userService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success("Trạng thái đã đổi", {
        description: `Tài khoản đã được chuyển sang trạng thái: ${variables.status.toUpperCase()}.`,
      });
      invalidateUser(variables.id);
    },
    onError: (error: any) =>
      toast.error("Thao tác thất bại", {
        description: extractErrorMessage(
          error,
          "Không thể cập nhật trạng thái người dùng.",
        ),
      }),
  });

  // 2. Delete User
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      toast.success("Đã gỡ bỏ tài khoản", {
        description: "Người dùng đã được xóa hoàn toàn khỏi hệ thống.",
      });
      invalidateUser();
    },
    onError: (error: any) =>
      toast.error("Lỗi xóa tài khoản", {
        description: extractErrorMessage(
          error,
          "Người dùng này có thể đang có dữ liệu ràng buộc.",
        ),
      }),
  });

  // 3. Assign Role
  const assignRoleMutation = useMutation({
    mutationFn: ({ id, roleName }: { id: string; roleName: string }) =>
      userService.assignRole(id, { roleName }),
    onSuccess: (_, variables) => {
      toast.success("Cấp quyền thành công", {
        description: `Quyền [${variables.roleName.toUpperCase()}] đã được gán cho tài khoản.`,
      });
      invalidateUser(variables.id);
    },
    onError: (error: any) =>
      toast.error("Lỗi cấp quyền", {
        description: extractErrorMessage(
          error,
          "Không thể gán quyền này vào lúc này.",
        ),
      }),
  });

  // 4. Remove Role
  const removeRoleMutation = useMutation({
    mutationFn: ({ id, roleName }: { id: string; roleName: string }) =>
      userService.removeRole(id, roleName),
    onSuccess: (_, variables) => {
      toast.success("Gỡ quyền thành công", {
        description: `Quyền [${variables.roleName.toUpperCase()}] đã được gỡ khỏi tài khoản.`,
      });
      invalidateUser(variables.id);
    },
    onError: (error: any) =>
      toast.error("Lỗi gỡ quyền", {
        description: extractErrorMessage(
          error,
          "Không thể thực hiện thay đổi quyền hạn.",
        ),
      }),
  });

  return {
    updateStatus: updateStatusMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    assignRole: assignRoleMutation.mutate,
    removeRole: removeRoleMutation.mutate,
    isPending:
      updateStatusMutation.isPending ||
      deleteUserMutation.isPending ||
      assignRoleMutation.isPending ||
      removeRoleMutation.isPending,
  };
};
