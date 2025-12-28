import axios, { InternalAxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_PROD_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      if (typeof window !== "undefined") {
        const stringifyToken = localStorage.getItem("workout-tracker-token");

        const tokenParsed = stringifyToken ? JSON.parse(stringifyToken) : null;

        if (tokenParsed && typeof tokenParsed === "string" && config.headers) {
          config.headers.authorization = `Bearer ${tokenParsed}`;
        }
      }
    } catch (error) {
      console.error("Error parsing token:", error);
    }
    return config;
  },
  async (error) => {
    if (typeof window !== "undefined") {
      toast.error("Request error: " + error.message);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window !== "undefined" && error.response) {
      const { status } = error.response;
      if (status === 401 || status === 440) {
        localStorage.removeItem("workout-tracker-token");
        localStorage.removeItem("hasSeenWelcomeLoader");
        document.cookie = "workout-tracker-token=; path=/; max-age=0";
        toast.success("Session expired, proceed to login");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
