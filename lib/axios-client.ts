import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// Cập nhật đúng endpoint từ hình ảnh API của bạn
const REFRESH_TOKEN_URL = "/api/Auth/refresh-token";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// --- BIẾN PHỤ TRỢ QUẢN LÝ LUỒNG ---
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// --- 1. REQUEST INTERCEPTOR: Tự động gắn Token vào mỗi Request ---
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- 2. RESPONSE INTERCEPTOR: Xử lý Data và Refresh Token khi lỗi 401 ---
axiosClient.interceptors.response.use(
  (response) => {
    // API trả về trực tiếp Object chứa accessToken, refreshToken...
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Kiểm tra lỗi 401 và đảm bảo không bị lặp vô tận trên chính request refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== REFRESH_TOKEN_URL
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = Cookies.get("refreshToken");
        if (!currentRefreshToken) throw new Error("No refresh token stored");

        // Gọi API refresh với body { refreshToken: "..." } theo đúng spec ảnh
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${REFRESH_TOKEN_URL}`,
          { refreshToken: currentRefreshToken },
        );

        // Theo ảnh: response trả về { accessToken, refreshToken, expiresAt }
        const { accessToken, refreshToken } = response.data;

        // Cập nhật Cookie mới
        Cookies.set("accessToken", accessToken, { expires: 1, path: "/" });
        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken, { expires: 7, path: "/" });
        }

        // Chạy tiếp các request đang đợi trong hàng đợi
        processQueue(null, accessToken);

        // Thực thi lại request bị lỗi ban đầu với token mới
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Nếu Refresh Token cũng lỗi (hết hạn hoàn toàn)
        processQueue(refreshError, null);

        // Clear sạch rác
        const cookieOptions = { path: "/" };
        Cookies.remove("accessToken", cookieOptions);
        Cookies.remove("refreshToken", cookieOptions);

        if (typeof window !== "undefined") {
          // Có thể dùng event để báo cho các tab khác cùng logout
          localStorage.setItem("logout-event", Date.now().toString());
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
