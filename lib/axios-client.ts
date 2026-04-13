// src/services/axiosClient.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const REFRESH_TOKEN_URL = "/api/auth/refresh-token";

// Mở rộng Type của Axios để hỗ trợ cờ _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface PromiseQueueItem {
  resolve: (value: string | null) => void;
  reject: (reason: any) => void;
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: PromiseQueueItem[] = [];

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

// ==========================================
// 1. REQUEST INTERCEPTOR
// ==========================================
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

// ==========================================
// 2. RESPONSE INTERCEPTOR
// ==========================================
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const status = error.response?.status;
    const url = originalRequest?.url || "";

    // Bỏ qua logic refresh token nếu là API check subscription (chưa có gói hoặc chưa đăng nhập)
    const isSubscriptionCheck = url.includes("/subscription-plans/my-subscription");
    if (isSubscriptionCheck && (status === 404 || status === 401)) {
      return Promise.reject(error);
    }

    // Xử lý khi Token hết hạn (401)
    if (status === 401 && originalRequest && !originalRequest._retry && url !== REFRESH_TOKEN_URL) {
      
      // Nếu đang trong quá trình refresh, đưa các request khác vào hàng đợi
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest).then((res) => res.data); // Dùng axios thuần để bóc .data
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = Cookies.get("refreshToken");
        if (!currentRefreshToken) throw new Error("No refresh token stored");

        // Gọi API cấp lại token bằng axios thuần (tránh bị intercept chặn lại)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${REFRESH_TOKEN_URL}`,
          { refreshToken: currentRefreshToken },
        );

        const { accessToken, refreshToken } = response.data;

        // Cập nhật lại Cookie
        Cookies.set("accessToken", accessToken, { expires: 1, path: "/" });
        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken, { expires: 7, path: "/" });
        }

        // Xử lý xong -> Gọi lại các request đang đợi
        processQueue(null, accessToken);

        // Gắn token mới vào request ban đầu và gọi lại
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        const retryResponse = await axios(originalRequest);
        return retryResponse.data;

      } catch (refreshError) {
        processQueue(refreshError, null);

        // Xóa token và văng ra log in nếu refresh thất bại
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });

        if (typeof window !== "undefined") {
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

// ==========================================
// 3. PUBLIC AXIOS CLIENT
// ==========================================
export const publicAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

publicAxiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default axiosClient;