// src/services/axiosClient.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const REFRESH_TOKEN_URL = "/api/Auth/refresh-token";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

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

// 1. REQUEST INTERCEPTOR
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

// 2. RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response) => {
    // Rút gọn data trả về
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Check 401 và không phải là route refresh token
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== REFRESH_TOKEN_URL
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            // FIX: Sử dụng axios(originalRequest) thay vì axiosClient(originalRequest)
            // Lệnh này gọi axios thô, nó sẽ trả về Response Full, sau đó sẽ được
            // Promise chain hiện tại trả ngược ra ngoài (hoặc bạn có thể phải tự bóc tách nếu cần)

            // Cách an toàn nhất: Dùng chính axiosClient nhưng phải đảm bảo không bị double `.data`
            // Do mình đã bóc `.data` ở trên, nên khi gọi lại axiosClient, nó SẼ bóc data 1 lần nữa.
            // Sửa lại cách gọi:
            return axios(originalRequest).then((res) => res.data);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = Cookies.get("refreshToken");
        if (!currentRefreshToken) throw new Error("No refresh token stored");

        // Dùng axios CƠ BẢN (không dùng axiosClient) để gọi refresh token
        // Tránh việc bị Interceptor chặn hoặc tự ý gán access token cũ (đã hết hạn)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${REFRESH_TOKEN_URL}`,
          { refreshToken: currentRefreshToken },
        );

        const { accessToken, refreshToken } = response.data;

        Cookies.set("accessToken", accessToken, { expires: 1, path: "/" });
        if (refreshToken) {
          Cookies.set("refreshToken", refreshToken, { expires: 7, path: "/" });
        }

        processQueue(null, accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // FIX TƯƠNG TỰ: Sử dụng axios gốc để retry, rồi chủ động bóc `.data`
        const retryResponse = await axios(originalRequest);
        return retryResponse.data;
      } catch (refreshError) {
        processQueue(refreshError, null);

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

export default axiosClient;
