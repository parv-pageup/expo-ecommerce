import { save } from "@/utils/securestore";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
export const api = axios.create({ baseURL: "http://192.168.1.9:8000/api/v1" });
// Request Interceptor: Attach token automatically
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  // console.log("token", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("users/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        console.log("trying to refresh access Token");
        const refreshToken1 = await SecureStore.getItemAsync("refreshToken");

        const response = await api.post("users/refresh-token", {
          refreshToken: refreshToken1,
        });
        console.log("refreshed access token");
        const { accessToken, refreshToken } = response.data;

        save("accessToken", accessToken);
        save("refreshToken", refreshToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        router.replace("/(auth)/signin");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors centrally
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || "Unknown Error");
    return Promise.reject(error);
  }
);
