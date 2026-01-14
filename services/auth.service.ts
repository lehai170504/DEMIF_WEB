import axios from "axios";

export const authService = {
  login: async (credentials: any) => {
    // Gọi vào Route Handler mình viết ở Bước 2
    // Lưu ý: Không dùng axiosClient ở đây vì axiosClient trỏ vào /api/proxy
    const res = await axios.post("/api/auth/login", credentials);
    return res.data;
  },

  logout: async () => {
    // Bạn cần viết thêm 1 route /api/auth/logout để xóa cookie
    await axios.post("/api/auth/logout");
  },
};
