/**
 * Chuyển đổi giá trị tiến độ từ backend về dạng thập phân (0 - 1).
 * Xử lý trường hợp backend trả về 0-100 hoặc 0-1.
 */
export function normalizeProgress(value: number | undefined | null, status?: string): number {
  if (value === undefined || value === null) {
    return status === "Completed" ? 1 : 0;
  }

  // Nếu giá trị > 1.1, khả năng cao là tỷ lệ 0-100
  if (value > 1.1) {
    return value / 100;
  }

  // Nếu status là Completed nhưng progress lại nhỏ, vẫn ưu tiên theo status
  if (status === "Completed" && value < 1) {
    return 1;
  }

  return value;
}
