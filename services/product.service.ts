import axiosClient from "@/lib/axios-client";

// Định nghĩa Type cho dữ liệu
export interface Product {
  id: number;
  name: string;
  price: number;
}

export type CreateProductInput = Omit<Product, "id">;

export const productService = {
  // Lấy danh sách
  getAll: async (): Promise<Product[]> => {
    return axiosClient.get("/products");
  },

  // Lấy chi tiết
  getById: async (id: number): Promise<Product> => {
    return axiosClient.get(`/products/${id}`);
  },

  // Tạo mới
  create: async (data: CreateProductInput): Promise<Product> => {
    return axiosClient.post("/products", data);
  },

  // Xóa
  delete: async (id: number): Promise<void> => {
    return axiosClient.delete(`/products/${id}`);
  },
};
