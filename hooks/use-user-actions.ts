// src/hooks/use-user-actions.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { toast } from "sonner";

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
      toast.success(`Đã cập nhật trạng thái thành: ${variables.status}`);
      invalidateUser(variables.id);
    },
    onError: () => toast.error("Lỗi khi cập nhật trạng thái."),
  });

  // 2. Delete User
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      toast.success("Đã xóa người dùng thành công");
      invalidateUser(); // Chỉ cần refresh list
    },
    onError: () => toast.error("Lỗi khi xóa người dùng."),
  });

  // 3. Assign Role
  const assignRoleMutation = useMutation({
    mutationFn: ({ id, roleName }: { id: string; roleName: string }) =>
      userService.assignRole(id, { roleName }),
    onSuccess: (_, variables) => {
      toast.success(`Đã cấp quyền ${variables.roleName}`);
      invalidateUser(variables.id);
    },
    onError: () => toast.error("Lỗi khi cấp quyền."),
  });

  // 4. Remove Role
  const removeRoleMutation = useMutation({
    mutationFn: ({ id, roleName }: { id: string; roleName: string }) =>
      userService.removeRole(id, roleName),
    onSuccess: (_, variables) => {
      toast.success(`Đã gỡ quyền ${variables.roleName}`);
      invalidateUser(variables.id);
    },
    onError: () => toast.error("Lỗi khi gỡ quyền."),
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
