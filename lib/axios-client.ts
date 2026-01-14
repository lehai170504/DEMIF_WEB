import axios from "axios";

// Trỏ về Proxy của Next.js (VD: /api/proxy)
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Response Interceptor: Chỉ để xử lý data gọn gàng
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Nếu lỗi 401 từ Proxy trả về -> Nghĩa là Backend thật từ chối -> Hết hạn login
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Redirect login
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
