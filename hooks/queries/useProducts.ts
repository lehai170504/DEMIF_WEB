import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, CreateProductInput } from "@/services/product.service";

// Key quản lý tập trung
export const PRODUCT_KEYS = {
  all: ["products"] as const,
  detail: (id: number) => ["products", id] as const,
};

// 1. Hook lấy danh sách
export const useProducts = () => {
  return useQuery({
    queryKey: PRODUCT_KEYS.all,
    queryFn: productService.getAll,
    staleTime: 1000 * 60 * 5, // Cache 5 phút
  });
};

// 2. Hook lấy chi tiết
export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => productService.getById(id),
    enabled: !!id, // Chỉ chạy khi có id
  });
};

// 3. Hook thêm mới (Mutation)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: CreateProductInput) =>
      productService.create(newProduct),
    onSuccess: () => {
      // Quan trọng: Làm mới cache danh sách products sau khi thêm thành công
      // Component danh sách sẽ tự động gọi lại API để cập nhật UI
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
};
